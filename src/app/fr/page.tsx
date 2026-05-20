import type { Metadata } from "next";
import FrPageClient from "./fr-page-client";

export const metadata: Metadata = {
  title: "L'Oasis by Emaar | Agent Autorisé — Villas de Luxe en Bord de Mer à Dubaï",
  description:
    "Découvrez L'Oasis by Emaar avec un agent autorisé. Communauté premium en bord de mer à Dubaï avec villas de luxe, mansions et résidences de marque. À partir de 9,18M AED.",
  keywords: [
    "villas dubaï",
    "l'oasis emaar",
    "immobilier dubaï",
    "villas bord de mer dubaï",
    "investissement dubaï",
    "emaar dubaï",
    "propriété de luxe dubaï",
    "résidences de marque dubaï",
    "achat villa dubaï",
    "communauté bord de mer dubaï",
    "lagon cristal dubaï",
    "off-plan dubaï",
    "visa doré dubaï",
    "emaar the oasis",
    "villas de luxe émirats",
  ],
  openGraph: {
    title: "L'Oasis by Emaar | Agent Autorisé — Villas de Luxe en Bord de Mer à Dubaï",
    description:
      "Découvrez L'Oasis by Emaar avec un agent autorisé. Communauté premium en bord de mer à Dubaï avec villas de luxe, mansions et résidences de marque. À partir de 9,18M AED.",
    url: "https://oasisemaar.com/fr/",
    siteName: "Oasis Emaar — Agent Autorisé",
    type: "website",
    locale: "fr_AE",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "L'Oasis by Emaar — Villas de Luxe en Bord de Mer à Dubaï",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "L'Oasis by Emaar | Agent Autorisé — Villas de Luxe en Bord de Mer à Dubaï",
    description:
      "Découvrez L'Oasis by Emaar avec un agent autorisé. Communauté premium en bord de mer à Dubaï. À partir de 9,18M AED.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://oasisemaar.com/fr/",
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

// JSON-LD: RealEstateAgent (French)
const realEstateAgentJsonLd = {
  "@context": "https://schema.org",
  "@type": ["RealEstateAgent", "LocalBusiness"],
  name: "Oasis Emaar — Agent de Vente Autorisé",
  description:
    "Agent de vente autorisé pour L'Oasis by Emaar Properties à Dubaï. Villas de luxe en bord de mer, mansions et résidences de marque à partir de 9,18M AED.",
  url: "https://oasisemaar.com/fr/",
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

// JSON-LD: FAQPage (French)
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Puis-je acheter une propriété à Dubaï en tant que résident français ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, les résidents français peuvent acheter des propriétés à Dubaï dans des zones freehold. The Oasis by Emaar est situé dans une zone freehold, ce qui signifie que vous pouvez être propriétaire à 100 % sans avoir besoin de résidence locale. Le processus est simple et nous vous guidons à chaque étape.",
      },
    },
    {
      "@type": "Question",
      name: "Quels sont les plans de paiement disponibles pour The Oasis ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Oasis propose des plans de paiement flexibles, notamment le plan 80/20 (80 % pendant la construction, 20 % à la livraison) et le plan 90/10 pour certains clusters. Ces plans facilitent l'investissement avec des paiements échelonnés.",
      },
    },
    {
      "@type": "Question",
      name: "Qu'est-ce que le Golden Visa des Émirats et comment l'obtenir ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le Golden Visa des Émirats est un visa de résidence de 10 ans accordé aux investisseurs immobiliers dont la propriété atteint au moins 2 millions AED. Toutes les propriétés de The Oasis qualifient pour le Golden Visa, vous permettant de résider aux Émirats avec votre famille.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la différence entre les résidences de marque et les villas classiques ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les résidences de marque comme Address Villas Tierra et Palace Villas Ostra sont gérées par des hôtels de luxe (Address Hotels & Resorts et Palace Hotels). Elles incluent des services hôteliers complets : conciergerie, ménage, room service, et des finitions intérieures signées par la marque. Les villas classiques offrent un cadre de vie autonome avec des équipements premium mais sans les services hôteliers.",
      },
    },
    {
      "@type": "Question",
      name: "Quand les propriétés de The Oasis seront-elles livrées ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les dates de livraison varient selon le cluster. Palmiera 3 est prévu pour Q4 2028, Palmiera et Lavita pour Q1 2029, Mirage pour Q4 2029, et les clusters Mareva pour 2031. Nous pouvons vous fournir les dates exactes pour chaque cluster lors de votre consultation.",
      },
    },
    {
      "@type": "Question",
      name: "Comment puis-je vérifier la disponibilité des propriétés ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En tant qu'agent autorisé, nous avons accès à l'inventaire en temps réel de Emaar. Vous pouvez vérifier la disponibilité directement sur notre site ou nous contacter via WhatsApp pour obtenir les dernières mises à jour sur les unités disponibles, les prix et les plans d'étage.",
      },
    },
  ],
};

// JSON-LD: BreadcrumbList (French)
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://oasisemaar.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Page en Français",
      item: "https://oasisemaar.com/fr/",
    },
  ],
};

// JSON-LD: WebPage (French)
const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "L'Oasis by Emaar | Agent Autorisé — Villas de Luxe en Bord de Mer à Dubaï",
  description:
    "Découvrez L'Oasis by Emaar avec un agent autorisé. Communauté premium en bord de mer à Dubaï avec villas de luxe, mansions et résidences de marque. À partir de 9,18M AED.",
  url: "https://oasisemaar.com/fr/",
  inLanguage: "fr",
  author: {
    "@type": "Organization",
    name: "Oasis Emaar",
  },
  publisher: {
    "@type": "Organization",
    name: "Oasis Emaar — Agent Autorisé",
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

export default function FrPage() {
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
      <FrPageClient />
    </>
  );
}
