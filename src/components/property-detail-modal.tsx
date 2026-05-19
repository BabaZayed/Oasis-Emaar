"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Bed,
  Maximize,
  MapPin,
  Home,
  X,
  Lock,
  CheckCircle,
  MessageCircle,
  ArrowRight,
  ZoomIn,
  ChevronDown,
} from "lucide-react";
import {
  inventoryItems,
  floorPlans,
  projects,
  formatPrice,
  formatSqft,
  WHATSAPP_LINK,
  type InventoryItem,
} from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Image from "next/image";

// Cluster map URL mapping
const clusterMapUrls: Record<string, string> = {
  "adress-villas-tierra": "/images/maps/adress-villas-tierra-map.png",
  "lavita": "/images/maps/lavita-map.png",
  "palmeira-collective": "/images/maps/palmeira-collective-map.png",
};

function getClusterMapUrl(projectId: string): string {
  return clusterMapUrls[projectId] || "/images/maps/masterplan.png";
}

// Property type label
const propertyTypeLabels: Record<string, string> = {
  villa: "Villa",
  mansion: "Mansion",
  townhouse: "Townhouse",
  apartment: "Apartment",
  penthouse: "Penthouse",
  "branded-villa": "Branded Villa",
};

function checkRegistered(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("oasis_registered") === "true";
}

