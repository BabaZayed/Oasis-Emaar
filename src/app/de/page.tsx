import type { Metadata } from "next";
import DePageClient from "./de-page-client";

export const metadata: Metadata = {
  title: "The Oasis by Emaar | Autorisierter Agent — Luxus-Wasserfront-Villen in Dubai",
  description:
    "Entdecken Sie The Oasis by Emaar mit einem autorisierten Verkaufsagenten. Premium-Wasserfront-Gemeinschaft in Dubai mit Luxus-Villen, Anwesen und Marken-Residenzen. Ab 9,18M AED.",
  keywords: [
    "villen dubai",
    "oasis emaar",
    "immobilien dubai",
    "wasserfront villen dubai",
    "investition dubai",
    "emaar dubai",
    "luxusimmobilien dubai",
    "marken-residenzen dubai",
    "villa kaufen dubai",
    "wasserfront gemeinschaft dubai",
    "kristalllagune dubai",
    "off-plan dubai",
    "golden visa dubai",
    "emaar the oasis",
    "luxus villen vereinte emirate",
  ],
  openGraph: {
    title: "The Oasis by Emaar | Autorisierter Agent — Luxus-Wasserfront-Villen in Dubai",
    description:
      "Entdecken Sie The Oasis by Emaar mit einem autorisierten Verkaufsagenten. Premium-Wasserfront-Gemeinschaft in Dubai mit Luxus-Villen, Anwesen und Marken-Residenzen. Ab 9,18M AED.",
    url: "https://oasisemaar.com/de/",
    siteName: "Oasis Emaar — Autorisierter Agent",
    type: "website",
    locale: "de_AE",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Oasis by Emaar — Luxus-Wasserfront-Villen in Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Oasis by Emaar | Autorisierter Agent — Luxus-Wasserfront-Villen in Dubai",
    description:
      "Entdecken Sie The Oasis by Emaar mit einem autorisierten Verkaufsagenten. Premium-Wasserfront-Gemeinschaft in Dubai. Ab 9,18M AED.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://oasisemaar.com/de/",
    languages: {
      en: "https://oasisemaar.com",
      ar: "https://oasisemaar.com/ar",
      zh: "https://oasisemaar.com/zh",
      ru: "https://oasisemaar.com/ru",
      fr: "https://oasisemaar.com/fr",
      de: "https://oasisemaar.com/de",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD: RealEstateAgent (German)
const realEstateAgentJsonLd = {
  "@context": "https://schema.org",
  "@type": ["RealEstateAgent", "LocalBusiness"],
  name: "Oasis Emaar — Autorisierter Verkaufsagent",
  description:
    "Autorisierter Verkaufsagent für The Oasis by Emaar Properties in Dubai. Luxus-Wasserfront-Villen, Anwesen und Marken-Residenzen ab 9,18M AED.",
  url: "https://oasisemaar.com/de/",
  logo: "https://oasisemaar.com/logo.svg",
  telephone: "+971526919169",
  email: "sales@oasisemaar.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Al Quoz Street 21",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.1412,
    longitude: 55.2252,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "14:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "16:00",
    },
  ],
  priceRange: "AED 9.18M - AED 50M+",
  areaServed: {
    "@type": "City",
    name: "Dubai",
  },
};

// JSON-LD: FAQPage (German)
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Kann ich als deutscher Staatsbürger Immobilien in Dubai kaufen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, deutsche Staatsbürger können Immobilien in Dubai in Freehold-Zonen erwerben. The Oasis by Emaar befindet sich in einer Freehold-Zone, was bedeutet, dass Sie 100% Eigentum ohne lokale Wohnsitzanforderung erwerben können. Der Prozess ist unkompliziert und wir begleiten Sie bei jedem Schritt.",
      },
    },
    {
      "@type": "Question",
      name: "Welche Zahlungspläne sind für The Oasis verfügbar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Oasis bietet flexible Zahlungspläne, darunter den 80/20-Plan (80 % während der Bauzeit, 20 % bei Übergabe) und den 90/10-Plan für bestimmte Cluster wie Mirage. Diese Pläne erleichtern das Investment mit an Baufortschritt gebundenen Ratenzahlungen.",
      },
    },
    {
      "@type": "Question",
      name: "Was ist das Golden Visa der VAE und wie erhalte ich es?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Das Golden Visa der VAE ist ein 10-jähriges Aufenthaltsvisum für Immobilieninvestoren, deren Eigentum mindestens 2 Millionen AED erreicht. Alle Immobilien in The Oasis qualifizieren für das Golden Visa, das Ihnen und Ihrer Familie die Wohnsitznahme in den VAE ohne lokalen Sponsor ermöglicht.",
      },
    },
    {
      "@type": "Question",
      name: "Was ist der Unterschied zwischen Marken-Residenzen und klassischen Villen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Marken-Residenzen wie Address Villas Tierra und Palace Villas Ostra werden von Luxushotels (Address Hotels & Resorts und Palace Hotels) verwaltet. Sie umfassen vollständige Hotel-Services: Concierge, Reinigung, Zimmerservice und von der Marke gestaltete Innenausstattung. Klassische Villen bieten ein autonomes Wohnen mit Premium-Ausstattung, jedoch ohne Hotel-Services.",
      },
    },
    {
      "@type": "Question",
      name: "Wann werden die Immobilien in The Oasis übergeben?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Übergabetermine variieren je nach Cluster. Palmiera 3 ist für Q4 2028 geplant, Palmiera und Lavita für Q1 2029, Mirage für Q4 2029 und die Mareva-Cluster für 2031. Wir können Ihnen bei Ihrer kostenlosen Beratung die genauen Termine für jeden Cluster nennen.",
      },
    },
    {
      "@type": "Question",
      name: "Wie kann ich die Verfügbarkeit der Immobilien prüfen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Als autorisierter Agent haben wir Zugriff auf das Echtzeit-Inventar von Emaar. Sie können die Verfügbarkeit direkt auf unserer Website prüfen oder uns über WhatsApp kontaktieren, um die neuesten Updates zu verfügbaren Einheiten, Preisen und Grundrissen zu erhalten.",
      },
    },
  ],
};

// JSON-LD: BreadcrumbList (German)
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Startseite",
      item: "https://oasisemaar.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Deutsche Seite",
      item: "https://oasisemaar.com/de/",
    },
  ],
};

// JSON-LD: WebPage (German)
const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "The Oasis by Emaar | Autorisierter Agent — Luxus-Wasserfront-Villen in Dubai",
  description:
    "Entdecken Sie The Oasis by Emaar mit einem autorisierten Verkaufsagenten. Premium-Wasserfront-Gemeinschaft in Dubai mit Luxus-Villen, Anwesen und Marken-Residenzen. Ab 9,18M AED.",
  url: "https://oasisemaar.com/de/",
  inLanguage: "de",
  author: {
    "@type": "Organization",
    name: "Oasis Emaar",
  },
  publisher: {
    "@type": "Organization",
    name: "Oasis Emaar — Autorisierter Agent",
    logo: {
      "@type": "ImageObject",
      url: "https://oasisemaar.com/logo.svg",
    },
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: "https://oasisemaar.com/og-image.jpg",
  },
};

export default function DePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <DePageClient />
    </>
  );
}
