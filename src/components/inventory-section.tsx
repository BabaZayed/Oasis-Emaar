"use client";

import { useState } from "react";
import { inventoryItems, projects, formatPrice, formatSqft, type InventoryItem, type PropertyType, type PropertyStatus } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bed, Maximize, Lock, Search, SlidersHorizontal, X } from "lucide-react";
import { PaywallModal } from "@/components/paywall-modal";

function PropertyCard({ item, onPremiumClick }: { item: InventoryItem; onPremiumClick: (item: InventoryItem) => void }) {
  const statusMap: Record<PropertyStatus, { label: string; color: string }> = {
    available: { label: "Available", color: "bg-green-500" },
    reserved: { label: "Reserved", color: "bg-orange-500" },
    sold: { label: "Sold", color: "bg-red-500" },
    "launching-soon": { label: "Launching Soon", color: "bg-blue-500" },
  };
  const project = projects.find((p) => p.id === item.projectId);
  const statusInfo = statusMap[item.status];

  const handleClick = () => {
    if (item.isPremium) {
      onPremiumClick(item);
    }
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 relative">
      {/* Image */}
      <div className={`relative h-44 bg-gradient-to-br ${item.imageGradient} overflow-hidden`}>
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
        <h4 className="font-bold text-[#1A2332] mb-3 text-sm sm:text-base">{item.name}</h4>

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
            <p className="text-lg font-bold text-[#C8A45C]">{formatPrice(item.price)}</p>
          </div>
          {item.isPremium ? (
            <Button
              onClick={handleClick}
              size="sm"
              className="bg-[#1A2332] text-white hover:bg-[#2A3A52] text-xs rounded-md"
            >
              <Lock className="w-3 h-3 mr-1" /> Unlock
            </Button>
          ) : (
            <Button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              size="sm"
              className="bg-[#1A2332] text-white hover:bg-[#2A3A52] text-xs rounded-md"
            >
              Inquire
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function InventorySection() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("price-asc");
  const [premiumItem, setPremiumItem] = useState<InventoryItem | null>(null);

  const filtered = inventoryItems
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        projects.find((p) => p.id === item.projectId)?.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "all" || item.type === typeFilter;
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "area-desc") return b.areaSqft - a.areaSqft;
      return 0;
    });

  return (
    <section id="inventory" className="py-20 sm:py-28 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            Property Listings
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
            Available Inventory
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Browse our curated selection of available properties at The Oasis. Premium listings require registration to view full details.
          </p>
          <div className="section-divider max-w-xs mx-auto mt-6" />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8">
          <div className="flex items-center gap-2 mb-4 text-[#1A2332]">
            <SlidersHorizontal className="w-5 h-5" />
            <span className="font-semibold">Filters</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search properties..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="villa">Villas</SelectItem>
                <SelectItem value="mansion">Mansions</SelectItem>
                <SelectItem value="townhouse">Townhouses</SelectItem>
                <SelectItem value="apartment">Apartments</SelectItem>
                <SelectItem value="penthouse">Penthouses</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
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

        {/* Results Count */}
        <p className="text-sm text-gray-500 mb-6">
          Showing {filtered.length} of {inventoryItems.length} properties
        </p>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <PropertyCard key={item.id} item={item} onPremiumClick={setPremiumItem} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No properties match your filters.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => { setSearch(""); setTypeFilter("all"); setStatusFilter("all"); }}
            >
              <X className="w-4 h-4 mr-2" /> Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Paywall Modal */}
      <PaywallModal
        open={!!premiumItem}
        onClose={() => setPremiumItem(null)}
        itemName={premiumItem?.name || ""}
      />
    </section>
  );
}
