"use client";

import { useState } from "react";
import { floorPlans, projects, formatSqft, formatPrice, galleryImages } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Bed, Maximize, Download, Map, LayoutGrid, ZoomIn, Eye, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function FloorPlansSection() {
  const [selectedPlan, setSelectedPlan] = useState<typeof floorPlans[0] | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const projectIds = [...new Set(floorPlans.map((fp) => fp.projectId))];
  const masterPlanImage = galleryImages.find((img) => img.category === "Master Plan");

  const handleDownload = async (plan: typeof floorPlans[0]) => {
    if (!plan.imageUrl) return;
    setDownloadingId(plan.id);
    try {
      const response = await fetch(`/api/floorplan-download?id=${plan.id}`);
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const contentDisposition = response.headers.get("Content-Disposition");
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+?)"?$/);
        if (match) a.download = match[1];
      } else {
        a.download = `floor-plan-${plan.id}.jpg`;
      }
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <section id="floor-plans" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            Floor Plans
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
            Explore Floor Plans
          </h2>
          <p className="font-body text-gray-500 max-w-2xl mx-auto">
            Detailed layouts for each residence type. View, enlarge, and download floor plans with specifications.
          </p>
          <div className="section-divider max-w-xs mx-auto mt-6" />
        </div>

        <Tabs defaultValue="master-plan" className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-8">
            {/* Master Plan Tab */}
            <TabsTrigger
              value="master-plan"
              className="data-[state=active]:bg-[#1A2332] data-[state=active]:text-white px-4 py-2 rounded-md text-sm flex items-center gap-1.5"
            >
              <Map className="w-4 h-4" />
              Master Plan
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

          {/* Master Plan Tab Content */}
          <TabsContent value="master-plan">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Master Plan Image */}
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
                    <LayoutGrid className="w-16 h-16 text-white/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2332]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading text-2xl font-bold text-white mb-1">The Oasis Master Plan</h3>
                  <p className="font-body text-white/70 text-sm">9.4 million sqm waterfront community by Emaar</p>
                </div>
              </div>

              {/* Master Plan Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-[#1A2332] mb-3">Community-Wide Layout</h3>
                  <p className="font-body text-gray-500 leading-relaxed">
                    The Oasis by Emaar spans over 9.4 million square metres of waterfront living, featuring 9 distinct clusters
                    of villas, mansions, and branded residences. The community is centred around crystal-clear lagoons, lush green
                    parks, and a vibrant retail boulevard — all designed to create an unparalleled lifestyle destination in Dubailand.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#F5F0E8] rounded-xl p-4 text-center">
                    <p className="font-heading text-2xl font-bold text-[#C8A45C]">9</p>
                    <p className="font-body text-xs text-gray-500 uppercase tracking-wider">Clusters</p>
                  </div>
                  <div className="bg-[#F5F0E8] rounded-xl p-4 text-center">
                    <p className="font-heading text-2xl font-bold text-[#C8A45C]">7,000+</p>
                    <p className="font-body text-xs text-gray-500 uppercase tracking-wider">Residences</p>
                  </div>
                  <div className="bg-[#F5F0E8] rounded-xl p-4 text-center">
                    <p className="font-heading text-2xl font-bold text-[#C8A45C]">3.5km</p>
                    <p className="font-body text-xs text-gray-500 uppercase tracking-wider">Waterways</p>
                  </div>
                  <div className="bg-[#F5F0E8] rounded-xl p-4 text-center">
                    <p className="font-heading text-2xl font-bold text-[#C8A45C]">25%</p>
                    <p className="font-body text-xs text-gray-500 uppercase tracking-wider">Green Space</p>
                  </div>
                </div>

                <Link href="/master-plan">
                  <Button className="gold-gradient text-[#1A2332] font-bold px-6 py-3 rounded-md hover:opacity-90 w-full sm:w-auto">
                    <Map className="w-4 h-4 mr-2" />
                    View Full Master Plan
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>

          {/* Project Floor Plan Tabs */}
          {projectIds.map((pid) => {
            const proj = projects.find((p) => p.id === pid);
            const plans = floorPlans.filter((fp) => fp.projectId === pid);

            return (
              <TabsContent key={pid} value={pid}>
                {proj && (
                  <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <Badge className="bg-[#C8A45C] text-white text-xs font-semibold">{proj.clusterTag}</Badge>
                        <Badge className="bg-[#1A2332] text-white text-xs">{proj.status}</Badge>
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-[#1A2332]">{proj.name} Floor Plans</h3>
                      <p className="font-body text-gray-500 text-sm mt-1">{proj.tagline} · {proj.areaRange}</p>
                    </div>
                    <Link href={`/projects/${proj.slug}`}>
                      <Button className="bg-[#1A2332] text-white hover:bg-[#2A3A52] rounded-md text-sm">
                        View Project
                      </Button>
                    </Link>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <Card key={plan.id} className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 group">
                      {/* Floor Plan Image */}
                      <div
                        className="relative h-72 overflow-hidden bg-[#F5F0E8] cursor-pointer"
                        onClick={() => plan.imageUrl && setSelectedPlan(plan)}
                      >
                        {plan.imageUrl ? (
                          <Image
                            src={plan.imageUrl}
                            alt={plan.name}
                            fill
                            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#F5F0E8] to-[#E8E0D0] flex items-center justify-center">
                            <LayoutGrid className="w-12 h-12 text-[#C8A45C]/40" />
                          </div>
                        )}
                        {/* Hover overlay with zoom icon */}
                        {plan.imageUrl && (
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                            <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                          </div>
                        )}
                        {/* Badge */}
                        {plan.imageUrl && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-emerald-600 text-white text-xs font-semibold">Floor Plan</Badge>
                          </div>
                        )}
                      </div>

                      {/* Card Content - Unified Box */}
                      <CardContent className="p-5">
                        <h4 className="font-heading font-bold text-[#1A2332] mb-3">{plan.name}</h4>
                        <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
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
                        <div className="flex gap-2">
                          <Button
                            onClick={() => plan.imageUrl && setSelectedPlan(plan)}
                            variant="outline"
                            className="flex-1 border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 rounded-md text-sm"
                            disabled={!plan.imageUrl}
                          >
                            <Eye className="w-4 h-4 mr-1" /> View
                          </Button>
                          <Button
                            onClick={() => handleDownload(plan)}
                            className="flex-1 bg-[#1A2332] text-white hover:bg-[#2A3A52] rounded-md text-sm"
                            disabled={!plan.imageUrl || downloadingId === plan.id}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            {downloadingId === plan.id ? "Loading..." : "Download"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>

      {/* Floor Plan Lightbox / Enlarge Dialog */}
      <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-[#1A2332] border-0">
          {selectedPlan && (() => {
            const proj = projects.find((p) => p.id === selectedPlan.projectId);
            return (
              <div className="relative">
                {/* Close button */}
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Header with full specs */}
                <div className="bg-[#0F1923] px-6 py-4 border-b border-white/10">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
                    {proj?.name ?? "Cluster"} — {selectedPlan.name}
                  </h3>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
                    <span className="flex items-center gap-1.5 text-white/70">
                      <Bed className="w-4 h-4 text-[#C8A45C]" /> {selectedPlan.bedrooms} Bedroom
                    </span>
                    <span className="flex items-center gap-1.5 text-white/70">
                      <Maximize className="w-4 h-4 text-[#C8A45C]" /> Built-up: {formatSqft(selectedPlan.areaSqft)}
                    </span>
                    {selectedPlan.plotSqft && (
                      <span className="text-white/70">Plot: {formatSqft(selectedPlan.plotSqft)}</span>
                    )}
                    {selectedPlan.startingPrice && (
                      <span className="text-[#C8A45C] font-heading font-bold">
                        {formatPrice(selectedPlan.startingPrice)}
                      </span>
                    )}
                    {proj?.clusterTag && (
                      <span className="bg-[#C8A45C]/20 text-[#C8A45C] px-2 py-0.5 rounded text-xs font-semibold">
                        {proj.clusterTag}
                      </span>
                    )}
                    {proj?.handover && (
                      <span className="text-white/50">Handover: {proj.handover}</span>
                    )}
                    {proj?.paymentPlan && (
                      <span className="text-white/50">{proj.paymentPlan} Plan</span>
                    )}
                  </div>
                </div>

                {/* Floor plan image - click to view full size */}
                <div className="relative h-[55vh] sm:h-[65vh] bg-[#F5F0E8] cursor-zoom-in" onClick={() => {
                  if (selectedPlan.imageUrl) {
                    const w = window.open(selectedPlan.imageUrl, '_blank');
                    if (w) w.focus();
                  }
                }}>
                  <Image
                    src={selectedPlan.imageUrl!}
                    alt={selectedPlan.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    quality={95}
                  />
                  <div className="absolute bottom-3 right-3 bg-black/50 text-white/70 text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                    Click to view full size
                  </div>
                </div>

                {/* Footer with actions */}
                <div className="bg-[#1A2332] p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Button
                      onClick={() => handleDownload(selectedPlan)}
                      className="gold-gradient text-[#1A2332] font-bold px-6 py-3 rounded-md hover:opacity-90 flex-1"
                      disabled={downloadingId === selectedPlan.id}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {downloadingId === selectedPlan.id ? "Preparing..." : "Download Floor Plan"}
                    </Button>
                    <a
                      href={`https://wa.me/971526919169?text=${encodeURIComponent(`Hi, I'm interested in the ${selectedPlan.name} at ${proj?.name ?? 'this cluster'}. Please share more details and availability.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button className="w-full bg-green-600 text-white hover:bg-green-700 font-bold px-6 py-3 rounded-md">
                        📞 Enquire About This Unit
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </section>
  );
}
