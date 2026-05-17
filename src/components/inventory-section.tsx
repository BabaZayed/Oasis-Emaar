"use client";

import { useState, useMemo } from "react";
import { inventoryItems, projects, formatPrice, formatSqft, type InventoryItem, type PropertyStatus } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bed, Maximize, Lock, Search, SlidersHorizontal, X, LayoutGrid, List, Eye } from "lucide-react";
import PropertyDetailModal from "@/components/property-detail-modal";
import Image from "next/image";

const statusMap: Record<PropertyStatus, { label: string; color: string }> = {
  available: { label: "Available", color: "bg-green-500" },
  reserved: { label: "Reserved", color: "bg-orange-500" },
  sold: { label: "Sold", color: "bg-red-500" },
  "launching-soon": { label: "Launching Soon", color: "bg-blue-500" },
};

const clusterOptions = [
  { value: "all", label: "All Clusters" },
  { value: "palmiera-3", label: "Palmiera 3" },
  { value: "mareva-2", label: "Mareva 2" },
  { value: "mareva-1", label: "Mareva" },
  { value: "palmeira-collective", label: "Palmeira Collective" },
  { value: "lavita", label: "Lavita" },
  { value: "adress-villas-tierra", label: "Adress Villas Tierra" },
  { value: "mirage", label: "Mirage" },
  { value: "palace-villas-ostra", label: "Palace Villas Ostra" },
  { value: "palmiera", label: "Palmiera" },
];

const priceRanges = [
  { value: "all", label: "Any Price" },
  { value: "0-15m", label: "Under AED 15M" },
  { value: "15m-20m", label: "AED 15M - 20M" },
  { value: "20m-25m", label: "AED 20M - 25M" },
  { value: "25m-30m", label: "AED 25M - 30M" },
  { value: "30m+", label: "AED 30M+" },
];

function PropertyCardGrid({ item, onViewDetails }: { item: InventoryItem; onViewDetails: (item: InventoryItem) => void }) {
  const project = projects.find((p) => p.id === item.projectId);
  const statusInfo = statusMap[item.status];

  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 relative">
      <div className="relative h-40 sm:h-44 overflow-hidden">
        {project?.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${item.imageGradient}`} />
        )}
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
        <p className="text-xs text-[#C8A45C] font-semibold uppercase tracking-wider mb-1">
          {project?.name}
        </p>
        <h4 className="font-heading font-bold text-[#1A2332] mb-3 text-sm sm:text-base leading-tight">{item.name}</h4>

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
            <p className="font-heading text-lg font-bold text-[#C8A45C]">{formatPrice(item.price)}</p>
          </div>
          <Button
            onClick={() => onViewDetails(item)}
            size="sm"
            className="bg-[#1A2332] text-white hover:bg-[#2A3A52] text-xs rounded-md min-h-[44px]"
          >
            <Eye className="w-3 h-3 mr-1" /> View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function PropertyCardList({ item, onViewDetails }: { item: InventoryItem; onViewDetails: (item: InventoryItem) => void }) {
  const project = projects.find((p) => p.id === item.projectId);
  const statusInfo = statusMap[item.status];

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 flex items-center gap-4 border border-gray-100 hover:border-[#C8A45C]/20">
      {/* Small image */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
        {project?.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${item.imageGradient}`} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] sm:text-xs text-[#C8A45C] font-semibold uppercase tracking-wider">
              {project?.name}
            </p>
            <h4 className="font-heading font-bold text-[#1A2332] text-sm leading-tight truncate">{item.name}</h4>
          </div>
          <Badge className={`${statusInfo.color} text-white text-[10px] flex-shrink-0`}>
            {statusInfo.label}
          </Badge>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 mt-1.5 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Bed className="w-3.5 h-3.5 text-[#C8A45C]" /> {item.bedrooms}BR
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="w-3.5 h-3.5 text-[#C8A45C]" /> {formatSqft(item.areaSqft)}
          </span>
          {item.plotSqft && (
            <span className="hidden sm:inline text-gray-400">Plot: {formatSqft(item.plotSqft)}</span>
          )}
        </div>
      </div>

      {/* Price & Action */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <p className="font-heading text-sm sm:text-lg font-bold text-[#C8A45C] whitespace-nowrap">{formatPrice(item.price)}</p>
        <Button
          onClick={() => onViewDetails(item)}
          size="sm"
          className="bg-[#1A2332] text-white hover:bg-[#2A3A52] text-xs rounded-md min-h-[36px] min-w-[80px]"
        >
          <Eye className="w-3 h-3 mr-1" /> View Details
        </Button>
      </div>
    </div>
  );
}

