"use client";

import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { projects, masterPlanFacts, formatPrice, galleryImages } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Building2,
  Trees,
  Store,
  Waves,
  Crown,
  ShieldCheck,
  Plane,
  Clock,
  Route,
  Globe,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const communityFacts = [
  { icon: Building2, label: "Total Area", value: masterPlanFacts.totalArea },
  { icon: Building2, label: "Total Residences", value: masterPlanFacts.totalResidences },
  { icon: Trees, label: "Green Space", value: masterPlanFacts.greenSpace },
  { icon: Store, label: "Retail Space", value: masterPlanFacts.retailSpace },
  { icon: Waves, label: "Crystal Lagoons", value: masterPlanFacts.crystalLagoons },
  { icon: Crown, label: "Developer", value: masterPlanFacts.developer },
  { icon: MapPin, label: "Location", value: masterPlanFacts.location },
  { icon: Plane, label: "Nearest Airport", value: masterPlanFacts.nearestAirport },
  { icon: Route, label: "Connectivity", value: masterPlanFacts.connectivity },
  { icon: Clock, label: "Expo City", value: masterPlanFacts.expoCity },
  { icon: ShieldCheck, label: "Golden Visa", value: masterPlanFacts.goldenVisa },
  { icon: Globe, label: "Handover Range", value: masterPlanFacts.handoverRange },
];

export default function MasterPlanPageClient() {
  const masterPlanImage = galleryImages.find((img) => img.category === "Master Plan");

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
                Community Layout
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
                The Oasis Master Plan
              </h1>
              <p className="font-body text-white/60 text-lg max-w-2xl mx-auto">
                A 9.4 million sqm waterfront community by Emaar, featuring 9 exclusive clusters of luxury villas, mansions, and branded residences in Dubailand, Dubai.
              </p>
              <div className="section-divider max-w-xs mx-auto mt-8" />
            </div>
          </div>
        </section>

        {/* Master Plan Image */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[16/9]">
              {masterPlanImage ? (
                <Image
                  src={masterPlanImage.imageUrl}
                  alt={masterPlanImage.alt}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-600 to-blue-400 flex items-center justify-center">
                  <div className="text-center">
                    <Building2 className="w-20 h-20 text-white/30 mx-auto mb-4" />
                    <p className="font-heading text-2xl font-bold text-white/50">The Oasis Master Plan</p>
                    <p className="font-body text-white/30 text-sm mt-2">9.4 million sqm waterfront community</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2332]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-2">
                  The Oasis by Emaar
                </h2>
                <p className="font-body text-white/70 text-sm sm:text-base">
                  {masterPlanFacts.totalArea} · {masterPlanFacts.totalResidences} residences · {masterPlanFacts.clusters} clusters
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Facts */}
        <section className="py-16 sm:py-20 bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
                At a Glance
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
                Community Facts
              </h2>
              <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
                Key facts and figures about The Oasis by Emaar — one of Dubai&apos;s most ambitious waterfront developments
              </p>
              <div className="section-divider max-w-xs mx-auto mt-6" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {communityFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="bg-white rounded-xl p-5 sm:p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#C8A45C]/20 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#1A2332] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#C8A45C] transition-colors duration-300">
                    <fact.icon className="w-5 h-5 text-[#C8A45C] group-hover:text-[#1A2332] transition-colors duration-300" />
                  </div>
                  <p className="font-body text-xs text-gray-400 uppercase tracking-wider mb-1">
                    {fact.label}
                  </p>
                  <p className="font-heading text-base sm:text-lg font-bold text-[#1A2332]">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Price Range Banner */}
            <div className="mt-8 sm:mt-10 bg-[#1A2332] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-14 h-14 rounded-full bg-[#C8A45C]/20 flex items-center justify-center flex-shrink-0">
                <Crown className="w-7 h-7 text-[#C8A45C]" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1">
                  Price Range: {masterPlanFacts.priceRange}
                </h3>
                <p className="font-body text-white/60 text-sm sm:text-base">
                  From accessible luxury to ultra-exclusive mansions — with flexible {masterPlanFacts.handoverRange} payment plans and Golden Visa eligibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 9 Clusters */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
                9 Exclusive Clusters
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
                Explore Each Cluster
              </h2>
              <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
                Nine distinctive clusters, each offering a unique perspective on luxury waterfront living
              </p>
              <div className="section-divider max-w-xs mx-auto mt-6" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project) => (
                <Link key={project.id} href={`/projects/${project.slug}`} className="block">
                  <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
                      <Badge className="absolute top-3 left-3 bg-[#C8A45C] text-white text-xs font-semibold">
                        {project.clusterTag}
                      </Badge>
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white/80 text-xs font-medium">{project.tagline}</p>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-heading text-lg font-bold text-[#1A2332] mb-2">{project.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                        <span>{project.bedrooms} Bed</span>
                        <span>·</span>
                        <span>{project.areaRange}</span>
                      </div>
                      <div className="flex items-end justify-between pt-3 border-t border-gray-100">
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider">Starting from</p>
                          <p className="font-heading text-lg font-bold text-[#C8A45C]">{formatPrice(project.startingPrice)}</p>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-[#1A2332] flex items-center justify-center group-hover:bg-[#C8A45C] transition-colors duration-300">
                          <ArrowRight className="w-4 h-4 text-[#C8A45C] group-hover:text-[#1A2332] transition-colors duration-300" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Google Drive Links */}
        <section className="py-16 sm:py-20 bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
                Documents
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A2332] mt-3 mb-4">
                Master Plan Resources
              </h2>
              <p className="font-body text-gray-500 max-w-2xl mx-auto">
                Access the official master plan documents, maps, and brochures from our Google Drive
              </p>
              <div className="section-divider max-w-xs mx-auto mt-6" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter((p) => p.subfolders.maps || p.subfolders.moodboard || p.subfolders.brochure)
                .slice(0, 6)
                .map((project) => (
                  <Card key={project.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Badge className="bg-[#C8A45C] text-white text-xs mb-3">{project.clusterTag}</Badge>
                      <h4 className="font-heading text-lg font-bold text-[#1A2332] mb-3">{project.name}</h4>
                      <div className="space-y-2">
                        {project.subfolders.maps && (
                          <a
                            href={`https://drive.google.com/drive/folders/${project.subfolders.maps}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-[#1A2332] hover:text-[#C8A45C] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Maps
                          </a>
                        )}
                        {project.subfolders.moodboard && (
                          <a
                            href={`https://drive.google.com/drive/folders/${project.subfolders.moodboard}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-[#1A2332] hover:text-[#C8A45C] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Moodboard
                          </a>
                        )}
                        {project.subfolders.brochure && (
                          <a
                            href={`https://drive.google.com/drive/folders/${project.subfolders.brochure}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-[#1A2332] hover:text-[#C8A45C] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Brochure
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-[#1A2332] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
              Get Started
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="font-body text-white/60 max-w-2xl mx-auto mb-10 text-lg">
              As an authorised Emaar sales agent, we offer exclusive access, expert guidance, and personalised service across all 9 clusters at The Oasis.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#paywall">
                <Button
                  size="lg"
                  className="gold-gradient text-[#1A2332] font-bold px-8 py-6 rounded-md hover:opacity-90 w-full sm:w-auto"
                >
                  Register Your Interest
                </Button>
              </Link>
              <Link href="/floor-plans">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 px-8 py-6 rounded-md w-full sm:w-auto"
                >
                  View Floor Plans
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
