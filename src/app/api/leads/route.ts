import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

// ====== GOOGLE SHEETS INTEGRATION ======
const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

async function pushToGoogleSheet(lead: {
  name: string;
  email: string;
  phone: string;
  budget?: string | null;
  timeline?: string | null;
  nationality?: string | null;
  propertyInterest?: string | null;
  formType: string;
  message?: string | null;
  pageUrl?: string | null;
  leadScore: number;
  isQualified: boolean;
  source: string;
}) {
  if (!GOOGLE_SHEETS_URL) return; // Skip if not configured

  try {
    // Use GET with URL parameters — most reliable method for Google Apps Script
    const params = new URLSearchParams({
      timestamp: new Date().toISOString(),
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      budget: lead.budget || "",
      timeline: lead.timeline || "",
      nationality: lead.nationality || "",
      propertyInterest: lead.propertyInterest || "",
      formType: lead.formType,
      message: (lead.message || "").substring(0, 500), // Limit message length for URL
      pageUrl: lead.pageUrl || "",
      leadScore: String(lead.leadScore),
      isQualified: lead.isQualified ? "Yes" : "No",
      source: lead.source,
    });

    const url = `${GOOGLE_SHEETS_URL}?${params.toString()}`;
    
    await fetch(url, {
      method: "GET",
      redirect: "follow",
    });
    console.log(`[GOOGLE SHEETS] Lead pushed: ${lead.name}`);
  } catch (error) {
    console.error("[GOOGLE SHEETS] Failed to push lead:", error);
    // Don't fail the main request if Google Sheets fails
  }
}

// ====== RATE LIMITING (in-memory for production use Redis) ======
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 submissions per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false; // Rate limited
  }

  record.count++;
  return true;
}

// ====== LEAD SCORING ======
function calculateLeadScore(data: {
  budget?: string;
  timeline?: string;
  nationality?: string;
  propertyInterest?: string;
  phone: string;
  email: string;
}): number {
  let score = 0;

  // Budget scoring
  if (data.budget) {
    const budgetNum = parseInt(data.budget.replace(/[^0-9]/g, ""));
    if (budgetNum >= 10000000) score += 30; // AED 10M+
    else if (budgetNum >= 5000000) score += 20; // AED 5M+
    else if (budgetNum >= 3000000) score += 10; // AED 3M+
    else if (budgetNum > 0) score += 5;
  }

  // Timeline scoring
  if (data.timeline) {
    if (data.timeline === "immediate" || data.timeline === "1-3months") score += 20;
    else if (data.timeline === "3-6months") score += 15;
    else if (data.timeline === "6-12months") score += 10;
    else score += 5;
  }

  // Phone quality
  if (data.phone && data.phone.startsWith("+971")) score += 15;
  else if (data.phone && data.phone.length >= 10) score += 10;

  // Email quality (business email bonus)
  if (data.email) {
    const domain = data.email.split("@")[1]?.toLowerCase();
    const personalDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com"];
    if (domain && !personalDomains.includes(domain)) score += 10;
  }

  // Property interest
  if (data.propertyInterest && data.propertyInterest !== "general") score += 10;

  // Nationality (UAE/GCC higher intent)
  if (data.nationality && ["uae", "saudi", "kuwait", "qatar", "bahrain", "oman"].includes(data.nationality.toLowerCase())) {
    score += 5;
  }

  return Math.min(score, 100);
}

// ====== SPAM DETECTION ======
function detectSpam(data: {
  honeypot?: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
}): { isSpam: boolean; reason?: string } {
  // Honeypot field filled = bot
  if (data.honeypot) {
    return { isSpam: true, reason: "honeypot_triggered" };
  }

  // Suspicious email patterns
  const spamEmailPatterns = [
    /tempmail/i, /throwaway/i, /guerrillamail/i, /mailinator/i,
    /10minutemail/i, /trashmail/i, /fakeinbox/i,
  ];
  const emailLower = data.email.toLowerCase();
  for (const pattern of spamEmailPatterns) {
    if (pattern.test(emailLower)) {
      return { isSpam: true, reason: "spam_email_domain" };
    }
  }

  // Name looks like random characters
  if (data.name.length < 2 || /^[a-z]{20,}$/i.test(data.name)) {
    return { isSpam: true, reason: "invalid_name" };
  }

  // Phone number too short or all same digits
  const phoneDigits = data.phone.replace(/\D/g, "");
  if (phoneDigits.length < 7) {
    return { isSpam: true, reason: "invalid_phone" };
  }
  if (/^(\d)\1+$/.test(phoneDigits)) {
    return { isSpam: true, reason: "fake_phone" };
  }

  // Message contains URLs (common spam indicator)
  if (data.message && /https?:\/\//.test(data.message)) {
    return { isSpam: true, reason: "url_in_message" };
  }

  return { isSpam: false };
}

