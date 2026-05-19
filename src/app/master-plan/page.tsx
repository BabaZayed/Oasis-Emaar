import type { Metadata } from "next";
import MasterPlanPageClient from "./master-plan-page-client";
import WebPageSchema from "@/components/web-page-schema";

export const metadata: Metadata = {
  title: "Master Plan - The Oasis by Emaar Community Layout",
  description:
    "Explore the master plan of The Oasis by Emaar — a 9.4 million sqm waterfront community featuring 9 clusters of luxury villas, mansions, and branded residences in Dubailand, Dubai.",
  keywords: [
    "Oasis Emaar master plan",
    "The Oasis community layout",
    "Emaar Dubailand master plan",
    "Oasis clusters map",
    "Dubai waterfront community plan",
    "Emaar Oasis site plan",
  ],
  openGraph: {
    title: "Master Plan | The Oasis by Emaar",
    description:
      "Explore the master plan of The Oasis by Emaar — a 9.4 million sqm waterfront community in Dubai.",
    url: "https://oasisemaar.com/master-plan",
    siteName: "Oasis Emaar",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "The Oasis by Emaar Master Plan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Master Plan | The Oasis by Emaar",
    description:
      "Explore the master plan of The Oasis by Emaar — a 9.4 million sqm waterfront community in Dubai.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://oasisemaar.com/master-plan",
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
      name: "Master Plan",
      item: "https://oasisemaar.com/master-plan",
    },
  ],
};

export default function MasterPlanPage() {
  return (
    <>
      <WebPageSchema
        name="Master Plan — The Oasis by Emaar"
        description="Explore the master plan of The Oasis by Emaar — a 9.4 million sqm waterfront community with 9 clusters, crystal lagoons, and world-class amenities."
        url="https://oasisemaar.com/master-plan"
        breadcrumbItems={[{name:"Home",url:"https://oasisemaar.com"},{name:"Master Plan",url:"https://oasisemaar.com/master-plan"}]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <MasterPlanPageClient />
    </>
  );
}