// Registration form component for premium items
function RegisterSection({ onRegister }: { onRegister: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("oasis_registered", "true");
    setSubmitted(true);
    toast({
      title: "Access Granted!",
      description: "You now have access to premium pricing details.",
    });
    setTimeout(() => {
      onRegister();
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="py-4 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <h4 className="text-lg font-bold text-[#1A2332] mb-1">
          Registration Successful!
        </h4>
        <p className="text-sm text-gray-500">
          Premium pricing is now unlocked.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#1A2332] rounded-xl p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-3">
        <Lock className="w-5 h-5 text-[#C8A45C]" />
        <h4 className="font-heading text-base font-bold text-white">
          Register to Unlock Pricing
        </h4>
      </div>
      <p className="text-white/60 text-sm mb-4">
        Enter your details to view the exact price for this premium property.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Label htmlFor="pdm-name" className="text-white/70 text-xs">
            Full Name
          </Label>
          <Input
            id="pdm-name"
            placeholder="Your full name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
            className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/30 h-9 text-sm"
          />
        </div>
        <div>
          <Label htmlFor="pdm-email" className="text-white/70 text-xs">
            Email
          </Label>
          <Input
            id="pdm-email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/30 h-9 text-sm"
          />
        </div>
        <div>
          <Label htmlFor="pdm-phone" className="text-white/70 text-xs">
            Phone
          </Label>
          <Input
            id="pdm-phone"
            type="tel"
            placeholder="+971 XX XXX XXXX"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
            className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/30 h-9 text-sm"
          />
        </div>
        <Button
          type="submit"
          className="w-full gold-gradient text-[#1A2332] font-bold py-2.5 rounded-md text-sm"
        >
          Unlock Pricing
        </Button>
      </form>
    </div>
  );
}

interface PropertyDetailModalProps {
  item: InventoryItem | null;
  open: boolean;
  onClose: () => void;
}

export default function PropertyDetailModal({
  item,
  open,
  onClose,
}: PropertyDetailModalProps) {
  const [isRegistered, setIsRegistered] = useState(() => checkRegistered());
  const [mapZoomed, setMapZoomed] = useState(false);

  const handleRegistered = useCallback(() => {
    setIsRegistered(true);
  }, []);

  if (!item) return null;

  const project = projects.find((p) => p.id === item.projectId);
  const statusMap: Record<string, { label: string; color: string }> = {
    available: { label: "Available", color: "bg-green-500" },
    reserved: { label: "Reserved", color: "bg-orange-500" },
    sold: { label: "Sold", color: "bg-red-500" },
    "launching-soon": { label: "Launching Soon", color: "bg-blue-500" },
  };
  const statusInfo = statusMap[item.status];

  // Find matching floor plan
  const matchingFloorPlan = item.floorPlan
    ? { imageUrl: item.floorPlan }
    : floorPlans.find(
        (fp) =>
          fp.projectId === item.projectId &&
          fp.bedrooms === item.bedrooms &&
          fp.imageUrl
      );

  const clusterMapUrl = getClusterMapUrl(item.projectId);
  const propertyType =
    propertyTypeLabels[item.type] || "Villa";

  // Key details for the grid
  const keyDetails = [
    {
      icon: Bed,
      label: "Bedrooms",
      value: `${item.bedrooms} Bed`,
    },
    {
      icon: Maximize,
      label: "Built-up Area",
      value: formatSqft(item.areaSqft),
    },
    ...(item.plotSqft
      ? [
          {
            icon: MapPin,
            label: "Plot Area",
            value: formatSqft(item.plotSqft),
          },
        ]
      : []),
    {
      icon: Home,
      label: "Property Type",
      value: propertyType,
    },
    {
      icon: null,
      label: "Price",
      value:
        item.isPremium && !isRegistered
          ? "Register to View"
          : formatPrice(item.price),
      isPrice: true,
      isBlurred: item.isPremium && !isRegistered,
    },
    {
      icon: null,
      label: "Payment Plan",
      value: project?.paymentPlan || "80/20",
    },
  ];

  const modalContent = (
    <div className="flex flex-col h-full max-h-[90vh] sm:max-h-[85vh]">
      {/* Header - Fixed at top */}
      <div className="flex-shrink-0 px-4 sm:px-6 pt-4 sm:pt-6 pb-3 border-b border-gray-100">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm text-[#C8A45C] font-semibold uppercase tracking-wider mb-1">
              {project?.name || item.projectId}
            </p>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#1A2332] leading-tight">
              {item.name}
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge
              className={`${statusInfo.color} text-white text-xs font-semibold`}
            >
              {statusInfo.label}
            </Badge>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors sm:hidden"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-5 overscroll-contain">
        {/* Key Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {keyDetails.map((detail) => (
            <div
              key={detail.label}
              className="bg-[#F5F0E8] rounded-lg p-3 text-center"
            >
              {detail.icon && (
                <detail.icon className="w-4 h-4 text-[#C8A45C] mx-auto mb-1" />
              )}
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">
                {detail.label}
              </p>
              <p
                className={`font-heading text-sm sm:text-base font-bold ${
                  detail.isPrice
                    ? "text-[#C8A45C]"
                    : "text-[#1A2332]"
                } ${detail.isBlurred ? "blur-sm select-none" : ""}`}
              >
                {detail.value}
              </p>
            </div>
          ))}
        </div>

        {/* Premium Registration Section */}
        {item.isPremium && !isRegistered && <RegisterSection onRegister={handleRegistered} />}

        {/* Floor Plan Section */}
        {matchingFloorPlan && (
          <div>
            <h3 className="font-heading text-base sm:text-lg font-bold text-[#1A2332] mb-3">
              Floor Plan
            </h3>
            <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white">
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src={matchingFloorPlan.imageUrl}
                  alt={`${item.name} Floor Plan`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, 600px"
                />
              </div>
            </div>
          </div>
        )}

        {/* Cluster Map / Location Map */}
        <div>
          <h3 className="font-heading text-base sm:text-lg font-bold text-[#1A2332] mb-3">
            Cluster Location Map
          </h3>
          <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-[#F5F0E8]">
            <button
              onClick={() => setMapZoomed(!mapZoomed)}
              className="relative w-full block"
            >
              <div
                className={`relative transition-all duration-300 ${
                  mapZoomed ? "aspect-auto min-h-[400px]" : "aspect-[16/10]"
                }`}
              >
                <Image
                  src={clusterMapUrl}
                  alt={`${project?.name || "Cluster"} Location Map`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, 600px"
                />
              </div>
              <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-sm">
                <ZoomIn className="w-4 h-4 text-[#1A2332]" />
              </div>
            </button>
            {project?.name && (
              <p className="text-center text-xs text-gray-500 py-2">
                {project.name} — The Oasis by Emaar
              </p>
            )}
          </div>
        </div>
      </div>

      {/* CTA Buttons - Fixed at bottom */}
      <div className="flex-shrink-0 px-4 sm:px-6 py-4 border-t border-gray-100 bg-white">
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/availability"
            className="flex-1"
            onClick={onClose}
          >
            <Button className="w-full gold-gradient text-[#1A2332] font-bold py-3 rounded-md hover:opacity-90 text-sm">
              Check Availability
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md text-sm gap-2">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
          </a>
          {project && (
            <Link
              href={`/projects/${project.slug}`}
              className="flex-1"
              onClick={onClose}
            >
              <Button
                variant="outline"
                className="w-full border-[#1A2332] text-[#1A2332] hover:bg-[#1A2332] hover:text-white font-bold py-3 rounded-md text-sm"
              >
                View Cluster
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  // Use Sheet (slide-up) on mobile, Dialog (centered) on desktop
  // We use Dialog for both but with responsive styling
  return (
    <>
      {/* Mobile: Sheet */}
      <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
        <SheetContent
          side="bottom"
          className="h-[92vh] rounded-t-2xl p-0 sm:hidden focus:outline-none"
        >
          {modalContent}
        </SheetContent>
      </Sheet>

      {/* Desktop: Dialog */}
      <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
        <DialogContent className="hidden sm:block max-w-2xl p-0 gap-0 overflow-hidden max-h-[85vh]">
          {modalContent}
        </DialogContent>
      </Dialog>
    </>
  );
}
