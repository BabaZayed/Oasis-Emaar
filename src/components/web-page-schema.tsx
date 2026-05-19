/**
 * Reusable WebPage JSON-LD Schema component
 * Add to any page to provide page-level structured data for SEO/AEO
 */
interface WebPageSchemaProps {
  name: string;
  description: string;
  url: string;
  dateModified?: string;
  breadcrumbItems?: Array<{ name: string; url: string }>;
}

export default function WebPageSchema({
  name,
  description,
  url,
  dateModified = "2026-05-19",
  breadcrumbItems,
}: WebPageSchemaProps) {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    dateModified,
    author: {
      "@type": "RealEstateAgent",
      name: "Oasis Emaar — Authorized Sales Agent",
      telephone: "+971526919169",
      email: "sales@oasisemaar.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Oasis Emaar",
      logo: {
        "@type": "ImageObject",
        url: "https://oasisemaar.com/logo.svg",
      },
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://oasisemaar.com/og-image.jpg",
      width: 1200,
      height: 630,
    },
    ...(breadcrumbItems && {
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
    />
  );
}
