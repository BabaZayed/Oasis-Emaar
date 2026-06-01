import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";
import PaymentPlanSection from "@/components/payment-plan-section";
import WebPageSchema from "@/components/web-page-schema";

export const metadata: Metadata = {
  title: "Payment Plan - Flexible Payment Options",
  description:
    "Learn about flexible payment plans at The Oasis by Emaar. 80/20 plan: 10% on booking, 70% during construction, 20% on handover. 90/10 plan (Mirage): just 10% on handover. Post-handover options available for select units.",
  keywords: [
    "Oasis Emaar payment plan",
    "Dubai property payment plan",
    "Emaar payment structure",
    "off-plan payment plan Dubai",
    "post-handover payment Dubai",
    "flexible payment Dubai real estate",
    "Emaar installment plan",
    "Dubai property investment",
  ],
  openGraph: {
    title: "Payment Plan | The Oasis by Emaar",
    description:
      "Flexible payment plans at The Oasis by Emaar. 80/20 plan: 10% booking, 70% construction, 20% handover. 90/10 plan (Mirage): just 10% on handover.",
    url: `${SITE_URL}/payment-plan`,
    siteName: "Oasis Emaar",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "The Oasis by Emaar Payment Plan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Payment Plan | The Oasis by Emaar",
    description:
      "Flexible payment plans at The Oasis by Emaar. 80/20 plan (10% booking, 70% construction, 20% handover) and 90/10 plan.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: `${SITE_URL}/payment-plan`,
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
      item: `${SITE_URL}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Payment Plans",
      item: `${SITE_URL}/payment-plan`,
    },
  ],
};

export default function PaymentPlanPage() {
  return (
    <>
      <WebPageSchema
        name="Payment Plans — The Oasis by Emaar"
        description="Understand payment plans at The Oasis by Emaar — 80/20 and 90/10 options with milestone-linked installments."
        url={`${SITE_URL}/payment-plan`}
        breadcrumbItems={[{name:"Home",url:`${SITE_URL}`},{name:"Payment Plans",url:`${SITE_URL}/payment-plan`}]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PaymentPlanSection />
    </>
  );
}
