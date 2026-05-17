export type PropertyStatus = "available" | "reserved" | "sold" | "launching-soon";
export type PropertyType = "villa" | "mansion" | "townhouse" | "apartment" | "penthouse" | "branded-villa";

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
  handover: string;
  paymentPlan: string;
  features: string[];
  amenities: string[];
  imageGradient: string;
  imageUrl: string;
  clusterTag: string;
  driveFolderId: string;
  driveFolderUrl: string;
  subfolders: {
    brochure?: string;
    factsheet?: string;
    floorPlan?: string;
    images?: string;
    maps?: string;
    moodboard?: string;
    onePager?: string;
    paymentPlanDoc?: string;
    renders?: string;
    video?: string;
  };
  facts: {
    totalUnits: number;
    communitySize: string;
    greenSpace: string;
    retailSpace: string;
    lagoonLength: string;
    developer: string;
    location: string;
    goldenVisa: boolean;
  };
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
  imageUrl?: string;
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
  imageUrl: string;
}

// ======== PROJECTS (9 Clusters) ========
export const projects: Project[] = [
  {
    id: "adress-villas-tierra",
    name: "Adress Villas Tierra",
    slug: "adress-villas-tierra",
    type: "branded-villa",
    tagline: "Branded Luxury by Address Hotels & Resorts",
    description: "Adress Villas Tierra represents the pinnacle of branded living within The Oasis by Emaar. These 4 to 6-bedroom luxury villas are fully furnished and managed by Address Hotels & Resorts, bringing the signature hospitality experience into your private residence. Each villa features interiors designed by the Address brand, with premium finishes, private pools, landscaped gardens, and expansive living spaces that seamlessly blend indoor and outdoor waterfront living. The villas are strategically positioned to maximise lagoon and waterway views, offering residents an unparalleled resort-style lifestyle within a gated, secure community.",
    bedrooms: "4, 5 & 6",
    startingPrice: 13160000,
    areaRange: "7,269 - 12,777 sqft",
    plotArea: "8,500 - 15,000 sqft",
    status: "Off-Plan",
    handover: "June 2029",
    paymentPlan: "80/20",
    features: ["Address Hotels Furnishing", "Private Swimming Pool", "Landscaped Garden", "Maid's Room", "Covered Parking", "Basement Level", "Rooftop Terrace", "Smart Home Technology"],
    amenities: ["Crystal Lagoon & Beach", "Address Hotel Services", "Private Beach Club", "Swimming Pools", "Fitness Centre & Spa", "Fine Dining", "Kids' Play Areas", "Walking Trails", "24/7 Security"],
    imageGradient: "from-emerald-700 via-teal-600 to-cyan-500",
    imageUrl: "/images/projects/adress-villas-tierra.png",
    clusterTag: "Branded Residences",
    driveFolderId: "11cxYBTJ9dYWHMFMef-KwF1BlKPc_Xbxy",
    driveFolderUrl: "https://drive.google.com/drive/folders/11cxYBTJ9dYWHMFMef-KwF1BlKPc_Xbxy",
    subfolders: {
      brochure: "1BuecKfAnYVJdIZ37bPLRcpG6lbYWjSGl",
      factsheet: "1QLu3DSNJQgDJ5brtdXJR3c27naFBHV9d",
      floorPlan: "1wUYwUrDXVUF_NXzmSDbbCPZq8PNqtYID",
      images: "1vEJZ4tkIc5t3QI34oF7Eh2Rt3A09EXFl",
      maps: "1_duP3QVAfRoM0uIEUO_C-H9eQvVykxnd",
      moodboard: "1YLkViDRGuo4AktdA2hku5ohXFtgE2kLg",
      onePager: "12PVuJDl438sSIwXmY4rNNv0lkCpGfp6r",
      paymentPlanDoc: "1ijleeb2yxaY11QNwJV_t46hyLq8c7Id4",
    },
    facts: {
      totalUnits: 58,
      communitySize: "9.4M sqm",
      greenSpace: "25%",
      retailSpace: "1.5M sqft",
      lagoonLength: "3.5km",
      developer: "Emaar Properties PJSC",
      location: "The Oasis, Dubailand — Near Hessa Street",
      goldenVisa: true,
    },
  },
  {
    id: "lavita",
    name: "Lavita",
    slug: "lavita",
    type: "mansion",
    tagline: "Ultra-Luxury Waterfront Mansions",
    description: "Lavita at The Oasis is the crown jewel of the community — an exclusive collection of 6 and 7-bedroom waterfront mansions designed for those who demand the extraordinary. With built-up areas exceeding 20,000 sqft and private plots spanning over 22,000 sqft, these mansions offer an estate-scale living experience rarely found in Dubai. Each residence is positioned for full water-facing orientation, ensuring panoramic lagoon views from every major living space. The mansions feature private lifts, home cinemas, wine cellars, staff quarters, and expansive infinity pools that seem to merge with the waterway beyond. Lavita is for the discerning few who seek absolute exclusivity within The Oasis.",
    bedrooms: "6 & 7",
    startingPrice: 37000000,
    areaRange: "20,096 - 23,824 sqft",
    plotArea: "22,000 - 22,275 sqft",
    status: "Off-Plan",
    handover: "Q1 2029",
    paymentPlan: "80/20",
    features: ["Private Lift", "Home Cinema", "Wine Cellar", "Staff Quarters", "Infinity Pool", "Full Water View", "Rooftop Terrace", "Basement Level", "Private Garden Estate"],
    amenities: ["Crystal Lagoon & Beach", "Private Beach Club", "Concierge Service", "Spa & Wellness", "Golf Course Access", "Marina Berth", "Valet Parking", "24/7 Security & Gated"],
    imageGradient: "from-amber-800 via-yellow-700 to-orange-500",
    imageUrl: "/images/projects/lavita.png",
    clusterTag: "Mansions",
    driveFolderId: "1SWdgl6zBznpHFfaB4abNvktXGxpSNcYD",
    driveFolderUrl: "https://drive.google.com/drive/folders/1SWdgl6zBznpHFfaB4abNvktXGxpSNcYD",
    subfolders: {
      brochure: "1SWdgl6zBznpHFfaB4abNvktXGxpSNcYD",
      factsheet: "1kGb3jzol7Xgrd2jVImClqVyo-X6qau6j",
      floorPlan: "1IvE57RATUTEug2F8JOMS5u0atL_mnSWJ",
      maps: "1g2KbGfhg7Mcdtjqw6tPSVXZoc21dVWeG",
      onePager: "1B_hL0ktSiaDbl9FULsZG4BF9ogdG41x8",
      paymentPlanDoc: "1ziqd_R3EMSKcd1SywmHT6hzKOOI5vtH4",
      renders: "11p1IV6T0yEG6fP6yJK8kwU11j3Ud1_4W",
      video: "1dVrK5pJKfg70XiMbNwC4MWuQNv3a4FsP",
    },
    facts: {
      totalUnits: 24,
      communitySize: "9.4M sqm",
      greenSpace: "25%",
      retailSpace: "1.5M sqft",
      lagoonLength: "3.5km",
      developer: "Emaar Properties PJSC",
      location: "The Oasis, Dubailand — Premium Waterfront Zone",
      goldenVisa: true,
    },
  },
  {
    id: "mareva-1",
    name: "Mareva",
    slug: "mareva-1",
    type: "villa",
    tagline: "Elegant Waterfront Villas",
    description: "Mareva at The Oasis offers a refined collection of 4, 5, and 6-bedroom luxury villas that exemplify sophisticated waterfront living. With expansive layouts ranging from 7,254 to 12,779 sqft, each villa is thoughtfully designed with premium finishes, open-plan living spaces, and seamless indoor-outdoor connectivity. Mareva villas feature private gardens, swimming pools, and terraces that capture the essence of lagoon-side living. The architecture blends contemporary design with timeless elegance, creating homes that are both functional and beautiful. Positioned within the heart of The Oasis, Mareva residents enjoy direct access to the community's world-class amenities and waterfront promenades.",
    bedrooms: "4, 5 & 6",
    startingPrice: 13470000,
    areaRange: "7,254 - 12,779 sqft",
    plotArea: "8,800 - 16,000 sqft",
    status: "Off-Plan",
    handover: "Q1 2031",
    paymentPlan: "80/20",
    features: ["Private Swimming Pool", "Landscaped Garden", "Maid's Room", "Covered Parking", "Lagoon View Terrace", "Basement Level", "Open-Plan Living", "Designer Kitchen"],
    amenities: ["Crystal Lagoon & Beach", "Swimming Pools", "Fitness Centre", "Community Parks", "Retail Boulevard", "Dining Destinations", "Jogging Tracks", "Kids' Play Areas"],
    imageGradient: "from-violet-700 via-purple-500 to-fuchsia-400",
    imageUrl: "/images/projects/mareva.png",
    clusterTag: "Villas",
    driveFolderId: "1gpGDgvUybDYN6HK-64gNMwOf_guO7i4B",
    driveFolderUrl: "https://drive.google.com/drive/folders/1gpGDgvUybDYN6HK-64gNMwOf_guO7i4B",
    subfolders: {},
    facts: {
      totalUnits: 150,
      communitySize: "9.4M sqm",
      greenSpace: "25%",
      retailSpace: "1.5M sqft",
      lagoonLength: "3.5km",
      developer: "Emaar Properties PJSC",
      location: "The Oasis, Dubailand — Central Lagoon District",
      goldenVisa: true,
    },
  },
  {
    id: "mareva-2",
    name: "Mareva 2",
    slug: "mareva-2",
    type: "villa",
    tagline: "Next-Phase Waterfront Villas",
    description: "Mareva 2 is the highly anticipated second phase of the Mareva collection at The Oasis. Building on the success of Mareva, this phase introduces a fresh series of 4, 5, and 6-bedroom waterfront villas with refined architectural details and upgraded interior specifications. Each villa offers generous living spaces with private gardens, swimming pools, and panoramic water or garden views. Mareva 2 features enhanced community positioning with even closer proximity to the crystal lagoons and beach areas, making it an exceptional opportunity for families and investors seeking premium waterfront property within one of Dubai's most prestigious master-planned communities.",
    bedrooms: "4, 5 & 6",
    startingPrice: 13830000,
    areaRange: "7,500 - 13,000 sqft",
    plotArea: "9,000 - 16,500 sqft",
    status: "Off-Plan",
    handover: "Q2 2031",
    paymentPlan: "80/20",
    features: ["Private Swimming Pool", "Landscaped Garden", "Maid's Room", "Covered Parking", "Enhanced Lagoon Views", "Basement Level", "Study Room", "Walk-in Closets"],
    amenities: ["Crystal Lagoon & Beach", "Swimming Pools", "Fitness Centre & Spa", "Parks & Gardens", "Retail & Dining", "Water Sports Centre", "Cycling Tracks", "Community Centre"],
    imageGradient: "from-indigo-700 via-blue-500 to-cyan-400",
    imageUrl: "/images/projects/mareva-2.png",
    clusterTag: "Villas",
    driveFolderId: "1qn1ExWOtXKe0kE_RbfgMDlnmsRdsMLPP",
    driveFolderUrl: "https://drive.google.com/drive/folders/1qn1ExWOtXKe0kE_RbfgMDlnmsRdsMLPP",
    subfolders: {},
    facts: {
      totalUnits: 140,
      communitySize: "9.4M sqm",
      greenSpace: "25%",
      retailSpace: "1.5M sqft",
      lagoonLength: "3.5km",
      developer: "Emaar Properties PJSC",
      location: "The Oasis, Dubailand — Enhanced Lagoon Zone",
      goldenVisa: true,
    },
  },
  {
    id: "mirage",
    name: "Mirage",
    slug: "mirage",
    type: "mansion",
    tagline: "The Pinnacle of The Oasis",
    description: "Mirage is the pinnacle product within The Oasis — a collection of 5 and 6-bedroom ultra-luxury villas that set a new standard for premium residential living in Dubai. With 6-bedroom villa sizes reaching over 11,300 sqft and prices starting from AED 15.8 million, Mirage represents the finest that The Oasis has to offer. These residences feature exceptional architectural design by world-renowned architects, with interiors created by prominent international designers. Each villa includes a basement level, ground floor, and upper floors with private terraces overlooking the waterways. The Mirage cluster is positioned within the most exclusive zone of The Oasis, offering unmatched privacy, panoramic water views, and direct lagoon access.",
    bedrooms: "5 & 6",
    startingPrice: 15800000,
    areaRange: "9,500 - 11,357 sqft",
    plotArea: "12,000 - 15,000 sqft",
    status: "Off-Plan",
    handover: "Q4 2029",
    paymentPlan: "90/10",
    features: ["Private Swimming Pool", "Landscaped Garden", "Maid's Room", "Covered Parking for 3+", "Basement Level", "Panoramic Water View", "Private Elevator", "Rooftop Terrace"],
    amenities: ["Crystal Lagoon & Beach", "Private Beach Club", "Concierge Service", "Spa & Wellness", "Fine Dining", "Jogging & Cycling Tracks", "Golf Course Access", "24/7 Gated Security"],
    imageGradient: "from-sky-700 via-blue-500 to-cyan-400",
    imageUrl: "/images/projects/mirage.png",
    clusterTag: "Premium Villas",
    driveFolderId: "1aTQR_dDmWwY7uZujToTG3S270nAgt-Jh",
    driveFolderUrl: "https://drive.google.com/drive/folders/1aTQR_dDmWwY7uZujToTG3S270nAgt-Jh",
    subfolders: {
      factsheet: "1aTQR_dDmWwY7uZujToTG3S270nAgt-Jh",
      floorPlan: "1Ftbnh2zpBEgNxyAzh6g1Mpui8QjGEmDQ",
      images: "1D8beX8ERI2BslObYPWqRTI6TSJQtfUa3",
      maps: "1PtAam1ROI4xjVqI2EiZ7byZLP3w4eWI5",
      moodboard: "18sLJK3q3khS05qf5q0IesEzp1xbIcVtH",
      onePager: "1-AasCuebt4OGJ0eApW7nVJbi0oy9H0Fh",
      paymentPlanDoc: "1tL70KRgnygDMOM3lNSWdKILQ4FpUXdrI",
      video: "1NDjx_z5ElEajtt19oRYdLrlAz6MvYqzj",
    },
    facts: {
      totalUnits: 95,
      communitySize: "9.4M sqm",
      greenSpace: "25%",
      retailSpace: "1.5M sqft",
      lagoonLength: "3.5km",
      developer: "Emaar Properties PJSC",
      location: "The Oasis, Dubailand — Exclusive Zone",
      goldenVisa: true,
    },
  },
  {
    id: "palace-villas-ostra",
    name: "Palace Villas Ostra",
    slug: "palace-villas-ostra",
    type: "branded-villa",
    tagline: "Palace-Branded Ultra-Luxury Villas",
    description: "Palace Villas Ostra brings the legendary Palace hospitality brand into the realm of private residential living. These 4, 5, and 6-bedroom palace-branded villas offer an unmatched level of luxury, with interiors and services inspired by the world-renowned Palace Hotels. Starting from AED 13.9 million, each villa is a masterpiece of design featuring bespoke finishes, private pools, expansive terraces, and landscaped gardens. Residents enjoy exclusive access to Palace-level services including concierge, housekeeping, and in-villa dining. The architecture reflects the grandeur and sophistication that the Palace brand is known for, creating a living experience that is truly fit for royalty within The Oasis waterfront community.",
    bedrooms: "4, 5 & 6",
    startingPrice: 13900000,
    areaRange: "7,500 - 13,500 sqft",
    plotArea: "9,000 - 17,000 sqft",
    status: "Off-Plan",
    handover: "September 2029",
    paymentPlan: "80/20",
    features: ["Palace Brand Interiors", "Private Swimming Pool", "Landscaped Garden", "Maid's Room", "Covered Parking", "Basement Level", "In-Villa Dining Service", "Concierge Service"],
    amenities: ["Crystal Lagoon & Beach", "Palace Hotel Services", "Private Beach Club", "Spa & Wellness Centre", "Fine Dining Restaurants", "Fitness Centre", "Kids' Play Areas", "Walking Trails", "24/7 Gated Security"],
    imageGradient: "from-rose-700 via-pink-500 to-red-400",
    imageUrl: "/images/projects/palace-villas-ostra.png",
    clusterTag: "Branded Residences",
    driveFolderId: "1vSoP0nr8behBJXJEJ6t9xexjATjVNCDJ",
    driveFolderUrl: "https://drive.google.com/drive/folders/1vSoP0nr8behBJXJEJ6t9xexjATjVNCDJ",
    subfolders: {
      brochure: "1vSoP0nr8behBJXJEJ6t9xexjATjVNCDJ",
      factsheet: "1rq0zmzSqCs_gZSmpghw12FWX6mZEpIke",
      floorPlan: "191mMYcRngE2au-5MygEzr5swszUt3ZXO",
      images: "1CNMpD6JkHpG2MDQHw4qxUmhKOWgwbIlg",
      maps: "1OKc0k0KqxIib70xVYqahyEGcojV9Znsy",
      moodboard: "1MhQjxpEUbwRZEkKX3KuCu-zOdLk_pXXs",
      onePager: "1Tqt8ENmsSdv-YQ3KXpsbrANy0EBLmVGI",
      paymentPlanDoc: "1wg-3Yvusw1yGh4PtGx1v-wNBSTO_xefu",
      video: "1qJ-FpDJZtkYzvrfYAkw1H6_xUAB-o7NS",
    },
    facts: {
      totalUnits: 62,
      communitySize: "9.4M sqm",
      greenSpace: "25%",
      retailSpace: "1.5M sqft",
      lagoonLength: "3.5km",
      developer: "Emaar Properties PJSC",
      location: "The Oasis, Dubailand — Palace District",
      goldenVisa: true,
    },
  },
  {
    id: "palmeira-collective",
    name: "Palmeira Collective",
    slug: "palmeira-collective",
    type: "villa",
    tagline: "Ultra-Exclusive Limited Collection — Only 38 Villas",
    description: "Palmeira Collective is the most exclusive cluster within The Oasis, comprising just 38 bespoke 4-bedroom villas. This ultra-limited collection redefines luxury with next-generation villa design featuring basements, private lifts, two kitchens (main and prep), domestic staff quarters, and approximately 7,879 sqft of meticulously planned living space. Each villa is a rare opportunity to own within one of Dubai's most coveted waterfront communities. The limited number of residences ensures unmatched privacy and exclusivity, while the thoughtful architecture maximises natural light, ventilation, and connection to the surrounding waterways and green spaces. Palmeira Collective is for those who appreciate the extraordinary and seek a home that is truly one of a kind.",
    bedrooms: "4",
    startingPrice: 11000000,
    areaRange: "~7,879 sqft",
    plotArea: "~10,000 sqft",
    status: "Off-Plan",
    handover: "Q2 2029",
    paymentPlan: "80/20",
    features: ["Private Lift", "Two Kitchens", "Basement Level", "Domestic Staff Quarters", "Private Swimming Pool", "Landscaped Garden", "Maid's Room", "Covered Parking"],
    amenities: ["Crystal Lagoon & Beach", "Swimming Pools", "Community Centre", "Parks & Gardens", "Retail & Dining", "Fitness Centre", "Jogging Tracks", "24/7 Security"],
    imageGradient: "from-teal-700 via-emerald-500 to-green-400",
    imageUrl: "/images/projects/palmeira-collective.png",
    clusterTag: "Limited Edition",
    driveFolderId: "1cbedM9CKaKtHjE0Oq9XM2gGtb-GOcjiR",
    driveFolderUrl: "https://drive.google.com/drive/folders/1cbedM9CKaKtHjE0Oq9XM2gGtb-GOcjiR",
    subfolders: {
      images: "1cbedM9CKaKtHjE0Oq9XM2gGtb-GOcjiR",
      moodboard: "15Z6mBrWb-RsJY0M--aGv4j1GeD8hs4j-",
      floorPlan: "1SqAWMVYx6cg2wDwv4ZgWfc-8R4jPuPye",
      maps: "1NOtUrnKANNwtCkDT48U32peZLRNN-8hG",
      onePager: "1zv0KAmCFdIfNHSVO6mk5bw5Zf_xh3vu7",
      video: "1YZ7U1n9LM8CPe4K0JMX-y5QsxkLyL8Y5",
    },
    facts: {
      totalUnits: 38,
      communitySize: "9.4M sqm",
      greenSpace: "25%",
      retailSpace: "1.5M sqft",
      lagoonLength: "3.5km",
      developer: "Emaar Properties PJSC",
      location: "The Oasis, Dubailand — Boutique Collection",
      goldenVisa: true,
    },
  },
  {
    id: "palmiera",
    name: "Palmiera",
    slug: "palmiera",
    type: "villa",
    tagline: "Contemporary Waterfront Villas",
    description: "Palmiera at The Oasis presents a collection of 4-bedroom contemporary waterfront villas that blend modern architecture with the serenity of lagoon-side living. Starting from AED 10.5 million, these villas offer generous built-up areas of approximately 8,279 sqft, featuring open-plan layouts, private gardens, swimming pools, and terraces designed to capture the waterfront ambience. The contemporary design language emphasises clean lines, natural materials, and seamless indoor-outdoor transitions. Palmiera is ideal for families seeking a premium lifestyle within a vibrant waterfront community, with direct access to The Oasis's extensive amenities including crystal lagoons, beaches, retail, and recreational facilities.",
    bedrooms: "4",
    startingPrice: 10500000,
    areaRange: "~8,279 sqft",
    plotArea: "~10,500 sqft",
    status: "Off-Plan",
    handover: "Q1 2029",
    paymentPlan: "80/20",
    features: ["Private Swimming Pool", "Landscaped Garden", "Maid's Room", "Covered Parking", "Lagoon View Terrace", "Open-Plan Living", "Walk-in Closets", "Designer Kitchen"],
    amenities: ["Crystal Lagoon & Beach", "Swimming Pools", "Fitness Centre", "Parks & Gardens", "Retail Boulevard", "Dining Destinations", "Jogging Tracks", "Kids' Play Areas"],
    imageGradient: "from-orange-700 via-amber-500 to-yellow-400",
    imageUrl: "/images/projects/palmiera.png",
    clusterTag: "Villas",
    driveFolderId: "12aUQUxfnOSsrUEVYX7EPz1J7qwYjci9a",
    driveFolderUrl: "https://drive.google.com/drive/folders/12aUQUxfnOSsrUEVYX7EPz1J7qwYjci9a",
    subfolders: {
      brochure: "12aUQUxfnOSsrUEVYX7EPz1J7qwYjci9a",
      factsheet: "1_0Fh6QdxyhP7-V9yXH_femmjKFh826TR",
      floorPlan: "1aVXhxxotjv8RS8AltFCPF1bdx-B4aYb_",
      maps: "1daAiXK83pcFi22nvZoGCAy1a0RTFhvTB",
      moodboard: "1r3_59ahxDTv2gY210-2rWkPadVkUcv-F",
      onePager: "1fX_v3vvqCJ2wLjscDKDUOnE2EmYmilZP",
      renders: "1ch-2BAi5aPPO21b4dLf5rWk_DIP4qu9O",
      video: "12vhluuIG3Krzu1_loNwQIQBhLWqno-N2",
    },
    facts: {
      totalUnits: 110,
      communitySize: "9.4M sqm",
      greenSpace: "25%",
      retailSpace: "1.5M sqft",
      lagoonLength: "3.5km",
      developer: "Emaar Properties PJSC",
      location: "The Oasis, Dubailand — Contemporary Quarter",
      goldenVisa: true,
    },
  },
  {
    id: "palmiera-3",
    name: "Palmiera 3",
    slug: "palmiera-3",
    type: "villa",
    tagline: "Accessible Luxury Waterfront Villas",
    description: "Palmiera 3 at The Oasis is the latest phase of the popular Palmiera collection, offering 4-bedroom villas starting from AED 9.18 million. With built-up areas ranging from 5,666 to 5,914 sqft, these villas provide an accessible entry point into The Oasis waterfront lifestyle without compromising on quality or design. Each villa features contemporary architecture, private gardens, swimming pools, and thoughtfully designed interiors with premium finishes. Palmiera 3 benefits from all the community amenities that make The Oasis one of Dubai's most desirable addresses, including crystal lagoons, private beaches, retail, and recreational facilities. With an expected handover in Q4 2028, Palmiera 3 is one of the earliest clusters to be completed within The Oasis.",
    bedrooms: "4",
    startingPrice: 9180000,
    areaRange: "5,666 - 5,914 sqft",
    plotArea: "7,000 - 8,000 sqft",
    status: "Off-Plan",
    handover: "Q4 2028",
    paymentPlan: "80/20",
    features: ["Private Swimming Pool", "Landscaped Garden", "Maid's Room", "Covered Parking", "Terrace with View", "Open-Plan Living", "Modern Kitchen", "En-Suite Bathrooms"],
    amenities: ["Crystal Lagoon & Beach", "Swimming Pools", "Fitness Centre", "Parks & Gardens", "Retail & Dining", "Kids' Play Areas", "Jogging Tracks", "Community Centre"],
    imageGradient: "from-cyan-700 via-sky-500 to-blue-400",
    imageUrl: "/images/projects/palmiera-3.png",
    clusterTag: "Villas",
    driveFolderId: "1f_8PStTDAPLv9A6jV6dnS2yMW_n5gF6A",
    driveFolderUrl: "https://drive.google.com/drive/folders/1f_8PStTDAPLv9A6jV6dnS2yMW_n5gF6A",
    subfolders: {
      factsheet: "1f_8PStTDAPLv9A6jV6dnS2yMW_n5gF6A",
      floorPlan: "1MBxYDSi01IhrFlw-aJIQs-2LQ84tEV0p",
      images: "1YMPXJL2ghiFdo3ilhWlEZkDm0mMLlWes",
      maps: "1P-3QzLOq3tm665MblGmCqQWz_wFLNLDf",
      moodboard: "1yMDxl95SOlg-RCKajwU_CFMRUxhDAxci",
      onePager: "1eJ36G3ko13EkjXUomGgUTOCGTdtvlq5J",
      paymentPlanDoc: "19FK4dp_vsshm3Rg3psPzeGeq2Pb-3-us",
      video: "1ktLcqW4_ueYzUtRUox6-K1Xx8plGG1Tl",
    },
    facts: {
      totalUnits: 120,
      communitySize: "9.4M sqm",
      greenSpace: "25%",
      retailSpace: "1.5M sqft",
      lagoonLength: "3.5km",
      developer: "Emaar Properties PJSC",
      location: "The Oasis, Dubailand — Accessible Luxury Zone",
      goldenVisa: true,
    },
  },
];

