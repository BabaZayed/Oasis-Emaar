import { NextRequest, NextResponse } from "next/server";
import { floorPlans, projects } from "@/lib/data";
import { SITE_PHONE, SITE_URL } from "@/lib/site-config";
import { createCanvas, loadImage, registerFont } from "canvas";
import path from "path";
import fs from "fs";

// Register fonts for watermark
const FONT_DIR = "/usr/share/fonts/truetype/dejavu";
if (fs.existsSync(path.join(FONT_DIR, "DejaVuSans-Bold.ttf"))) {
  registerFont(path.join(FONT_DIR, "DejaVuSans-Bold.ttf"), { family: "DejaVu Sans", weight: "bold" });
}

const WATERMARK_PHONE = SITE_PHONE; // +971526919169
const WATERMARK_WEBSITE = SITE_URL.replace("https://", ""); // www.oasisemaar.com

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const floorPlanId = searchParams.get("id");

  if (!floorPlanId) {
    return NextResponse.json({ error: "Missing floor plan ID" }, { status: 400 });
  }

  const plan = floorPlans.find((fp) => fp.id === floorPlanId);
  if (!plan || !plan.imageUrl) {
    return NextResponse.json({ error: "Floor plan not found or no image available" }, { status: 404 });
  }

  const project = projects.find((p) => p.id === plan.projectId);
  const projectName = project?.name || plan.projectId;

  try {
    // Load the floor plan image from the public directory
    const imagePath = path.join(process.cwd(), "public", plan.imageUrl);

    if (!fs.existsSync(imagePath)) {
      return NextResponse.json({ error: "Image file not found on disk" }, { status: 404 });
    }

    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");

    // Draw the original floor plan image
    ctx.drawImage(image, 0, 0);

    // Apply watermark overlay
    const watermarkText1 = WATERMARK_PHONE;
    const watermarkText2 = WATERMARK_WEBSITE;
    const fontSize = Math.max(24, Math.floor(image.width / 40));

    // Semi-transparent watermark bar at bottom
    const barHeight = fontSize * 3.5;
    ctx.fillStyle = "rgba(26, 35, 50, 0.75)";
    ctx.fillRect(0, image.height - barHeight, image.width, barHeight);

    // Gold accent line
    ctx.fillStyle = "rgba(200, 164, 92, 0.9)";
    ctx.fillRect(0, image.height - barHeight, image.width, 3);

    // Watermark text - phone
    ctx.font = `bold ${fontSize}px "DejaVu Sans", sans-serif`;
    ctx.fillStyle = "rgba(200, 164, 92, 0.95)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(watermarkText1, image.width / 2, image.height - barHeight / 2 - fontSize * 0.4);

    // Watermark text - website
    ctx.font = `${Math.floor(fontSize * 0.8)}px "DejaVu Sans", sans-serif`;
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fillText(watermarkText2, image.width / 2, image.height - barHeight / 2 + fontSize * 0.6);

    // Diagonal repeating watermark across the image
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.font = `bold ${Math.floor(fontSize * 1.2)}px "DejaVu Sans", sans-serif`;
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.translate(image.width / 2, image.height / 2);
    ctx.rotate(-Math.PI / 6); // -30 degrees
    for (let y = -image.height; y < image.height; y += fontSize * 4) {
      for (let x = -image.width; x < image.width; x += fontSize * 12) {
        ctx.fillText(`${WATERMARK_WEBSITE} | ${WATERMARK_PHONE}`, x, y);
      }
    }
    ctx.restore();

    // Convert to buffer
    const buffer = canvas.toBuffer("image/jpeg", { quality: 0.92 });

    // Generate safe filename
    const safeName = projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const safePlanName = plan.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const filename = `${safeName}-${safePlanName}-watermarked.jpg`;

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Floor plan watermark error:", error);
    return NextResponse.json({ error: "Failed to generate watermarked image" }, { status: 500 });
  }
}
