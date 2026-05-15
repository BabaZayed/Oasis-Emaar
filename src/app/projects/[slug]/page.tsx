import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import ProjectDetailPage from "@/components/project-detail-page";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.name} - ${project.tagline}`,
    description: project.description,
    keywords: [
      project.name,
      "Emaar Dubai",
      project.type,
      "waterfront property Dubai",
      `${project.bedrooms} bedroom ${project.type} Dubai`,
      "luxury property Dubai",
      "off-plan Dubai",
      "Dubai real estate",
      "The Oasis Dubai",
    ],
    openGraph: {
      title: `${project.name} | The Oasis by Emaar`,
      description: project.description,
      url: `https://oasisemaar.com/projects/${slug}`,
      siteName: "Oasis Emaar",
      type: "website",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: project.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | The Oasis by Emaar`,
      description: project.description,
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: `https://oasisemaar.com/projects/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPageRoute({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}
