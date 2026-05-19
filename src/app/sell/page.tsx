import { Metadata } from "next";
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
    url: "https://oasisemaar.com/sell",
    siteName: "The Oasis by Emaar",
    type: "website",
    images: [
      {
        url: "https://oasisemaar.com/og-sell.jpg",
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
    images: ["https://oasisemaar.com/og-sell.jpg"],
  },
  alternates: {
    canonical: "https://oasisemaar.com/sell",
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
      name: "Sell Your Property",
      item: "https://oasisemaar.com/sell",
    },
  ],
};

export default function SellPage() {
  return (
    <>
      <WebPageSchema
        name="Sell Your Property — The Oasis by Emaar"
        description="List your Oasis property for sale. Free listing with professional verification and featured placement."
        url="https://oasisemaar.com/sell"
        breadcrumbItems={[{name:"Home",url:"https://oasisemaar.com"},{name:"Sell Property",url:"https://oasisemaar.com/sell"}]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SellClient />
    </>
  );
}
