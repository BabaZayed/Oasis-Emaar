"use client";

import { Building2, Award, Users, TrendingUp, Shield, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Award, value: "25+", label: "Years of Excellence" },
  { icon: Building2, value: "60,000+", label: "Homes Delivered" },
  { icon: Users, value: "100,000+", label: "Happy Residents" },
  { icon: TrendingUp, value: "AED 100B+", label: "Projects Value" },
];

const reasons = [
  {
    icon: Shield,
    title: "Trusted Developer",
    description: "Emaar Properties is one of the world's most valuable and trusted real estate development companies, with a proven track record of delivering iconic communities in Dubai.",
  },
  {
    icon: Building2,
    title: "World-Class Architecture",
    description: "Every residence at The Oasis is designed by internationally acclaimed architects, blending contemporary aesthetics with functional luxury and premium finishes throughout.",
  },
  {
    icon: Leaf,
    title: "Sustainable Living",
    description: "25% of the community is dedicated to green spaces, parks, and water features. The Oasis promotes a healthy, active lifestyle in harmony with nature.",
  },
  {
    icon: TrendingUp,
    title: "Strong Investment Potential",
    description: "Emaar properties consistently deliver strong ROI. The Oasis strategic location near Downtown Dubai and four golf courses makes it a prime investment opportunity.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
            About The Oasis by Emaar
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            One of Emaar Properties' most ambitious projects, The Oasis redefines luxury waterfront living in Dubai
          </p>
          <div className="section-divider max-w-xs mx-auto mt-6" />
        </div>

        {/* Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-[#1A2332] mb-4">Our Story</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                The Oasis by Emaar is a master-planned waterfront community that represents the next chapter in Dubai's evolution as a global destination for luxury living. Spanning over 9.4 million square meters, this visionary development is home to more than 7,000 residences surrounded by crystal-clear lagoons, water canals, and lush green parks.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Strategically located just 20 minutes from Downtown Dubai, The Oasis offers residents the perfect balance between tranquil waterfront living and urban connectivity. The community features an extensive range of amenities including private beaches, retail boulevards, sports facilities, and dining destinations spread across 1.5 million square feet of retail space.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From the Burj Khalifa to Dubai Marina, Emaar Properties has consistently delivered world-class communities that become landmarks. The Oasis continues this legacy, offering a resort-style lifestyle where every detail has been thoughtfully crafted for the discerning homeowner.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#1A2332] to-[#2A3A52] rounded-xl p-8 sm:p-10 text-white h-full flex flex-col justify-center">
              <h4 className="text-xl font-bold text-[#C8A45C] mb-6">Emaar Properties</h4>
              <p className="text-white/70 leading-relaxed mb-6">
                Emaar Properties is a global property developer and provider of premium lifestyles. Since its inception in 1997, Emaar has been shaping the skyline of Dubai with iconic developments that have redefined luxury living.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <stat.icon className="w-5 h-5 text-[#C8A45C] mx-auto mb-1" />
                    <p className="text-lg font-bold">{stat.value}</p>
                    <p className="text-xs text-white/50">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div>
          <h3 className="text-2xl font-bold text-center text-[#1A2332] mb-8">
            Why Choose The Oasis
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="bg-[#F5F0E8] rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center mb-4">
                  <reason.icon className="w-6 h-6 text-[#1A2332]" />
                </div>
                <h4 className="font-bold text-[#1A2332] mb-2">{reason.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            size="lg"
            className="gold-gradient text-[#1A2332] font-bold px-8 py-6 rounded-md hover:opacity-90"
          >
            Schedule a Viewing
          </Button>
        </div>
      </div>
    </section>
  );
}
