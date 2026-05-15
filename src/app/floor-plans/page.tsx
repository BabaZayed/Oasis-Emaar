import type { Metadata } from "next";
import FloorPlansSection from "@/components/floor-plans-section";

export const metadata: Metadata = {
  title: "Floor Plans - Residence Layouts & Specifications",
  description:
    "Explore detailed floor plans for all residence types at The Oasis by Emaar. View layouts for villas, mansions, townhouses, apartments, and penthouses with area specifications and bedroom configurations.",
  keywords: [
    "Oasis Emaar floor plans",
    "Dubai villa floor plans",
    "apartment layouts Dubai",
    "mansion floor plans",
    "townhouse layouts",
    "penthouse floor plans Dubai",
    "Emaar floor plans",
    "property layouts Dubai",
  ],
  openGraph: {
    title: "Floor Plans | The Oasis by Emaar",
    description:
      "Explore detailed floor plans for all residence types at The Oasis by Emaar. View layouts for villas, mansions, townhouses, apartments, and penthouses.",
    url: "https://oasisemaar.com/floor-plans",
    siteName: "Oasis Emaar",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "The Oasis by Emaar Floor Plans" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Floor Plans | The Oasis by Emaar",
    description:
      "Explore detailed floor plans for all residence types at The Oasis by Emaar.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://oasisemaar.com/floor-plans",
  },
};

export default function FloorPlansPage() {
  return <FloorPlansSection />;
}
