import type { Metadata } from "next";
import InventorySection from "@/components/inventory-section";

export const metadata: Metadata = {
  title: "Inventory - Available Properties for Sale",
  description:
    "Browse available properties at The Oasis by Emaar. Villas, mansions, townhouses, apartments, and penthouses with pricing, floor plans, and availability status. Starting from AED 3.2M.",
  keywords: [
    "Oasis Emaar inventory",
    "Dubai property for sale",
    "available villas Dubai",
    "Dubai real estate listings",
    "off-plan property Dubai",
    "luxury apartments for sale",
    "Dubai waterfront property",
    "Emaar property listings",
  ],
  openGraph: {
    title: "Inventory | The Oasis by Emaar",
    description:
      "Browse available properties at The Oasis by Emaar. Villas, mansions, townhouses, apartments, and penthouses starting from AED 3.2M.",
    url: "https://oasisemaar.com/inventory",
    siteName: "Oasis Emaar",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "The Oasis by Emaar Inventory" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inventory | The Oasis by Emaar",
    description:
      "Browse available properties at The Oasis by Emaar. Starting from AED 3.2M.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://oasisemaar.com/inventory",
  },
};

export default function InventoryPage() {
  return <InventorySection />;
}
