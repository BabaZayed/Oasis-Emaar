import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = "oasis_lead_webhook_2026";
const WHATSAPP_PHONE_ID = "1131915953344668";
const WHATSAPP_TOKEN = process.env.WHATSAPP_SYSTEM_TOKEN || "";

async function sendWhatsApp(to: string, message: string) {
  try {
    const res = await fetch(
      `https://graph.facebook.com/v25.0/${WHATSAPP_PHONE_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "text",
          text: { body: message },
        }),
      }
    );
    return res.ok;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200, headers: { "Content-Type": "text/plain" } });
  }

  return new Response("Verification failed", { status: 403 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Meta leadgen webhook
    if (body.object === "page") {
      for (const entry of body.entry || []) {
        for (const change of entry.changes || []) {
          if (change.field === "leadgen" && change.value) {
            const leadgenId = change.value.leadgen_id;
            const formId = change.value.form_id;

            // Fetch lead data from Meta
            const pageId = change.value.page_id;
            if (leadgenId) {
              // Notify Ahmed via WhatsApp
              const alert = `🔔 *New Lead!*\n\n📋 Lead ID: ${leadgenId}\n📝 Form: ${formId}\n🏠 Page: ${pageId}\n🕐 Time: ${new Date().toLocaleString("en-AE", { timeZone: "Asia/Dubai" })}\n\n_Log into Meta to view full details_`;
              
              // Send to Ahmed's number
              await sendWhatsApp("971555585525", alert);
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead webhook error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
