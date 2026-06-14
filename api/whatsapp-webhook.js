/**
 * WhatsApp Cloud API Webhook Handler
 * Receives incoming messages from Meta and forwards to OpenClaw gateway
 */

const VERIFY_TOKEN = 'oasis_emaar_webhook_verify_2026';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Webhook verified');
      return res.status(200).send(challenge);
    }
    return res.status(403).send('Forbidden');
  }

  if (req.method === 'POST') {
    const body = req.body;
    console.log('WhatsApp webhook:', JSON.stringify(body).substring(0, 500));

    if (body.entry) {
      for (const entry of body.entry) {
        for (const change of (entry.changes || [])) {
          if (change.value?.messages) {
            for (const msg of change.value.messages) {
              const from = msg.from;
              const text = msg.text?.body || '';
              console.log(`📩 ${from}: ${text}`);
              
              try {
                const { default: fetch } = await import('node-fetch');
                await fetch('http://127.0.0.1:18789/webhook/whatsapp', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ from, text, timestamp: msg.timestamp }),
                });
              } catch (e) {
                console.error('Gateway forward failed:', e.message);
              }
            }
          }
        }
      }
    }

    return res.status(200).send('ok');
  }

  return res.status(405).send('Method not allowed');
}
