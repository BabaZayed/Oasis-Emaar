"use client";

import { useState, useEffect, useCallback } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { projects, formatPrice, type PropertyType } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Bed, Maximize, MessageCircle, Phone, Search, SlidersHorizontal, X, Building2, ArrowRight, ShieldCheck, Crown, MapPin, Clock } from "lucide-react";
import Link from "next/link";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://oasisemaar.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Marketplace",
      item: "https://oasisemaar.com/marketplace",
    },
  ],
};

interface SellerListing {
  id: string;
  propertyType: string;
  villaNumber: string;
  cluster: string;
  bedrooms: number;
  areaSqft: number;
  price: number;
  name: string;
  email: string;
  phone: string;
  whatsapp: string | null;
  description: string | null;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
}

const propertyTypeLabels: Record<string, string> = {
  villa: "Villa",
  mansion: "Mansion",
  townhouse: "Townhouse",
  apartment: "Apartment",
  penthouse: "Penthouse",
  "branded-villa": "Branded Villa",
};

const propertyTypeColors: Record<string, string> = {
  villa: "bg-emerald-500",
  mansion: "bg-amber-600",
  townhouse: "bg-blue-500",
  apartment: "bg-violet-500",
  penthouse: "bg-rose-500",
  "branded-villa": "bg-[#C8A45C]",
};

