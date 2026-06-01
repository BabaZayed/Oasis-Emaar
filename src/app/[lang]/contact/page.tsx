import { type Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { langStaticParams, parseLang } from "@/lib/lang-utils";
import { SITE_URL } from "@/lib/site-config";
import ContactSection from "@/components/contact-section";
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
    title: dict.contact.title,
    description: dict.contact.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${l}/contact`,
      languages: {
        en: `${SITE_URL}/contact`,
        ar: `${SITE_URL}/ar/contact`,
        zh: `${SITE_URL}/zh/contact`,
        ru: `${SITE_URL}/ru/contact`,
        fr: `${SITE_URL}/fr/contact`,
        de: `${SITE_URL}/de/contact`,
        "x-default": `${SITE_URL}/contact`,
      },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = parseLang(lang);
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <ContactSection lang={l} />
      <SiteFooter />
    </main>
  );
}
