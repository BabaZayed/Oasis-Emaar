/**
 * WhatsApp Cloud API Webhook - Next.js App Router
 * URL: https://oasis-emaar.vercel.app/api/whatsapp-webhook
 */

const VERIFY_TOKEN = 'oasis_emaar_webhook_verify_2026';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200, headers: { 'Content-Type': 'text/plain' } });
  }
  return new Response('Forbidden', { status: 403 });
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('WhatsApp webhook:', JSON.stringify(body).substring(0, 800));

    if (body.entry) {
      for (const entry of body.entry) {
        for (const change of (entry.changes || [])) {
          const value = change.value || {};
          if (value.messages) {
            for (const msg of value.messages) {
              console.log(`Message from ${msg.from}: ${msg.text?.body || ''}`);
            }
          }
          if (value.statuses) {
            for (const s of value.statuses) {
              console.log(`Status: ${s.status} for ${s.recipient_id}`);
            }
          }
        }
      }
    }
    return new Response('ok', { status: 200 });
  } catch (e) {
    console.error('Webhook error:', e);
    return new Response('error', { status: 500 });
  }
}
