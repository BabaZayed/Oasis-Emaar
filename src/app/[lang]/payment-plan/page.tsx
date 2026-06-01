import { type Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { langStaticParams, parseLang } from "@/lib/lang-utils";
import { SITE_URL } from "@/lib/site-config";
import PaymentPlanSection from "@/components/payment-plan-section";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export function generateStaticParams() {
  return langStaticParams;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l = parseLang(lang);
  const dict = await getDictionary(l);
  return {
    title: dict.paymentPlan.title,
    description: dict.paymentPlan.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${l}/payment-plan`,
      languages: {
        en: `${SITE_URL}/payment-plan`,
        ar: `${SITE_URL}/ar/payment-plan`,
        zh: `${SITE_URL}/zh/payment-plan`,
        ru: `${SITE_URL}/ru/payment-plan`,
        fr: `${SITE_URL}/fr/payment-plan`,
        de: `${SITE_URL}/de/payment-plan`,
        "x-default": `${SITE_URL}/payment-plan`,
      },
    },
  };
}

export default async function PaymentPlanPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = parseLang(lang);
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <PaymentPlanSection lang={l} />
      <SiteFooter />
    </main>
  );
}
