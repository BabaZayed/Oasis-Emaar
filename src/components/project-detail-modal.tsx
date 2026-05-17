'use client';

import { Project } from '@/lib/data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bed, Maximize, Calendar, MapPin, Check, ArrowRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, open, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  const statusColor = {
    'Ready': 'bg-emerald-500',
    'Off-Plan': 'bg-amber-500',
    'Launching Soon': 'bg-rose-500',
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white border-border">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="text-2xl font-bold text-navy">
              {project.name}
            </DialogTitle>
            <Badge className={`${statusColor[project.status]} text-white text-xs`}>
              {project.status}
            </Badge>
          </div>
          <p className="text-gold font-medium text-sm">{project.tagline}</p>
        </DialogHeader>

        {/* Image */}
        <div className="relative w-full h-48 sm:h-64 rounded-lg overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Key Info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
          <div className="flex items-center gap-2 p-3 bg-cream rounded-lg">
            <Bed className="w-5 h-5 text-gold" />
            <div>
              <p className="text-xs text-muted-foreground">Bedrooms</p>
              <p className="font-semibold text-navy text-sm">{project.bedrooms} BR</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-cream rounded-lg">
            <Maximize className="w-5 h-5 text-gold" />
            <div>
              <p className="text-xs text-muted-foreground">Area</p>
              <p className="font-semibold text-navy text-sm">{project.area}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-cream rounded-lg">
            <Calendar className="w-5 h-5 text-gold" />
            <div>
              <p className="text-xs text-muted-foreground">Handover</p>
              <p className="font-semibold text-navy text-sm">{project.handover}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-cream rounded-lg">
            <MapPin className="w-5 h-5 text-gold" />
            <div>
              <p className="text-xs text-muted-foreground">Starting</p>
              <p className="font-semibold text-navy text-sm">{project.startingPriceLabel}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-navy mb-2">About This Project</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            {project.description}
          </p>
        </div>

        {/* Features */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-navy mb-3">Key Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-navy mb-3">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {project.amenities.map((amenity) => (
              <Badge key={amenity} variant="outline" className="text-sm border-gold/30 text-navy">
                {amenity}
              </Badge>
            ))}
          </div>
        </div>

        {/* Developer Info */}
        <div className="mt-4 p-4 bg-navy rounded-lg text-white">
          <p className="text-xs text-white/50 mb-1">Developer</p>
          <p className="font-semibold">{project.developer}</p>
          <p className="text-sm text-white/70">{project.location}</p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            onClick={() => {
              onClose();
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex-1 bg-gold hover:bg-gold-dark text-white font-semibold rounded-md"
          >
            Check Availability
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            onClick={() => {
              onClose();
              const el = document.getElementById('floor-plans');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            variant="outline"
            className="flex-1 border-gold/30 text-gold hover:bg-gold/10 font-semibold rounded-md"
          >
            View Floor Plans
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
