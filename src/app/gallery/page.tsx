import type { Metadata } from "next";
import GallerySection from "@/components/gallery-section";

export const metadata: Metadata = {
  title: "Gallery - Visual Tour of The Oasis",
  description:
    "Take a visual tour of The Oasis by Emaar. Browse our curated gallery of exterior renders, interior designs, community amenities, and master plan visuals for the luxury waterfront community in Dubai.",
  keywords: [
    "Oasis Emaar gallery",
    "Dubai property images",
    "Emaar Oasis photos",
    "waterfront community visuals",
    "luxury villa renders Dubai",
    "Dubai real estate gallery",
    "Oasis community images",
    "Emaar property visuals",
  ],
  openGraph: {
    title: "Gallery | The Oasis by Emaar",
    description:
      "Take a visual tour of The Oasis by Emaar. Browse exterior renders, interior designs, community amenities, and master plan visuals.",
    url: "https://oasisemaar.com/gallery",
    siteName: "Oasis Emaar",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "The Oasis by Emaar Gallery" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | The Oasis by Emaar",
    description:
      "Take a visual tour of The Oasis by Emaar — exterior renders, interior designs, and community amenities.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://oasisemaar.com/gallery",
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
      name: "Gallery",
      item: "https://oasisemaar.com/gallery",
    },
  ],
};

// ImageGallery Schema for AI image search (AEO)
const imageGalleryJsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "The Oasis by Emaar — Property Gallery",
  description: "Visual tour of The Oasis by Emaar luxury waterfront community in Dubai. Exterior renders, interior designs, community amenities, and master plan visuals.",
  url: "https://oasisemaar.com/gallery",
  image: [
    {
      "@type": "ImageObject",
      contentUrl: "https://oasisemaar.com/images/gallery-oasis-exterior.jpg",
      name: "The Oasis by Emaar — Exterior View",
      description: "Aerial view of The Oasis waterfront community showing crystal lagoons and luxury villas",
      copyrightHolder: { "@type": "Organization", name: "Emaar Properties PJSC" },
    },
    {
      "@type": "ImageObject",
      contentUrl: "https://oasisemaar.com/images/gallery-oasis-interior.jpg",
      name: "The Oasis by Emaar — Interior Design",
      description: "Luxury interior design of a waterfront villa at The Oasis by Emaar",
      copyrightHolder: { "@type": "Organization", name: "Emaar Properties PJSC" },
    },
    {
      "@type": "ImageObject",
      contentUrl: "https://oasisemaar.com/images/gallery-oasis-lagoon.jpg",
      name: "The Oasis by Emaar — Crystal Lagoon",
      description: "3.5km crystal lagoon at The Oasis by Emaar community in Dubai",
      copyrightHolder: { "@type": "Organization", name: "Emaar Properties PJSC" },
    },
    {
      "@type": "ImageObject",
      contentUrl: "https://oasisemaar.com/images/gallery-oasis-amenities.jpg",
      name: "The Oasis by Emaar — Community Amenities",
      description: "World-class amenities at The Oasis including beaches, parks, and sports facilities",
      copyrightHolder: { "@type": "Organization", name: "Emaar Properties PJSC" },
    },
  ],
};

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGalleryJsonLd) }}
      />
      <GallerySection />
    </>
  );
}
