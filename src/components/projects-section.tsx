"use client";

import { projects, formatPrice, type Project } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Maximize, MapPin, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

function ProjectCard({ project, onViewDetails }: { project: Project; onViewDetails: (p: Project) => void }) {
  const statusColor =
    project.status === "Ready" ? "bg-green-500" :
    project.status === "Off-Plan" ? "bg-[#C8A45C]" :
    "bg-orange-500";

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      {/* Image */}
      <div className={`relative h-56 sm:h-64 bg-gradient-to-br ${project.imageGradient} overflow-hidden`}>
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
        <h3 className="text-xl font-bold text-[#1A2332] mb-3">{project.name}</h3>
        
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
            <p className="text-xs text-gray-400 uppercase tracking-wider">Starting from</p>
            <p className="text-xl font-bold text-[#C8A45C]">{formatPrice(project.startingPrice)}</p>
          </div>
          <Button
            onClick={() => onViewDetails(project)}
            className="bg-[#1A2332] text-white hover:bg-[#2A3A52] text-sm rounded-md"
          >
            Details <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectDetailModal({ project, open, onClose }: { project: Project | null; open: boolean; onClose: () => void }) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1A2332]">{project.name}</DialogTitle>
        </DialogHeader>

        <div className={`h-48 sm:h-64 rounded-lg bg-gradient-to-br ${project.imageGradient} mb-6 flex items-end p-6`}>
          <div>
            <Badge className={`${project.status === "Ready" ? "bg-green-500" : project.status === "Off-Plan" ? "bg-[#C8A45C]" : "bg-orange-500"} text-white`}>
              {project.status}
            </Badge>
            <p className="text-white text-lg font-medium mt-2">{project.tagline}</p>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed mb-6">{project.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Bedrooms</p>
            <p className="text-lg font-bold text-[#1A2332]">{project.bedrooms}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Area</p>
            <p className="text-lg font-bold text-[#1A2332]">{project.areaRange}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Starting Price</p>
            <p className="text-lg font-bold text-[#C8A45C]">{formatPrice(project.startingPrice)}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Handover</p>
            <p className="text-lg font-bold text-[#1A2332]">{project.handover}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Payment Plan</p>
            <p className="text-lg font-bold text-[#1A2332]">{project.paymentPlan}</p>
          </div>
          {project.plotArea && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider">Plot Area</p>
              <p className="text-lg font-bold text-[#1A2332]">{project.plotArea}</p>
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold text-[#1A2332] mb-3">Features</h4>
            <ul className="space-y-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C8A45C]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#1A2332] mb-3">Amenities</h4>
            <ul className="space-y-2">
              {project.amenities.map((a) => (
                <li key={a} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1A2332]" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => {
              onClose();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex-1 gold-gradient text-[#1A2332] font-semibold py-3 rounded-md"
          >
            Register Your Interest
          </Button>
          <Button
            onClick={() => {
              onClose();
              document.querySelector("#inventory")?.scrollIntoView({ behavior: "smooth" });
            }}
            variant="outline"
            className="flex-1 border-[#C8A45C] text-[#C8A45C] py-3 rounded-md"
          >
            View Available Units
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            9 Exclusive Clusters
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
            Discover The Oasis Collection
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Nine distinctive clusters, each offering a unique perspective on luxury waterfront living in Dubai
          </p>
          <div className="section-divider max-w-xs mx-auto mt-6" />
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
