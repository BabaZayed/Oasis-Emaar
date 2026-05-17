'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bed, Maximize, Eye, Lock, Building2 } from 'lucide-react';
import { InventoryItem } from '@/lib/data';

interface PropertyCardProps {
  item: InventoryItem;
  onViewDetails: (item: InventoryItem) => void;
}

const statusStyles: Record<string, string> = {
  Available: 'bg-emerald-500',
  Reserved: 'bg-amber-500',
  Sold: 'bg-red-500',
};

export default function PropertyCard({ item, onViewDetails }: PropertyCardProps) {
  const handleClick = () => {
    onViewDetails(item);
  };

  return (
    <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 bg-white">
      {/* Image */}
      <div className="relative h-44 overflow-hidden placeholder-apartment">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Building2 className="w-8 h-8 text-gold/30 mx-auto mb-1" />
            <p className="text-xs text-navy/30">Property Image</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-300" />

        {/* Status Badge */}
        <Badge className={`absolute top-3 left-3 ${statusStyles[item.status]} text-white text-xs`}>
          {item.status}
        </Badge>

        {/* Premium Badge */}
        {item.isPremium && (
          <Badge className="absolute top-3 right-3 bg-gold text-white text-xs flex items-center gap-1">
            <Crown className="w-3 h-3" />
            Premium
          </Badge>
        )}

        {/* Price */}
        <div className="absolute bottom-3 left-3 bg-navy/80 backdrop-blur-sm px-3 py-1.5 rounded-md">
          <p className="text-sm font-bold text-gold">{item.priceLabel}</p>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-heading font-bold text-navy text-base mb-1">{item.name}</h3>
        <p className="text-xs text-gold font-medium mb-3">{item.projectName}</p>

        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 text-gold" />
            <span>{item.bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="w-3.5 h-3.5 text-gold" />
            <span>{item.area.toLocaleString()} sqft</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-gold" />
            <span>{item.view}</span>
          </div>
          <div className="text-muted-foreground/70">
            {item.floor}
          </div>
        </div>

        <Button
          onClick={handleClick}
          variant="outline"
          className="w-full font-semibold text-sm rounded-md transition-all border-navy/20 text-navy hover:bg-navy hover:text-white"
        >
          <Eye className="w-3.5 h-3.5 mr-1.5" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

function Crown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
      <path d="M5 16l-1 4h16l-1-4" />
    </svg>
  );
}
