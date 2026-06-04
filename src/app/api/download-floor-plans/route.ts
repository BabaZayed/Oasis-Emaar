import { NextRequest, NextResponse } from "next/server";
import { floorPlans } from "@/lib/data";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  
  // If a specific ID is requested, download that single floor plan
  if (id) {
    const plan = floorPlans.find((p) => p.id === id);
    if (!plan?.imageUrl) {
      return NextResponse.json({ error: "Floor plan not found" }, { status: 404 });
    }

    try {
      const imagePath = join(process.cwd(), "public", plan.imageUrl);
      const imageBuffer = await readFile(imagePath);

      return new NextResponse(imageBuffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Content-Disposition": `attachment; filename="${plan.name.replace(/[^a-zA-Z0-9]/g, "_")}.jpg"`,
        },
      });
    } catch {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
  }

  // If no ID, return a list of downloadable floor plans
  // (Full ZIP generation requires archiver which may not be available in edge runtime,
  //  so we provide individual download links instead)
  const plansWithImages = floorPlans.filter((p) => p.imageUrl);
  
  const html = `<!DOCTYPE html>
<html>
<head><title>Floor Plans - The Oasis by Emaar</title></head>
<body style="font-family: sans-serif; max-width: 800px; margin: 40px auto; padding: 20px;">
  <h1 style="color: #1A2332;">The Oasis by Emaar — Floor Plans</h1>
  <p style="color: #666;">Download individual floor plans by clicking the links below:</p>
  <ul style="list-style: none; padding: 0;">
    ${plansWithImages.map((p) => `<li style="padding: 12px; border-bottom: 1px solid #eee;">
      <a href="/api/download-floor-plans?id=${p.id}" style="color: #C8A45C; text-decoration: none; font-weight: bold;">${p.name}</a>
      <span style="color: #999; margin-left: 8px;">${p.bedrooms}BR · ${p.areaSqft.toLocaleString()} sqft</span>
    </li>`).join("")}
  </ul>
  <p style="color: #999; margin-top: 30px; font-size: 12px;">© Oasis Emaar — Authorized Sales Agent for The Oasis by Emaar Properties PJSC</p>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
