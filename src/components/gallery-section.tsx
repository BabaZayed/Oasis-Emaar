"use client";

import { useState } from "react";
import { galleryImages, type GalleryImage } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ZoomIn } from "lucide-react";

const categories = ["All", "Exterior", "Interior", "Amenities", "Community", "Master Plan"] as const;

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
            Visual Tour
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
            Gallery
          </h2>
          <p className="font-body text-gray-500 max-w-2xl mx-auto">
            Experience The Oasis through our curated gallery of renders and community visuals
          </p>
          <div className="section-divider max-w-xs mx-auto mt-6" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={
                activeCategory === cat
                  ? "bg-[#1A2332] text-white rounded-md"
                  : "border-gray-300 text-gray-600 hover:border-[#C8A45C] hover:text-[#C8A45C] rounded-md"
              }
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className={`relative group overflow-hidden rounded-lg cursor-pointer ${
                i % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div
                className={`bg-gradient-to-br ${img.gradient} ${
                  i % 5 === 0 ? "h-64 sm:h-80" : "h-40 sm:h-52"
                } w-full`}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-xs sm:text-sm font-medium">{img.alt}</p>
                <p className="text-white/60 text-xs">{img.category}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-black border-0">
          {selectedImage && (
            <div className={`h-64 sm:h-96 md:h-[500px] bg-gradient-to-br ${selectedImage.gradient} flex items-center justify-center`}>
              <p className="text-white/40 text-lg">{selectedImage.alt}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
