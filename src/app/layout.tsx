import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
  name: "The Oasis by Emaar — Available Properties (Authorised Agent)",
  numberOfItems: 9,
  itemListElement: [
    { "@type": "ListItem", position: 1, item: { "@type": "RealEstateListing", name: "Adress Villas Tierra", description: "4-6 bedroom Address-branded villas from AED 13.16M", url: "https://oasisemaar.com/projects/adress-villas-tierra" } },
    { "@type": "ListItem", position: 2, item: { "@type": "RealEstateListing", name: "Lavita", description: "6-7 bedroom ultra-luxury waterfront mansions from AED 37M", url: "https://oasisemaar.com/projects/lavita" } },
    { "@type": "ListItem", position: 3, item: { "@type": "RealEstateListing", name: "Mareva", description: "4-6 bedroom waterfront villas from AED 13.47M", url: "https://oasisemaar.com/projects/mareva-1" } },
    { "@type": "ListItem", position: 4, item: { "@type": "RealEstateListing", name: "Mareva 2", description: "4-6 bedroom next-phase villas from AED 13.83M", url: "https://oasisemaar.com/projects/mareva-2" } },
    { "@type": "ListItem", position: 5, item: { "@type": "RealEstateListing", name: "Mirage", description: "5-6 bedroom premium villas from AED 15.8M", url: "https://oasisemaar.com/projects/mirage" } },
    { "@type": "ListItem", position: 6, item: { "@type": "RealEstateListing", name: "Palace Villas Ostra", description: "4-6 bedroom Palace-branded villas from AED 13.9M", url: "https://oasisemaar.com/projects/palace-villas-ostra" } },
    { "@type": "ListItem", position: 7, item: { "@type": "RealEstateListing", name: "Palmeira Collective", description: "Only 38 bespoke 4-bedroom villas from AED 11M", url: "https://oasisemaar.com/projects/palmeira-collective" } },
    { "@type": "ListItem", position: 8, item: { "@type": "RealEstateListing", name: "Palmiera", description: "4-bedroom contemporary villas from AED 10.5M", url: "https://oasisemaar.com/projects/palmiera" } },
    { "@type": "ListItem", position: 9, item: { "@type": "RealEstateListing", name: "Palmiera 3", description: "4-bedroom villas from AED 9.18M — earliest handover Q4 2028", url: "https://oasisemaar.com/projects/palmiera-3" } },
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
        className={`${cormorant.variable} ${inter.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: "var(--font-body), sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
