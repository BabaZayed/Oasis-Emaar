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
🕐 ${new Date().toLocaleString("en-AE", { timeZone: "Asia/Dubai" })}

🔗 Booking: https://wa.me/971526919169?text=I%20have%20downloaded%20the%20Relocation%20Guide.%20I%20would%20like%20to%20schedule%20a%20private%20consultation%20with%20Ahmed%20regarding%20exclusive%20allocations.`;
    await sendWhatsApp("971555585525", alert);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Guide download error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
