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

  // Unique GeoCoordinates per cluster (approximate positions within The Oasis)
  const clusterGeo: Record<string, { lat: number; lng: number }> = {
    "address-villas-tierra": { lat: 25.1398, lng: 55.2235 },
    "lavita": { lat: 25.1445, lng: 55.2288 },
    "mareva-1": { lat: 25.1385, lng: 55.2268 },
    "mareva-2": { lat: 25.1378, lng: 55.2278 },
    "mirage": { lat: 25.1432, lng: 55.2225 },
    "palace-villas-ostra": { lat: 25.1405, lng: 55.2242 },
    "palmeira-collective": { lat: 25.1425, lng: 55.2262 },
    "palmiera": { lat: 25.1418, lng: 55.2255 },
    "palmiera-3": { lat: 25.1402, lng: 55.2272 },
  };

  const geo = clusterGeo[slug] || { lat: 25.1412, lng: 55.2252 };

  const realEstateListingJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: project.name,
    description: project.description,
    url: `https://oasisemaar.com/projects/${slug}`,
    datePosted: project.status === "Off-Plan" ? "2024-01-01" : undefined,
    availability: project.status === "Off-Plan" ? "PreOrder" : "InStock",
    image: {
      "@type": "ImageObject",
      url: `https://oasisemaar.com${project.imageUrl}`,
      description: `${project.name} at The Oasis by Emaar — ${project.tagline}`,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "AED",
      price: project.startingPrice,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "AED",
        price: project.startingPrice,
        minPrice: project.startingPrice,
        maxPrice: project.name === "Lavita" ? 50000000 : project.startingPrice * 1.8,
        description: `Starting from AED ${(project.startingPrice / 1000000).toFixed(2)}M`,
      },
      availability: project.status === "Off-Plan" ? "https://schema.org/PreOrder" : "https://schema.org/InStock",
      seller: {
        "@type": "RealEstateAgent",
        name: "Oasis Emaar — Authorized Sales Agent",
        telephone: "+971526919169",
        email: "sales@oasisemaar.com",
      },
    },
    numberOfRooms: {
      "@type": "QuantitativeValue",
      value: parseInt(project.bedrooms),
      unitCode: "C62",
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: parseInt(project.areaRange.replace(/[^0-9]/g, "")),
      unitCode: "FTK",
      description: project.areaRange,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
      streetAddress: project.facts.location,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.lat,
      longitude: geo.lng,
    },
    amenityFeature: project.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
      value: "Available",
    })),
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
      {/* VideoObject Schema for projects with video content */}
      {project.subfolders.video && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: `${project.name} at The Oasis by Emaar — Official Video Tour`,
              description: `Watch the official video tour of ${project.name} at The Oasis by Emaar in Dubai. ${project.tagline}. Starting from AED ${(project.startingPrice / 1000000).toFixed(2)}M.`,
              thumbnailUrl: `https://oasisemaar.com${project.imageUrl}`,
              uploadDate: "2024-06-01",
              contentUrl: `https://drive.google.com/file/d/${project.subfolders.video}/view`,
              embedUrl: `https://drive.google.com/file/d/${project.subfolders.video}/preview`,
              duration: "PT5M",
              publisher: {
                "@type": "Organization",
                name: "Emaar Properties PJSC",
                logo: {
                  "@type": "ImageObject",
                  url: "https://oasisemaar.com/logo.svg",
                },
              },
            }),
          }}
        />
      )}
      <ProjectDetailPage project={project} />
    </>
  );
}
