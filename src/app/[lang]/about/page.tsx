import { type Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { langStaticParams, parseLang } from "@/lib/lang-utils";
import { SITE_URL } from "@/lib/site-config";
import AboutSection from "@/components/about-section";
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
    title: dict.about.title,
    description: dict.about.description,
    alternates: {
      canonical: `${SITE_URL}/${l}/about`,
      languages: {
        en: `${SITE_URL}/about`,
        ar: `${SITE_URL}/ar/about`,
        zh: `${SITE_URL}/zh/about`,
        ru: `${SITE_URL}/ru/about`,
        fr: `${SITE_URL}/fr/about`,
        de: `${SITE_URL}/de/about`,
        "x-default": `${SITE_URL}/about`,
      },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = parseLang(lang);
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <AboutSection lang={l} />
      <SiteFooter />
    </main>
  );
}