export default function InventorySection() {
  const [search, setSearch] = useState("");
  const [clusterFilter, setClusterFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("price-asc");
  const [detailItem, setDetailItem] = useState<InventoryItem | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return inventoryItems
      .filter((item) => {
        const project = projects.find((p) => p.id === item.projectId);
        const matchesSearch =
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          project?.name.toLowerCase().includes(search.toLowerCase());
        const matchesCluster = clusterFilter === "all" || item.projectId === clusterFilter;
        const matchesType = typeFilter === "all" || item.type === typeFilter;
        const matchesStatus = statusFilter === "all" || item.status === statusFilter;

        let matchesPrice = true;
        if (priceRange !== "all") {
          if (priceRange === "0-15m") matchesPrice = item.price < 15000000;
          else if (priceRange === "15m-20m") matchesPrice = item.price >= 15000000 && item.price < 20000000;
          else if (priceRange === "20m-25m") matchesPrice = item.price >= 20000000 && item.price < 25000000;
          else if (priceRange === "25m-30m") matchesPrice = item.price >= 25000000 && item.price < 30000000;
          else if (priceRange === "30m+") matchesPrice = item.price >= 30000000;
        }

        return matchesSearch && matchesCluster && matchesType && matchesStatus && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "area-desc") return b.areaSqft - a.areaSqft;
        return 0;
      });
  }, [search, clusterFilter, typeFilter, statusFilter, priceRange, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setClusterFilter("all");
    setTypeFilter("all");
    setStatusFilter("all");
    setPriceRange("all");
  };

  const hasActiveFilters = search || clusterFilter !== "all" || typeFilter !== "all" || statusFilter !== "all" || priceRange !== "all";

  return (
    <section id="inventory" className="py-12 sm:py-20 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            Property Listings
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
            Available Inventory
          </h2>
          <p className="font-body text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            Browse our curated selection of available properties at The Oasis. Premium listings require registration to view full details.
          </p>
          <div className="section-divider max-w-xs mx-auto mt-6" />
        </div>

        {/* Sticky Search Bar + View Toggle */}
        <div className="sticky top-16 sm:top-20 z-10 bg-[#F5F0E8] pt-2 pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search properties..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11 bg-white"
              />
            </div>
            <Button
              variant="outline"
              className="sm:hidden h-11 px-3 border-[#1A2332]/20 min-w-[44px]"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
            <div className="hidden sm:flex items-center gap-1 bg-white rounded-md border border-[#1A2332]/10 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-colors ${viewMode === "grid" ? "bg-[#1A2332] text-[#C8A45C]" : "text-gray-400 hover:text-[#1A2332]"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition-colors ${viewMode === "list" ? "bg-[#1A2332] text-[#C8A45C]" : "text-gray-400 hover:text-[#1A2332]"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters - Collapsible on mobile */}
        <div className={`bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 sm:mb-8 transition-all duration-300 ${filtersOpen ? "block" : "hidden sm:block"}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[#1A2332]">
              <SlidersHorizontal className="w-5 h-5" />
              <span className="font-semibold">Filters</span>
              {hasActiveFilters && (
                <Badge className="bg-[#C8A45C] text-[#1A2332] text-[10px]">Active</Badge>
              )}
            </div>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-xs text-[#C8A45C] hover:text-[#1A2332] font-semibold min-h-[44px] flex items-center">
                <X className="w-3 h-3 mr-1" /> Clear All
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            <Select value={clusterFilter} onValueChange={setClusterFilter}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Cluster" />
              </SelectTrigger>
              <SelectContent>
                {clusterOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="villa">Villas</SelectItem>
                <SelectItem value="mansion">Mansions</SelectItem>
                <SelectItem value="branded-villa">Branded Villas</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="area-desc">Largest Area</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count + Mobile View Toggle */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-[#1A2332]">{filtered.length}</span> of {inventoryItems.length} properties
          </p>
          {/* Mobile view toggle */}
          <div className="flex sm:hidden items-center gap-1 bg-white rounded-md border border-[#1A2332]/10 p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${viewMode === "grid" ? "bg-[#1A2332] text-[#C8A45C]" : "text-gray-400"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${viewMode === "list" ? "bg-[#1A2332] text-[#C8A45C]" : "text-gray-400"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((item) => (
              <PropertyCardGrid key={item.id} item={item} onViewDetails={setDetailItem} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((item) => (
              <PropertyCardList key={item.id} item={item} onViewDetails={setDetailItem} />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No properties match your filters.</p>
            <Button
              variant="outline"
              className="mt-4 min-h-[44px]"
              onClick={clearFilters}
            >
              <X className="w-4 h-4 mr-2" /> Clear Filters
            </Button>
          </div>
        )}
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
