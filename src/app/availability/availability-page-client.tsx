"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { inventoryItems, projects, formatPrice, EMAIL, WHATSAPP_LINK, PHONE_NUMBER } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bed,
  Maximize,
  MapPin,
  Crown,
  CheckCircle,
  Clock,
  XCircle,
  ArrowRight,
  Search,
  ChevronDown,
  Phone,
  Mail,
  MessageCircle,
  SlidersHorizontal,
  Home,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { trackLead } from "@/lib/meta-pixel";

type SortOption = "price-asc" | "price-desc" | "area" | "newest";

function StatusBadge({ status }: { status: string }) {
  if (status === "available") {
    return (
      <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs font-semibold">
        <CheckCircle className="w-3 h-3 mr-1" />
        Available
      </Badge>
    );
  }
  if (status === "reserved") {
    return (
      <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-xs font-semibold">
        <Clock className="w-3 h-3 mr-1" />
        Reserved
      </Badge>
    );
  }
  return (
    <Badge className="bg-red-500/10 text-red-600 border-red-500/20 text-xs font-semibold">
      <XCircle className="w-3 h-3 mr-1" />
      Sold
    </Badge>
  );
}

export default function AvailabilityPageClient() {
  const [selectedCluster, setSelectedCluster] = useState<string>("all");
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("price-asc");
  const [showFilters, setShowFilters] = useState(false);

  // Form state
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formInterest, setFormInterest] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // Summary stats
  const availableCount = inventoryItems.filter((i) => i.status === "available").length;
  const totalCount = inventoryItems.length;
  const startingPrice = Math.min(...inventoryItems.filter((i) => i.status === "available").map((i) => i.price));

  // Build cluster map
  const clusterMap = useMemo(() => {
    const map = new Map<string, string>();
    projects.forEach((p) => map.set(p.id, p.name));
    return map;
  }, []);

  // Unique clusters from inventory
  const clustersInInventory = useMemo(() => {
    const ids = [...new Set(inventoryItems.map((i) => i.projectId))];
    return ids.map((id) => ({ id, name: clusterMap.get(id) || id }));
  }, [clusterMap]);

  // Filter & sort
  const filteredItems = useMemo(() => {
    let items = [...inventoryItems];

    if (selectedCluster !== "all") {
      items = items.filter((i) => i.projectId === selectedCluster);
    }
    if (selectedBedrooms !== "all") {
      items = items.filter((i) => i.bedrooms === parseInt(selectedBedrooms));
    }
    if (selectedStatus !== "all") {
      items = items.filter((i) => i.status === selectedStatus);
    }
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      items = items.filter((i) => {
        if (max) return i.price >= min && i.price <= max;
        return i.price >= min;
      });
    }

    switch (sortBy) {
      case "price-asc":
        items.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        items.sort((a, b) => b.price - a.price);
        break;
      case "area":
        items.sort((a, b) => b.areaSqft - a.areaSqft);
        break;
      case "newest":
        items.sort((a, b) => b.id.localeCompare(a.id));
        break;
    }

    return items;
  }, [selectedCluster, selectedBedrooms, selectedStatus, priceRange, sortBy]);

  // Group by cluster
  const grouped = useMemo(() => {
    const groups = new Map<string, typeof filteredItems>();
    filteredItems.forEach((item) => {
      const key = item.projectId;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(item);
    });
    return groups;
  }, [filteredItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError("");
    setFormSuccess(false);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          phone: formPhone,
          email: formEmail,
          propertyInterest: formInterest,
          formType: "availability",
          pageUrl: window.location.href,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFormSuccess(true);

        // Meta Pixel tracking
        trackLead({
          formType: "availability",
          propertyInterest: formInterest || undefined,
        });

        setFormName("");
        setFormPhone("");
        setFormEmail("");
        setFormInterest("");
      } else {
        setFormError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 bg-[#1A2332] relative overflow-hidden">
          <div className="absolute inset-0 hero-overlay" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#C8A45C]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-56 h-56 bg-[#C8A45C]/5 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
                Real-Time Inventory
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
                Check Availability at{" "}
                <span className="text-[#C8A45C]">The Oasis</span>
              </h1>
              <p className="font-body text-white/60 text-lg max-w-2xl mx-auto">
                Browse real-time availability of luxury villas, mansions, and
                branded residences across all 9 clusters. Updated directly from
                Emaar&apos;s inventory system.
              </p>
              <div className="section-divider max-w-xs mx-auto mt-8" />
            </div>
          </div>
        </section>

        {/* Summary Stats Bar */}
        <section className="bg-[#F5F0E8] border-b border-[#C8A45C]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="font-heading text-2xl font-bold text-emerald-600">
                    {availableCount}
                  </p>
                  <p className="font-body text-xs text-gray-500 uppercase tracking-wider">
                    Available Properties
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-[#1A2332] flex items-center justify-center flex-shrink-0">
                  <Home className="w-6 h-6 text-[#C8A45C]" />
                </div>
                <div>
                  <p className="font-heading text-2xl font-bold text-[#1A2332]">
                    {totalCount}
                  </p>
                  <p className="font-body text-xs text-gray-500 uppercase tracking-wider">
                    Total Properties
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-[#C8A45C]/10 flex items-center justify-center flex-shrink-0">
                  <Crown className="w-6 h-6 text-[#C8A45C]" />
                </div>
                <div>
                  <p className="font-heading text-2xl font-bold text-[#1A2332]">
                    {formatPrice(startingPrice)}
                  </p>
                  <p className="font-body text-xs text-gray-500 uppercase tracking-wider">
                    Starting Price
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-white sticky top-16 sm:top-20 z-30 border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading text-lg font-bold text-[#1A2332]">
                Filter Properties
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                {showFilters ? "Hide" : "Show"} Filters
              </Button>
            </div>

            <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {/* Cluster */}
                <Select value={selectedCluster} onValueChange={setSelectedCluster}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Clusters" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Clusters</SelectItem>
                    {clustersInInventory.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Bedrooms */}
                <Select value={selectedBedrooms} onValueChange={setSelectedBedrooms}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Bedrooms</SelectItem>
                    <SelectItem value="4">4 Bedroom</SelectItem>
                    <SelectItem value="5">5 Bedroom</SelectItem>
                    <SelectItem value="6">6 Bedroom</SelectItem>
                    <SelectItem value="7">7 Bedroom</SelectItem>
                  </SelectContent>
                </Select>

                {/* Price Range */}
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Price</SelectItem>
                    <SelectItem value="0-15000000">Under AED 15M</SelectItem>
                    <SelectItem value="15000000-20000000">AED 15M - 20M</SelectItem>
                    <SelectItem value="20000000-30000000">AED 20M - 30M</SelectItem>
                    <SelectItem value="30000000-50000000">AED 30M - 50M</SelectItem>
                    <SelectItem value="50000000">AED 50M+</SelectItem>
                  </SelectContent>
                </Select>

                {/* Status */}
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="area">Largest Area</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="font-body text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-[#1A2332]">
                  {filteredItems.length}
                </span>{" "}
                of {totalCount} properties
              </p>
              {(selectedCluster !== "all" ||
                selectedBedrooms !== "all" ||
                selectedStatus !== "all" ||
                priceRange !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#C8A45C] hover:text-[#C8A45C]"
                  onClick={() => {
                    setSelectedCluster("all");
                    setSelectedBedrooms("all");
                    setSelectedStatus("all");
                    setPriceRange("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Properties by Cluster */}
        <section className="py-12 sm:py-16 bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredItems.length === 0 ? (
              <div className="text-center py-16">
                <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-[#1A2332] mb-2">
                  No Properties Found
                </h3>
                <p className="font-body text-gray-500">
                  Try adjusting your filters to see more results.
                </p>
                <Button
                  className="mt-4 gold-gradient text-[#1A2332] font-semibold"
                  onClick={() => {
                    setSelectedCluster("all");
                    setSelectedBedrooms("all");
                    setSelectedStatus("all");
                    setPriceRange("all");
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              [...grouped.entries()].map(([clusterId, items]) => {
                const clusterName = clusterMap.get(clusterId) || clusterId;
                const availableInCluster = items.filter(
                  (i) => i.status === "available"
                ).length;
                const project = projects.find((p) => p.id === clusterId);

                return (
                  <div key={clusterId} className="mb-12 last:mb-0">
                    {/* Cluster Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                      <div>
                        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1A2332]">
                          {clusterName}
                        </h2>
                        {project && (
                          <p className="font-body text-sm text-gray-500 mt-1">
                            {project.tagline}
                          </p>
                        )}
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-sm font-semibold self-start">
                        <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                        {availableInCluster} Available of {items.length}
                      </Badge>
                    </div>

                    {/* Property Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                      {items.map((item, idx) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.03 }}
                        >
                          <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                            {/* Card Header with Gradient */}
                            <div
                              className={`relative h-24 bg-gradient-to-br ${item.imageGradient} flex items-end p-4`}
                            >
                              {item.isPremium && (
                                <Badge className="absolute top-3 right-3 bg-[#C8A45C] text-white text-[10px] font-bold px-2 py-0.5">
                                  <Sparkles className="w-3 h-3 mr-1" />
                                  Premium
                                </Badge>
                              )}
                              <StatusBadge status={item.status} />
                            </div>

                            <CardContent className="p-4 flex-1 flex flex-col">
                              <h3 className="font-heading text-base font-bold text-[#1A2332] mb-3">
                                {item.name}
                              </h3>

                              <div className="space-y-2 mb-4 flex-1">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Bed className="w-4 h-4 text-[#C8A45C]" />
                                  <span>{item.bedrooms} Bedroom</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Maximize className="w-4 h-4 text-[#C8A45C]" />
                                  <span>
                                    {item.areaSqft.toLocaleString()} sqft
                                  </span>
                                </div>
                                {item.plotSqft && (
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4 text-[#C8A45C]" />
                                    <span>
                                      Plot: {item.plotSqft.toLocaleString()} sqft
                                    </span>
                                  </div>
                                )}
                              </div>

                              <div className="pt-3 border-t border-gray-100">
                                <p className="font-body text-xs text-gray-400 uppercase tracking-wider mb-1">
                                  Price
                                </p>
                                <p className="font-heading text-xl font-bold text-[#C8A45C]">
                                  AED {item.price.toLocaleString()}
                                </p>
                              </div>

                              <a href="#contact">
                                <Button
                                  className={`w-full mt-4 font-semibold text-sm rounded-md ${
                                    item.status === "available"
                                      ? "gold-gradient text-[#1A2332] hover:opacity-90"
                                      : item.status === "reserved"
                                        ? "bg-amber-500 text-white hover:bg-amber-600"
                                        : "bg-gray-400 text-white cursor-not-allowed"
                                  }`}
                                  disabled={item.status === "sold"}
                                >
                                  {item.status === "available"
                                    ? "Request Details"
                                    : item.status === "reserved"
                                      ? "Join Waitlist"
                                      : "Sold"}
                                  {item.status !== "sold" && (
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                  )}
                                </Button>
                              </a>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Contact / CTA Section */}
        <section id="contact" className="py-20 sm:py-28 bg-[#1A2332] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left: Info */}
              <div>
                <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
                  Get in Touch
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3 mb-6">
                  Interested in a Property?
                </h2>
                <p className="font-body text-white/60 text-lg mb-8">
                  As an authorised Emaar sales agent, we provide exclusive access
                  to pricing, floor plans, and priority reservations across all
                  9 clusters at The Oasis.
                </p>

                <div className="space-y-4">
                  <a
                    href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                    className="flex items-center gap-4 text-white/70 hover:text-[#C8A45C] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#C8A45C]" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-white/40 uppercase tracking-wider">
                        Call Us
                      </p>
                      <p className="font-body text-base">{PHONE_NUMBER}</p>
                    </div>
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-4 text-white/70 hover:text-[#C8A45C] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#C8A45C]" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-white/40 uppercase tracking-wider">
                        Email
                      </p>
                      <p className="font-body text-base">{EMAIL}</p>
                    </div>
                  </a>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-white/70 hover:text-[#C8A45C] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-[#C8A45C]" />
                    </div>
                    <div>
                      <p className="font-body text-xs text-white/40 uppercase tracking-wider">
                        WhatsApp
                      </p>
                      <p className="font-body text-base">
                        Chat with us instantly
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right: Form */}
              <div>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="font-heading text-xl font-bold text-white mb-6">
                      Request Property Details
                    </h3>

                    {formSuccess ? (
                      <div className="text-center py-8">
                        <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                        <h4 className="font-heading text-xl font-bold text-white mb-2">
                          Thank You!
                        </h4>
                        <p className="font-body text-white/60">
                          Our property consultant will contact you within 2 hours
                          with exclusive options and pricing.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label
                            htmlFor="name"
                            className="font-body text-sm text-white/70"
                          >
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            required
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="Your full name"
                            className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/30"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="phone"
                            className="font-body text-sm text-white/70"
                          >
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            required
                            type="tel"
                            value={formPhone}
                            onChange={(e) => setFormPhone(e.target.value)}
                            placeholder="+971 XX XXX XXXX"
                            className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/30"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="email"
                            className="font-body text-sm text-white/70"
                          >
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            required
                            type="email"
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/30"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="interest"
                            className="font-body text-sm text-white/70"
                          >
                            Interested In
                          </Label>
                          <Select
                            value={formInterest}
                            onValueChange={setFormInterest}
                          >
                            <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select a cluster..." />
                            </SelectTrigger>
                            <SelectContent>
                              {projects.map((p) => (
                                <SelectItem key={p.id} value={p.name}>
                                  {p.name}
                                </SelectItem>
                              ))}
                              <SelectItem value="General">
                                General Inquiry
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {formError && (
                          <p className="text-red-400 text-sm font-body">
                            {formError}
                          </p>
                        )}

                        <Button
                          type="submit"
                          disabled={formSubmitting}
                          className="w-full gold-gradient text-[#1A2332] font-bold py-3 rounded-md hover:opacity-90 transition-opacity"
                        >
                          {formSubmitting
                            ? "Submitting..."
                            : "Request Details"}
                          {!formSubmitting && (
                            <ArrowRight className="w-4 h-4 ml-2" />
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
