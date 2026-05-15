"use client";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import Link from "next/link";
import { inventoryItems, floorPlans, formatPrice, formatSqft, type Project } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bed, Maximize, ChevronRight, Home, ArrowRight, MapPin, Lock } from "lucide-react";
import { PaywallModal } from "@/components/paywall-modal";
import { useState } from "react";

export default function ProjectDetailPage({ project }: { project: Project }) {
  const [premiumItem, setPremiumItem] = useState<typeof inventoryItems[0] | null>(null);

  const projectInventory = inventoryItems.filter((item) => item.projectId === project.id);
  const projectFloorPlans = floorPlans.filter((fp) => fp.projectId === project.id);

  const statusColor =
    project.status === "Ready" ? "bg-green-500" :
    project.status === "Off-Plan" ? "bg-[#C8A45C]" :
    "bg-orange-500";

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.imageGradient}`} />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-white/60 text-sm">
                <li>
                  <Link href="/" className="hover:text-[#C8A45C] transition-colors flex items-center gap-1">
                    <Home className="w-4 h-4" /> Home
                  </Link>
                </li>
                <li><ChevronRight className="w-4 h-4" /></li>
                <li>
                  <Link href="/projects" className="hover:text-[#C8A45C] transition-colors">
                    Projects
                  </Link>
                </li>
                <li><ChevronRight className="w-4 h-4" /></li>
                <li className="text-[#C8A45C] font-medium">{project.name}</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <Badge className={`${statusColor} text-white text-sm font-semibold mb-4`}>
                {project.status}
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                {project.name}
              </h1>
              <p className="text-xl sm:text-2xl text-white/80 mb-8">{project.tagline}</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="gold-gradient text-[#1A2332] font-bold px-8 py-6 rounded-md hover:opacity-90">
                    Register Your Interest
                  </Button>
                </Link>
                <Link href="/inventory">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-md">
                    View Available Units
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12">
              <div className="bg-[#F5F0E8] rounded-xl p-6 text-center">
                <Bed className="w-6 h-6 text-[#C8A45C] mx-auto mb-2" />
                <p className="text-xs text-gray-400 uppercase tracking-wider">Bedrooms</p>
                <p className="text-xl font-bold text-[#1A2332]">{project.bedrooms}</p>
              </div>
              <div className="bg-[#F5F0E8] rounded-xl p-6 text-center">
                <Maximize className="w-6 h-6 text-[#C8A45C] mx-auto mb-2" />
                <p className="text-xs text-gray-400 uppercase tracking-wider">Area</p>
                <p className="text-xl font-bold text-[#1A2332]">{project.areaRange}</p>
              </div>
              <div className="bg-[#F5F0E8] rounded-xl p-6 text-center">
                <MapPin className="w-6 h-6 text-[#C8A45C] mx-auto mb-2" />
                <p className="text-xs text-gray-400 uppercase tracking-wider">Starting Price</p>
                <p className="text-xl font-bold text-[#C8A45C]">{formatPrice(project.startingPrice)}</p>
              </div>
              {project.plotArea && (
                <div className="bg-[#F5F0E8] rounded-xl p-6 text-center">
                  <Maximize className="w-6 h-6 text-[#C8A45C] mx-auto mb-2" />
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Plot Area</p>
                  <p className="text-xl font-bold text-[#1A2332]">{project.plotArea}</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2332] mb-6">About This Project</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{project.description}</p>
            </div>
          </div>
        </section>

        {/* Features & Amenities */}
        <section className="py-16 sm:py-20 bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2332] mb-6">Features</h2>
                <ul className="space-y-3">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-gray-600">
                      <div className="w-2 h-2 rounded-full bg-[#C8A45C] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2332] mb-6">Amenities</h2>
                <ul className="space-y-3">
                  {project.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-3 text-gray-600">
                      <div className="w-2 h-2 rounded-full bg-[#1A2332] flex-shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Available Inventory */}
        {projectInventory.length > 0 && (
          <section className="py-16 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
                    Available Units
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2332] mt-2">
                    {project.name} Inventory
                  </h2>
                </div>
                <Link href="/inventory">
                  <Button variant="outline" className="border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 rounded-md">
                    View All Inventory <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectInventory.map((item) => {
                  const statusMap: Record<string, { label: string; color: string }> = {
                    available: { label: "Available", color: "bg-green-500" },
                    reserved: { label: "Reserved", color: "bg-orange-500" },
                    sold: { label: "Sold", color: "bg-red-500" },
                    "launching-soon": { label: "Launching Soon", color: "bg-blue-500" },
                  };
                  const statusInfo = statusMap[item.status];

                  return (
                    <Card key={item.id} className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                      <div className={`relative h-44 bg-gradient-to-br ${item.imageGradient}`}>
                        <div className="absolute inset-0 bg-black/20" />
                        <Badge className={`absolute top-3 left-3 ${statusInfo.color} text-white text-xs`}>
                          {statusInfo.label}
                        </Badge>
                        {item.isPremium && (
                          <Badge className="absolute top-3 right-3 bg-[#1A2332] text-[#C8A45C] text-xs flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Premium
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4 sm:p-5">
                        <h4 className="font-bold text-[#1A2332] mb-3 text-sm sm:text-base">{item.name}</h4>
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Bed className="w-4 h-4 text-[#C8A45C]" /> {item.bedrooms} Bed
                          </span>
                          <span className="flex items-center gap-1">
                            <Maximize className="w-4 h-4 text-[#C8A45C]" /> {formatSqft(item.areaSqft)}
                          </span>
                        </div>
                        <div className="flex items-end justify-between pt-3 border-t border-gray-100">
                          <div>
                            <p className="text-xs text-gray-400">Price</p>
                            <p className="text-lg font-bold text-[#C8A45C]">{formatPrice(item.price)}</p>
                          </div>
                          {item.isPremium ? (
                            <Button
                              onClick={() => setPremiumItem(item)}
                              size="sm"
                              className="bg-[#1A2332] text-white hover:bg-[#2A3A52] text-xs rounded-md"
                            >
                              <Lock className="w-3 h-3 mr-1" /> Unlock
                            </Button>
                          ) : (
                            <Link href="/contact">
                              <Button size="sm" className="bg-[#1A2332] text-white hover:bg-[#2A3A52] text-xs rounded-md">
                                Inquire
                              </Button>
                            </Link>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Floor Plans */}
        {projectFloorPlans.length > 0 && (
          <section className="py-16 sm:py-20 bg-[#F5F0E8]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
                    Floor Plans
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2332] mt-2">
                    {project.name} Floor Plans
                  </h2>
                </div>
                <Link href="/floor-plans">
                  <Button variant="outline" className="border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 rounded-md">
                    View All Floor Plans <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectFloorPlans.map((plan) => (
                  <Card key={plan.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                    <div className={`h-48 bg-gradient-to-br ${plan.imageGradient} flex items-center justify-center`}>
                      <div className="text-center">
                        <div className="w-20 h-16 border-2 border-dashed border-gray-300 rounded mx-auto mb-2" />
                        <p className="text-xs text-gray-400">Floor Plan Preview</p>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h4 className="font-bold text-[#1A2332] mb-3">{plan.name}</h4>
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Bed className="w-4 h-4 text-[#C8A45C]" /> {plan.bedrooms} Bed
                        </span>
                        <span className="flex items-center gap-1">
                          <Maximize className="w-4 h-4 text-[#C8A45C]" /> {formatSqft(plan.areaSqft)}
                        </span>
                      </div>
                      {plan.plotSqft && (
                        <p className="text-sm text-gray-400">Plot: {formatSqft(plan.plotSqft)}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 sm:py-28 bg-[#1A2332] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Interested in {project.name}?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-10 text-lg">
              Register your interest to receive exclusive pricing, floor plans, and priority access to available units at {project.name}.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="gold-gradient text-[#1A2332] font-bold px-8 py-6 rounded-md hover:opacity-90 w-full sm:w-auto">
                  Register Your Interest
                </Button>
              </Link>
              <Link href="/payment-plan">
                <Button size="lg" variant="outline" className="border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 px-8 py-6 rounded-md w-full sm:w-auto">
                  View Payment Plan
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />

      {/* Paywall Modal */}
      <PaywallModal
        open={!!premiumItem}
        onClose={() => setPremiumItem(null)}
        itemName={premiumItem?.name || ""}
      />
    </div>
  );
}
