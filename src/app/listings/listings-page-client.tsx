"use client";

import { useState, useMemo, useCallback } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { inventoryItems, projects, formatPrice } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Download,
  ShieldCheck,
  Home,
  Sparkles,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  Eye,
} from "lucide-react";

type SortField = "name" | "cluster" | "bedrooms" | "areaSqft" | "price" | "status";
type SortDir = "asc" | "desc";

const VERIFIED_KEY = "oasis-listings-verified";

function getVerifiedIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(VERIFIED_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

function saveVerifiedIds(ids: Set<string>) {
  try {
    localStorage.setItem(VERIFIED_KEY, JSON.stringify([...ids]));
  } catch {
    // ignore
  }
}

function SortIndicator({ field, currentField, dir }: { field: SortField; currentField: SortField; dir: SortDir }) {
  if (currentField !== field) return null;
  return dir === "asc" ? (
    <ChevronUp className="w-3.5 h-3.5 ml-1" />
  ) : (
    <ChevronDown className="w-3.5 h-3.5 ml-1" />
  );
}

export default function ListingsPageClient() {
  const [verifiedIds, setVerifiedIds] = useState<Set<string>>(() => getVerifiedIds());
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCluster, setFilterCluster] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const toggleVerified = useCallback((id: string) => {
    setVerifiedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      saveVerifiedIds(next);
      return next;
    });
  }, []);

  // Build cluster map
  const clusterMap = useMemo(() => {
    const map = new Map<string, string>();
    projects.forEach((p) => map.set(p.id, p.name));
    return map;
  }, []);

  // Unique clusters
  const clusters = useMemo(() => {
    const ids = [...new Set(inventoryItems.map((i) => i.projectId))];
    return ids.map((id) => ({ id, name: clusterMap.get(id) || id }));
  }, [clusterMap]);

  // Stats
  const stats = useMemo(() => {
    const verified = inventoryItems.filter((i) => verifiedIds.has(i.id)).length;
    const available = inventoryItems.filter((i) => i.status === "available").length;
    const reserved = inventoryItems.filter((i) => i.status === "reserved").length;
    const sold = inventoryItems.filter((i) => i.status === "sold").length;
    return {
      total: inventoryItems.length,
      verified,
      pending: inventoryItems.length - verified,
      available,
      reserved,
      sold,
    };
  }, [verifiedIds]);

  // Filter & sort
  const filteredItems = useMemo(() => {
    let items = [...inventoryItems];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((i) => i.name.toLowerCase().includes(q));
    }
    if (filterStatus !== "all") {
      items = items.filter((i) => i.status === filterStatus);
    }
    if (filterCluster !== "all") {
      items = items.filter((i) => i.projectId === filterCluster);
    }

    items.sort((a, b) => {
      let aVal: string | number;
      let bVal: string | number;

      switch (sortField) {
        case "name":
          aVal = a.name;
          bVal = b.name;
          break;
        case "cluster":
          aVal = clusterMap.get(a.projectId) || a.projectId;
          bVal = clusterMap.get(b.projectId) || b.projectId;
          break;
        case "bedrooms":
          aVal = a.bedrooms;
          bVal = b.bedrooms;
          break;
        case "areaSqft":
          aVal = a.areaSqft;
          bVal = b.areaSqft;
          break;
        case "price":
          aVal = a.price;
          bVal = b.price;
          break;
        case "status":
          aVal = a.status;
          bVal = b.status;
          break;
        default:
          return 0;
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        const cmp = aVal.localeCompare(bVal);
        return sortDir === "asc" ? cmp : -cmp;
      }
      return sortDir === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });

    return items;
  }, [searchQuery, filterStatus, filterCluster, sortField, sortDir, clusterMap]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  // Export CSV
  const exportCSV = () => {
    const headers = [
      "Unit Name",
      "Cluster",
      "Type",
      "Bedrooms",
      "Area (sqft)",
      "Plot (sqft)",
      "Price (AED)",
      "Status",
      "Premium",
      "Verified",
    ];
    const rows = filteredItems.map((item) => [
      item.name,
      clusterMap.get(item.projectId) || item.projectId,
      item.type,
      item.bedrooms,
      item.areaSqft,
      item.plotSqft || "",
      item.price,
      item.status,
      item.isPremium ? "Yes" : "No",
      verifiedIds.has(item.id) ? "Yes" : "No",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `oasis-listings-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
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
                Inventory Verification
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
                Property{" "}
                <span className="text-[#C8A45C]">Listings</span>
              </h1>
              <p className="font-body text-white/60 text-lg max-w-2xl mx-auto">
                View and verify all 77 property listings at The Oasis by Emaar.
                Mark each listing as verified to confirm availability with Emaar.
              </p>
              <div className="section-divider max-w-xs mx-auto mt-8" />
            </div>
          </div>
        </section>

        {/* Summary Stats */}
        <section className="bg-[#F5F0E8] border-b border-[#C8A45C]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <p className="font-heading text-2xl font-bold text-[#1A2332]">
                  {stats.total}
                </p>
                <p className="font-body text-xs text-gray-500 uppercase tracking-wider">
                  Total Listed
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <p className="font-heading text-2xl font-bold text-emerald-600">
                    {stats.verified}
                  </p>
                </div>
                <p className="font-body text-xs text-gray-500 uppercase tracking-wider">
                  Verified
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <p className="font-heading text-2xl font-bold text-amber-600">
                    {stats.pending}
                  </p>
                </div>
                <p className="font-body text-xs text-gray-500 uppercase tracking-wider">
                  Pending
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <p className="font-heading text-2xl font-bold text-emerald-600">
                    {stats.available}
                  </p>
                </div>
                <p className="font-body text-xs text-gray-500 uppercase tracking-wider">
                  Available
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <p className="font-heading text-2xl font-bold text-amber-600">
                    {stats.reserved}
                  </p>
                </div>
                <p className="font-body text-xs text-gray-500 uppercase tracking-wider">
                  Reserved
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <p className="font-heading text-2xl font-bold text-red-600">
                    {stats.sold}
                  </p>
                </div>
                <p className="font-body text-xs text-gray-500 uppercase tracking-wider">
                  Sold
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Table */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
              <div className="relative flex-1 w-full sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by unit name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCluster} onValueChange={setFilterCluster}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="All Clusters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clusters</SelectItem>
                  {clusters.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="w-full sm:w-auto gap-2"
                onClick={exportCSV}
              >
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>

            <p className="font-body text-sm text-gray-500 mb-4">
              Showing{" "}
              <span className="font-semibold text-[#1A2332]">
                {filteredItems.length}
              </span>{" "}
              of {inventoryItems.length} listings
            </p>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#F5F0E8] hover:bg-[#F5F0E8]">
                    <TableHead
                      className="cursor-pointer select-none font-semibold text-[#1A2332]"
                      onClick={() => handleSort("name")}
                    >
                      <span className="flex items-center">
                        Unit Name <SortIndicator field="name" currentField={sortField} dir={sortDir} />
                      </span>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer select-none font-semibold text-[#1A2332]"
                      onClick={() => handleSort("cluster")}
                    >
                      <span className="flex items-center">
                        Cluster <SortIndicator field="cluster" currentField={sortField} dir={sortDir} />
                      </span>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer select-none font-semibold text-[#1A2332]"
                      onClick={() => handleSort("bedrooms")}
                    >
                      <span className="flex items-center">
                        Type <SortIndicator field="bedrooms" currentField={sortField} dir={sortDir} />
                      </span>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer select-none font-semibold text-[#1A2332]"
                      onClick={() => handleSort("areaSqft")}
                    >
                      <span className="flex items-center">
                        Area <SortIndicator field="areaSqft" currentField={sortField} dir={sortDir} />
                      </span>
                    </TableHead>
                    <TableHead className="font-semibold text-[#1A2332]">
                      Plot
                    </TableHead>
                    <TableHead
                      className="cursor-pointer select-none font-semibold text-[#1A2332]"
                      onClick={() => handleSort("price")}
                    >
                      <span className="flex items-center">
                        Price <SortIndicator field="price" currentField={sortField} dir={sortDir} />
                      </span>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer select-none font-semibold text-[#1A2332]"
                      onClick={() => handleSort("status")}
                    >
                      <span className="flex items-center">
                        Status <SortIndicator field="status" currentField={sortField} dir={sortDir} />
                      </span>
                    </TableHead>
                    <TableHead className="font-semibold text-[#1A2332] text-center">
                      Verified
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => {
                    const isVerified = verifiedIds.has(item.id);
                    return (
                      <TableRow
                        key={item.id}
                        className={`hover:bg-[#F5F0E8]/50 transition-colors ${
                          isVerified ? "bg-emerald-50/30" : ""
                        }`}
                      >
                        <TableCell className="font-heading font-semibold text-[#1A2332]">
                          <div className="flex items-center gap-2">
                            {item.name}
                            {item.isPremium && (
                              <Sparkles className="w-3.5 h-3.5 text-[#C8A45C]" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-body text-gray-600">
                          {clusterMap.get(item.projectId) || item.projectId}
                        </TableCell>
                        <TableCell className="font-body text-gray-600">
                          {item.bedrooms}BR {item.type}
                        </TableCell>
                        <TableCell className="font-body text-gray-600">
                          {item.areaSqft.toLocaleString()}
                        </TableCell>
                        <TableCell className="font-body text-gray-600">
                          {item.plotSqft
                            ? item.plotSqft.toLocaleString()
                            : "—"}
                        </TableCell>
                        <TableCell className="font-heading font-semibold text-[#C8A45C]">
                          AED {item.price.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {item.status === "available" ? (
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Available
                            </Badge>
                          ) : item.status === "reserved" ? (
                            <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              Reserved
                            </Badge>
                          ) : (
                            <Badge className="bg-red-500/10 text-red-600 border-red-500/20 text-xs">
                              <XCircle className="w-3 h-3 mr-1" />
                              Sold
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {isVerified ? (
                            <div className="flex items-center justify-center gap-1.5">
                              <ShieldCheck className="w-5 h-5 text-emerald-500" />
                              <span className="text-xs font-body font-medium text-emerald-600">
                                Verified
                              </span>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-amber-600 border-amber-300 hover:bg-amber-50 text-xs"
                              onClick={() => toggleVerified(item.id)}
                            >
                              <Eye className="w-3.5 h-3.5 mr-1" />
                              Verify
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-16">
                <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-[#1A2332] mb-2">
                  No Listings Found
                </h3>
                <p className="font-body text-gray-500">
                  Try adjusting your search or filters.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
