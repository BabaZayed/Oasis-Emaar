import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) return false;
  record.count++;
  return true;
}

// Validation schema
const sellerListingSchema = z.object({
  propertyType: z.enum(["villa", "mansion", "townhouse", "apartment", "penthouse", "branded-villa"]),
  villaNumber: z.string().min(1).max(50),
  cluster: z.string().min(1).max(100),
  bedrooms: z.number().int().min(1).max(20),
  areaSqft: z.number().int().min(100),
  price: z.number().int().min(100000),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  whatsapp: z.string().max(20).optional(),
  description: z.string().max(2000).optional(),
  honeypot: z.string().max(0).optional(),
});

// POST - Create a new seller listing
export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const clientIp = ip.split(",")[0].trim();
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    const body = await request.json();
    if (body.honeypot) return NextResponse.json({ success: true }); // Bot trap

    const parsed = sellerListingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data.", details: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const listing = await db.sellerListing.create({
      data: {
        propertyType: data.propertyType,
        villaNumber: data.villaNumber,
        cluster: data.cluster,
        bedrooms: data.bedrooms,
        areaSqft: data.areaSqft,
        price: data.price,
        name: data.name,
        email: data.email,
        phone: data.phone,
        whatsapp: data.whatsapp,
        description: data.description,
      },
    });

    return NextResponse.json({ success: true, listingId: listing.id });
  } catch (error) {
    console.error("[MARKETPLACE API ERROR]", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

// GET - Fetch active listings (for buyer browsing)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyType = searchParams.get("propertyType");
    const cluster = searchParams.get("cluster");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const bedrooms = searchParams.get("bedrooms");
    const sort = searchParams.get("sort") || "newest";

    const where: Record<string, unknown> = { isActive: true, isVerified: true };

    if (propertyType && propertyType !== "all") where.propertyType = propertyType;
    if (cluster && cluster !== "all") where.cluster = cluster;
    if (minPrice) where.price = { ...where.price as object, gte: parseInt(minPrice) };
    if (maxPrice) where.price = { ...where.price as object, lte: parseInt(maxPrice) };
    if (bedrooms) where.bedrooms = parseInt(bedrooms);

    const orderBy: Record<string, string> = sort === "price-asc" ? { price: "asc" } :
                          sort === "price-desc" ? { price: "desc" } :
                          { createdAt: "desc" };

    const listings = await db.sellerListing.findMany({
      where,
      orderBy,
      take: 50,
    });

    return NextResponse.json({ listings, total: listings.length });
  } catch (error) {
    console.error("[MARKETPLACE API ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
  }
}
