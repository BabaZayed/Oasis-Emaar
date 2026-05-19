import { Metadata } from "next";
import FloorPlansClient from "./floor-plans-client";

export const metadata: Metadata = {
  title: "Floor Plans - The Oasis by Emaar | All Cluster Layouts",
  description:
    "Explore detailed floor plans for all 9 clusters at The Oasis by Emaar in Dubai. View layouts for 4-7 bedroom villas, mansions, and branded residences with specifications and downloadable PDFs.",
  keywords: [
    "Oasis Emaar floor plans",
    "Emaar villa layouts",
    "Dubai property floor plans",
    "Oasis by Emaar floor plans",
    "Emaar Dubai villa layouts",
    "4 bedroom villa floor plan Dubai",
    "5 bedroom villa floor plan Dubai",
    "6 bedroom villa floor plan Dubai",
    "7 bedroom mansion floor plan Dubai",
    "branded residence floor plans Dubai",
    "The Oasis cluster layouts",
    "Emaar floor plan PDF download",
  ],
  openGraph: {
    title: "Floor Plans - The Oasis by Emaar | All Cluster Layouts",
    description:
      "Explore detailed floor plans for all 9 clusters at The Oasis by Emaar in Dubai. View layouts for 4-7 bedroom villas, mansions, and branded residences with specifications and downloadable PDFs.",
    url: "https://oasisemaar.com/floor-plans",
    siteName: "The Oasis by Emaar",
    type: "website",
    images: [
      {
        url: "https://oasisemaar.com/og-floor-plans.jpg",
        width: 1200,
        height: 630,
        alt: "Floor Plans - The Oasis by Emaar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Floor Plans - The Oasis by Emaar | All Cluster Layouts",
    description:
      "Explore detailed floor plans for all 9 clusters at The Oasis by Emaar in Dubai. View layouts for 4-7 bedroom villas, mansions, and branded residences.",
    images: ["https://oasisemaar.com/og-floor-plans.jpg"],
  },
  alternates: {
    canonical: "https://oasisemaar.com/floor-plans",
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
      name: "Floor Plans",
      item: "https://oasisemaar.com/floor-plans",
    },
  ],
};

const floorPlanJsonLd = {
  "@context": "https://schema.org",
  "@type": "FloorPlan",
  name: "The Oasis by Emaar — Residence Floor Plans",
  description:
    "Detailed floor plans for all 9 clusters at The Oasis by Emaar including 4-7 bedroom villas, mansions, and branded residences.",
  url: "https://oasisemaar.com/floor-plans",
  numberOfRooms: {
    "@type": "QuantitativeValue",
    minValue: 4,
    maxValue: 7,
  },
  numberOfBathroomsTotal: {
    "@type": "QuantitativeValue",
    minValue: 4,
    maxValue: 8,
  },
};

export default function FloorPlansPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(floorPlanJsonLd) }}
      />
      <FloorPlansClient />
    </>
  );
}
