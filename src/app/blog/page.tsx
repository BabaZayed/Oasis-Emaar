import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";
import BlogPageClient from "./blog-page-client";
import WebPageSchema from "@/components/web-page-schema";

export const metadata: Metadata = {
  title: "Blog — Dubai Real Estate Insights & The Oasis by Emaar",
  description:
    "Expert insights on Dubai real estate, The Oasis by Emaar investment analysis, payment plan guides, community comparisons, and off-plan buying advice. Stay informed with our latest articles.",
  keywords: [
    "dubai real estate blog",
    "oasis emaar blog",
    "dubai property investment guide",
    "emaar oasis investment",
    "off-plan dubai guide",
    "dubai waterfront communities",
    "emaar payment plans",
    "buy property dubai",
  ],
  openGraph: {
    title: "Blog — Dubai Real Estate Insights & The Oasis by Emaar",
    description:
      "Expert insights on Dubai real estate, The Oasis by Emaar investment analysis, payment plan guides, and community comparisons.",
    url: `${SITE_URL}/blog`,
    siteName: "Oasis Emaar",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "The Oasis by Emaar Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Dubai Real Estate Insights & The Oasis by Emaar",
    description:
      "Expert insights on Dubai real estate, The Oasis by Emaar investment analysis, and community comparisons.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
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
      name: "Blog",
      item: `${SITE_URL}/blog`,
    },
  ],
};

const blogCollectionJsonLd = {
  "@context": "https://schema.org",
  "@type": ["CollectionPage", "Blog"],
  name: "The Oasis by Emaar Blog — Dubai Real Estate Insights",
  description: "Expert insights on Dubai real estate, The Oasis by Emaar investment analysis, payment plan guides, community comparisons, and off-plan buying advice.",
  url: `${SITE_URL}/blog`,
  publisher: {
    "@type": "Organization",
    name: "Oasis Emaar — Authorized Sales Agent",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
  },
  dateModified: "2026-05-19T00:00:00+04:00",
};

export default function BlogPage() {
  return (
    <>
      <WebPageSchema
        name="Blog — The Oasis by Emaar"
        description="Expert insights on The Oasis by Emaar — investment analysis, payment plans, community comparisons, and buying guides."
        url={`${SITE_URL}/blog`}
        breadcrumbItems={[{name:"Home",url:`${SITE_URL}`},{name:"Blog",url:`${SITE_URL}/blog`}]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionJsonLd) }}
      />
      <BlogPageClient />
    </>
  );
}
