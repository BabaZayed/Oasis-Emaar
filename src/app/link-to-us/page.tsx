import type { Metadata } from "next";
import LinkToUsClient from "./link-to-us-client";

export const metadata: Metadata = {
  title: "Link to Oasis Emaar | Embed Widgets, Badges & Partner Links",
  description:
    "Add Oasis Emaar widgets, badges, and links to your website. Copy-paste HTML snippets for real estate directories, blogs, and partner sites. Support The Oasis by Emaar community.",
  keywords: [
    "link to Oasis Emaar",
    "Oasis Emaar widgets",
    "real estate badges",
    "Emaar partner links",
    "Dubai property widgets",
    "real estate directory embed",
    "Oasis Emaar embed code",
    "partner with Oasis Emaar",
    "Dubai real estate badges",
    "property link exchange",
  ],
  openGraph: {
    title: "Link to Oasis Emaar | Embed Widgets & Badges",
    description:
      "Add Oasis Emaar widgets, badges, and links to your website. Copy-paste HTML snippets for real estate directories, blogs, and partner sites.",
    url: "https://oasisemaar.com/link-to-us",
    siteName: "Oasis Emaar",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Link to Oasis Emaar - Widgets & Badges" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Link to Oasis Emaar | Embed Widgets & Badges",
    description: "Add Oasis Emaar widgets and badges to your website.",
    images: ["/og-image.jpg"],
    creator: "@OasisEmaar",
    site: "@OasisEmaar",
  },
  alternates: { canonical: "https://oasisemaar.com/link-to-us" },
};

function BreadcrumbListSchema() {
  const schema = {
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
        name: "Link to Us",
        item: "https://oasisemaar.com/link-to-us",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function LinkToUsPage() {
  return (
    <>
      <BreadcrumbListSchema />
      <LinkToUsClient />
    </>
  );
}
