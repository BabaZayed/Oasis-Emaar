"use client";

import { useState, useMemo } from "react";
import { inventoryItems, projects, formatPrice, formatSqft, type InventoryItem } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Maximize, ArrowRight, ChevronDown, ChevronUp, Home, Eye } from "lucide-react";
import Link from "next/link";
import PropertyDetailModal from "@/components/property-detail-modal";

// Cluster display order and info
const clusterOrder = [
  { projectId: "palmiera-3", label: "Palmiera 3" },
  { projectId: "mareva-2", label: "Mareva 2" },
  { projectId: "mareva-1", label: "Mareva" },
  { projectId: "palmeira-collective", label: "Palmeira Collective" },
  { projectId: "lavita", label: "Lavita" },
];

type BedroomFilter = "all" | 4 | 5 | 6;

export default function QuickInventorySection() {
  const [bedroomFilter, setBedroomFilter] = useState<BedroomFilter>("all");
  const [expandedClusters, setExpandedClusters] = useState<Set<string>>(new Set());

  const [detailItem, setDetailItem] = useState<InventoryItem | null>(null);

  const filtered = useMemo(() => {
    return inventoryItems.filter((item) => {
      if (bedroomFilter !== "all" && item.bedrooms !== bedroomFilter) return false;
      return item.status === "available";
    });
  }, [bedroomFilter]);

  // Group by project
  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const item of filtered) {
      const existing = map.get(item.projectId) || [];
      existing.push(item);
      map.set(item.projectId, existing);
    }
    return map;
  }, [filtered]);

  const totalAvailable = inventoryItems.filter((i) => i.status === "available").length;
  const lowestPrice = Math.min(...inventoryItems.filter((i) => i.status === "available").map((i) => i.price));

  const toggleCluster = (projectId: string) => {
    setExpandedClusters((prev) => {
      const next = new Set(prev);
      if (next.has(projectId)) {
        next.delete(projectId);
      } else {
        next.add(projectId);
      }
      return next;
    });
  };

  // Show max 3 items per cluster when not expanded
  const MAX_COLLAPSED = 3;

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            Available Now
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
            Current Inventory
          </h2>
          <p className="font-body text-gray-500 max-w-2xl mx-auto font-light">
            Browse real-time availability across all clusters at The Oasis. All prices direct from Emaar.
          </p>
          <div className="luxury-divider mt-8">
            <span className="diamond" />
          </div>
        </div>

        {/* Summary Bar - Premium glass-morphism */}
        <div className="glass-bar p-5 sm:p-7 mb-8 sm:mb-10 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-8 sm:gap-10">
            <div className="text-center sm:text-left">
              <p className="font-heading text-3xl sm:text-4xl font-bold text-[#C8A45C]">{totalAvailable}</p>
              <p className="font-body text-[10px] text-white/50 uppercase tracking-[0.2em] mt-1">Properties Available</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/15" />
            <div className="text-center sm:text-left">
              <p className="font-heading text-xl sm:text-2xl font-bold text-white">Starting from {formatPrice(lowestPrice)}</p>
              <p className="font-body text-[10px] text-white/50 uppercase tracking-[0.2em] mt-1">AED</p>
            </div>
          </div>
          <Link href="/inventory">
            <Button className="btn-gold-glow text-[#1A2332] font-bold px-7 py-3.5 rounded-lg text-sm sm:text-base w-full sm:w-auto gap-2">
              Browse All {totalAvailable} Properties
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Bedroom Filter Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 mb-8 sm:mb-10 overflow-x-auto pb-2">
          <span className="font-body text-sm text-gray-500 flex-shrink-0 hidden sm:inline">Filter:</span>
          {(["all", 4, 5, 6] as BedroomFilter[]).map((br) => (
            <button
              key={br}
              onClick={() => setBedroomFilter(br)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 min-h-[44px] ${
                bedroomFilter === br
                  ? "bg-[#1A2332] text-[#C8A45C] shadow-md shadow-[#1A2332]/20"
                  : "bg-[#F5F0E8] text-[#1A2332] hover:bg-[#1A2332]/10"
              }`}
            >
              {br === "all" ? "All" : `${br} BR`}
            </button>
          ))}
          <span className="font-body text-sm text-gray-400 ml-auto flex-shrink-0">
            {filtered.length} properties
          </span>
        </div>

        {/* Cluster Groups */}
        <div className="space-y-7">
          {clusterOrder.map(({ projectId, label }) => {
            const items = grouped.get(projectId);
            if (!items || items.length === 0) return null;

            const project = projects.find((p) => p.id === projectId);
            const isExpanded = expandedClusters.has(projectId);
            const displayItems = isExpanded ? items : items.slice(0, MAX_COLLAPSED);
            const hasMore = items.length > MAX_COLLAPSED;

            return (
              <div key={projectId} className="border border-gray-200/80 rounded-2xl overflow-hidden card-premium-hover hover:shadow-lg">
                {/* Cluster Header - more elegant */}
                <div className="bg-gradient-to-r from-[#1A2332] to-[#2A3A52] px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between relative overflow-hidden">
                  {/* Subtle decorative accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#C8A45C] to-[#D4AF37]" />
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-[#C8A45C]" />
                    <div>
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-white">{label}</h3>
                      {project?.clusterTag && (
                        <span className="font-body text-xs text-white/40">{project.clusterTag}</span>
                      )}
                    </div>
                  </div>
                  <Badge className="bg-[#C8A45C] text-[#1A2332] font-bold text-sm px-3 py-1">
                    {items.length} {items.length === 1 ? "unit" : "units"}
                  </Badge>
                </div>

                {/* Property Cards Grid */}
                <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {displayItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#F5F0E8]/80 rounded-xl p-4 sm:p-5 hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#C8A45C]/20 group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h4 className="font-heading font-semibold text-[#1A2332] text-sm leading-tight truncate">
                          {item.name}
                        </h4>
                        {item.isPremium && (
                          <span className="flex-shrink-0 text-[10px] bg-[#1A2332] text-[#C8A45C] font-bold px-2 py-0.5 rounded tracking-wider">
                            PREMIUM
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Bed className="w-3.5 h-3.5 text-[#C8A45C]" />
                          {item.bedrooms} Bed
                        </span>
                        <span className="flex items-center gap-1">
                          <Maximize className="w-3.5 h-3.5 text-[#C8A45C]" />
                          {formatSqft(item.areaSqft)}
                        </span>
                        {item.plotSqft && (
                          <span className="hidden sm:inline text-gray-400">
                            Plot: {formatSqft(item.plotSqft)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-end justify-between pt-3 border-t border-gray-200/60">
                        <p className="font-heading text-lg sm:text-xl font-bold text-[#C8A45C]">
                          {formatPrice(item.price)}
                        </p>
                        <Button
                          onClick={() => setDetailItem(item)}
                          size="sm"
                          className="bg-[#1A2332] text-white hover:bg-[#2A3A52] text-xs rounded-lg min-h-[36px] transition-all duration-300"
                        >
                          <Eye className="w-3 h-3 mr-1" /> View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show More / Less */}
                {hasMore && (
                  <div className="px-5 pb-5 text-center">
                    <button
                      onClick={() => toggleCluster(projectId)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C8A45C] hover:text-[#1A2332] transition-colors min-h-[44px] tracking-wide"
                    >
                      {isExpanded ? (
                        <>
                          Show Less <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Show All {items.length} Units <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link href="/inventory">
            <Button
              size="lg"
              className="bg-[#1A2332] text-[#C8A45C] hover:bg-[#2A3A52] font-bold px-10 py-6 text-base rounded-lg gap-2 w-full sm:w-auto transition-all duration-300"
            >
              View Full Inventory
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Property Detail Modal */}
      <PropertyDetailModal
        item={detailItem}
        open={!!detailItem}
        onClose={() => setDetailItem(null)}
      />
    </section>
  );
}
