import type { Metadata } from "next";
import ContactSection from "@/components/contact-section";

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

export default function ContactPage() {
  return <ContactSection />;
}
