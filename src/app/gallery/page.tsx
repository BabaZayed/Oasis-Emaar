import type { Metadata } from "next";
import GallerySection from "@/components/gallery-section";

export const metadata: Metadata = {
  title: "Gallery - Visual Tour of The Oasis",
  description:
    "Take a visual tour of The Oasis by Emaar. Browse our curated gallery of exterior renders, interior designs, community amenities, and master plan visuals for the luxury waterfront community in Dubai.",
  keywords: [
    "Oasis Emaar gallery",
    "Dubai property images",
    "Emaar Oasis photos",
    "waterfront community visuals",
    "luxury villa renders Dubai",
    "Dubai real estate gallery",
    "Oasis community images",
    "Emaar property visuals",
  ],
  openGraph: {
    title: "Gallery | The Oasis by Emaar",
    description:
      "Take a visual tour of The Oasis by Emaar. Browse exterior renders, interior designs, community amenities, and master plan visuals.",
    url: "https://oasisemaar.com/gallery",
    siteName: "Oasis Emaar",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "The Oasis by Emaar Gallery" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | The Oasis by Emaar",
    description:
      "Take a visual tour of The Oasis by Emaar — exterior renders, interior designs, and community amenities.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://oasisemaar.com/gallery",
  },
};

export default function GalleryPage() {
  return <GallerySection />;
}
