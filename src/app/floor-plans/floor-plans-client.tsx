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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Bed, Maximize, Map, LayoutGrid, ArrowRight, Eye, Download, ZoomIn, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useDict } from "@/lib/use-dict";

export default function FloorPlansClient({ lang }: { lang?: import("@/lib/i18n").LangCode }) {
  const t = useDict();
  const projectIds = [...new Set(floorPlans.map((fp) => fp.projectId))];
  const masterPlanImage = galleryImages.find((img) => img.category === "Master Plan");
  const [bedroomFilter, setBedroomFilter] = useState<number | null>(null);

  return (
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
                {t.floorPlans.label}
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
                {t.floorPlans.title}
              </h1>
              <p className="font-body text-white/60 text-lg max-w-2xl mx-auto">
                {t.floorPlans.subtitle}
              </p>
              <div className="section-divider max-w-xs mx-auto mt-8" />
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <a href="/api/download-floor-plans" download>
                  <Button className="gold-gradient text-[#1A2332] font-bold px-6 py-3 rounded-md hover:opacity-90">
                    <Download className="w-4 h-4 mr-2" />
                    Download All Floor Plans
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Floor Plans Content */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Bedroom Filter */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              <Button
                variant={bedroomFilter === null ? "default" : "outline"}
                size="sm"
                onClick={() => setBedroomFilter(null)}
                className={bedroomFilter === null ? "bg-[#1A2332] text-white" : "border-[#C8A45C] text-[#C8A45C]"}
              >
                All Types
              </Button>
              {[4, 5, 6, 7].map((br) => (
                <Button
                  key={br}
                  variant={bedroomFilter === br ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBedroomFilter(br)}
                  className={bedroomFilter === br ? "bg-[#1A2332] text-white" : "border-[#C8A45C] text-[#C8A45C]"}
                >
                  {br}BR
                </Button>
              ))}
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-8">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-[#1A2332] data-[state=active]:text-white px-4 py-2 rounded-md text-sm"
                >
                  {t.common.allClusters}
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
                    const allPlans = floorPlans.filter((fp) => fp.projectId === pid);
                    const plans = bedroomFilter ? allPlans.filter((p) => p.bedrooms === bedroomFilter) : allPlans;

                    if (!proj || plans.length === 0) return null;

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
                            <p className="font-body text-gray-500 text-sm mt-1">
                              Starting from {formatPrice(proj.startingPrice)} · {proj.bedrooms} {t.common.bed} · {proj.areaRange}
                            </p>
                          </div>
                          <Link href={`/projects/${proj.slug}`}>
                            <Button className="bg-[#1A2332] text-white hover:bg-[#2A3A52] rounded-md text-sm">
                              {t.floorPlans.viewProject} <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {plans.map((plan) => (
                            <FloorPlanCard key={plan.id} plan={plan} project={proj} />
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
                const allPlans = floorPlans.filter((fp) => fp.projectId === pid);
                const plans = bedroomFilter ? allPlans.filter((p) => p.bedrooms === bedroomFilter) : allPlans;

                if (plans.length === 0) return null;

                return (
                  <TabsContent key={pid} value={pid}>
                    {proj && (
                      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
                          <p className="font-body text-gray-500 text-sm mt-1">
                            Starting from {formatPrice(proj.startingPrice)} · {proj.bedrooms} {t.common.bed} · {proj.areaRange}
                          </p>
                        </div>
                        <Link href={`/projects/${proj.slug}`}>
                          <Button className="bg-[#1A2332] text-white hover:bg-[#2A3A52] rounded-md text-sm">
                            {t.floorPlans.viewProject} <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {plans.map((plan) => (
                        <FloorPlanCard key={plan.id} plan={plan} project={proj!} />
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
                  <h3 className="font-heading text-2xl font-bold text-white mb-1">{t.floorPlans.masterPlanTitle}</h3>
                  <p className="font-body text-white/70 text-sm">{t.floorPlans.masterPlanSubtitle}</p>
                </div>
              </div>
              <div>
                <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
                  {t.floorPlans.communityLayout}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#1A2332] mt-2 mb-4">
                  {t.floorPlans.exploreMasterPlan}
                </h3>
                <p className="font-body text-gray-500 leading-relaxed mb-6">
                  {t.floorPlans.exploreMasterPlanDesc}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <p className="font-heading text-xl font-bold text-[#C8A45C]">9</p>
                    <p className="font-body text-xs text-gray-500 uppercase tracking-wider">{t.floorPlans.stats[0]}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <p className="font-heading text-xl font-bold text-[#C8A45C]">7,000+</p>
                    <p className="font-body text-xs text-gray-500 uppercase tracking-wider">{t.floorPlans.stats[1]}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <p className="font-heading text-xl font-bold text-[#C8A45C]">3.5km</p>
                    <p className="font-body text-xs text-gray-500 uppercase tracking-wider">{t.floorPlans.stats[2]}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <p className="font-heading text-xl font-bold text-[#C8A45C]">25%</p>
                    <p className="font-body text-xs text-gray-500 uppercase tracking-wider">{t.floorPlans.stats[3]}</p>
                  </div>
                </div>
                <Link href="/master-plan">
                  <Button className="gold-gradient text-[#1A2332] font-bold px-6 py-3 rounded-md hover:opacity-90">
                    <Map className="w-4 h-4 mr-2" />
                    {t.floorPlans.viewFullMasterPlan}
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
  );
}

function FloorPlanCard({
  plan,
  project,
}: {
  plan: typeof floorPlans[0];
  project: typeof projects[0];
}) {
  const t = useDict();
  const [selectedPlan, setSelectedPlan] = useState<typeof floorPlans[0] | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const hasImage = !!plan.imageUrl;

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <>
      <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 group">
        {/* Floor Plan Image - Clickable for enlarge */}
        <div
          className="relative h-72 overflow-hidden bg-[#F5F0E8] cursor-pointer"
          onClick={() => hasImage && setSelectedPlan(plan)}
        >
          {hasImage ? (
            <Image
              src={plan.imageUrl!}
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
          {hasImage && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
            </div>
          )}
          {/* Badge */}
          {hasImage && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-emerald-600 text-white text-xs font-semibold">{t.floorPlans.realFloorPlan}</Badge>
            </div>
          )}
        </div>

        {/* Card Content - Unified info box */}
        <CardContent className="p-5">
          <h4 className="font-heading font-bold text-[#1A2332] mb-3">{plan.name}</h4>
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Bed className="w-4 h-4 text-[#C8A45C]" /> {plan.bedrooms} {t.common.bed}
            </span>
            <span className="flex items-center gap-1">
              <Maximize className="w-4 h-4 text-[#C8A45C]" /> {formatSqft(plan.areaSqft)}
            </span>
          </div>
          {plan.plotSqft && (
            <p className="text-sm text-gray-500 mb-2">{t.common.plot}: {formatSqft(plan.plotSqft)}</p>
          )}
          {plan.startingPrice && (
            <div className="flex items-center gap-1 text-sm mb-4">
              <span className="text-[#C8A45C] font-heading font-bold">{formatPrice(plan.startingPrice)}</span>
              <span className="text-gray-500">{t.common.startingFrom || "starting from"}</span>
            </div>
          )}
          <div className="flex gap-2">
            <Button
              onClick={() => hasImage && setSelectedPlan(plan)}
              variant="outline"
              className="flex-1 border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 rounded-md text-sm"
              disabled={!hasImage}
            >
              <Eye className="w-4 h-4 mr-1" /> View
            </Button>
            <Button
              onClick={handleDownload}
              className="flex-1 bg-[#1A2332] text-white hover:bg-[#2A3A52] rounded-md text-sm"
              disabled={!hasImage || downloadingId === plan.id}
            >
              <Download className="w-4 h-4 mr-1" />
              {downloadingId === plan.id ? "..." : t.floorPlans.download || "Download"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lightbox Dialog for Enlarged View */}
      <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-[#1A2332] border-0">
          {selectedPlan && (
            <div className="relative">
              <button
                onClick={() => setSelectedPlan(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <div className="relative h-[60vh] sm:h-[75vh] bg-[#F5F0E8]">
                <Image
                  src={selectedPlan.imageUrl!}
                  alt={selectedPlan.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  quality={95}
                />
              </div>
              <div className="bg-[#1A2332] p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white mb-1">{selectedPlan.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <span className="flex items-center gap-1">
                        <Bed className="w-4 h-4 text-[#C8A45C]" /> {selectedPlan.bedrooms} {t.common.bed}
                      </span>
                      <span className="flex items-center gap-1">
                        <Maximize className="w-4 h-4 text-[#C8A45C]" /> {formatSqft(selectedPlan.areaSqft)}
                      </span>
                      {selectedPlan.plotSqft && (
                        <span>{t.common.plot}: {formatSqft(selectedPlan.plotSqft)}</span>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={handleDownload}
                    className="gold-gradient text-[#1A2332] font-bold px-6 py-3 rounded-md hover:opacity-90"
                    disabled={downloadingId === selectedPlan.id}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {downloadingId === selectedPlan.id ? "Preparing..." : "Download Floor Plan"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
