import { Metadata } from "next";
import MarketplaceClient from "./marketplace-client";

export const metadata: Metadata = {
  title: "Resale Marketplace | The Oasis by Emaar - Verified Properties",
  description:
    "Browse verified resale properties at The Oasis by Emaar in Dubai. Villas, mansions, and branded residences listed by current owners. 100% freehold, Golden Visa eligible.",
  keywords: [
    "Oasis Emaar marketplace",
    "resale property Dubai",
    "Oasis villas for sale",
    "Emaar resale listings",
    "buy property Oasis Emaar",
    "Dubai resale marketplace",
    "Oasis by Emaar resale",
    "verified property listings Dubai",
    "Golden Visa property Dubai",
    "freehold property Dubailand",
  ],
  openGraph: {
    title: "Resale Marketplace | The Oasis by Emaar - Verified Properties",
    description:
      "Browse verified resale properties at The Oasis by Emaar in Dubai. Villas, mansions, and branded residences listed by current owners. 100% freehold, Golden Visa eligible.",
    url: "https://oasisemaar.com/marketplace",
    siteName: "The Oasis by Emaar",
    type: "website",
    images: [
      {
        url: "https://oasisemaar.com/og-marketplace.jpg",
        width: 1200,
        height: 630,
        alt: "Resale Marketplace - The Oasis by Emaar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resale Marketplace | The Oasis by Emaar - Verified Properties",
    description:
      "Browse verified resale properties at The Oasis by Emaar in Dubai. Villas, mansions, and branded residences listed by current owners.",
    images: ["https://oasisemaar.com/og-marketplace.jpg"],
  },
  alternates: {
    canonical: "https://oasisemaar.com/marketplace",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://oasisemaar.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Marketplace",
      item: "https://oasisemaar.com/marketplace",
    },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "The Oasis by Emaar — Resale Marketplace",
  description:
    "Verified resale properties at The Oasis by Emaar in Dubai including villas, mansions, and branded residences.",
  url: "https://oasisemaar.com/marketplace",
  numberOfItems: 0,
  itemListElement: [],
};

export default function MarketplacePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <MarketplaceClient />
    </>
  );
}
