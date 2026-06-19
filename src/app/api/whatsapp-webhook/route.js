/**
 * WhatsApp Cloud API Webhook — Passive Logger Only
 * Receives inbound messages/logs. Does NOT auto-reply or intercept chats.
 * All human conversation happens live on +971 52 691 9169.
 * Instant Form leads → handled by /api/lead-webhook separately.
 */

const VERIFY_TOKEN = "oasis_emaar_webhook_verify_2026";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("hub.mode") === "subscribe" && searchParams.get("hub.verify_token") === VERIFY_TOKEN) {
    return new Response(searchParams.get("hub.challenge"), { status: 200, headers: { "Content-Type": "text/plain" } });
  }
  return new Response("Forbidden", { status: 403 });
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Log ONLY — never auto-reply, never scrape, never alert
    // Process delivery statuses and message logs silently
    if (body.entry) {
      for (const entry of body.entry) {
        for (const change of entry.changes || []) {
          const value = change.value || {};

          if (value.messages) {
            for (const msg of value.messages) {
              console.log(`[CHAT LOG] ${msg.from}: ${msg.text?.body?.substring(0, 100) || "(media)"}`);
            }
          }

          if (value.statuses) {
            for (const s of value.statuses) {
              console.log(`[STATUS] ${s.status} → ${s.recipient_id}`);
            }
          }
        }
      }
    }

    return new Response("ok", { status: 200 });
  } catch (e) {
    console.error("Webhook error:", e);
    return new Response("error", { status: 500 });
  }
}
