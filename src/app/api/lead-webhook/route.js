/**
 * Meta Lead Ads Webhook — Receives lead form submissions
 * URL: https://www.oasisemaar.com/api/lead-webhook
 *
 * Flow: Lead submits form → Meta POSTs here → WhatsApp notification sent
 */

const VERIFY_TOKEN = 'oasis_lead_webhook_2026';

// WhatsApp Cloud API config
const WHATSAPP_PHONE_ID = '1131915953344668';
const WHATSAPP_TOKEN = process.env.WHATSAPP_SYSTEM_TOKEN || '';

// Ahmed's numbers
const AHMED_PRIMARY = '971555585525';
const AHMED_SECONDARY = '971564440088';

async function sendWhatsApp(to, message) {
  try {
    const res = await fetch(
      `https://graph.facebook.com/v25.0/${WHATSAPP_PHONE_ID}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          type: 'text',
          text: { body: message },
        }),
      }
    );
    const data = await res.json();
    return { ok: true, id: data.messages?.[0]?.id };
  } catch (e) {
    console.error('WhatsApp send error:', e.message);
    return { ok: false, error: e.message };
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ Lead webhook verified');
    return new Response(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
  return new Response('Forbidden', { status: 403 });
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('📥 Lead webhook:', JSON.stringify(body).substring(0, 800));

    const entries = body.entry || [];
    const results = [];

    for (const entry of entries) {
      for (const change of entry.changes || []) {
        const value = change.value || {};

        if (value.leadgen_id) {
          const leadId = value.leadgen_id;
          const formId = value.form_id;
          const created = value.created_time;

          console.log(`🎯 Lead ${leadId} | Form ${formId}`);

          const msg = `🏠 *NEW LEAD — Oasis Emaar*\n\n🆔 ${leadId}\n📋 Form: ${formId}\n🕐 ${new Date(created * 1000).toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })} GST\n\n_Check Facebook Leads Center_\n_Respond within 10 min — Bible SLA_`;

          await sendWhatsApp(AHMED_SECONDARY, msg);

          results.push({ lead_id: leadId, form_id: formId });
        }
      }
    }

    return Response.json({ success: true, processed: results.length }, { status: 200 });
  } catch (e) {
    console.error('❌ Lead webhook error:', e);
    return Response.json({ success: false, error: e.message }, { status: 200 });
  }
}