// ====== VALIDATION SCHEMA ======
const leadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  phone: z.string().min(7).max(20),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  nationality: z.string().optional(),
  propertyInterest: z.string().optional(),
  formType: z.enum(["paywall", "contact", "exit_intent", "feedback", "general", "availability"]).default("general"),
  message: z.string().max(2000).optional(),
  pageUrl: z.string().max(500).optional(),
  honeypot: z.string().max(0).optional(), // Must be empty
});

// ====== POST HANDLER ======
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") ||
               request.headers.get("x-real-ip") ||
               "unknown";
    const clientIp = ip.split(",")[0].trim();

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait before submitting again." },
        { status: 429 }
      );
    }

    // Parse and validate
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data provided.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Spam detection
    const spamResult = detectSpam(data);
    if (spamResult.isSpam) {
      // Still save but mark as spam (silently accept so bots don't know)
      await db.lead.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          budget: data.budget,
          timeline: data.timeline,
          nationality: data.nationality,
          propertyInterest: data.propertyInterest,
          formType: data.formType,
          message: data.message,
          pageUrl: data.pageUrl,
          isSpam: true,
          isQualified: false,
          leadScore: 0,
          source: "website",
        },
      });
      // Return success to not alert bots
      return NextResponse.json({ success: true, message: "Thank you for your submission." });
    }

    // Check for duplicate (same email + phone within last 24h)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existing = await db.lead.findFirst({
      where: {
        email: data.email,
        phone: data.phone,
        createdAt: { gte: oneDayAgo },
        isSpam: false,
      },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "We already have your details. Our team will contact you soon!",
      });
    }

    // Calculate lead score
    const leadScore = calculateLeadScore(data);
    const isQualified = leadScore >= 40; // 40+ score = qualified lead

    // Save lead
    const lead = await db.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        budget: data.budget,
        timeline: data.timeline,
        nationality: data.nationality,
        propertyInterest: data.propertyInterest,
        formType: data.formType,
        message: data.message,
        pageUrl: data.pageUrl,
        isSpam: false,
        isQualified,
        leadScore,
        source: "website",
      },
    });

    console.log(`[LEAD] New ${isQualified ? "QUALIFIED" : "UNQUALIFIED"} lead: ${data.name} | Score: ${leadScore} | Type: ${data.formType} | Interest: ${data.propertyInterest}`);

    // Push to Google Sheets (non-blocking)
    pushToGoogleSheet({
      name: data.name,
      email: data.email,
      phone: data.phone,
      budget: data.budget,
      timeline: data.timeline,
      nationality: data.nationality,
      propertyInterest: data.propertyInterest,
      formType: data.formType,
      message: data.message,
      pageUrl: data.pageUrl,
      leadScore,
      isQualified,
      source: "website",
    });

    return NextResponse.json({
      success: true,
      qualified: isQualified,
      message: isQualified
        ? "Thank you! Our senior property consultant will contact you within 2 hours with exclusive options."
        : "Thank you for your interest. Our team will be in touch within 24 hours.",
      leadId: lead.id,
    });

  } catch (error) {
    console.error("[LEAD API ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// ====== GET - Admin endpoint to view leads ======
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const adminKey = process.env.ADMIN_API_KEY;

  // Simple auth check
  if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await db.lead.findMany({
      where: { isSpam: false },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    const stats = {
      total: await db.lead.count({ where: { isSpam: false } }),
      qualified: await db.lead.count({ where: { isSpam: false, isQualified: true } }),
      today: await db.lead.count({
        where: {
          isSpam: false,
          createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
        },
      }),
      spam: await db.lead.count({ where: { isSpam: true } }),
    };

    return NextResponse.json({ leads, stats });
  } catch (error) {
    console.error("[LEAD API ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}
