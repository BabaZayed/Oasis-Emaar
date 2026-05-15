export type PropertyStatus = "available" | "reserved" | "sold" | "launching-soon";
export type PropertyType = "villa" | "mansion" | "townhouse" | "apartment" | "penthouse";

export interface Project {
  id: string;
  name: string;
  slug: string;
  type: PropertyType;
  tagline: string;
  description: string;
  bedrooms: string;
  startingPrice: number;
  areaRange: string;
  plotArea?: string;
  status: "Ready" | "Off-Plan" | "Launching Soon";
  features: string[];
  amenities: string[];
  imageGradient: string;
}

export interface InventoryItem {
  id: string;
  projectId: string;
  name: string;
  type: PropertyType;
  bedrooms: number;
  areaSqft: number;
  plotSqft?: number;
  price: number;
  status: PropertyStatus;
  isPremium: boolean;
  imageGradient: string;
  floorPlan?: string;
}

export interface FloorPlan {
  id: string;
  projectId: string;
  name: string;
  bedrooms: number;
  areaSqft: number;
  plotSqft?: number;
  imageGradient: string;
}

export interface PaymentMilestone {
  label: string;
  percentage: number;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface GalleryImage {
  id: string;
  category: "Exterior" | "Interior" | "Amenities" | "Community" | "Master Plan";
  alt: string;
  gradient: string;
}

// ======== PROJECTS ========
export const projects: Project[] = [
  {
    id: "oasis-villas",
    name: "The Oasis Villas",
    slug: "oasis-villas",
    type: "villa",
    tagline: "Waterfront Living Redefined",
    description: "The Oasis Villas offer an exclusive collection of 4 and 5 bedroom waterfront villas surrounded by crystal-clear lagoons and pristine beaches. Each villa is meticulously designed with premium finishes, expansive living spaces, and private gardens that flow seamlessly into the waterfront promenade. Residents enjoy unparalleled views of water canals, lush green parks, and Dubai's iconic skyline.",
    bedrooms: "4 & 5",
    startingPrice: 8100000,
    areaRange: "5,100 - 6,500 sqft",
    plotArea: "7,940 - 8,260 sqft",
    status: "Off-Plan",
    features: ["Private Garden", "Swimming Pool", "Maid's Room", "Covered Parking for 2", "Terrace with Lagoon View"],
    amenities: ["Crystal Lagoon", "Private Beach", "Jogging Tracks", "Children's Play Area", "Community Center"],
    imageGradient: "from-emerald-700 via-teal-600 to-cyan-500",
  },
  {
    id: "oasis-mansions",
    name: "The Oasis Mansions",
    slug: "oasis-mansions",
    type: "mansion",
    tagline: "Ultra-Luxury Estate Living",
    description: "The Oasis Mansions represent the pinnacle of luxury living in Dubai. These expansive 5 and 6 bedroom mansions offer a lifestyle of extraordinary privilege, with sprawling private gardens, infinity pools overlooking the lagoon, and bespoke interiors crafted with the finest materials. Each mansion is a private estate within the vibrant Oasis community, offering exclusivity without compromise.",
    bedrooms: "5 & 6",
    startingPrice: 12000000,
    areaRange: "8,000 - 10,500 sqft",
    plotArea: "10,000 - 14,000 sqft",
    status: "Off-Plan",
    features: ["Infinity Pool", "Home Cinema", "Private Elevator", "Wine Cellar", "Landscaped Garden", "Staff Quarters"],
    amenities: ["Private Beach Club", "Concierge Service", "Spa & Wellness", "Golf Course Access", "Marina Berth"],
    imageGradient: "from-amber-800 via-yellow-700 to-orange-500",
  },
  {
    id: "oasis-creek",
    name: "Oasis Creek Townhouses",
    slug: "oasis-creek",
    type: "townhouse",
    tagline: "Contemporary Creek-Side Living",
    description: "Oasis Creek Townhouses combine contemporary design with the tranquility of creek-side living. These 3 and 4 bedroom townhouses feature open-plan layouts, rooftop terraces with stunning water views, and direct access to waterfront walkways. Perfect for families seeking a modern, active lifestyle within a vibrant community setting.",
    bedrooms: "3 & 4",
    startingPrice: 5500000,
    areaRange: "3,200 - 4,500 sqft",
    plotArea: "4,000 - 5,500 sqft",
    status: "Launching Soon",
    features: ["Rooftop Terrace", "Open-Plan Living", "Study Room", "2-Car Garage", "Creek View Balcony"],
    amenities: ["Water Sports Center", "Retail Boulevard", "Fitness Center", "Parks & Gardens", "Cycling Tracks"],
    imageGradient: "from-sky-700 via-blue-500 to-cyan-400",
  },
  {
    id: "oasis-lagoon",
    name: "Oasis Lagoon Residences",
    slug: "oasis-lagoon",
    type: "apartment",
    tagline: "Lagoon-Front Apartment Living",
    description: "Oasis Lagoon Residences offer elegantly designed 1, 2, and 3 bedroom apartments with sweeping views of the crystal lagoon. Featuring resort-style amenities, smart home technology, and finishes that reflect Emaar's commitment to excellence. These residences provide the perfect blend of luxury and convenience for professionals and couples seeking waterfront living.",
    bedrooms: "1, 2 & 3",
    startingPrice: 3200000,
    areaRange: "850 - 2,200 sqft",
    status: "Off-Plan",
    features: ["Smart Home", "Floor-to-Ceiling Windows", "Designer Kitchen", "Balcony with Lagoon View", "Walk-in Closet"],
    amenities: ["Infinity Pool", "Co-Working Space", "Residents' Lounge", "Kids' Club", "Direct Beach Access"],
    imageGradient: "from-violet-700 via-purple-500 to-fuchsia-400",
  },
  {
    id: "oasis-heights",
    name: "Oasis Heights Penthouses",
    slug: "oasis-heights",
    type: "penthouse",
    tagline: "Sky-High Luxury Living",
    description: "Oasis Heights Penthouses are the crown jewels of The Oasis community. These exclusive 2, 3, and 4 bedroom penthouses sit at the summit of the towers, offering 360-degree panoramic views of Dubai's skyline, the lagoon, and the Arabian Gulf. With private terraces, plunge pools, and interiors designed by world-renowned architects, these residences redefine sky-high luxury.",
    bedrooms: "2, 3 & 4",
    startingPrice: 15000000,
    areaRange: "4,500 - 8,000 sqft",
    status: "Launching Soon",
    features: ["Private Terrace", "Plunge Pool", "Panoramic Views", "Private Elevator Access", "Butler's Pantry"],
    amenities: ["Rooftop Lounge", "Helipad Access", "Private Chef Kitchen", "Valet Parking", "Exclusive Spa"],
    imageGradient: "from-rose-700 via-pink-500 to-red-400",
  },
];

// ======== INVENTORY ========
export const inventoryItems: InventoryItem[] = [
  { id: "inv-001", projectId: "oasis-villas", name: "Villa Type A - Lagoon View", type: "villa", bedrooms: 4, areaSqft: 5100, plotSqft: 7940, price: 8100000, status: "available", isPremium: false, imageGradient: "from-emerald-600 to-teal-400" },
  { id: "inv-002", projectId: "oasis-villas", name: "Villa Type B - Garden View", type: "villa", bedrooms: 4, areaSqft: 5800, plotSqft: 8100, price: 8900000, status: "available", isPremium: false, imageGradient: "from-teal-600 to-cyan-400" },
  { id: "inv-003", projectId: "oasis-villas", name: "Villa Type C - Premium Waterfront", type: "villa", bedrooms: 5, areaSqft: 6500, plotSqft: 8260, price: 12500000, status: "available", isPremium: true, imageGradient: "from-emerald-700 to-cyan-300" },
  { id: "inv-004", projectId: "oasis-mansions", name: "Mansion Estate - Grand Lagoon", type: "mansion", bedrooms: 5, areaSqft: 8000, plotSqft: 10000, price: 12000000, status: "available", isPremium: true, imageGradient: "from-amber-700 to-yellow-400" },
  { id: "inv-005", projectId: "oasis-mansions", name: "Mansion Estate - Royal Collection", type: "mansion", bedrooms: 6, areaSqft: 10500, plotSqft: 14000, price: 18500000, status: "available", isPremium: true, imageGradient: "from-amber-800 to-orange-400" },
  { id: "inv-006", projectId: "oasis-mansions", name: "Mansion Estate - Beachfront", type: "mansion", bedrooms: 6, areaSqft: 9800, plotSqft: 12000, price: 22000000, status: "reserved", isPremium: true, imageGradient: "from-yellow-700 to-amber-400" },
  { id: "inv-007", projectId: "oasis-creek", name: "Townhouse Type 1 - Creek View", type: "townhouse", bedrooms: 3, areaSqft: 3200, plotSqft: 4000, price: 5500000, status: "available", isPremium: false, imageGradient: "from-sky-600 to-blue-400" },
  { id: "inv-008", projectId: "oasis-creek", name: "Townhouse Type 2 - Garden", type: "townhouse", bedrooms: 4, areaSqft: 4500, plotSqft: 5500, price: 6800000, status: "available", isPremium: false, imageGradient: "from-blue-600 to-cyan-400" },
  { id: "inv-009", projectId: "oasis-lagoon", name: "Apartment 1BR - Lagoon View", type: "apartment", bedrooms: 1, areaSqft: 850, price: 3200000, status: "available", isPremium: false, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-010", projectId: "oasis-lagoon", name: "Apartment 2BR - Beach Front", type: "apartment", bedrooms: 2, areaSqft: 1500, price: 4800000, status: "available", isPremium: false, imageGradient: "from-purple-600 to-fuchsia-400" },
  { id: "inv-011", projectId: "oasis-lagoon", name: "Apartment 3BR - Premium Suite", type: "apartment", bedrooms: 3, areaSqft: 2200, price: 7200000, status: "available", isPremium: true, imageGradient: "from-fuchsia-600 to-pink-400" },
  { id: "inv-012", projectId: "oasis-heights", name: "Penthouse 2BR - Sky Villa", type: "penthouse", bedrooms: 2, areaSqft: 4500, price: 15000000, status: "available", isPremium: true, imageGradient: "from-rose-600 to-pink-400" },
  { id: "inv-013", projectId: "oasis-heights", name: "Penthouse 3BR - Cloud Nine", type: "penthouse", bedrooms: 3, areaSqft: 6200, price: 22000000, status: "reserved", isPremium: true, imageGradient: "from-red-600 to-rose-400" },
  { id: "inv-014", projectId: "oasis-heights", name: "Penthouse 4BR - The Apex", type: "penthouse", bedrooms: 4, areaSqft: 8000, price: 35000000, status: "available", isPremium: true, imageGradient: "from-rose-700 to-red-400" },
  { id: "inv-015", projectId: "oasis-villas", name: "Villa Type D - Park View", type: "villa", bedrooms: 4, areaSqft: 5400, plotSqft: 8000, price: 8500000, status: "sold", isPremium: false, imageGradient: "from-green-600 to-emerald-400" },
];

// ======== FLOOR PLANS ========
export const floorPlans: FloorPlan[] = [
  { id: "fp-001", projectId: "oasis-villas", name: "Type A - 4 Bedroom Villa", bedrooms: 4, areaSqft: 5100, plotSqft: 7940, imageGradient: "from-emerald-100 to-teal-50" },
  { id: "fp-002", projectId: "oasis-villas", name: "Type B - 4 Bedroom Villa", bedrooms: 4, areaSqft: 5800, plotSqft: 8100, imageGradient: "from-teal-100 to-cyan-50" },
  { id: "fp-003", projectId: "oasis-villas", name: "Type C - 5 Bedroom Villa", bedrooms: 5, areaSqft: 6500, plotSqft: 8260, imageGradient: "from-cyan-100 to-sky-50" },
  { id: "fp-004", projectId: "oasis-mansions", name: "Mansion Type A - 5 Bedroom", bedrooms: 5, areaSqft: 8000, plotSqft: 10000, imageGradient: "from-amber-100 to-yellow-50" },
  { id: "fp-005", projectId: "oasis-mansions", name: "Mansion Type B - 6 Bedroom", bedrooms: 6, areaSqft: 10500, plotSqft: 14000, imageGradient: "from-yellow-100 to-orange-50" },
  { id: "fp-006", projectId: "oasis-creek", name: "Townhouse Type 1 - 3 Bedroom", bedrooms: 3, areaSqft: 3200, plotSqft: 4000, imageGradient: "from-sky-100 to-blue-50" },
  { id: "fp-007", projectId: "oasis-creek", name: "Townhouse Type 2 - 4 Bedroom", bedrooms: 4, areaSqft: 4500, plotSqft: 5500, imageGradient: "from-blue-100 to-indigo-50" },
  { id: "fp-008", projectId: "oasis-lagoon", name: "Apartment 1BR", bedrooms: 1, areaSqft: 850, imageGradient: "from-violet-100 to-purple-50" },
  { id: "fp-009", projectId: "oasis-lagoon", name: "Apartment 2BR", bedrooms: 2, areaSqft: 1500, imageGradient: "from-purple-100 to-fuchsia-50" },
  { id: "fp-010", projectId: "oasis-lagoon", name: "Apartment 3BR", bedrooms: 3, areaSqft: 2200, imageGradient: "from-fuchsia-100 to-pink-50" },
  { id: "fp-011", projectId: "oasis-heights", name: "Penthouse 2BR", bedrooms: 2, areaSqft: 4500, imageGradient: "from-rose-100 to-red-50" },
  { id: "fp-012", projectId: "oasis-heights", name: "Penthouse 3BR", bedrooms: 3, areaSqft: 6200, imageGradient: "from-red-100 to-orange-50" },
];

// ======== PAYMENT PLANS ========
export const paymentMilestones: PaymentMilestone[] = [
  { label: "Booking", percentage: 10, description: "10% down payment upon signing the Sales and Purchase Agreement" },
  { label: "During Construction", percentage: 40, description: "40% payable in installments during the construction phase (4 x 10%)" },
  { label: "On Handover", percentage: 50, description: "50% on handover — flexible post-handover payment plans available" },
];

// ======== FAQS ========
export const faqs: FAQ[] = [
  {
    question: "What is The Oasis by Emaar?",
    answer: "The Oasis by Emaar is a premium waterfront community in Dubai, featuring over 7,000 residential units including villas, mansions, townhouses, apartments, and penthouses. Spread across 9.4 million square meters, the community is centered around crystal-clear lagoons, water canals, and lush green parks, offering residents a resort-style lifestyle just 20 minutes from Downtown Dubai."
  },
  {
    question: "What property types are available at The Oasis?",
    answer: "The Oasis offers a diverse range of property types to suit different lifestyles: 4-5 bedroom villas with lagoon views, 5-6 bedroom ultra-luxury mansions, 3-4 bedroom creek-side townhouses, 1-3 bedroom lagoon-front apartments, and 2-4 bedroom sky penthouses. Each type is designed with premium finishes and unique waterfront features."
  },
  {
    question: "What payment plans are available?",
    answer: "Emaar offers flexible payment plans for The Oasis. The standard plan requires 10% on booking, 40% during construction in installments, and 50% on handover. Post-handover payment plans are also available for select units, extending payments up to 2 years after handover. Contact our sales team for customized payment solutions."
  },
  {
    question: "When is the expected handover date?",
    answer: "The first phase of The Oasis is expected to be handed over in Q4 2027, with subsequent phases following in 2028-2029. Each project within the community has its own timeline. Register your interest to receive the latest updates on construction progress and handover schedules."
  },
  {
    question: "Is The Oasis freehold for foreign buyers?",
    answer: "Yes, The Oasis is a 100% freehold community, meaning foreign nationals can purchase properties with full ownership rights. Dubai's freehold property laws allow expats and international investors to buy, sell, and lease properties in designated freehold areas, which includes The Oasis by Emaar."
  },
  {
    question: "What amenities does The Oasis community offer?",
    answer: "The Oasis offers an extensive range of world-class amenities including crystal lagoons and private beaches, 25% green spaces with parks and jogging tracks, 1.5 million sqft of retail space with luxury brands, diverse dining options, sports facilities, water sports centers, children's play areas, cycling tracks, a community center, spa and wellness facilities, and 24/7 security with smart home technology."
  },
  {
    question: "How do I schedule a viewing or register interest?",
    answer: "You can register your interest through our website by filling out the contact form, calling us at +971 55 564 4700, or messaging us on WhatsApp. Our property consultants are available to arrange private viewings, provide detailed brochures, and guide you through the purchasing process."
  },
];

// ======== GALLERY ========
export const galleryImages: GalleryImage[] = [
  { id: "g1", category: "Exterior", alt: "Villa exterior with lagoon view", gradient: "from-emerald-500 to-teal-300" },
  { id: "g2", category: "Exterior", alt: "Mansion entrance and garden", gradient: "from-amber-500 to-yellow-300" },
  { id: "g3", category: "Interior", alt: "Luxury living room with panoramic windows", gradient: "from-stone-400 to-amber-200" },
  { id: "g4", category: "Interior", alt: "Designer kitchen with island", gradient: "from-gray-400 to-stone-200" },
  { id: "g5", category: "Amenities", alt: "Crystal lagoon and beach area", gradient: "from-cyan-500 to-sky-300" },
  { id: "g6", category: "Amenities", alt: "Infinity pool overlooking the waterway", gradient: "from-blue-500 to-cyan-300" },
  { id: "g7", category: "Community", alt: "Waterfront promenade at sunset", gradient: "from-orange-500 to-amber-300" },
  { id: "g8", category: "Community", alt: "Green parks and jogging tracks", gradient: "from-green-500 to-emerald-300" },
  { id: "g9", category: "Master Plan", alt: "Aerial view of The Oasis master plan", gradient: "from-slate-500 to-blue-300" },
  { id: "g10", category: "Exterior", alt: "Townhouse row with creek view", gradient: "from-sky-500 to-blue-300" },
  { id: "g11", category: "Interior", alt: "Master bedroom with balcony", gradient: "from-rose-300 to-pink-100" },
  { id: "g12", category: "Amenities", alt: "Children's play area and waterpark", gradient: "from-violet-400 to-purple-200" },
];

// ======== HELPERS ========
export function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `AED ${(price / 1000000).toFixed(1)}M`;
  }
  return `AED ${price.toLocaleString()}`;
}

export function formatSqft(sqft: number): string {
  return sqft.toLocaleString() + " sqft";
}

export const WHATSAPP_NUMBER = "+971555644700";
export const WHATSAPP_LINK = "https://wa.me/971555644700";
export const PHONE_NUMBER = "+971 55 564 4700";
export const EMAIL = "info@oasisemaar.com";
export const ADDRESS = "Al Quoz Street 21, Dubai, UAE";
