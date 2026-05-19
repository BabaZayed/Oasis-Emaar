import type { Metadata } from "next";
import LinkToUsClient from "./link-to-us-client";

export const metadata: Metadata = {
  title: "Link to Oasis Emaar | Embed Widgets & Badges",
  description:
    "Add Oasis Emaar widgets, badges, and links to your website. Copy-paste HTML snippets for real estate directories, blogs, and partner sites.",
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
