/**
 * Tina — Front-line WhatsApp AI Agent
 * Handles ALL inbound comms for: Oasis Emaar, Grand Polo, Mina Rashid, DealsOfGenie
 * Admin bypass: Ahmed's numbers → system/test mode, no lead alerts
 * Public: Auto-reply + alert to Ahmed's private line
 */

const VERIFY_TOKEN = "oasis_emaar_webhook_verify_2026";
const WHATSAPP_TOKEN = process.env.WHATSAPP_SYSTEM_TOKEN || "";
const PHONE_ID = "1131915953344668";

const ADMIN_NUMBERS = ["971287101", "971555585525"]; // Ahmed only — bypass lead pipeline

const TINA_REPLY = `👋 Welcome to Bijon RE.

We represent exclusive allocations across Dubai's most sought-after communities — The Oasis by Emaar, Grand Polo Club & Resort, and Mina Rashid.

I'm Tina, your personal consultant. To ensure I connect you with the most relevant availability, please share:

• Which community are you most interested in?
• Are you seeking a primary residence, secondary home, or investment allocation?
• What is your preferred bedroom count and budget range?

I'll personally route you to a senior consultant within 2 hours.

— Tina, Bijon RE`;

async function sendWhatsApp(to, message) {
  if (!WHATSAPP_TOKEN) return null;
  try {
    const r = await fetch(`https://graph.facebook.com/v25.0/${PHONE_ID}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { body: message } }),
    });
    return await r.json();
  } catch (e) {
    console.error("Send error:", e);
    return null;
  }
}

async function alertAhmed(from, name, text) {
  const alert = `📩 *New Lead — ${name || "Unknown"}*

👤 ${from}
💬 ${text?.substring(0, 200) || "(no text)"}
🕐 ${new Date().toLocaleString("en-AE", { timeZone: "Asia/Dubai" })}
📱 Via: +971 52 691 9169`;

  await sendWhatsApp(ADMIN_NUMBERS[1], alert); // +971 55 558 5525
}

function isAdmin(from) {
  return ADMIN_NUMBERS.includes(from);
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

    if (!body.entry) return new Response("ok", { status: 200 });

    for (const entry of body.entry) {
      for (const change of entry.changes || []) {
        const value = change.value || {};

        if (value.messages) {
          for (const msg of value.messages) {
            const from = msg.from;
            const text = msg.text?.body || "";
            const name = value.contacts?.[0]?.profile?.name || "Unknown";

            // ═══ ADMIN BYPASS ═══
            if (isAdmin(from)) {
              console.log(`[ADMIN] ${name} (${from}): ${text?.substring(0, 100)}`);
              // Admin message — log only, no auto-reply, no lead alert
              // Tina responds: "Admin message received. System nominal."
              await sendWhatsApp(from, `✅ Admin message received. System nominal. Tina active on +971 52 691 9169.`);
              continue; // SKIP lead pipeline entirely
            }

            // ═══ PUBLIC LEAD ═══
            console.log(`[LEAD] ${name} (${from}): ${text?.substring(0, 100)}`);

            // Auto-reply with Tina's profiling questions
            await sendWhatsApp(from, TINA_REPLY);

            // Alert Ahmed's private line
            await alertAhmed(from, name, text);
          }
        }

        if (value.statuses) {
          for (const s of value.statuses) {
            console.log(`[STATUS] ${s.status} → ${s.recipient_id}`);
          }
        }
      }
    }

    return new Response("ok", { status: 200 });
  } catch (e) {
    console.error("Tina webhook error:", e);
    return new Response("error", { status: 500 });
  }
}