function ListingCard({ listing }: { listing: SellerListing }) {
  const project = projects.find((p) => p.id === listing.cluster);
  const projectName = project?.name || listing.cluster;
  const contactNumber = listing.whatsapp || listing.phone;
  const whatsappUrl = `https://wa.me/${contactNumber.replace(/[^0-9+]/g, "")}`;
  const descriptionSnippet = listing.description
    ? listing.description.length > 100
      ? listing.description.substring(0, 100) + "..."
      : listing.description
    : null;

  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
      {/* Header with gradient */}
      <div className="relative h-32 bg-gradient-to-br from-[#1A2332] to-[#2A3A52] overflow-hidden">
        <div className="absolute inset-0 bg-[#C8A45C]/10" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <Badge className={`${propertyTypeColors[listing.propertyType] || "bg-gray-500"} text-white text-xs font-semibold`}>
            {propertyTypeLabels[listing.propertyType] || listing.propertyType}
          </Badge>
          <Badge className="bg-white/20 backdrop-blur-sm text-white text-xs border-0">
            Verified
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[#C8A45C] text-xs font-semibold uppercase tracking-wider">{projectName}</p>
          <h4 className="font-heading text-lg font-bold text-white mt-0.5">
            Unit {listing.villaNumber}
          </h4>
        </div>
      </div>

      <CardContent className="p-5">
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-[#C8A45C]" /> {listing.bedrooms} Bed
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4 text-[#C8A45C]" /> {listing.areaSqft.toLocaleString()} sqft
          </span>
        </div>

        {descriptionSnippet && (
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            {descriptionSnippet}
          </p>
        )}

        <div className="flex items-end justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Asking Price</p>
            <p className="font-heading text-xl font-bold text-[#C8A45C]">{formatPrice(listing.price)}</p>
          </div>
          <div className="flex gap-2">
            <a href={`tel:${listing.phone}`}>
              <Button
                size="sm"
                variant="outline"
                className="border-[#1A2332] text-[#1A2332] hover:bg-[#1A2332] hover:text-white text-xs rounded-md h-9 w-9 p-0"
              >
                <Phone className="w-4 h-4" />
              </Button>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white text-xs rounded-md gap-1.5"
              >
                <MessageCircle className="w-4 h-4" /> Contact
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ListingSkeleton() {
  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <div className="h-32 bg-gradient-to-br from-[#1A2332] to-[#2A3A52]" />
      <CardContent className="p-5">
        <Skeleton className="h-3 w-20 mb-2" />
        <Skeleton className="h-5 w-32 mb-4" />
        <div className="flex gap-4 mb-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        <div className="flex justify-between items-end pt-4 border-t border-gray-100">
          <div>
            <Skeleton className="h-3 w-16 mb-1" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function MarketplacePage() {
  const [listings, setListings] = useState<SellerListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [propertyType, setPropertyType] = useState<string>("all");
  const [cluster, setCluster] = useState<string>("all");
  const [bedrooms, setBedrooms] = useState<string>("all");
  const [sort, setSort] = useState<string>("newest");

  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (propertyType && propertyType !== "all") params.set("propertyType", propertyType);
      if (cluster && cluster !== "all") params.set("cluster", cluster);
      if (bedrooms && bedrooms !== "all") params.set("bedrooms", bedrooms);
      if (sort) params.set("sort", sort);

      const res = await fetch(`/api/marketplace?${params.toString()}`);
      const data = await res.json();

      if (data.listings) {
        setListings(data.listings);
      }
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    } finally {
      setLoading(false);
    }
  }, [propertyType, cluster, bedrooms, sort]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
                Resale Properties
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
                Resale Marketplace
              </h1>
              <p className="font-body text-white/60 text-lg max-w-2xl mx-auto">
                Browse verified properties listed by current owners at The Oasis by Emaar
              </p>
              <div className="section-divider max-w-xs mx-auto mt-8" />
            </div>
          </div>
        </section>

        {/* Why Buy Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
                Why Invest Here
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1A2332] mt-3 mb-4">
                Why Buy at The Oasis?
              </h2>
              <div className="section-divider max-w-xs mx-auto mt-6" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[
                { icon: ShieldCheck, title: "100% Freehold Ownership", desc: "Full ownership rights for all nationalities in this designated freehold area. Buy, sell, and lease with complete confidence." },
                { icon: Crown, title: "Golden Visa Eligibility", desc: "Properties above AED 2M qualify for the UAE Golden Visa — secure long-term residency for you and your family." },
                { icon: Building2, title: "80/20 Payment Plan", desc: "Flexible payment with just 20% on handover. Invest with minimal upfront commitment and maximum flexibility." },
                { icon: MapPin, title: "World-Class Amenities", desc: "Crystal lagoons, private beaches, 25% green space, 1.5M sqft retail — resort-style living every day." },
                { icon: Clock, title: "20 Minutes from Downtown", desc: "Strategically located in Dubailand near Hessa Street, just 20 minutes from Downtown Dubai and major landmarks." },
                { icon: ShieldCheck, title: "Verified Listings", desc: "Every resale listing is verified by our team for authenticity, ensuring a safe and transparent buying experience." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-[#F5F0E8] rounded-xl p-6 hover:shadow-md transition-all duration-300 group border border-transparent hover:border-[#C8A45C]/20"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#1A2332] flex items-center justify-center mb-4 group-hover:bg-[#C8A45C] transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-[#C8A45C] group-hover:text-[#1A2332] transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#1A2332] mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#listings">
                <Button
                  size="lg"
                  className="gold-gradient text-[#1A2332] font-bold px-8 py-6 rounded-md hover:opacity-90 w-full sm:w-auto"
                >
                  Browse Listings <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <Link href="/sell">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#1A2332] text-[#1A2332] hover:bg-[#1A2332] hover:text-white px-8 py-6 rounded-md w-full sm:w-auto"
                >
                  List Your Property
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Filters + Listings */}
        <section id="listings" className="py-16 sm:py-24 bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Bar */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8">
              <div className="flex items-center gap-2 mb-4 text-[#1A2332]">
                <SlidersHorizontal className="w-5 h-5" />
                <span className="font-semibold">Filters</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="mansion">Mansion</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="branded-villa">Branded Villa</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={cluster} onValueChange={setCluster}>
                  <SelectTrigger>
                    <SelectValue placeholder="Cluster / Project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Clusters</SelectItem>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger>
                    <SelectValue placeholder="Bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Bedrooms</SelectItem>
                    <SelectItem value="3">3+ Bedrooms</SelectItem>
                    <SelectItem value="4">4+ Bedrooms</SelectItem>
                    <SelectItem value="5">5+ Bedrooms</SelectItem>
                    <SelectItem value="6">6+ Bedrooms</SelectItem>
                    <SelectItem value="7">7+ Bedrooms</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Count */}
            {!loading && (
              <p className="text-sm text-gray-500 mb-6">
                {listings.length > 0
                  ? `Showing ${listings.length} verified listing${listings.length !== 1 ? "s" : ""}`
                  : "No listings found"}
              </p>
            )}

            {/* Loading Skeletons */}
            {loading && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ListingSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Listings Grid */}
            {!loading && listings.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && listings.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-[#1A2332]/5 flex items-center justify-center mx-auto mb-6">
                  <Building2 className="w-10 h-10 text-[#C8A45C]/50" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#1A2332] mb-3">
                  No listings available yet
                </h3>
                <p className="font-body text-gray-500 max-w-md mx-auto mb-8">
                  Be the first to list your property on our resale marketplace and reach thousands of potential buyers at The Oasis by Emaar.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/sell">
                    <Button
                      size="lg"
                      className="gold-gradient text-[#1A2332] font-bold px-8 py-6 rounded-md hover:opacity-90"
                    >
                      List Your Property <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[#1A2332] text-[#1A2332] hover:bg-[#1A2332] hover:text-white px-8 py-6 rounded-md"
                    onClick={() => {
                      setPropertyType("all");
                      setCluster("all");
                      setBedrooms("all");
                      setSort("newest");
                    }}
                  >
                    <X className="w-4 h-4 mr-2" /> Clear Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Cross-link to sell */}
            <div className="mt-12 bg-white rounded-xl p-6 sm:p-8 shadow-md text-center">
              <h3 className="font-heading text-xl font-bold text-[#1A2332] mb-2">Have a property to sell?</h3>
              <p className="font-body text-gray-500 mb-4">List your property on our marketplace and reach thousands of verified buyers.</p>
              <Link href="/sell">
                <Button className="bg-[#1A2332] text-white hover:bg-[#2A3A52] px-6 py-3 rounded-md">
                  List Your Property <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
      </div>
    </>
  );
}
