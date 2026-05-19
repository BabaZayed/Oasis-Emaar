import { Metadata } from "next";
import AvailabilityPageClient from "./availability-page-client";
import WebPageSchema from "@/components/web-page-schema";

export const metadata: Metadata = {
  title: "Check Availability | The Oasis by Emaar - Luxury Villas & Mansions",
  description:
    "Check real-time availability of luxury villas, mansions, and branded residences at The Oasis by Emaar in Dubai. Browse 77+ properties across 9 exclusive clusters with live pricing and status updates.",
  keywords: [
    "The Oasis Emaar availability",
    "Emaar villas for sale",
    "Dubai luxury property availability",
    "The Oasis Dubai villas",
    "Emaar waterfront villas",
    "Lavita mansions",
    "Mareva villas",
    "Palmiera villas",
    "Address Villas Tierra",
    "Palace Villas Ostra",
  ],
  openGraph: {
    title: "Check Availability | The Oasis by Emaar",
    description:
      "Browse real-time availability of 77+ luxury properties across 9 clusters at The Oasis by Emaar, Dubai. Starting from AED 9.2M.",
    url: "https://oasisemaar.com/availability",
    siteName: "Oasis Emaar",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "The Oasis by Emaar Availability" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Check Availability | The Oasis by Emaar",
    description:
      "Browse real-time availability of 77+ luxury properties across 9 clusters. Starting from AED 9.2M.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://oasisemaar.com/availability",
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
      name: "Check Availability",
      item: "https://oasisemaar.com/availability",
    },
  ],
};

export default function AvailabilityPage() {
  return (
    <>
      <WebPageSchema
        name="Check Availability — The Oasis by Emaar"
        description="Check real-time availability at The Oasis by Emaar. Filter by cluster, bedrooms, and budget."
        url="https://oasisemaar.com/availability"
        breadcrumbItems={[{name:"Home",url:"https://oasisemaar.com"},{name:"Availability",url:"https://oasisemaar.com/availability"}]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AvailabilityPageClient />
    </>
  );
}
