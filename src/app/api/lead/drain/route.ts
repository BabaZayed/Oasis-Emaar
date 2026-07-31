// Command Center — durable queue drainer.
// Runs on a Vercel Cron every minute. Reads leads parked in the private Blob
// store by the lead bridge and replays them at the Cloudflare Tunnel, which
// forwards to the hardened gateway -> n8n -> Twenty CRM.
// A lead is only deleted from the queue once the tunnel has accepted it, so if
// the workstation is off the queue simply grows and drains when it comes back.
import { NextRequest, NextResponse } from 'next/server'
import { list, get, del } from '@vercel/blob'
import { pushInstant } from '@/lib/lead-bridge'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

const BLOB = process.env.BLOB_READ_WRITE_TOKEN || ''
const CRON_SECRET = process.env.CRON_SECRET || ''

async function drain() {
  if (!BLOB) return { ok: false, error: 'no blob token' }
  let scanned = 0
  let delivered = 0
  let failed = 0
  try {
    const { blobs } = await list({ prefix: 'pending/', limit: 100, token: BLOB })
    for (const b of blobs) {
      scanned++
      try {
        const res = await get(b.pathname, { access: 'private', useCache: false, token: BLOB })
        if (!res || res.statusCode !== 200 || !res.stream) {
          failed++
          continue
        }
        const text = await new Response(res.stream).text()
        const lead = JSON.parse(text)
        const sent = await pushInstant(lead)
        if (sent) {
          await del(b.url, { token: BLOB })
          delivered++
        } else {
          failed++
        }
      } catch {
        failed++
      }
    }
  } catch (e) {
    return { ok: false, error: 'list failed', scanned, delivered, failed }
  }
  return { ok: true, scanned, delivered, failed }
}

export async function GET(req: NextRequest) {
  if (CRON_SECRET) {
    const auth = req.headers.get('authorization') || ''
    if (auth !== 'Bearer ' + CRON_SECRET) {
      return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
    }
  }
  const r = await drain()
  return NextResponse.json(r, { status: r.ok ? 200 : 500 })
}

export async function POST(req: NextRequest) {
  return GET(req)
}
