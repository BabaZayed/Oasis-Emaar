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
  title: "The Oasis by Emaar | Ultra Luxury Waterfront Villas in Dubai",
  description:
    "Discover The Oasis by Emaar Properties — a premium waterfront community in Dubai featuring luxury villas, mansions, townhouses, apartments, and penthouses surrounded by crystal lagoons and pristine beaches. Starting from AED 3.2M.",
  keywords: [
    "Oasis Emaar",
    "Dubai real estate",
    "waterfront villas Dubai",
    "Emaar Properties",
    "luxury homes Dubai",
    "Dubai villas for sale",
    "lagoon community Dubai",
  ],
  authors: [{ name: "Oasis Emaar" }],
  openGraph: {
    title: "The Oasis by Emaar | Ultra Luxury Waterfront Villas in Dubai",
    description:
      "Premium waterfront community featuring luxury villas, mansions & residences. Starting from AED 3.2M.",
    url: "https://oasisemaar.com",
    siteName: "Oasis Emaar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Oasis by Emaar | Ultra Luxury Waterfront Villas in Dubai",
    description:
      "Premium waterfront community featuring luxury villas, mansions & residences. Starting from AED 3.2M.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
