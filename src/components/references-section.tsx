"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Quote, Building2, Award, Handshake, Users } from "lucide-react";

const references = [
  {
    name: "Ahmed Al-Rashid",
    title: "CEO, Al-Rashid Holdings",
    location: "Dubai, UAE",
    quote: "The Oasis represents everything we look for in a premium investment — Emaar's track record, waterfront location, and exceptional design. Our clients have seen remarkable returns on Emaar properties, and The Oasis is set to continue that trend.",
    rating: 5,
    type: "Investor",
  },
  {
    name: "Sarah Mitchell",
    title: "Director, Prime Property Consultants",
    location: "London, UK",
    quote: "Having advised international buyers on Dubai real estate for over 15 years, I can confidently say The Oasis by Emaar is one of the most compelling opportunities in the market today. The lagoon concept and community design are truly world-class.",
    rating: 5,
    type: "Consultant",
  },
  {
    name: "Khalid Al-Mansoori",
    title: "Managing Partner, Gulf Real Estate Group",
    location: "Abu Dhabi, UAE",
    quote: "We've partnered with Emaar on multiple projects and The Oasis stands out for its scale and ambition. The range of property types — from apartments to mansions — means there's something for every buyer profile. The payment plans make it accessible too.",
    rating: 5,
    type: "Partner",
  },
  {
    name: "Dr. Priya Sharma",
    title: "Property Investor & Family Office",
    location: "Mumbai, India",
    quote: "As someone who invests in premium real estate across global markets, The Oasis caught my attention for its unique waterfront concept and Emaar's brand credibility. The crystal lagoon and proximity to Downtown Dubai make it an unbeatable lifestyle and investment choice.",
    rating: 5,
    type: "Investor",
  },
  {
    name: "James O'Brien",
    title: "Head of MENA Real Estate, Sterling Capital",
    location: "Dubai, UAE",
    quote: "The Oasis is positioned in one of Dubai's most promising growth corridors. With four golf courses nearby, crystal lagoons, and Emaar's master-planning expertise, this community offers exceptional long-term value appreciation potential for discerning investors.",
    rating: 5,
    type: "Analyst",
  },
  {
    name: "Fatima Al-Zaabi",
    title: "Family Office Director",
    location: "Dubai, UAE",
    quote: "My family has been investing in Emaar communities since Dubai Marina. The Oasis feels like the next iconic development. The mansions and villas offer a level of privacy and luxury that is increasingly rare in Dubai's new developments.",
    rating: 5,
    type: "Investor",
  },
];

const partnerLogos = [
  { name: "Emaar Properties", icon: Building2 },
  { name: "Dubai Land Department", icon: Award },
  { name: "RERA Licensed", icon: Shield },
  { name: "Dubai Tourism", icon: Handshake },
  { name: "Global Investors", icon: Users },
];

function Shield(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function ReferencesSection() {
  return (
    <section id="references" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            Trusted By Experts
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
            Industry References
          </h2>
          <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
            Hear from top real estate professionals, investors, and consultants who trust The Oasis by Emaar as a premier investment and lifestyle destination.
          </p>
          <div className="section-divider max-w-xs mx-auto mt-6" />
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {references.map((ref, index) => (
            <div
              key={index}
              className="bg-[#F5F0E8] rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-[#C8A45C]/40 mb-4" />

              {/* Quote Text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 font-body">
                &ldquo;{ref.quote}&rdquo;
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: ref.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C8A45C] text-[#C8A45C]" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1A2332] to-[#2A3A52] flex items-center justify-center text-white font-bold text-sm">
                  {ref.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#1A2332] text-sm truncate">{ref.name}</p>
                  <p className="text-xs text-gray-500 truncate">{ref.title}</p>
                  <p className="text-xs text-gray-400">{ref.location}</p>
                </div>
                <Badge className="bg-[#1A2332] text-[#C8A45C] text-[10px] flex-shrink-0">
                  {ref.type}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Trusted By / Partner Logos */}
        <div className="border-t border-gray-200 pt-12">
          <p className="font-body text-center text-sm font-semibold tracking-[0.2em] uppercase text-gray-400 mb-8">
            Recognized & Licensed
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {partnerLogos.map((partner) => (
              <div
                key={partner.name}
                className="flex flex-col items-center gap-2 text-gray-400 hover:text-[#C8A45C] transition-colors group"
              >
                <partner.icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-center">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
