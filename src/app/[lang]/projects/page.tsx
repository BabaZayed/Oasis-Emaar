import { type Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { langStaticParams, parseLang } from "@/lib/lang-utils";
import { SITE_URL } from "@/lib/site-config";
import ProjectsSection from "@/components/projects-section";
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
    title: dict.projects.title,
    description: dict.projects.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${l}/projects`,
      languages: {
        en: `${SITE_URL}/projects`,
        ar: `${SITE_URL}/ar/projects`,
        zh: `${SITE_URL}/zh/projects`,
        ru: `${SITE_URL}/ru/projects`,
        fr: `${SITE_URL}/fr/projects`,
        de: `${SITE_URL}/de/projects`,
        "x-default": `${SITE_URL}/projects`,
      },
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = parseLang(lang);
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <ProjectsSection lang={l} />
      <SiteFooter />
    </main>
  );
}
