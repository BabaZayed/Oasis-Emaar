import type { Metadata } from "next";
import InventorySection from "@/components/inventory-section";
import WebPageSchema from "@/components/web-page-schema";

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
      name: "Inventory",
      item: "https://oasisemaar.com/inventory",
    },
  ],
};

// Product Collection Schema for inventory (AEO)
const productCollectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "The Oasis by Emaar — Property Inventory",
  description: "Browse available luxury villas, mansions, and branded residences at The Oasis by Emaar in Dubai. Real-time pricing and availability across 9 exclusive clusters.",
  url: "https://oasisemaar.com/inventory",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: 77,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Product",
          name: "Palmiera 3 — 4 Bedroom Villa",
          description: "4-bedroom waterfront villa at The Oasis by Emaar, starting from AED 9.18M. Earliest handover Q4 2028.",
          brand: { "@type": "Brand", name: "Emaar Properties" },
          offers: {
            "@type": "Offer",
            priceCurrency: "AED",
            price: "9180000",
            availability: "https://schema.org/InStock",
            seller: { "@type": "RealEstateAgent", name: "Oasis Emaar" },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Product",
          name: "Lavita — 6-7 Bedroom Mansion",
          description: "Ultra-luxury waterfront mansion at The Oasis by Emaar, starting from AED 37M. Handover Q1-Q2 2029.",
          brand: { "@type": "Brand", name: "Emaar Properties" },
          offers: {
            "@type": "Offer",
            priceCurrency: "AED",
            price: "37000000",
            availability: "https://schema.org/InStock",
            seller: { "@type": "RealEstateAgent", name: "Oasis Emaar" },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Product",
          name: "Address Villas Tierra — 4-6 Bedroom",
          description: "Address-branded villas at The Oasis by Emaar, starting from AED 13.16M. Handover June 2029.",
          brand: { "@type": "Brand", name: "Address Hotels & Resorts" },
          offers: {
            "@type": "Offer",
            priceCurrency: "AED",
            price: "13160000",
            availability: "https://schema.org/InStock",
            seller: { "@type": "RealEstateAgent", name: "Oasis Emaar" },
          },
        },
      },
    ],
  },
};

export default function InventoryPage() {
  return (
    <>
      <WebPageSchema
        name="Available Inventory — The Oasis by Emaar"
        description="Browse available properties at The Oasis by Emaar. 76 villas and mansions across 9 clusters starting from AED 9.18M."
        url="https://oasisemaar.com/inventory"
        breadcrumbItems={[{name:"Home",url:"https://oasisemaar.com"},{name:"Inventory",url:"https://oasisemaar.com/inventory"}]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productCollectionJsonLd) }}
      />
      <InventorySection />
    </>
  );
}
