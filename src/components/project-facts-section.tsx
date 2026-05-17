"use client";

import { Building2, Trees, Store, Waves, MapPin, Crown, ShieldCheck, Users } from "lucide-react";
import { type Project } from "@/lib/data";

interface ProjectFactsSectionProps {
  project: Project;
}

const factCards = [
  {
    key: "totalUnits" as const,
    icon: Users,
    label: "Total Units",
  },
  {
    key: "communitySize" as const,
    icon: Building2,
    label: "Community Size",
  },
  {
    key: "greenSpace" as const,
    icon: Trees,
    label: "Green Space",
  },
  {
    key: "retailSpace" as const,
    icon: Store,
    label: "Retail Space",
  },
  {
    key: "lagoonLength" as const,
    icon: Waves,
    label: "Lagoon Length",
  },
  {
    key: "developer" as const,
    icon: Crown,
    label: "Developer",
  },
  {
    key: "location" as const,
    icon: MapPin,
    label: "Location",
  },
  {
    key: "goldenVisa" as const,
    icon: ShieldCheck,
    label: "Golden Visa",
  },
];

export default function ProjectFactsSection({ project }: ProjectFactsSectionProps) {
  const { facts } = project;

  return (
    <section className="py-16 sm:py-20 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            Project Facts
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
            {project.name} at a Glance
          </h2>
          <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
            Key facts and figures about {project.name} within The Oasis by Emaar community
          </p>
          <div className="section-divider max-w-xs mx-auto mt-6" />
        </div>

        {/* Facts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {factCards.map((card, index) => {
            const value = facts[card.key];
            const displayValue =
              card.key === "goldenVisa"
                ? value
                  ? "Eligible"
                  : "Not Eligible"
                : String(value);

            return (
              <div
                key={card.key}
                className="bg-white rounded-xl p-5 sm:p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#C8A45C]/20 group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#1A2332] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#C8A45C] transition-colors duration-300">
                  <card.icon className="w-5 h-5 text-[#C8A45C] group-hover:text-[#1A2332] transition-colors duration-300" />
                </div>
                <p className="font-body text-xs text-gray-400 uppercase tracking-wider mb-1">
                  {card.label}
                </p>
                <p
                  className={`font-heading text-base sm:text-lg font-bold ${
                    card.key === "goldenVisa" && facts.goldenVisa
                      ? "text-emerald-600"
                      : "text-[#1A2332]"
                  }`}
                >
                  {displayValue}
                </p>
                {card.key === "goldenVisa" && facts.goldenVisa && (
                  <span className="inline-block mt-1 text-[10px] font-body font-medium text-emerald-600/70 bg-emerald-50 rounded-full px-2 py-0.5">
                    AED 2M+ Properties
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Golden Visa Highlight Banner */}
        {facts.goldenVisa && (
          <div className="mt-8 sm:mt-10 bg-[#1A2332] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="w-14 h-14 rounded-full bg-[#C8A45C]/20 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-7 h-7 text-[#C8A45C]" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1">
                UAE Golden Visa Eligible
              </h3>
              <p className="font-body text-white/60 text-sm sm:text-base">
                All properties at {project.name} qualify for the UAE Golden Visa programme for investments of AED 2 million and above. Secure your residency in the UAE with your dream home.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
