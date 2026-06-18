import { NextRequest, NextResponse } from "next/server";

const WHATSAPP_PHONE_ID = "1131915953344668";
const WHATSAPP_TOKEN = process.env.WHATSAPP_SYSTEM_TOKEN || "";

async function sendWhatsApp(to: string, message: string) {
  try {
    await fetch(`https://graph.facebook.com/v25.0/${WHATSAPP_PHONE_ID}/messages`, {
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
    });
  } catch {}
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, country, interest } = body;

    if (!name || !email || !phone || !country) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Notify Ahmed
    const alert = `📥 *Guide Download — New Lead!*

👤 ${name}
📧 ${email}
📱 ${phone}
🌍 ${country}
🎯 ${interest || "Not specified"}
🕐 ${new Date().toLocaleString("en-AE", { timeZone: "Asia/Dubai" })}`;
    await sendWhatsApp("971555585525", alert);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Guide download error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
