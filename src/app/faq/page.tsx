import type { Metadata } from "next";
import AEOFAQSection from "@/components/aeo-faq-section";

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

// FAQPage JSON-LD Schema for AEO
const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  dateModified: "2026-05-19",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is The Oasis by Emaar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Oasis by Emaar is a premium waterfront community in Dubai spanning 9.4 million sqm with over 7,000 residential units including villas, mansions, and branded residences, centred around crystal-clear lagoons, 20 minutes from Downtown Dubai.",
      },
    },
    {
      "@type": "Question",
      name: "How much do villas cost at The Oasis Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Villa prices at The Oasis start from AED 9.18M for Palmiera 3 four-bedroom villas and go up to AED 50M+ for Lavita ultra-luxury mansions. Mid-range options include Palmiera from AED 10.5M and Mirage from AED 15.8M.",
      },
    },
    {
      "@type": "Question",
      name: "What is the payment plan for The Oasis by Emaar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most clusters offer an 80/20 plan: 10% on booking, 70% during construction, 20% on handover. The Mirage cluster offers a 90/10 plan with just 10% on handover.",
      },
    },
    {
      "@type": "Question",
      name: "When will The Oasis by Emaar be completed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Palmiera 3 has the earliest handover (Q4 2028). Most clusters deliver in 2029. Mareva clusters are expected in Q1-Q2 2031.",
      },
    },
    {
      "@type": "Question",
      name: "Who is the authorized agent for The Oasis by Emaar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oasis Emaar is an authorized sales agent — an independent licensed brokerage. Contact: +971 52 691 9169 or sales@oasisemaar.com.",
      },
    },
    {
      "@type": "Question",
      name: "What types of properties are available at The Oasis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "4 to 7 bedroom waterfront villas, ultra-luxury mansions, and branded residences (Address Hotels and Palace branded) across nine distinct clusters.",
      },
    },
    {
      "@type": "Question",
      name: "Is The Oasis by Emaar a good investment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Oasis offers 100% freehold ownership, UAE Golden Visa eligibility, Emaar's strong appreciation track record, prime Dubai location, and world-class amenities including a 3.5km crystal lagoon.",
      },
    },
    {
      "@type": "Question",
      name: "How do I buy a property at The Oasis Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Contact an authorized agent (Oasis Emaar: +971 52 691 9169), select your preferred cluster and unit, pay 10% booking amount, follow the construction-linked payment plan, then complete handover and registration.",
      },
    },
    {
      "@type": "Question",
      name: "Is The Oasis freehold for foreign buyers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, 100% freehold. Foreign nationals have full ownership rights. Properties above AED 2M qualify for the UAE Golden Visa.",
      },
    },
    {
      "@type": "Question",
      name: "What amenities does The Oasis community offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Crystal lagoons, private beaches, 25% green spaces, 1.5M sqft retail, dining, sports facilities, water sports, cycling tracks, community centres, spa & wellness, 24/7 security, and smart home technology.",
      },
    },
  ],
};

// BreadcrumbList JSON-LD Schema
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
      name: "FAQ",
      item: "https://oasisemaar.com/faq",
    },
  ],
};

// SpeakableSpecification for voice search on FAQ page
const speakableJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "FAQ — The Oasis by Emaar",
  url: "https://oasisemaar.com/faq",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: [".faq-question", ".faq-answer", "h1", "h2"],
  },
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AEOFAQSection />
    </>
  );
}
