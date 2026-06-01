import { type Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { langStaticParams, parseLang } from "@/lib/lang-utils";
import { SITE_URL } from "@/lib/site-config";
import GallerySection from "@/components/gallery-section";
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
    title: dict.gallery.title,
    description: dict.gallery.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${l}/gallery`,
      languages: {
        en: `${SITE_URL}/gallery`,
        ar: `${SITE_URL}/ar/gallery`,
        zh: `${SITE_URL}/zh/gallery`,
        ru: `${SITE_URL}/ru/gallery`,
        fr: `${SITE_URL}/fr/gallery`,
        de: `${SITE_URL}/de/gallery`,
        "x-default": `${SITE_URL}/gallery`,
      },
    },
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = parseLang(lang);
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <GallerySection lang={l} />
      <SiteFooter />
    </main>
  );
}