// ======== INVENTORY ========
export const inventoryItems: InventoryItem[] = [
  // Adress Villas Tierra
  { id: "inv-avt-1", projectId: "adress-villas-tierra", name: "Type A - 4BR Lagoon View", type: "branded-villa", bedrooms: 4, areaSqft: 7269, plotSqft: 8500, price: 13160000, status: "available", isPremium: false, imageGradient: "from-emerald-600 to-teal-400" },
  { id: "inv-avt-2", projectId: "adress-villas-tierra", name: "Type B - 5BR Garden View", type: "branded-villa", bedrooms: 5, areaSqft: 9500, plotSqft: 11000, price: 18500000, status: "available", isPremium: true, imageGradient: "from-teal-600 to-cyan-400" },
  { id: "inv-avt-3", projectId: "adress-villas-tierra", name: "Type C - 6BR Premium Waterfront", type: "branded-villa", bedrooms: 6, areaSqft: 12777, plotSqft: 15000, price: 26580000, status: "available", isPremium: true, imageGradient: "from-emerald-700 to-cyan-300" },

  // Lavita
  { id: "inv-lav-1", projectId: "lavita", name: "6BR Waterfront Mansion", type: "mansion", bedrooms: 6, areaSqft: 20096, plotSqft: 22000, price: 37000000, status: "available", isPremium: true, imageGradient: "from-amber-700 to-yellow-400" },
  { id: "inv-lav-2", projectId: "lavita", name: "7BR Grand Waterfront Mansion", type: "mansion", bedrooms: 7, areaSqft: 23824, plotSqft: 22275, price: 47800000, status: "available", isPremium: true, imageGradient: "from-amber-800 to-orange-400" },
  { id: "inv-lav-3", projectId: "lavita", name: "6BR Corner Waterfront Mansion", type: "mansion", bedrooms: 6, areaSqft: 22110, plotSqft: 22000, price: 43000000, status: "reserved", isPremium: true, imageGradient: "from-yellow-700 to-amber-400" },

  // Mareva 1
  { id: "inv-mar1-1", projectId: "mareva-1", name: "4BR Villa - Lagoon View", type: "villa", bedrooms: 4, areaSqft: 7254, plotSqft: 8800, price: 13470000, status: "available", isPremium: false, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-2", projectId: "mareva-1", name: "5BR Villa - Garden Premium", type: "villa", bedrooms: 5, areaSqft: 9800, plotSqft: 12000, price: 19500000, status: "available", isPremium: true, imageGradient: "from-purple-600 to-fuchsia-400" },
  { id: "inv-mar1-3", projectId: "mareva-1", name: "6BR Villa - Waterfront Estate", type: "villa", bedrooms: 6, areaSqft: 12779, plotSqft: 16000, price: 28000000, status: "available", isPremium: true, imageGradient: "from-fuchsia-600 to-pink-400" },

  // Mareva 2
  { id: "inv-mar2-1", projectId: "mareva-2", name: "4BR Villa - Enhanced Lagoon View", type: "villa", bedrooms: 4, areaSqft: 7500, plotSqft: 9000, price: 13830000, status: "available", isPremium: false, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-2", projectId: "mareva-2", name: "5BR Villa - Premium Garden", type: "villa", bedrooms: 5, areaSqft: 10200, plotSqft: 13000, price: 21000000, status: "available", isPremium: true, imageGradient: "from-blue-600 to-cyan-400" },
  { id: "inv-mar2-3", projectId: "mareva-2", name: "6BR Villa - Estate Collection", type: "villa", bedrooms: 6, areaSqft: 13000, plotSqft: 16500, price: 29500000, status: "available", isPremium: true, imageGradient: "from-cyan-600 to-sky-400" },

  // Mirage
  { id: "inv-mir-1", projectId: "mirage", name: "5BR Villa - Mirage Collection", type: "mansion", bedrooms: 5, areaSqft: 9500, plotSqft: 12000, price: 15800000, status: "available", isPremium: true, imageGradient: "from-sky-600 to-blue-400" },
  { id: "inv-mir-2", projectId: "mirage", name: "6BR Villa - Pinnacle Series", type: "mansion", bedrooms: 6, areaSqft: 11297, plotSqft: 14000, price: 20500000, status: "available", isPremium: true, imageGradient: "from-blue-600 to-indigo-400" },
  { id: "inv-mir-3", projectId: "mirage", name: "6BR Villa - Grand Waterfront", type: "mansion", bedrooms: 6, areaSqft: 11357, plotSqft: 15000, price: 24000000, status: "reserved", isPremium: true, imageGradient: "from-indigo-600 to-violet-400" },

  // Palace Villas Ostra
  { id: "inv-pvo-1", projectId: "palace-villas-ostra", name: "4BR Palace Villa - Garden View", type: "branded-villa", bedrooms: 4, areaSqft: 7500, plotSqft: 9000, price: 13900000, status: "available", isPremium: false, imageGradient: "from-rose-600 to-pink-400" },
  { id: "inv-pvo-2", projectId: "palace-villas-ostra", name: "5BR Palace Villa - Lagoon View", type: "branded-villa", bedrooms: 5, areaSqft: 10500, plotSqft: 13000, price: 22000000, status: "available", isPremium: true, imageGradient: "from-pink-600 to-rose-400" },
  { id: "inv-pvo-3", projectId: "palace-villas-ostra", name: "6BR Palace Villa - Royal Waterfront", type: "branded-villa", bedrooms: 6, areaSqft: 13500, plotSqft: 17000, price: 32000000, status: "available", isPremium: true, imageGradient: "from-red-600 to-rose-400" },

  // Palmeira Collective
  { id: "inv-pc-1", projectId: "palmeira-collective", name: "4BR Bespoke Villa - Limited Edition", type: "villa", bedrooms: 4, areaSqft: 7879, plotSqft: 10000, price: 11000000, status: "available", isPremium: true, imageGradient: "from-teal-600 to-emerald-400" },
  { id: "inv-pc-2", projectId: "palmeira-collective", name: "4BR Bespoke Villa - Waterfront", type: "villa", bedrooms: 4, areaSqft: 7879, plotSqft: 10000, price: 13500000, status: "available", isPremium: true, imageGradient: "from-emerald-600 to-green-400" },
  { id: "inv-pc-3", projectId: "palmeira-collective", name: "4BR Bespoke Villa - Corner Plot", type: "villa", bedrooms: 4, areaSqft: 7879, plotSqft: 10500, price: 14000000, status: "reserved", isPremium: true, imageGradient: "from-green-600 to-teal-400" },

  // Palmiera
  { id: "inv-pal-1", projectId: "palmiera", name: "4BR Villa - Contemporary Lagoon", type: "villa", bedrooms: 4, areaSqft: 8279, plotSqft: 10500, price: 10500000, status: "available", isPremium: false, imageGradient: "from-orange-600 to-amber-400" },
  { id: "inv-pal-2", projectId: "palmiera", name: "4BR Villa - Premium Waterfront", type: "villa", bedrooms: 4, areaSqft: 8279, plotSqft: 10500, price: 13500000, status: "available", isPremium: true, imageGradient: "from-amber-600 to-yellow-400" },

  // Palmiera 3
  { id: "inv-p3-1", projectId: "palmiera-3", name: "4BR Villa - Lagoon View", type: "villa", bedrooms: 4, areaSqft: 5666, plotSqft: 7000, price: 9180000, status: "available", isPremium: false, imageGradient: "from-cyan-600 to-sky-400" },
  { id: "inv-p3-2", projectId: "palmiera-3", name: "4BR Villa - Garden Premium", type: "villa", bedrooms: 4, areaSqft: 5914, plotSqft: 8000, price: 10500000, status: "available", isPremium: false, imageGradient: "from-sky-600 to-blue-400" },
  { id: "inv-p3-3", projectId: "palmiera-3", name: "4BR Villa - Corner Waterfront", type: "villa", bedrooms: 4, areaSqft: 5914, plotSqft: 8000, price: 12000000, status: "sold", isPremium: true, imageGradient: "from-blue-600 to-cyan-400" },
];

// ======== FLOOR PLANS ========
export const floorPlans: FloorPlan[] = [
  { id: "fp-avt-1", projectId: "adress-villas-tierra", name: "Type A - 4 Bedroom Villa", bedrooms: 4, areaSqft: 7269, plotSqft: 8500, imageGradient: "from-emerald-100 to-teal-50" },
  { id: "fp-avt-2", projectId: "adress-villas-tierra", name: "Type B - 5 Bedroom Villa", bedrooms: 5, areaSqft: 9500, plotSqft: 11000, imageGradient: "from-teal-100 to-cyan-50" },
  { id: "fp-avt-3", projectId: "adress-villas-tierra", name: "Type C - 6 Bedroom Villa", bedrooms: 6, areaSqft: 12777, plotSqft: 15000, imageGradient: "from-cyan-100 to-sky-50" },
  { id: "fp-lav-1", projectId: "lavita", name: "6 Bedroom Waterfront Mansion", bedrooms: 6, areaSqft: 20096, plotSqft: 22000, imageGradient: "from-amber-100 to-yellow-50" },
  { id: "fp-lav-2", projectId: "lavita", name: "7 Bedroom Grand Mansion", bedrooms: 7, areaSqft: 23824, plotSqft: 22275, imageGradient: "from-yellow-100 to-orange-50" },
  { id: "fp-mar1-1", projectId: "mareva-1", name: "4 Bedroom Villa", bedrooms: 4, areaSqft: 7254, plotSqft: 8800, imageGradient: "from-violet-100 to-purple-50" },
  { id: "fp-mar1-2", projectId: "mareva-1", name: "5 Bedroom Villa", bedrooms: 5, areaSqft: 9800, plotSqft: 12000, imageGradient: "from-purple-100 to-fuchsia-50" },
  { id: "fp-mar1-3", projectId: "mareva-1", name: "6 Bedroom Villa", bedrooms: 6, areaSqft: 12779, plotSqft: 16000, imageGradient: "from-fuchsia-100 to-pink-50" },
  { id: "fp-mar2-1", projectId: "mareva-2", name: "4 Bedroom Villa", bedrooms: 4, areaSqft: 7500, plotSqft: 9000, imageGradient: "from-indigo-100 to-blue-50" },
  { id: "fp-mar2-2", projectId: "mareva-2", name: "5 Bedroom Villa", bedrooms: 5, areaSqft: 10200, plotSqft: 13000, imageGradient: "from-blue-100 to-cyan-50" },
  { id: "fp-mir-1", projectId: "mirage", name: "5 Bedroom Villa", bedrooms: 5, areaSqft: 9500, plotSqft: 12000, imageGradient: "from-sky-100 to-blue-50" },
  { id: "fp-mir-2", projectId: "mirage", name: "6 Bedroom Villa", bedrooms: 6, areaSqft: 11297, plotSqft: 14000, imageGradient: "from-blue-100 to-indigo-50" },
  { id: "fp-pvo-1", projectId: "palace-villas-ostra", name: "4 Bedroom Palace Villa", bedrooms: 4, areaSqft: 7500, plotSqft: 9000, imageGradient: "from-rose-100 to-pink-50" },
  { id: "fp-pvo-2", projectId: "palace-villas-ostra", name: "5 Bedroom Palace Villa", bedrooms: 5, areaSqft: 10500, plotSqft: 13000, imageGradient: "from-pink-100 to-red-50" },
  { id: "fp-pc-1", projectId: "palmeira-collective", name: "4 Bedroom Bespoke Villa", bedrooms: 4, areaSqft: 7879, plotSqft: 10000, imageGradient: "from-teal-100 to-emerald-50" },
  { id: "fp-pal-1", projectId: "palmiera", name: "4 Bedroom Villa", bedrooms: 4, areaSqft: 8279, plotSqft: 10500, imageGradient: "from-orange-100 to-amber-50" },
  { id: "fp-p3-1", projectId: "palmiera-3", name: "4 Bedroom Villa - Type 1", bedrooms: 4, areaSqft: 5666, plotSqft: 7000, imageGradient: "from-cyan-100 to-sky-50" },
  { id: "fp-p3-2", projectId: "palmiera-3", name: "4 Bedroom Villa - Type 2", bedrooms: 4, areaSqft: 5914, plotSqft: 8000, imageGradient: "from-sky-100 to-blue-50" },
];

// ======== PAYMENT PLANS ========
export const paymentMilestones: PaymentMilestone[] = [
  { label: "Booking / EOI", percentage: 10, description: "10% down payment upon signing the Expression of Interest or Sales and Purchase Agreement" },
  { label: "During Construction", percentage: 70, description: "70% payable in installments during the construction phase (varies by cluster)" },
  { label: "On Handover", percentage: 20, description: "20% on handover — flexible post-handover payment plans may also be available" },
];

// ======== FAQS ========
export const faqs: FAQ[] = [
  {
    question: "What is The Oasis by Emaar?",
    answer: "The Oasis by Emaar is a premium waterfront community in Dubai, spanning over 9.4 million square metres and featuring more than 7,000 residential units including villas, mansions, and branded residences. The community is centred around crystal-clear lagoons, water canals, and lush green parks, offering residents a resort-style lifestyle just 20 minutes from Downtown Dubai. As an authorised Emaar agent, we can provide you with the latest availability, pricing, and project updates across all clusters."
  },
  {
    question: "What clusters are available at The Oasis?",
    answer: "The Oasis features nine distinctive clusters: Adress Villas Tierra (branded by Address Hotels, 4-6BR), Lavita (ultra-luxury 6-7BR mansions), Mareva (4-6BR villas), Mareva 2 (next-phase 4-6BR villas), Mirage (premium 5-6BR villas), Palace Villas Ostra (Palace-branded 4-6BR villas), Palmeira Collective (limited edition 4BR villas — only 38 units), Palmiera (contemporary 4BR villas), and Palmiera 3 (4BR villas). Each cluster offers a unique lifestyle and price point. Contact us for detailed comparisons and personalised recommendations."
  },
  {
    question: "What payment plans are available?",
    answer: "Most clusters at The Oasis offer an 80/20 payment plan: 10% on booking, 70% during construction, and 20% on handover. The Mirage cluster offers a 90/10 plan with just 10% on handover. Post-handover payment plans may also be available for select units. As an authorised Emaar agent, we can help you navigate the payment options and find the best solution for your investment strategy."
  },
  {
    question: "When are the expected handover dates?",
    answer: "Handover dates vary by cluster: Palmiera 3 is expected earliest (Q4 2028), followed by Palmiera, Lavita, and Palmeira Collective (Q1-Q2 2029). Adress Villas Tierra is expected in June 2029, Palace Villas Ostra in September 2029, and Mirage in Q4 2029. The Mareva clusters have later handover dates (Q1-Q2 2031). Register your interest with us to receive the latest construction updates and timeline information."
  },
  {
    question: "Is The Oasis freehold for foreign buyers?",
    answer: "Yes, The Oasis is a 100% freehold community, meaning foreign nationals can purchase properties with full ownership rights. Dubai's freehold property laws allow expats and international investors to buy, sell, and lease properties in designated freehold areas, which includes The Oasis by Emaar. Purchasing a property above AED 2 million also qualifies you for the UAE Golden Visa."
  },
  {
    question: "What amenities does The Oasis community offer?",
    answer: "The Oasis offers world-class amenities including crystal lagoons and private beaches, 25% green spaces with parks and jogging tracks, 1.5 million sqft of retail space with luxury brands, diverse dining options, sports facilities, water sports centres, children's play areas, cycling tracks, community centres, spa and wellness facilities, and 24/7 security with smart home technology. Branded clusters like Adress Villas Tierra and Palace Villas Ostra also offer hotel-level concierge and hospitality services."
  },
  {
    question: "How do I schedule a viewing or register interest?",
    answer: "You can register your interest through our website by filling out the contact form, calling us at +971 52 691 9169, or messaging us on WhatsApp. As an authorised Emaar agent, our property consultants can arrange private viewings, provide detailed brochures and fact sheets, and guide you through the purchasing process with expert advice tailored to your investment goals."
  },
  {
    question: "Are you affiliated with Emaar Properties directly?",
    answer: "No. We are an independent authorised real estate brokerage and sales agent for Emaar Properties, not Emaar Properties PJSC itself. This website is independently operated and is not the official Emaar Properties website. All project information, specifications, and pricing are provided for informational and marketing purposes only and are subject to change by the developer (Emaar Properties PJSC) without notice. Emaar and The Oasis are trademarks of Emaar Properties PJSC."
  },
];

// ======== GALLERY ========
export const galleryImages: GalleryImage[] = [
  { id: "g1", category: "Exterior", alt: "Villa exterior with lagoon view", gradient: "from-emerald-500 to-teal-300", imageUrl: "/images/gallery/gallery-exterior-1.png" },
  { id: "g2", category: "Exterior", alt: "Mansion entrance and garden", gradient: "from-amber-500 to-yellow-300", imageUrl: "/images/gallery/gallery-exterior-2.png" },
  { id: "g3", category: "Interior", alt: "Luxury living room with panoramic windows", gradient: "from-stone-400 to-amber-200", imageUrl: "/images/gallery/gallery-interior-1.png" },
  { id: "g4", category: "Interior", alt: "Designer kitchen with island", gradient: "from-gray-400 to-stone-200", imageUrl: "/images/gallery/gallery-interior-2.png" },
  { id: "g5", category: "Amenities", alt: "Crystal lagoon and beach area", gradient: "from-cyan-500 to-sky-300", imageUrl: "/images/gallery/gallery-amenities-1.png" },
  { id: "g6", category: "Amenities", alt: "Infinity pool overlooking the waterway", gradient: "from-blue-500 to-cyan-300", imageUrl: "/images/gallery/gallery-amenities-2.png" },
  { id: "g7", category: "Community", alt: "Waterfront promenade at sunset", gradient: "from-orange-500 to-amber-300", imageUrl: "/images/gallery/gallery-community-1.png" },
  { id: "g8", category: "Community", alt: "Green parks and jogging tracks", gradient: "from-green-500 to-emerald-300", imageUrl: "/images/gallery/gallery-community-2.png" },
  { id: "g9", category: "Master Plan", alt: "Aerial view of The Oasis master plan", gradient: "from-slate-500 to-blue-300", imageUrl: "/images/gallery/gallery-masterplan.png" },
  { id: "g10", category: "Exterior", alt: "Contemporary villa architecture", gradient: "from-sky-500 to-blue-300", imageUrl: "/images/gallery/gallery-exterior-3.png" },
  { id: "g11", category: "Interior", alt: "Master bedroom with balcony", gradient: "from-rose-300 to-pink-100", imageUrl: "/images/gallery/gallery-interior-3.png" },
  { id: "g12", category: "Amenities", alt: "Children's play area and waterpark", gradient: "from-violet-400 to-purple-200", imageUrl: "/images/gallery/gallery-amenities-3.png" },
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

export const WHATSAPP_NUMBER = "+971526919169";
export const WHATSAPP_LINK = "https://wa.me/971526919169";
export const PHONE_NUMBER = "+971 52 691 9169";
export const EMAIL = "info@oasisemaar.com";
export const ADDRESS = "Al Quoz Street 21, Dubai, UAE";

// ======== AGENCY INFO ========
export const AGENCY_NAME = "Oasis Emaar";
export const AGENCY_TAGLINE = "Authorised Sales Agent for The Oasis by Emaar";
export const AGENCY_DISCLAIMER = "We are an independent authorised real estate brokerage and sales agent for Emaar Properties. This website is not the official Emaar Properties website. All project information, specifications, images, and pricing are provided for informational and marketing purposes only and are subject to change by the developer (Emaar Properties PJSC) without notice. Emaar, The Oasis, Address, Palace, and related names are trademarks of Emaar Properties PJSC. Artistic renders and images are for illustration purposes only and may differ from the final product.";

// ======== MASTER PLAN FACTS ========
export const masterPlanFacts = {
  totalArea: "9.4 million sqm",
  totalResidences: "7,000+",
  clusters: 9,
  greenSpace: "25% of total area",
  retailSpace: "1.5 million sqft",
  crystalLagoons: "3.5km of waterways",
  location: "Dubailand, Dubai — 20 mins from Downtown",
  nearestAirport: "Al Maktoum International Airport",
  connectivity: "Near Hessa Street & Sheikh Zayed Road",
  expoCity: "15 minutes to Expo City Dubai",
  goldenVisa: "Eligible for all properties AED 2M+",
  developer: "Emaar Properties PJSC",
  handoverRange: "Q4 2028 — Q2 2031",
  priceRange: "AED 9.18M — AED 47.8M",
};
