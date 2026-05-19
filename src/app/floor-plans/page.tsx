"use client";

import { useState } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { floorPlans, projects, formatSqft, formatPrice, galleryImages } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Maximize, ExternalLink, Map, LayoutGrid, ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://oasisemaar.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Floor Plans",
      item: "https://oasisemaar.com/floor-plans",
    },
  ],
};

export default function FloorPlansPage() {
  const projectIds = [...new Set(floorPlans.map((fp) => fp.projectId))];
  const masterPlanImage = galleryImages.find((img) => img.category === "Master Plan");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 bg-[#1A2332] relative overflow-hidden">
          <div className="absolute inset-0 hero-overlay" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#C8A45C]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-56 h-56 bg-[#C8A45C]/5 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
                Residence Layouts
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
                Floor Plans
              </h1>
              <p className="font-body text-white/60 text-lg max-w-2xl mx-auto">
                Explore detailed floor plans for all residence types across the 9 clusters at The Oasis by Emaar. View layouts, specifications, and download from Google Drive.
              </p>
              <div className="section-divider max-w-xs mx-auto mt-8" />
            </div>
          </div>
        </section>

        {/* Floor Plans Content */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-8">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-[#1A2332] data-[state=active]:text-white px-4 py-2 rounded-md text-sm"
                >
                  All Clusters
                </TabsTrigger>
                {projectIds.map((pid) => {
                  const proj = projects.find((p) => p.id === pid);
                  return (
                    <TabsTrigger
                      key={pid}
                      value={pid}
                      className="data-[state=active]:bg-[#1A2332] data-[state=active]:text-white px-4 py-2 rounded-md text-sm"
                    >
                      {proj?.name}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {/* All Clusters Tab */}
              <TabsContent value="all">
                <div className="space-y-16">
                  {projectIds.map((pid) => {
                    const proj = projects.find((p) => p.id === pid);
                    const plans = floorPlans.filter((fp) => fp.projectId === pid);
                    const floorPlanDriveUrl = proj?.subfolders?.floorPlan
                      ? `https://drive.google.com/drive/folders/${proj.subfolders.floorPlan}`
                      : null;

                    if (!proj) return null;

                    return (
                      <div key={pid}>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <Badge className="bg-[#C8A45C] text-white text-xs font-semibold">
                                {proj.clusterTag}
                              </Badge>
                              <Badge className="bg-[#1A2332] text-white text-xs">
                                {proj.status}
                              </Badge>
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-[#1A2332]">{proj.name}</h3>
                            <p className="font-body text-gray-500 text-sm mt-1">{proj.tagline}</p>
                          </div>
                          <div className="flex gap-3">
                            {floorPlanDriveUrl && (
                              <a href={floorPlanDriveUrl} target="_blank" rel="noopener noreferrer">
                                <Button
                                  variant="outline"
                                  className="border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 rounded-md text-sm"
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  View Floor Plans on Google Drive
                                </Button>
                              </a>
                            )}
                            <Link href={`/projects/${proj.slug}`}>
                              <Button className="bg-[#1A2332] text-white hover:bg-[#2A3A52] rounded-md text-sm">
                                View Project <ArrowRight className="w-4 h-4 ml-1" />
                              </Button>
                            </Link>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {plans.map((plan) => (
                            <FloorPlanCard key={plan.id} plan={plan} project={proj} driveUrl={floorPlanDriveUrl} />
                          ))}
                        </div>

                        {pid !== projectIds[projectIds.length - 1] && (
                          <div className="section-divider max-w-md mx-auto mt-16" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              {/* Per-Cluster Tabs */}
              {projectIds.map((pid) => {
                const proj = projects.find((p) => p.id === pid);
                const plans = floorPlans.filter((fp) => fp.projectId === pid);
                const floorPlanDriveUrl = proj?.subfolders?.floorPlan
                  ? `https://drive.google.com/drive/folders/${proj.subfolders.floorPlan}`
                  : null;

                return (
                  <TabsContent key={pid} value={pid}>
                    {proj && (
                      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <Badge className="bg-[#C8A45C] text-white text-xs font-semibold">
                              {proj.clusterTag}
                            </Badge>
                          </div>
                          <h3 className="font-heading text-2xl font-bold text-[#1A2332]">{proj.name}</h3>
                          <p className="font-body text-gray-500 text-sm mt-1">
                            Starting from {formatPrice(proj.startingPrice)} · {proj.bedrooms} Bed · {proj.areaRange}
                          </p>
                        </div>
                        {floorPlanDriveUrl && (
                          <a href={floorPlanDriveUrl} target="_blank" rel="noopener noreferrer">
                            <Button
                              variant="outline"
                              className="border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 rounded-md text-sm"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Floor Plans on Google Drive
                            </Button>
                          </a>
                        )}
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {plans.map((plan) => (
                        <FloorPlanCard key={plan.id} plan={plan} project={proj!} driveUrl={floorPlanDriveUrl} />
                      ))}
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </section>

        {/* Master Plan CTA */}
        <section className="py-16 sm:py-20 bg-[#F5F0E8]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[4/3]">
                {masterPlanImage ? (
                  <Image
                    src={masterPlanImage.imageUrl}
                    alt={masterPlanImage.alt}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-500 to-blue-300 flex items-center justify-center">
                    <Map className="w-16 h-16 text-white/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2332]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading text-2xl font-bold text-white mb-1">The Oasis Master Plan</h3>
                  <p className="font-body text-white/70 text-sm">9.4 million sqm waterfront community by Emaar</p>
                </div>
              </div>
              <div>
                <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
                  Community Layout
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#1A2332] mt-2 mb-4">
                  Explore the Full Master Plan
                </h3>
                <p className="font-body text-gray-500 leading-relaxed mb-6">
                  View the complete community layout showing all 9 clusters, lagoons, parks, retail areas, and road networks across the 9.4 million sqm development.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <p className="font-heading text-xl font-bold text-[#C8A45C]">9</p>
                    <p className="font-body text-xs text-gray-400 uppercase tracking-wider">Clusters</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <p className="font-heading text-xl font-bold text-[#C8A45C]">7,000+</p>
                    <p className="font-body text-xs text-gray-400 uppercase tracking-wider">Residences</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <p className="font-heading text-xl font-bold text-[#C8A45C]">3.5km</p>
                    <p className="font-body text-xs text-gray-400 uppercase tracking-wider">Waterways</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <p className="font-heading text-xl font-bold text-[#C8A45C]">25%</p>
                    <p className="font-body text-xs text-gray-400 uppercase tracking-wider">Green Space</p>
                  </div>
                </div>
                <Link href="/master-plan">
                  <Button className="gold-gradient text-[#1A2332] font-bold px-6 py-3 rounded-md hover:opacity-90">
                    <Map className="w-4 h-4 mr-2" />
                    View Full Master Plan
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
      </div>
    </>
  );
}

function FloorPlanCard({
  plan,
  project,
  driveUrl,
}: {
  plan: typeof floorPlans[0];
  project: typeof projects[0];
  driveUrl: string | null;
}) {
  const hasRealImage = !!plan.imageUrl;
  
  return (
    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow group">
      <div className="relative h-72 overflow-hidden bg-[#F5F0E8]">
        {hasRealImage ? (
          <Image
            src={plan.imageUrl!}
            alt={plan.name}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
          />
        ) : project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={plan.name}
            className="w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#F5F0E8] to-[#E8E0D0]" />
        )}
        {!hasRealImage && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1A2332]/30">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center mx-auto mb-3 shadow-lg">
                <LayoutGrid className="w-6 h-6 text-[#C8A45C]" />
              </div>
              <p className="font-heading text-lg font-bold text-white drop-shadow-md">View Floor Plans</p>
              <p className="font-body text-xs text-white/70 mt-1">{plan.name}</p>
            </div>
          </div>
        )}
        {hasRealImage && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-emerald-600 text-white text-xs font-semibold">Real Floor Plan</Badge>
          </div>
        )}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
          <ExternalLink className="w-4 h-4 text-[#1A2332]" />
        </div>
      </div>
      <CardContent className="p-5">
        <h4 className="font-heading font-bold text-[#1A2332] mb-3">{plan.name}</h4>
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Bed className="w-4 h-4 text-[#C8A45C]" /> {plan.bedrooms} Bed
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="w-4 h-4 text-[#C8A45C]" /> {formatSqft(plan.areaSqft)}
          </span>
        </div>
        {plan.plotSqft && (
          <p className="text-sm text-gray-400 mb-4">Plot: {formatSqft(plan.plotSqft)}</p>
        )}
        <div className="flex gap-3">
          {driveUrl ? (
            <a href={driveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 rounded-md text-sm"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in Google Drive
              </Button>
            </a>
          ) : (
            <Button
              variant="outline"
              className="flex-1 border-[#1A2332] text-[#1A2332] hover:bg-[#1A2332] hover:text-white rounded-md text-sm"
            >
              Coming Soon
            </Button>
          )}
          <Link href={`/projects/${project.slug}`} className="flex-1">
            <Button className="w-full bg-[#1A2332] text-white hover:bg-[#2A3A52] rounded-md text-sm">
              View Project
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
