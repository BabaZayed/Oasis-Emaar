import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";
import AboutSection from "@/components/about-section";
import WebPageSchema from "@/components/web-page-schema";

export const metadata: Metadata = {
  title: "About - The Oasis by Emaar",
  description:
    "Learn about The Oasis by Emaar Properties — one of Dubai's most ambitious waterfront communities spanning 9.4 million sqm with over 7,000 residences, crystal lagoons, and world-class amenities by the trusted developer.",
  keywords: [
    "About Oasis Emaar",
    "Emaar Properties Dubai",
    "Dubai waterfront community",
    "Emaar developer history",
    "trusted real estate developer",
    "Dubai master-planned community",
    "Oasis community overview",
    "Emaar Properties about",
  ],
  openGraph: {
    title: "About | The Oasis by Emaar",
    description:
      "Learn about The Oasis by Emaar Properties — a 9.4 million sqm waterfront community with over 7,000 residences by Dubai's most trusted developer.",
    url: `${SITE_URL}/about`,
    siteName: "Oasis Emaar",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "About The Oasis by Emaar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | The Oasis by Emaar",
    description:
      "The Oasis by Emaar — a 9.4 million sqm waterfront community with over 7,000 residences by Dubai's most trusted developer.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
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
      name: "About",
      item: `${SITE_URL}/about`,
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <WebPageSchema
        name="About — The Oasis by Emaar"
        description="Learn about The Oasis by Emaar Properties — a 9.4 million sqm waterfront community with over 7,000 residences by Dubai's most trusted developer."
        url={`${SITE_URL}/about`}
        breadcrumbItems={[
          { name: "Home", url: `${SITE_URL}` },
          { name: "About", url: `${SITE_URL}/about` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AboutSection />
    </>
  );
}
