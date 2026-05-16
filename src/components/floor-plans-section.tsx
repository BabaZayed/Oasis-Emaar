"use client";

import { useState } from "react";
import { floorPlans, projects, formatSqft } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bed, Maximize, Download, Lock } from "lucide-react";
import { PaywallModal } from "@/components/paywall-modal";

export default function FloorPlansSection() {
  const [premiumPlan, setPremiumPlan] = useState<string | null>(null);
  const isRegistered = typeof window !== "undefined" && localStorage.getItem("oasis_registered") === "true";

  const projectIds = [...new Set(floorPlans.map((fp) => fp.projectId))];

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

        <Tabs defaultValue={projectIds[0]} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-8">
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

          {projectIds.map((pid) => {
            const plans = floorPlans.filter((fp) => fp.projectId === pid);
            return (
              <TabsContent key={pid} value={pid}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <Card key={plan.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                      <div className={`h-48 bg-gradient-to-br ${plan.imageGradient} flex items-center justify-center`}>
                        <div className="text-center">
                          <div className="w-20 h-16 border-2 border-dashed border-gray-300 rounded mx-auto mb-2" />
                          <p className="text-xs text-gray-400">Floor Plan Preview</p>
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
