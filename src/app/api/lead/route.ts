// src/app/api/lead/route.ts — canonical Command Center intake endpoint.
import { NextRequest, NextResponse } from 'next/server'
import { deliverLead, bridgeHealth } from '@/lib/lead-bridge'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'bad json' }, { status: 400 })
  }
  const r = await deliverLead(body)
  return NextResponse.json({ success: r.ok, ...r }, { status: r.ok ? 200 : 202 })
}

export async function GET() {
  return NextResponse.json({ ok: true, ...bridgeHealth() })
}
