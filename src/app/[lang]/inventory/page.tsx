import { type Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { langStaticParams, parseLang } from "@/lib/lang-utils";
import { SITE_URL } from "@/lib/site-config";
import InventorySection from "@/components/inventory-section";
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
    title: dict.inventory.title,
    description: dict.inventory.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${l}/inventory`,
      languages: {
        en: `${SITE_URL}/inventory`,
        ar: `${SITE_URL}/ar/inventory`,
        zh: `${SITE_URL}/zh/inventory`,
        ru: `${SITE_URL}/ru/inventory`,
        fr: `${SITE_URL}/fr/inventory`,
        de: `${SITE_URL}/de/inventory`,
        "x-default": `${SITE_URL}/inventory`,
      },
    },
  };
}

export default async function InventoryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = parseLang(lang);
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <InventorySection lang={l} />
      <SiteFooter />
    </main>
  );
}
