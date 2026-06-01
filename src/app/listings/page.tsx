import { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";
import ListingsPageClient from "./listings-page-client";
import WebPageSchema from "@/components/web-page-schema";

export const metadata: Metadata = {
  title: "Property Listings | The Oasis by Emaar - Verified Inventory",
  description:
    "View and verify all 77 property listings at The Oasis by Emaar. Track availability status, mark verified properties, and export listings data.",
  keywords: [
    "The Oasis Emaar listings",
    "Emaar property verification",
    "The Oasis inventory",
    "Dubai property listings",
    "Emaar villa listings",
  ],
  openGraph: {
    title: "Property Listings | The Oasis by Emaar",
    description:
      "View and verify 77 luxury property listings across 9 clusters at The Oasis by Emaar, Dubai.",
    url: `${SITE_URL}/listings`,
    siteName: "Oasis Emaar",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "The Oasis by Emaar Property Listings" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Listings | The Oasis by Emaar",
    description:
      "View and verify 77 luxury property listings across 9 clusters at The Oasis by Emaar.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: `${SITE_URL}/listings`,
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
      name: "Property Listings",
      item: `${SITE_URL}/listings`,
    },
  ],
};

export default function ListingsPage() {
  return (
    <>
      <WebPageSchema
        name="Property Listings — The Oasis by Emaar"
        description="Browse all property listings at The Oasis by Emaar — available villas, mansions, and branded residences."
        url={`${SITE_URL}/listings`}
        breadcrumbItems={[{name:"Home",url:`${SITE_URL}`},{name:"Listings",url:`${SITE_URL}/listings`}]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ListingsPageClient />
    </>
  );
}
