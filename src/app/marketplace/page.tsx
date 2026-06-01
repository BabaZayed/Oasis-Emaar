import { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";
import MarketplaceClient from "./marketplace-client";
import WebPageSchema from "@/components/web-page-schema";

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
    url: `${SITE_URL}/marketplace`,
    siteName: "The Oasis by Emaar",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-marketplace.jpg`,
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
    images: [`${SITE_URL}/og-marketplace.jpg`],
  },
  alternates: {
    canonical: `${SITE_URL}/marketplace`,
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
      item: `${SITE_URL}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Marketplace",
      item: `${SITE_URL}/marketplace`,
    },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "The Oasis by Emaar — Resale Marketplace",
  description:
    "Verified resale properties at The Oasis by Emaar in Dubai including villas, mansions, and branded residences.",
  url: `${SITE_URL}/marketplace`,
  numberOfItems: 0,
  itemListElement: [],
};

export default function MarketplacePage() {
  return (
    <>
      <WebPageSchema
        name="Buyer Marketplace — The Oasis by Emaar"
        description="Browse verified resale listings at The Oasis by Emaar. Find villas and mansions from current owners."
        url={`${SITE_URL}/marketplace`}
        breadcrumbItems={[{name:"Home",url:`${SITE_URL}`},{name:"Marketplace",url:`${SITE_URL}/marketplace`}]}
      />
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
