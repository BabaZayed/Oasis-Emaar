import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oasisemaar.com"),
  title: {
    default: "The Oasis by Emaar | Authorized Agent — Ultra Luxury Waterfront Villas in Dubai",
    template: "%s | Oasis Emaar — Authorized Agent",
  },
  description:
    "Explore The Oasis by Emaar with an authorized sales agent. Premium waterfront community in Dubai featuring luxury villas, mansions, townhouses, apartments, and penthouses. Starting from AED 3.2M. Expert guidance, exclusive inventory access.",
  keywords: [
    "Oasis Emaar",
    "Dubai real estate",
    "waterfront villas Dubai",
    "Emaar Properties",
    "luxury homes Dubai",
    "Dubai villas for sale",
    "lagoon community Dubai",
    "The Oasis Dubai",
    "Emaar Oasis",
    "off-plan properties Dubai",
    "Dubai waterfront properties",
    "luxury apartments Dubai",
    "Dubai mansions for sale",
    "Emaar off-plan",
    "crystal lagoon Dubai",
    "Dubai townhouses",
    "penthouse Dubai",
    "waterfront living Dubai",
    "Dubai property investment",
    "Emaar new launch Dubai",
  ],
  authors: [{ name: "Oasis Emaar — Authorized Sales Agent", url: "https://oasisemaar.com" }],
  creator: "Oasis Emaar",
  publisher: "Oasis Emaar — Authorized Emaar Agent",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "The Oasis by Emaar | Authorized Agent — Ultra Luxury Waterfront Villas in Dubai",
    description:
      "Explore The Oasis by Emaar with an authorized sales agent. Premium waterfront villas, mansions & residences. Starting from AED 3.2M.",
    url: "https://oasisemaar.com",
    siteName: "Oasis Emaar — Authorized Agent",
    type: "website",
    locale: "en_AE",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Oasis by Emaar - Ultra Luxury Waterfront Community in Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Oasis by Emaar | Authorized Agent — Ultra Luxury Waterfront Villas in Dubai",
    description:
      "Explore The Oasis by Emaar with an authorized sales agent. Premium waterfront villas, mansions & residences. Starting from AED 3.2M.",
    images: ["/og-image.jpg"],
    creator: "@OasisEmaar",
    site: "@OasisEmaar",
  },
  alternates: {
    canonical: "https://oasisemaar.com",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "YOUR_GOOGLE_VERIFICATION_CODE",
  },
  category: "real estate",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Oasis Emaar — Authorized Sales Agent",
  description:
    "Authorized sales agent for The Oasis by Emaar Properties in Dubai. Independent real estate brokerage offering premium waterfront villas, mansions, townhouses, apartments, and penthouses.",
  url: "https://oasisemaar.com",
  logo: "https://oasisemaar.com/logo.png",
  telephone: "+971526919169",
  email: "info@oasisemaar.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Al Quoz Street 21",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  areaServed: {
    "@type": "City",
    name: "Dubai",
  },
  sameAs: [
    "https://facebook.com/oasisemaar",
    "https://instagram.com/oasisemaar",
    "https://twitter.com/OasisEmaar",
    "https://linkedin.com/company/oasisemaar",
    "https://youtube.com/@oasisemaar",
  ],
};

const propertyListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "The Oasis by Emaar — Available Properties (Authorized Agent)",
  numberOfItems: 5,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "RealEstateListing",
        name: "The Oasis Villas",
        description: "4 & 5 bedroom waterfront villas starting from AED 8.1M",
        url: "https://oasisemaar.com/projects/oasis-villas",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "RealEstateListing",
        name: "The Oasis Mansions",
        description: "5 & 6 bedroom ultra-luxury mansions starting from AED 12M",
        url: "https://oasisemaar.com/projects/oasis-mansions",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "RealEstateListing",
        name: "Oasis Creek Townhouses",
        description: "3 & 4 bedroom creek-side townhouses starting from AED 5.5M",
        url: "https://oasisemaar.com/projects/oasis-creek",
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "RealEstateListing",
        name: "Oasis Lagoon Residences",
        description: "1, 2 & 3 bedroom apartments starting from AED 3.2M",
        url: "https://oasisemaar.com/projects/oasis-lagoon",
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "RealEstateListing",
        name: "Oasis Heights Penthouses",
        description: "2, 3 & 4 bedroom penthouses starting from AED 15M",
        url: "https://oasisemaar.com/projects/oasis-heights",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />
        {/* Meta Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID || "YOUR_META_PIXEL_ID"}');
              fbq('track', 'PageView');
            `,
          }}
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(propertyListJsonLd),
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${poppins.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: "var(--font-poppins), sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
