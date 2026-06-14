/**
 * WhatsApp Cloud API Webhook Handler
 * Vercel serverless function
 */
const VERIFY_TOKEN = 'oasis_emaar_webhook_verify_2026';

export default async function handler(req, res) {
  // Meta webhook verification (GET)
  if (req.method === 'GET') {
    const { 'hub.mode': mode, 'hub.verify_token': token, 'hub.challenge': challenge } = req.query;
    
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ Webhook verified');
      res.setHeader('Content-Type', 'text/plain');
      return res.status(200).send(String(challenge));
    }
    return res.status(403).send('Forbidden');
  }

  // Incoming messages (POST)
  if (req.method === 'POST') {
    const body = req.body;
    console.log('📩 Webhook:', JSON.stringify(body).substring(0, 800));

    if (body.entry) {
      for (const entry of body.entry) {
        for (const change of (entry.changes || [])) {
          const value = change.value || {};
          if (value.messages) {
            for (const msg of value.messages) {
              const from = msg.from;
              const text = msg.text?.body || '';
              console.log(`📩 ${from}: ${text}`);
            }
          }
          // Also log statuses
          if (value.statuses) {
            for (const s of value.statuses) {
              console.log(`📊 Status: ${s.status} for ${s.recipient_id}`);
            }
          }
        }
      }
    }

    return res.status(200).send('ok');
  }

  return res.status(405).send('Method not allowed');
}
