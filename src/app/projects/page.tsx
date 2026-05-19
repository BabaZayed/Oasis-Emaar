import type { Metadata } from "next";
import ProjectsSection from "@/components/projects-section";

export const metadata: Metadata = {
  title: "Projects - Luxury Villas, Mansions & Residences",
  description:
    "Explore all five distinctive communities at The Oasis by Emaar — waterfront villas, ultra-luxury mansions, creek-side townhouses, lagoon-front apartments, and sky-high penthouses in Dubai.",
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
      "Explore all five distinctive communities at The Oasis by Emaar — waterfront villas, ultra-luxury mansions, creek-side townhouses, lagoon-front apartments, and sky-high penthouses in Dubai.",
    url: "https://oasisemaar.com/projects",
    siteName: "Oasis Emaar",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "The Oasis by Emaar Projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | The Oasis by Emaar",
    description:
      "Explore all five distinctive communities at The Oasis by Emaar — waterfront villas, ultra-luxury mansions, creek-side townhouses, lagoon-front apartments, and sky-high penthouses in Dubai.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://oasisemaar.com/projects",
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
      name: "Projects",
      item: "https://oasisemaar.com/projects",
    },
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProjectsSection />
    </>
  );
}
