"use client";

import SiteHeader from "@/components/site-header";
import HeroSection from "@/components/hero-section";
import BenefitsSection from "@/components/benefits-section";
import PaywallSection from "@/components/paywall-section";
import ReferencesSection from "@/components/references-section";
import FeedbackSection from "@/components/feedback-section";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import ExitIntentPopup from "@/components/exit-intent-popup";
import Link from "next/link";
import { projects, formatPrice } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Maximize, ArrowRight, ChevronRight } from "lucide-react";

function ProjectPreviewCard({ project }: { project: typeof projects[0] }) {
  const statusColor =
    project.status === "Ready" ? "bg-green-500" :
    project.status === "Off-Plan" ? "bg-[#C8A45C]" :
    "bg-orange-500";

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      <div className={`relative h-56 sm:h-64 bg-gradient-to-br ${project.imageGradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
        <Badge className={`absolute top-4 left-4 ${statusColor} text-white text-xs font-semibold`}>
          {project.status}
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

        <div className="flex items-end justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Starting from</p>
            <p className="text-xl font-bold text-[#C8A45C]">{formatPrice(project.startingPrice)}</p>
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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />

        {/* Benefits Preview */}
        <BenefitsSection />

        {/* Projects Preview - Show first 3 */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
                Our Projects
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
                Discover The Oasis Collection
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Five distinctive communities, each offering a unique perspective on luxury waterfront living in Dubai
              </p>
              <div className="section-divider max-w-xs mx-auto mt-6" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.slice(0, 3).map((project) => (
                <ProjectPreviewCard key={project.id} project={project} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 px-8 py-6 text-base rounded-md"
                >
                  View All Projects <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Premium Access / Paywall Section */}
        <PaywallSection />

        {/* References / Testimonials */}
        <ReferencesSection />

        {/* User Feedback / Reviews */}
        <FeedbackSection />

        {/* CTA Section */}
        <section className="py-20 sm:py-28 bg-[#1A2332] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
              Start Your Journey
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-10 text-lg">
              Explore our exclusive collection of waterfront villas, mansions, townhouses, apartments, and penthouses at The Oasis by Emaar.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="gold-gradient text-[#1A2332] font-bold px-8 py-6 text-base rounded-md hover:opacity-90 w-full sm:w-auto"
                >
                  Register Your Interest
                </Button>
              </Link>
              <Link href="/inventory">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 px-8 py-6 text-base rounded-md w-full sm:w-auto"
                >
                  Browse Inventory
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
      <ExitIntentPopup />
    </div>
  );
}
