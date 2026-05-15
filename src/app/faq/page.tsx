import type { Metadata } from "next";
import FAQSection from "@/components/faq-section";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions",
  description:
    "Get answers to frequently asked questions about The Oasis by Emaar. Learn about property types, payment plans, handover dates, freehold ownership, amenities, and how to schedule a viewing.",
  keywords: [
    "Oasis Emaar FAQ",
    "Dubai property FAQ",
    "Emaar Oasis questions",
    "freehold property Dubai",
    "Emaar handover date",
    "Oasis payment plan FAQ",
    "Dubai real estate questions",
    "Emaar property buying guide",
  ],
  openGraph: {
    title: "FAQ | The Oasis by Emaar",
    description:
      "Get answers to frequently asked questions about The Oasis by Emaar — property types, payment plans, handover dates, and more.",
    url: "https://oasisemaar.com/faq",
    siteName: "Oasis Emaar",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "The Oasis by Emaar FAQ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | The Oasis by Emaar",
    description:
      "Get answers to frequently asked questions about The Oasis by Emaar.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://oasisemaar.com/faq",
  },
};

export default function FAQPage() {
  return <FAQSection />;
}
