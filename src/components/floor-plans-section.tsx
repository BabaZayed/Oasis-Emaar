"use client";

import { useState } from "react";
import { floorPlans, projects, formatSqft, galleryImages } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bed, Maximize, Download, Lock, ExternalLink, Map, LayoutGrid } from "lucide-react";
import { PaywallModal } from "@/components/paywall-modal";
import Link from "next/link";
import Image from "next/image";

export default function FloorPlansSection() {
  const [premiumPlan, setPremiumPlan] = useState<string | null>(null);
  const isRegistered = typeof window !== "undefined" && localStorage.getItem("oasis_registered") === "true";

  const projectIds = [...new Set(floorPlans.map((fp) => fp.projectId))];
  const masterPlanImage = galleryImages.find((img) => img.category === "Master Plan");

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
            Detailed layouts for each residence type. Download brochures for complete specifications.
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
                    <p className="font-body text-xs text-gray-400 uppercase tracking-wider">Clusters</p>
                  </div>
                  <div className="bg-[#F5F0E8] rounded-xl p-4 text-center">
                    <p className="font-heading text-2xl font-bold text-[#C8A45C]">7,000+</p>
                    <p className="font-body text-xs text-gray-400 uppercase tracking-wider">Residences</p>
                  </div>
                  <div className="bg-[#F5F0E8] rounded-xl p-4 text-center">
                    <p className="font-heading text-2xl font-bold text-[#C8A45C]">3.5km</p>
                    <p className="font-body text-xs text-gray-400 uppercase tracking-wider">Waterways</p>
                  </div>
                  <div className="bg-[#F5F0E8] rounded-xl p-4 text-center">
                    <p className="font-heading text-2xl font-bold text-[#C8A45C]">25%</p>
                    <p className="font-body text-xs text-gray-400 uppercase tracking-wider">Green Space</p>
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
            const floorPlanDriveUrl = proj?.subfolders?.floorPlan
              ? `https://drive.google.com/drive/folders/${proj.subfolders.floorPlan}`
              : null;

            return (
              <TabsContent key={pid} value={pid}>
                {/* Google Drive Links */}
                {proj && (floorPlanDriveUrl || proj.driveFolderUrl) && (
                  <div className="flex flex-wrap gap-3 mb-8">
                    {floorPlanDriveUrl && (
                      <a
                        href={floorPlanDriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          className="border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 rounded-md text-sm"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Floor Plans on Google Drive
                        </Button>
                      </a>
                    )}
                    <a
                      href={proj.driveFolderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="border-[#1A2332] text-[#1A2332] hover:bg-[#1A2332]/5 rounded-md text-sm"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open Project Drive Folder
                      </Button>
                    </a>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <Card key={plan.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow group">
                      <div className="relative h-52 overflow-hidden">
                        {/* Faded project image background */}
                        {(() => {
                          const p = projects.find((pr) => pr.id === plan.projectId);
                          if (p?.imageUrl) {
                            return (
                              <img
                                src={p.imageUrl}
                                alt={plan.name}
                                className="w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity duration-300"
                              />
                            );
                          }
                          return (
                            <div className="w-full h-full bg-gradient-to-br from-[#F5F0E8] to-[#E8E0D0]" />
                          );
                        })()}
                        {/* Overlay with View Floor Plans text */}
                        <div className="absolute inset-0 flex items-center justify-center bg-[#1A2332]/30">
                          <div className="text-center">
                            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center mx-auto mb-3 shadow-lg">
                              <LayoutGrid className="w-6 h-6 text-[#C8A45C]" />
                            </div>
                            <p className="font-heading text-lg font-bold text-white drop-shadow-md">View Floor Plans</p>
                            <p className="font-body text-xs text-white/70 mt-1">{plan.name}</p>
                          </div>
                        </div>
                        {/* External link icon */}
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
                        {floorPlanDriveUrl ? (
                          <a
                            href={floorPlanDriveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
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
                            onClick={() => setPremiumPlan(plan.name)}
                            variant="outline"
                            className="w-full border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 rounded-md text-sm"
                          >
                            {isRegistered ? (
                              <><Download className="w-4 h-4 mr-2" /> Download Brochure</>
                            ) : (
                              <><Lock className="w-4 h-4 mr-2" /> Register to Download</>
                            )}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>

      <PaywallModal open={!!premiumPlan} onClose={() => setPremiumPlan(null)} itemName={premiumPlan || ""} />
    </section>
  );
}
