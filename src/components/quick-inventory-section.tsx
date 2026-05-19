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
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            Available Now
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
            Current Inventory
          </h2>
          <p className="font-body text-gray-500 max-w-2xl mx-auto">
            Browse real-time availability across all clusters at The Oasis. All prices direct from Emaar.
          </p>
          <div className="section-divider max-w-xs mx-auto mt-6" />
        </div>

        {/* Summary Bar */}
        <div className="bg-[#1A2332] rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 sm:gap-8">
            <div className="text-center sm:text-left">
              <p className="font-heading text-2xl sm:text-3xl font-bold text-[#C8A45C]">{totalAvailable}</p>
              <p className="font-body text-xs text-white/60 uppercase tracking-wider">Properties Available</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/20" />
            <div className="text-center sm:text-left">
              <p className="font-heading text-lg sm:text-xl font-bold text-white">Starting from {formatPrice(lowestPrice)}</p>
              <p className="font-body text-xs text-white/60 uppercase tracking-wider">AED</p>
            </div>
          </div>
          <Link href="/inventory">
            <Button className="gold-gradient text-[#1A2332] font-bold px-6 py-3 rounded-md hover:opacity-90 text-sm sm:text-base w-full sm:w-auto">
              Browse All {totalAvailable} Properties
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Bedroom Filter Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2">
          <span className="font-body text-sm text-gray-500 flex-shrink-0 hidden sm:inline">Filter:</span>
          {(["all", 4, 5, 6] as BedroomFilter[]).map((br) => (
            <button
              key={br}
              onClick={() => setBedroomFilter(br)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 min-h-[44px] ${
                bedroomFilter === br
                  ? "bg-[#1A2332] text-[#C8A45C] shadow-md"
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
        <div className="space-y-6">
          {clusterOrder.map(({ projectId, label }) => {
            const items = grouped.get(projectId);
            if (!items || items.length === 0) return null;

            const project = projects.find((p) => p.id === projectId);
            const isExpanded = expandedClusters.has(projectId);
            const displayItems = isExpanded ? items : items.slice(0, MAX_COLLAPSED);
            const hasMore = items.length > MAX_COLLAPSED;

            return (
              <div key={projectId} className="border border-gray-200 rounded-xl overflow-hidden">
                {/* Cluster Header */}
                <div className="bg-gradient-to-r from-[#1A2332] to-[#2A3A52] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-[#C8A45C]" />
                    <div>
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-white">{label}</h3>
                      {project?.clusterTag && (
                        <span className="font-body text-xs text-white/50">{project.clusterTag}</span>
                      )}
                    </div>
                  </div>
                  <Badge className="bg-[#C8A45C] text-[#1A2332] font-bold text-sm">
                    {items.length} {items.length === 1 ? "unit" : "units"}
                  </Badge>
                </div>

                {/* Property Cards Grid */}
                <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {displayItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#F5F0E8] rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-200 border border-transparent hover:border-[#C8A45C]/20"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-heading font-semibold text-[#1A2332] text-sm leading-tight truncate">
                          {item.name}
                        </h4>
                        {item.isPremium && (
                          <span className="flex-shrink-0 text-[10px] bg-[#1A2332] text-[#C8A45C] font-bold px-1.5 py-0.5 rounded">
                            PREMIUM
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
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
                      <div className="flex items-end justify-between pt-2 border-t border-gray-200">
                        <p className="font-heading text-base sm:text-lg font-bold text-[#C8A45C]">
                          {formatPrice(item.price)}
                        </p>
                        <Button
                          onClick={() => setDetailItem(item)}
                          size="sm"
                          className="bg-[#1A2332] text-white hover:bg-[#2A3A52] text-xs rounded-md min-h-[36px]"
                        >
                          <Eye className="w-3 h-3 mr-1" /> View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show More / Less */}
                {hasMore && (
                  <div className="px-4 pb-4 text-center">
                    <button
                      onClick={() => toggleCluster(projectId)}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#C8A45C] hover:text-[#1A2332] transition-colors min-h-[44px]"
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
        <div className="mt-8 sm:mt-12 text-center">
          <Link href="/inventory">
            <Button
              size="lg"
              className="bg-[#1A2332] text-[#C8A45C] hover:bg-[#2A3A52] font-bold px-8 py-6 text-base rounded-md gap-2 w-full sm:w-auto"
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
