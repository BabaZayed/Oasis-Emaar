import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";
import ProjectsSection from "@/components/projects-section";
import WebPageSchema from "@/components/web-page-schema";

export const metadata: Metadata = {
  title: "Projects - Luxury Villas, Mansions & Residences",
  description:
    "Explore all nine exclusive clusters at The Oasis by Emaar — waterfront villas, ultra-luxury mansions, and branded residences in Dubai.",
  keywords: [
    "Oasis Emaar projects",
    "Dubai villas",
    "Dubai mansions",
    "Dubai townhouses",
    "Dubai apartments",
    "Dubai penthouses",
    "waterfront villas Dubai",
    "Emaar projects Dubai",
    "luxury homes Dubai",
    "off-plan Dubai",
  ],
  openGraph: {
    title: "Projects | The Oasis by Emaar",
    description:
      "Explore all nine exclusive clusters at The Oasis by Emaar — waterfront villas, ultra-luxury mansions, and branded residences in Dubai.",
    url: `${SITE_URL}/projects`,
    siteName: "Oasis Emaar",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "The Oasis by Emaar Projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | The Oasis by Emaar",
    description:
      "Explore all nine exclusive clusters at The Oasis by Emaar — waterfront villas, ultra-luxury mansions, and branded residences in Dubai.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: `${SITE_URL}/projects`,
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
      name: "Projects",
      item: `${SITE_URL}/projects`,
    },
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <WebPageSchema
        name="All Projects — The Oasis by Emaar"
        description="Explore all 9 exclusive clusters at The Oasis by Emaar — from Palmiera 3 villas starting at AED 9.18M to Lavita mansions from AED 37M."
        url={`${SITE_URL}/projects`}
        breadcrumbItems={[{name:"Home",url:`${SITE_URL}`},{name:"Projects",url:`${SITE_URL}/projects`}]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProjectsSection />
    </>
  );
}
