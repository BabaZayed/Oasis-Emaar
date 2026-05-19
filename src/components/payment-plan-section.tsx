"use client";

import { paymentMilestones, projects, formatPrice } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function PaymentPlanSection() {
  return (
    <section id="payment-plan" className="py-20 sm:py-28 bg-[#1A2332] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            Payment Structure
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            Flexible Payment Plans
          </h1>
          <p className="font-body text-white/60 max-w-2xl mx-auto">
            Emaar offers competitive payment plans designed to make luxury waterfront living accessible. Post-handover options available.
          </p>
          <div className="section-divider max-w-xs mx-auto mt-6" />
        </div>

        {/* Payment Timeline */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-between mb-8">
            {paymentMilestones.map((milestone, i) => (
              <div key={i} className="flex-1 text-center relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full gold-gradient flex items-center justify-center mb-4">
                  <span className="text-[#1A2332] font-bold text-lg sm:text-xl">{milestone.percentage}%</span>
                </div>
                {i < paymentMilestones.length - 1 && (
                  <div className="hidden sm:block absolute top-8 sm:top-10 left-[60%] w-[80%] h-0.5 bg-[#C8A45C]/30" />
                )}
                <h3 className="font-heading font-bold text-[#C8A45C] mb-2 text-sm sm:text-base">{milestone.label}</h3>
                <p className="font-body text-white/50 text-xs sm:text-sm px-2">{milestone.description}</p>
              </div>
            ))}
          </div>

          {/* Visual Progress Bar */}
          <div className="flex h-4 rounded-full overflow-hidden bg-white/10">
            {paymentMilestones.map((milestone, i) => (
              <div
                key={i}
                className={`flex items-center justify-center text-xs font-bold ${
                  i === 0 ? "bg-[#C8A45C] text-[#1A2332]" :
                  i === 1 ? "bg-[#A8893D] text-white" :
                  "bg-[#1A2332] text-[#C8A45C] border border-[#C8A45C]/30"
                }`}
                style={{ width: `${milestone.percentage}%` }}
              >
                {milestone.percentage}%
              </div>
            ))}
          </div>
        </div>

        {/* Price Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <h3 className="font-heading text-xl font-bold text-center mb-6">Starting Prices by Project</h3>
          <div className="bg-white/5 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-4 sm:p-6 bg-white/5 font-semibold text-sm text-[#C8A45C]">
              <span>Project</span>
              <span>Type</span>
              <span className="text-right">Starting Price</span>
            </div>
            {projects.map((project, i) => (
              <div
                key={project.id}
                className={`grid grid-cols-3 gap-4 p-4 sm:p-6 text-sm ${
                  i % 2 === 0 ? "bg-white/5" : "bg-transparent"
                }`}
              >
                <span className="font-medium">{project.name}</span>
                <span className="text-white/60 capitalize">{project.type}</span>
                <span className="text-right font-bold text-[#C8A45C]">
                  {formatPrice(project.startingPrice)}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              size="lg"
              className="gold-gradient text-[#1A2332] font-bold px-8 py-6 rounded-md hover:opacity-90"
            >
              Get Custom Payment Plan
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
