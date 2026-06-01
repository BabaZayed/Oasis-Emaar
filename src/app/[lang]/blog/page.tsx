import { type Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { langStaticParams, parseLang } from "@/lib/lang-utils";
import { SITE_URL } from "@/lib/site-config";
import BlogPageClient from "@/app/blog/blog-page-client";

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
    title: dict.blog.title + " " + dict.blog.titleHighlight,
    description: dict.blog.subtitle,
    alternates: {
      canonical: `${SITE_URL}/${l}/blog`,
      languages: {
        en: `${SITE_URL}/blog`,
        ar: `${SITE_URL}/ar/blog`,
        zh: `${SITE_URL}/zh/blog`,
        ru: `${SITE_URL}/ru/blog`,
        fr: `${SITE_URL}/fr/blog`,
        de: `${SITE_URL}/de/blog`,
        "x-default": `${SITE_URL}/blog`,
      },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = parseLang(lang);
  return (
    <BlogPageClient lang={l} />
  );
}
