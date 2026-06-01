import { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";
import SellClient from "./sell-client";
import WebPageSchema from "@/components/web-page-schema";

export const metadata: Metadata = {
  title: "Sell Your Property | The Oasis by Emaar - Free Listing",
  description:
    "List your property for sale at The Oasis by Emaar. Free marketplace listing reaching thousands of verified buyers. No hidden fees, professional verification, and featured placement available.",
  keywords: [
    "sell property Oasis Emaar",
    "list property Dubai",
    "Oasis resale marketplace",
    "sell villa Dubai",
    "Emaar property listing",
    "Oasis by Emaar sell home",
    "Dubai property resale",
    "free property listing Dubai",
    "Oasis Emaar villa for sale",
    "Dubai real estate marketplace",
  ],
  openGraph: {
    title: "Sell Your Property | The Oasis by Emaar - Free Listing",
    description:
      "List your property for sale at The Oasis by Emaar. Free marketplace listing reaching thousands of verified buyers. No hidden fees, professional verification, and featured placement available.",
    url: `${SITE_URL}/sell`,
    siteName: "The Oasis by Emaar",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-sell.jpg`,
        width: 1200,
        height: 630,
        alt: "Sell Your Property - The Oasis by Emaar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sell Your Property | The Oasis by Emaar - Free Listing",
    description:
      "List your property for sale at The Oasis by Emaar. Free marketplace listing reaching thousands of verified buyers.",
    images: [`${SITE_URL}/og-sell.jpg`],
  },
  alternates: {
    canonical: `${SITE_URL}/sell`,
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
      name: "Sell Your Property",
      item: `${SITE_URL}/sell`,
    },
  ],
};

export default function SellPage() {
  return (
    <>
      <WebPageSchema
        name="Sell Your Property — The Oasis by Emaar"
        description="List your Oasis property for sale. Free listing with professional verification and featured placement."
        url={`${SITE_URL}/sell`}
        breadcrumbItems={[{name:"Home",url:`${SITE_URL}`},{name:"Sell Property",url:`${SITE_URL}/sell`}]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SellClient />
    </>
  );
}
