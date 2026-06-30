/**
 * Meta WhatsApp Flow Webhook
 * Receives Flow submission data and routes to WhatsApp + Google Sheets
 * 
 * POST /api/flow-webhook — Flow data endpoint (receives completed flow data)
 * GET  /api/flow-webhook — Health check (Meta pings this)
 * POST /api/flow-health    — Health check POST variant
 */

import { NextRequest, NextResponse } from 'next/server';

const WHATSAPP_ALERT_NUMBER = process.env.ALERT_PHONE_NUMBER || '971555585525';
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID || '';
const WHATSAPP_TOKEN = process.env.WHATSAPP_SYSTEM_TOKEN || '';
const SHEETS_WEBHOOK_URL = process.env.SHEETS_WEBHOOK_URL || '';

type FlowData = {
  version: string;
  screen: string;       // Last screen the user was on
  screen_id: string;
  data: Record<string, string | string[]>; // Form field values
  flow_id: string;      // Meta Flow ID
  flow_token: string;   // Unique submission token
  timestamp: string;
};

// ─── POST: Handle flow data submissions ───
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('[Flow Webhook] Received:', JSON.stringify(body).slice(0, 500));

    // Determine if this is a data endpoint or health check
    const isHealthCheck = body.event === 'PING' || body.health_check || body.hub?.mode === 'subscribe';
    const isFlowData = body.data && body.entry;

    if (isHealthCheck) {
      console.log('[Flow Webhook] Health check OK');
      return NextResponse.json({ status: 'ok', version: '5.0' });
    }

    if (isFlowData) {
      return handleFlowData(body);
    }

    // Handle direct flow submissions (simpler format)
    if (body.screen_id && body.data) {
      return handleFlowSubmission(body as FlowData);
    }

    console.log('[Flow Webhook] Unknown payload type');
    return NextResponse.json({ status: 'received' }, { status: 200 });

  } catch (error) {
    console.error('[Flow Webhook] Error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// ─── GET: Health check ───
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // WhatsApp webhook verification (if Meta uses same verify pattern)
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');
  
  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log('[Flow Health] Webhook verified');
    return NextResponse.json(Number(challenge), { status: 200 });
  }
  
  return NextResponse.json({ 
    status: 'healthy', 
    version: '5.0',
    timestamp: new Date().toISOString()
  });
}

// ─── Handler: Process flow submission ───
async function handleFlowSubmission(flow: FlowData) {
  console.log('[Flow] Submission:', {
    screen: flow.screen_id,
    fields: Object.keys(flow.data),
    flow_id: flow.flow_id
  });

  const leadData = flattenFlowData(flow);

  // 1. Send WhatsApp alert to Ahmed
  await sendWhatsAppAlert(leadData, flow.flow_id);

  // 2. Write to Google Sheets if configured
  if (SHEETS_WEBHOOK_URL) {
    await writeToSheets(leadData);
  }

  return NextResponse.json({ 
    status: 'processed',
    screen: 'THANKYOU',
    data: {
      ...flow.data,
      message: '✅ Thank you! Our team will contact you within 2 hours.',
    }
  });
}

// ─── Handler: Meta's entry-based format ───
async function handleFlowData(body: any) {
  try {
    const entries = body.entry || [];
    for (const entry of entries) {
      const changes = entry.changes || [];
      for (const change of changes) {
        const value = change.value || {};
        const messages = value.messages || [];
        
        for (const msg of messages) {
          if (msg.type === 'flow') {
            const flowData = msg.flow || {};
            console.log('[Flow Data] Received:', JSON.stringify(flowData).slice(0, 400));
            
            // Process like a direct submission
            await handleFlowSubmission({
              version: '5.0',
              screen: flowData.screen || '',
              screen_id: flowData.screen_id || '',
              data: flowData.data || {},
              flow_id: flowData.id || '',
              flow_token: flowData.token || '',
              timestamp: msg.timestamp || new Date().toISOString()
            });
          }
        }
      }
    }
    return NextResponse.json({ status: 'processed' });
  } catch (e) {
    console.error('[Flow Data] Processing error:', e);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}

// ─── Send WhatsApp notification ───
async function sendWhatsAppAlert(data: Record<string, string>, flowId: string) {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
    console.log('[Flow] WhatsApp not configured — skipping alert');
    return;
  }

  const message = buildAlertMessage(data, flowId);
  
  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: WHATSAPP_ALERT_NUMBER,
          type: 'text',
          text: { body: message }
        })
      }
    );
    const result = await res.json();
    console.log('[Flow] WhatsApp alert sent:', result.messages?.[0]?.id || result.error?.message || 'OK');
  } catch (e) {
    console.error('[Flow] WhatsApp alert failed:', e);
  }
}

// ─── Build alert message ───
function buildAlertMessage(data: Record<string, string>, flowId: string): string {
  const brand = flowId?.includes('mr') || flowId?.includes('mina') ? '🌊 Mina Rashid' :
                flowId?.includes('gp') || flowId?.includes('polo') ? '🐎 Grand Polo' :
                '🏡 Oasis Emaar';

  return [
    `🚨 *New Flow Lead — ${brand}*`,
    ``,
    ...Object.entries(data)
      .filter(([_, v]) => v)
      .map(([k, v]) => `• *${formatKey(k)}:* ${v}`),
    ``,
    `_Flow ID: ${flowId}_`,
    `_${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })}_`
  ].join('\n');
}

// ─── Write to Google Sheets ───
async function writeToSheets(data: Record<string, string>) {
  if (!SHEETS_WEBHOOK_URL) return;
  try {
    await fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        source: 'whatsapp_flow',
        ...data
      })
    });
  } catch (e) {
    console.error('[Flow] Sheets write failed:', e);
  }
}

function flattenFlowData(flow: FlowData): Record<string, string> {
  const result: Record<string, string> = {};
  const data = flow.data || {};
  
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      result[key] = value.join(', ');
    } else if (typeof value === 'string') {
      result[key] = value;
    } else if (value !== null && value !== undefined) {
      result[key] = String(value);
    }
  }
  
  return result;
}

function formatKey(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/Id/g, 'ID');
}
