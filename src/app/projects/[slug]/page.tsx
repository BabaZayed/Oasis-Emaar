import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import ProjectDetailPage from "@/components/project-detail-page";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.name} - ${project.tagline}`,
    description: project.description,
    keywords: [
      project.name,
      "Emaar Dubai",
      project.type,
      "waterfront property Dubai",
      `${project.bedrooms} bedroom ${project.type} Dubai`,
      "luxury property Dubai",
      "off-plan Dubai",
      "Dubai real estate",
      "The Oasis Dubai",
    ],
    openGraph: {
      title: `${project.name} | The Oasis by Emaar`,
      description: project.description,
      url: `https://oasisemaar.com/projects/${slug}`,
      siteName: "Oasis Emaar",
      type: "website",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: project.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | The Oasis by Emaar`,
      description: project.description,
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: `https://oasisemaar.com/projects/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPageRoute({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

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
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `https://oasisemaar.com/projects/${slug}`,
      },
    ],
  };

  const realEstateListingJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: project.name,
    description: project.description,
    url: `https://oasisemaar.com/projects/${slug}`,
    datePosted: project.status === "Off-Plan" ? "2024-01-01" : undefined,
    availability: project.status === "Off-Plan" ? "PreOrder" : "InStock",
    offers: {
      "@type": "Offer",
      priceCurrency: "AED",
      price: project.startingPrice,
      availability: project.status === "Off-Plan" ? "https://schema.org/PreOrder" : "https://schema.org/InStock",
      seller: {
        "@type": "RealEstateAgent",
        name: "Oasis Emaar — Authorized Sales Agent",
        telephone: "+971526919169",
      },
    },
    numberOfRooms: {
      "@type": "QuantitativeValue",
      value: parseInt(project.bedrooms),
      unitCode: "C62",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
      streetAddress: "The Oasis, Dubailand",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.1412,
      longitude: 55.2252,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateListingJsonLd) }}
      />
      <ProjectDetailPage project={project} />
    </>
  );
}
