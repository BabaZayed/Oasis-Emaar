import type { Metadata } from "next";
import ContactSection from "@/components/contact-section";
import WebPageSchema from "@/components/web-page-schema";

export const metadata: Metadata = {
  title: "Contact - Get in Touch",
  description:
    "Contact The Oasis by Emaar sales team. Schedule a viewing, register your interest, or get answers to your questions about luxury waterfront properties in Dubai. Call, email, or WhatsApp us today.",
  keywords: [
    "Contact Oasis Emaar",
    "Emaar sales team Dubai",
    "schedule viewing Dubai property",
    "register interest Oasis",
    "Dubai property consultant",
    "Emaar contact information",
    "WhatsApp Oasis Emaar",
    "Dubai real estate inquiry",
  ],
  openGraph: {
    title: "Contact | The Oasis by Emaar",
    description:
      "Contact The Oasis by Emaar sales team. Schedule a viewing or register your interest in luxury waterfront properties in Dubai.",
    url: "https://oasisemaar.com/contact",
    siteName: "Oasis Emaar",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contact The Oasis by Emaar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | The Oasis by Emaar",
    description:
      "Contact The Oasis by Emaar sales team. Schedule a viewing or register your interest.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://oasisemaar.com/contact",
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
      name: "Contact",
      item: "https://oasisemaar.com/contact",
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <WebPageSchema
        name="Contact Us — The Oasis by Emaar"
        description="Contact Oasis Emaar, authorized sales agent for The Oasis by Emaar Properties. Call +971 52 691 9169, email sales@oasisemaar.com, or visit our Dubai office."
        url="https://oasisemaar.com/contact"
        breadcrumbItems={[{name:"Home",url:"https://oasisemaar.com"},{name:"Contact",url:"https://oasisemaar.com/contact"}]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ContactSection />
    </>
  );
}
