/**
 * WhatsApp Cloud API Webhook — Auto-Reply + Routing
 * Tina: Front-line handler for +971 52 691 9169
 * Jack: Escalation for pricing/closing
 */

const VERIFY_TOKEN = "oasis_emaar_webhook_verify_2026";
const WHATSAPP_TOKEN = process.env.WHATSAPP_SYSTEM_TOKEN || "";
const PHONE_ID = "1131915953344668";
const AHMED_PRIVATE = "971555585525"; // Internal alerts ONLY — never shared externally

const AUTO_REPLY = `👋 Thank you for contacting Bijon RE.

We specialise in exclusive allocations at The Oasis by Emaar, Grand Polo Club & Resort, and Dubai's premium waterfront communities.

One of our senior consultants will respond personally within the next few hours. If your inquiry is urgent, please visit our website or browse current availability:

🌐 oasisemaar.com
📞 +971 52 691 9169

— Tina, Client Relations, Bijon RE`;

async function sendWhatsApp(to, message) {
  if (!WHATSAPP_TOKEN) return console.error("Missing WHATSAPP_SYSTEM_TOKEN");
  try {
    const r = await fetch(`https://graph.facebook.com/v25.0/${PHONE_ID}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { body: message } }),
    });
    const data = await r.json();
    console.log(`Reply to ${to}: ${data.messages?.[0]?.id || JSON.stringify(data).substring(0, 100)}`);
  } catch (e) {
    console.error("WhatsApp send error:", e);
  }
}

async function alertAhmed(from, text, name) {
  const alert = `📩 *New WhatsApp Lead — ${name || "Unknown"}*

👤 ${from}
💬 ${text?.substring(0, 200) || "(no text)"}
🕐 ${new Date().toLocaleString("en-AE", { timeZone: "Asia/Dubai" })}
📱 +971 52 691 9169`;

  await sendWhatsApp(AHMED_PRIVATE, alert);
}

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
    console.log("WhatsApp webhook:", JSON.stringify(body).substring(0, 800));

    if (!body.entry) return new Response("ok", { status: 200 });

    for (const entry of body.entry) {
      for (const change of entry.changes || []) {
        const value = change.value || {};

        // Handle incoming messages
        if (value.messages) {
          for (const msg of value.messages) {
            const from = msg.from;
            const text = msg.text?.body || "";
            const name = value.contacts?.[0]?.profile?.name || "Unknown";

            console.log(`📩 ${name} (${from}): ${text}`);

            // Skip auto-reply for Ahmed's test messages
            if (from === "971287101" || from === "971555585525") {
              console.log(`⏭️ Skipping auto-reply for internal number: ${from}`);
              // Still alert Ahmed
              await alertAhmed(from, text, name);
              continue;
            }

            // Auto-reply to all external messages
            await sendWhatsApp(from, AUTO_REPLY);
            console.log(`✅ Auto-reply sent to ${from}`);

            // Alert Ahmed's private line
            await alertAhmed(from, text, name);
          }
        }

        // Log delivery/read statuses
        if (value.statuses) {
          for (const s of value.statuses) {
            console.log(`📊 Status: ${s.status} → ${s.recipient_id}`);
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
