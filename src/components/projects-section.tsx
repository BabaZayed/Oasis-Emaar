"use client";

import { projects, formatPrice, type Project } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Maximize, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function ProjectCard({ project }: { project: Project }) {
  const statusColor =
    project.status === "Ready" ? "bg-green-500" :
    project.status === "Off-Plan" ? "bg-[#C8A45C]" :
    "bg-orange-500";

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
        <Badge className={`absolute top-4 left-4 ${statusColor} text-white text-xs font-semibold`}>
          {project.status}
        </Badge>
        <Badge className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-medium border-0">
          {project.clusterTag}
        </Badge>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white/80 text-sm font-medium">{project.tagline}</p>
        </div>
      </div>

      <CardContent className="p-5 sm:p-6">
        <h3 className="font-heading text-xl font-bold text-[#1A2332] mb-3">{project.name}</h3>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Bed className="w-4 h-4 text-[#C8A45C]" />
            <span>{project.bedrooms} Bed</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Maximize className="w-4 h-4 text-[#C8A45C]" />
            <span>{project.areaRange}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <span>Handover: {project.handover}</span>
          <span>·</span>
          <span>{project.paymentPlan} Plan</span>
        </div>

        <div className="flex items-end justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="font-body text-xs text-gray-400 uppercase tracking-wider">Starting from</p>
            <p className="font-heading text-xl font-bold text-[#C8A45C]">{formatPrice(project.startingPrice)}</p>
          </div>
          <Link href={`/projects/${project.slug}`}>
            <Button className="bg-[#1A2332] text-white hover:bg-[#2A3A52] text-sm rounded-md">
              Details <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            9 Exclusive Clusters
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
            Discover The Oasis Collection
          </h2>
          <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
            Nine distinctive clusters, each offering a unique perspective on luxury waterfront living in Dubai
          </p>
          <div className="section-divider max-w-xs mx-auto mt-6" />
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
