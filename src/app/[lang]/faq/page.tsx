import { type Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { langStaticParams, parseLang } from "@/lib/lang-utils";
import { SITE_URL } from "@/lib/site-config";
import AEOFAQSection from "@/components/aeo-faq-section";
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
    title: dict.faq.title,
    description: dict.faq.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${l}/faq`,
      languages: {
        en: `${SITE_URL}/faq`,
        ar: `${SITE_URL}/ar/faq`,
        zh: `${SITE_URL}/zh/faq`,
        ru: `${SITE_URL}/ru/faq`,
        fr: `${SITE_URL}/fr/faq`,
        de: `${SITE_URL}/de/faq`,
        "x-default": `${SITE_URL}/faq`,
      },
    },
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = parseLang(lang);
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <AEOFAQSection lang={l} />
      <SiteFooter />
    </main>
  );
}
