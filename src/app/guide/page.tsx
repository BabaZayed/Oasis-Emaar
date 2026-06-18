import type { Metadata } from "next";
import { SITE_URL, SITE_PHONE } from "@/lib/site-config";
import GuidePageClient from "./guide-page-client";

export const metadata: Metadata = {
  title: "2026 Dubai Luxury Real Estate Wealth & Tax Relocation Guide | The Oasis by Emaar",
  description:
    "Download the definitive 2026 guide for HNWIs relocating capital from Europe and UK to Dubai. Tax-free ownership, Golden Visa, The Oasis by Emaar, Grand Polo pricing, and wealth migration strategy.",
  keywords: [
    "Dubai wealth relocation guide",
    "UK to Dubai property investment",
    "Dubai tax free property",
    "Golden Visa Dubai guide",
    "The Oasis by Emaar investment",
    "Grand Polo Club pricing",
    "HNWI Dubai relocation",
    "Europe to Dubai capital migration",
    "Dubai luxury real estate 2026",
  ],
  openGraph: {
    title: "2026 Dubai Luxury Real Estate Wealth & Tax Relocation Guide",
    description:
      "Download the definitive guide for HNWIs relocating from Europe/UK to Dubai. Tax-free ownership, Golden Visa, pricing, and strategy.",
    url: `${SITE_URL}/guide`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
};

export default function GuidePage() {
  return <GuidePageClient />;
}
