import type { Metadata } from "next";
import PaymentPlanSection from "@/components/payment-plan-section";
import WebPageSchema from "@/components/web-page-schema";

export const metadata: Metadata = {
  title: "Payment Plan - Flexible Payment Options",
  description:
    "Learn about flexible payment plans at The Oasis by Emaar. 10% on booking, 40% during construction, and 50% on handover. Post-handover payment options available for select units.",
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
      "Flexible payment plans at The Oasis by Emaar. 10% on booking, 40% during construction, 50% on handover. Post-handover options available.",
    url: "https://oasisemaar.com/payment-plan",
    siteName: "Oasis Emaar",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "The Oasis by Emaar Payment Plan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Payment Plan | The Oasis by Emaar",
    description:
      "Flexible payment plans at The Oasis by Emaar. 10% on booking, 40% during construction, 50% on handover.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://oasisemaar.com/payment-plan",
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
      name: "Payment Plans",
      item: "https://oasisemaar.com/payment-plan",
    },
  ],
};

export default function PaymentPlanPage() {
  return (
    <>
      <WebPageSchema
        name="Payment Plans — The Oasis by Emaar"
        description="Understand payment plans at The Oasis by Emaar — 80/20 and 90/10 options with milestone-linked installments."
        url="https://oasisemaar.com/payment-plan"
        breadcrumbItems={[{name:"Home",url:"https://oasisemaar.com"},{name:"Payment Plans",url:"https://oasisemaar.com/payment-plan"}]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PaymentPlanSection />
    </>
  );
}
