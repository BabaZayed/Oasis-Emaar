// Command Center lead bridge. Dual delivery so a lead is never lost:
//   1. instant push  -> Cloudflare Tunnel -> hardened gateway -> n8n -> Twenty CRM   (~1s)
//   2. durable queue -> Vercel Blob (private), drained by /api/lead/drain every minute
// Whichever arrives first creates the CRM record; the second is discarded by
// platformLeadId dedupe inside n8n.
import { createHash } from 'crypto'
import { put } from '@vercel/blob'

const SITE = process.env.NEXT_PUBLIC_SITE_KEY || 'unknown'
const PROJECT = process.env.NEXT_PUBLIC_PROJECT_KEY || 'OTHER'
const TUNNEL = process.env.LEAD_TUNNEL_URL || ''
const TSECRET = process.env.LEAD_TUNNEL_SECRET || ''
const BLOB = process.env.BLOB_READ_WRITE_TOKEN || ''

const s = (v: unknown, n = 300) => (v == null ? '' : String(v).trim().slice(0, n))

export type NormalisedLead = ReturnType<typeof normalise>

export function normalise(body: Record<string, unknown>) {
  const name = s(body.name ?? body.fullName ?? body.Name, 120)
  const phone = s(body.phone ?? body.phoneNumber ?? body.mobile, 40).replace(/[^\d+]/g, '')
  const email = s(body.email ?? body.Email, 160).toLowerCase()
  const receivedAt = new Date().toISOString()
  // Minute bucket => a double-submit of the same form produces the same id.
  const platformLeadId =
    'web_' +
    SITE.replace(/\W+/g, '_') +
    '_' +
    createHash('sha256')
      .update([phone, email, receivedAt.slice(0, 16)].join('|'))
      .digest('hex')
      .slice(0, 24)

  return {
    platformLeadId,
    site: SITE,
    project: PROJECT,
    source: 'WEBSITE',
    name,
    phone,
    email,
    budget: s(body.budget, 60),
    timeline: s(body.timeline, 60),
    nationality: s(body.nationality, 60),
    unitType: s(body.unitType ?? body.propertyInterest ?? body.criteria, 60),
    purpose: s(body.purpose, 40),
    paymentType: s(body.paymentType, 40),
    formType: s(body.formType, 40) || 'general',
    message: s(body.message ?? body.notes, 2000),
    pageUrl: s(body.pageUrl, 500),
    utmSource: s(body.utm_source ?? body.utmSource, 100),
    utmMedium: s(body.utm_medium ?? body.utmMedium, 100),
    utmCampaign: s(body.utm_campaign ?? body.utmCampaign, 150),
    receivedAt,
  }
}

// timeoutMs: the site form uses a short timeout (a visitor is waiting); the cron drainer
// can afford a longer one because the gateway now waits for n8n -> Twenty to finish.
export async function pushInstant(lead: Record<string, unknown>, timeoutMs = 2500) {
  if (!TUNNEL) return false
  try {
    const r = await fetch(TUNNEL, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-cc-secret': TSECRET },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(timeoutMs),
    })
    return r.ok
  } catch {
    return false
  }
}

async function enqueue(lead: Record<string, unknown>) {
  if (!BLOB) return false
  try {
    await put('pending/' + lead.platformLeadId + '.json', JSON.stringify(lead), {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
      cacheControlMaxAge: 0,
      token: BLOB,
    })
    return true
  } catch {
    return false
  }
}

export async function deliverLead(body: Record<string, unknown>) {
  const lead = normalise(body)
  if (!lead.name && !lead.phone && !lead.email) {
    return { ok: false, id: lead.platformLeadId, pushed: false, queued: false, skipped: true }
  }
  const [p, q] = await Promise.allSettled([pushInstant(lead), enqueue(lead)])
  const pushed = p.status === 'fulfilled' && p.value === true
  const queued = q.status === 'fulfilled' && q.value === true
  if (!pushed && !queued) {
    // Last resort: the lead is at least in the Vercel runtime log, greppable.
    console.error('LEAD_DROPPED ' + JSON.stringify(lead))
  }
  return { ok: pushed || queued, id: lead.platformLeadId, pushed, queued }
}

export async function bridgeHealth() {
  // tunnel = the variable exists; tunnelLive = the endpoint it names answered /health just now.
  // Never report tunnel:true alone as proof of delivery.
  let tunnelLive = false
  let tunnelHost = ''
  let tunnelError = ''
  let tunnelMs = 0
  if (TUNNEL) {
    const t0 = Date.now()
    try {
      const u = new URL(TUNNEL)
      tunnelHost = u.host
      const r = await fetch(u.origin + '/health', { signal: AbortSignal.timeout(6000), cache: 'no-store' })
      tunnelLive = r.ok
      if (!r.ok) tunnelError = 'HTTP ' + r.status + ' ' + (r.headers.get('cf-mitigated') || '') + ' ' + (await r.text()).slice(0, 160)
    } catch (e) {
      tunnelLive = false
      const err = e as { name?: string; message?: string; cause?: { code?: string; message?: string } }
      tunnelError = [err.name, err.message, err.cause && (err.cause.code || err.cause.message)].filter(Boolean).join(': ').slice(0, 200)
    }
    tunnelMs = Date.now() - t0
  }
  return { site: SITE, project: PROJECT, tunnel: !!TUNNEL, tunnelLive, tunnelHost, tunnelMs, tunnelError, secret: !!TSECRET, queue: !!BLOB }
}
