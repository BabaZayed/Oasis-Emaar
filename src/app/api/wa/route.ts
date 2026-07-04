import { NextRequest, NextResponse } from "next/server";

/**
 * WhatsApp Webhook Endpoint
 * - GET: Meta verification (responds with challenge)
 * - POST: Receive incoming messages
 */

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "oasis_emaar_webhook_verify_2026";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  // Meta verification request
  if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
    return new Response(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // Unauthorized
  return new Response("Forbidden", { status: 403 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("[WA Webhook] Incoming:", JSON.stringify(body).substring(0, 200));

    // Handle incoming messages
    const entries = body?.entry || [];
    for (const entry of entries) {
      const changes = entry?.changes || [];
      for (const change of changes) {
        const value = change?.value || {};
        const messages = value?.messages || [];
        
        for (const msg of messages) {
          if (msg?.type === "text") {
            const from = msg.from;
            const text = msg.text?.body || "";
            
            // TODO: Route to Tina's auto-reply engine
            console.log(`[WA] Message from ${from}: ${text}`);
          }
        }
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("[WA Webhook] Error:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
