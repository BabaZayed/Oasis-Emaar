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
    id: "address-villas-tierra",
    name: "Address Villas Tierra",
    slug: "address-villas-tierra",
    type: "branded-villa",
    tagline: "Branded Luxury by Address Hotels & Resorts",
    description: "Address Villas Tierra represents the pinnacle of branded living within The Oasis by Emaar. These 4 to 6-bedroom luxury villas are fully furnished and managed by Address Hotels & Resorts, bringing the signature hospitality experience into your private residence. Each villa features interiors designed by the Address brand, with premium finishes, private pools, landscaped gardens, and expansive living spaces that seamlessly blend indoor and outdoor waterfront living. The villas are strategically positioned to maximise lagoon and waterway views, offering residents an unparalleled resort-style lifestyle within a gated, secure community.",
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
    imageUrl: "/images/projects/adress-villas-tierra.jpg",
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
    bedrooms: "6",
    startingPrice: 46970888,
    areaRange: "20,096 sqft",
    plotArea: "22,275 - 23,824 sqft",
    status: "Off-Plan",
    handover: "Q1 2029",
    paymentPlan: "80/20",
    features: ["Private Lift", "Home Cinema", "Wine Cellar", "Staff Quarters", "Infinity Pool", "Full Water View", "Rooftop Terrace", "Basement Level", "Private Garden Estate"],
    amenities: ["Crystal Lagoon & Beach", "Private Beach Club", "Concierge Service", "Spa & Wellness", "Golf Course Access", "Marina Berth", "Valet Parking", "24/7 Security & Gated"],
    imageGradient: "from-amber-800 via-yellow-700 to-orange-500",
    imageUrl: "/images/projects/lavita.jpg",
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
    imageUrl: "/images/projects/mareva.jpg",
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
    imageUrl: "/images/projects/mareva-2.jpg",
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
    imageUrl: "/images/projects/mirage.jpg",
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
    imageUrl: "/images/projects/palace-villas-ostra.jpg",
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
    imageUrl: "/images/projects/palmeira-collective.jpg",
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
    imageUrl: "/images/projects/palmiera.jpg",
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
    imageUrl: "/images/projects/palmiera-3.jpg",
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

// ======== INVENTORY (77 Real Properties from Availability Sheet) ========
export const inventoryItems: InventoryItem[] = [
  // OP Palmiera 3 (1 unit)
  { id: "inv-p3-1", projectId: "palmiera-3", name: "OP Palmiera 3-V-359", type: "villa", bedrooms: 4, areaSqft: 5885, plotSqft: 8396, price: 11829888, status: "available", isPremium: false, imageGradient: "from-cyan-600 to-sky-400" },

  // OD Mareva 2 — 4 Bedroom (13 units)
  { id: "inv-mar2-4br-1", projectId: "mareva-2", name: "OD Mareva 2-V-258", type: "villa", bedrooms: 4, areaSqft: 7258, plotSqft: 8267, price: 13875888, status: "available", isPremium: false, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-4br-2", projectId: "mareva-2", name: "OD Mareva 2-V-288", type: "villa", bedrooms: 4, areaSqft: 7302, plotSqft: 8645, price: 14244888, status: "available", isPremium: false, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-4br-3", projectId: "mareva-2", name: "OD Mareva 2-V-291", type: "villa", bedrooms: 4, areaSqft: 7254, plotSqft: 8363, price: 14569888, status: "available", isPremium: false, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-4br-4", projectId: "mareva-2", name: "OD Mareva 2-V-307", type: "villa", bedrooms: 4, areaSqft: 7258, plotSqft: 8267, price: 14605888, status: "available", isPremium: false, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-4br-5", projectId: "mareva-2", name: "OD Mareva 2-V-335", type: "villa", bedrooms: 4, areaSqft: 7258, plotSqft: 8267, price: 14605888, status: "available", isPremium: false, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-4br-6", projectId: "mareva-2", name: "OD Mareva 2-V-48", type: "villa", bedrooms: 4, areaSqft: 7258, plotSqft: 8267, price: 14605888, status: "available", isPremium: false, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-4br-7", projectId: "mareva-2", name: "OD Mareva 2-V-293", type: "villa", bedrooms: 4, areaSqft: 7258, plotSqft: 8363, price: 14620888, status: "available", isPremium: false, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-4br-8", projectId: "mareva-2", name: "OD Mareva 2-V-311", type: "villa", bedrooms: 4, areaSqft: 7258, plotSqft: 8780, price: 14684888, status: "available", isPremium: false, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-4br-9", projectId: "mareva-2", name: "OD Mareva 2-V-40", type: "villa", bedrooms: 4, areaSqft: 7302, plotSqft: 8267, price: 14935888, status: "available", isPremium: false, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-4br-10", projectId: "mareva-2", name: "OD Mareva 2-V-47", type: "villa", bedrooms: 4, areaSqft: 7302, plotSqft: 8267, price: 14935888, status: "available", isPremium: false, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-4br-11", projectId: "mareva-2", name: "OD Mareva 2-V-49", type: "villa", bedrooms: 4, areaSqft: 7302, plotSqft: 8267, price: 14935888, status: "available", isPremium: false, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-4br-12", projectId: "mareva-2", name: "OD Mareva 2-V-317", type: "villa", bedrooms: 4, areaSqft: 7302, plotSqft: 8780, price: 15014888, status: "available", isPremium: true, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-4br-13", projectId: "mareva-2", name: "OD Mareva 2-V-44", type: "villa", bedrooms: 4, areaSqft: 7302, plotSqft: 8267, price: 15085888, status: "available", isPremium: true, imageGradient: "from-indigo-600 to-blue-400" },

  // OD Mareva 2 — 4 Bedroom (continued)
  { id: "inv-mar2-4br-14", projectId: "mareva-2", name: "OD Mareva 2-V-29", type: "villa", bedrooms: 4, areaSqft: 7302, plotSqft: 8321, price: 15093888, status: "available", isPremium: true, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-4br-15", projectId: "mareva-2", name: "OD Mareva 2-V-297", type: "villa", bedrooms: 4, areaSqft: 7302, plotSqft: 8363, price: 15100888, status: "available", isPremium: true, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-4br-16", projectId: "mareva-2", name: "OD Mareva 2-V-30", type: "villa", bedrooms: 4, areaSqft: 7302, plotSqft: 8671, price: 15148888, status: "available", isPremium: true, imageGradient: "from-indigo-600 to-blue-400" },

  // OD Mareva — 4 Bedroom (10 units)
  { id: "inv-mar1-4br-1", projectId: "mareva-1", name: "OD Mareva-V-286", type: "villa", bedrooms: 4, areaSqft: 7258, plotSqft: 8598, price: 13925888, status: "available", isPremium: false, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-4br-2", projectId: "mareva-1", name: "OD Mareva-V-25", type: "villa", bedrooms: 4, areaSqft: 7258, plotSqft: 8267, price: 14607888, status: "available", isPremium: false, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-4br-3", projectId: "mareva-1", name: "OD Mareva-V-264", type: "villa", bedrooms: 4, areaSqft: 7258, plotSqft: 8267, price: 14607888, status: "available", isPremium: false, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-4br-4", projectId: "mareva-1", name: "OD Mareva-V-296", type: "villa", bedrooms: 4, areaSqft: 7254, plotSqft: 8707, price: 14623888, status: "available", isPremium: false, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-4br-5", projectId: "mareva-1", name: "OD Mareva-V-14", type: "villa", bedrooms: 4, areaSqft: 7254, plotSqft: 8267, price: 14701888, status: "available", isPremium: false, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-4br-6", projectId: "mareva-1", name: "OD Mareva-V-35", type: "villa", bedrooms: 4, areaSqft: 7254, plotSqft: 8762, price: 14778888, status: "available", isPremium: false, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-4br-7", projectId: "mareva-1", name: "OD Mareva-V-36", type: "villa", bedrooms: 4, areaSqft: 7258, plotSqft: 8761, price: 14829888, status: "available", isPremium: false, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-4br-8", projectId: "mareva-1", name: "OD Mareva-V-56", type: "villa", bedrooms: 4, areaSqft: 7258, plotSqft: 8492, price: 14933888, status: "available", isPremium: false, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-4br-9", projectId: "mareva-1", name: "OD Mareva-V-193", type: "villa", bedrooms: 4, areaSqft: 7302, plotSqft: 8267, price: 14936888, status: "available", isPremium: false, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-4br-10", projectId: "mareva-1", name: "OD Mareva-V-195", type: "villa", bedrooms: 4, areaSqft: 7258, plotSqft: 8444, price: 15072888, status: "available", isPremium: true, imageGradient: "from-violet-600 to-purple-400" },

  // OP Palmiera Collective — 4 Bedroom (12 units)
  { id: "inv-pc-4br-1", projectId: "palmeira-collective", name: "OP Palmiera Collective-V-416", type: "villa", bedrooms: 4, areaSqft: 7914, plotSqft: 8267, price: 16548888, status: "available", isPremium: false, imageGradient: "from-teal-600 to-emerald-400" },
  { id: "inv-pc-4br-2", projectId: "palmeira-collective", name: "OP Palmiera Collective-V-387", type: "villa", bedrooms: 4, areaSqft: 8099, plotSqft: 8267, price: 16869888, status: "available", isPremium: false, imageGradient: "from-teal-600 to-emerald-400" },
  { id: "inv-pc-4br-3", projectId: "palmeira-collective", name: "OP Palmiera Collective-V-393", type: "villa", bedrooms: 4, areaSqft: 7880, plotSqft: 9396, price: 16895888, status: "available", isPremium: false, imageGradient: "from-teal-600 to-emerald-400" },
  { id: "inv-pc-4br-4", projectId: "palmeira-collective", name: "OP Palmiera Collective-V-411", type: "villa", bedrooms: 4, areaSqft: 7914, plotSqft: 8267, price: 17172888, status: "available", isPremium: false, imageGradient: "from-teal-600 to-emerald-400" },
  { id: "inv-pc-4br-5", projectId: "palmeira-collective", name: "OP Palmiera Collective-V-413", type: "villa", bedrooms: 4, areaSqft: 7914, plotSqft: 8267, price: 17172888, status: "available", isPremium: false, imageGradient: "from-teal-600 to-emerald-400" },
  { id: "inv-pc-4br-6", projectId: "palmeira-collective", name: "OP Palmiera Collective-V-418", type: "villa", bedrooms: 4, areaSqft: 8099, plotSqft: 8267, price: 17187888, status: "available", isPremium: false, imageGradient: "from-teal-600 to-emerald-400" },
  { id: "inv-pc-4br-7", projectId: "palmeira-collective", name: "OP Palmiera Collective-V-402", type: "villa", bedrooms: 4, areaSqft: 8099, plotSqft: 8267, price: 17505888, status: "available", isPremium: false, imageGradient: "from-teal-600 to-emerald-400" },
  { id: "inv-pc-4br-8", projectId: "palmeira-collective", name: "OP Palmiera Collective-V-417", type: "villa", bedrooms: 4, areaSqft: 7880, plotSqft: 8267, price: 17656888, status: "available", isPremium: false, imageGradient: "from-teal-600 to-emerald-400" },
  { id: "inv-pc-4br-9", projectId: "palmeira-collective", name: "OP Palmiera Collective-V-410", type: "villa", bedrooms: 4, areaSqft: 7880, plotSqft: 11298, price: 17692888, status: "available", isPremium: false, imageGradient: "from-teal-600 to-emerald-400" },
  { id: "inv-pc-4br-10", projectId: "palmeira-collective", name: "OP Palmiera Collective-V-389", type: "villa", bedrooms: 4, areaSqft: 8099, plotSqft: 11240, price: 17845888, status: "available", isPremium: false, imageGradient: "from-teal-600 to-emerald-400" },
  { id: "inv-pc-4br-11", projectId: "palmeira-collective", name: "OP Palmiera Collective-V-409", type: "villa", bedrooms: 4, areaSqft: 8099, plotSqft: 8267, price: 17983888, status: "available", isPremium: false, imageGradient: "from-teal-600 to-emerald-400" },
  { id: "inv-pc-4br-12", projectId: "palmeira-collective", name: "OP Palmiera Collective-V-390", type: "villa", bedrooms: 4, areaSqft: 8099, plotSqft: 8859, price: 18086888, status: "available", isPremium: false, imageGradient: "from-teal-600 to-emerald-400" },

  // OD Mareva — 5 Bedroom (1 unit)
  { id: "inv-mar1-5br-1", projectId: "mareva-1", name: "OD Mareva-V-288", type: "villa", bedrooms: 5, areaSqft: 8101, plotSqft: 8705, price: 16783888, status: "available", isPremium: false, imageGradient: "from-violet-600 to-purple-400" },

  // OD Mareva 2 — 5 Bedroom (10 units)
  { id: "inv-mar2-5br-1", projectId: "mareva-2", name: "OD Mareva 2-V-210", type: "villa", bedrooms: 5, areaSqft: 10290, plotSqft: 10333, price: 19383888, status: "available", isPremium: false, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-5br-2", projectId: "mareva-2", name: "OD Mareva 2-V-212", type: "villa", bedrooms: 5, areaSqft: 10290, plotSqft: 10333, price: 19383888, status: "available", isPremium: false, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-5br-3", projectId: "mareva-2", name: "OD Mareva 2-V-98", type: "villa", bedrooms: 5, areaSqft: 10290, plotSqft: 10333, price: 19383888, status: "available", isPremium: false, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-5br-4", projectId: "mareva-2", name: "OD Mareva 2-V-220", type: "villa", bedrooms: 5, areaSqft: 10363, plotSqft: 10333, price: 19496888, status: "available", isPremium: false, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-5br-5", projectId: "mareva-2", name: "OD Mareva 2-V-224", type: "villa", bedrooms: 5, areaSqft: 10290, plotSqft: 11872, price: 19608888, status: "available", isPremium: false, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-5br-6", projectId: "mareva-2", name: "OD Mareva 2-V-218", type: "villa", bedrooms: 5, areaSqft: 10363, plotSqft: 10333, price: 19702888, status: "available", isPremium: false, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-5br-7", projectId: "mareva-2", name: "OD Mareva 2-V-226", type: "villa", bedrooms: 5, areaSqft: 10363, plotSqft: 11871, price: 19721888, status: "available", isPremium: false, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-5br-8", projectId: "mareva-2", name: "OD Mareva 2-V-87", type: "villa", bedrooms: 5, areaSqft: 10290, plotSqft: 10333, price: 20403888, status: "available", isPremium: true, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-5br-9", projectId: "mareva-2", name: "OD Mareva 2-V-2", type: "villa", bedrooms: 5, areaSqft: 10399, plotSqft: 10333, price: 20657888, status: "available", isPremium: true, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-5br-10", projectId: "mareva-2", name: "OD Mareva 2-V-82", type: "villa", bedrooms: 5, areaSqft: 10399, plotSqft: 10333, price: 20657888, status: "available", isPremium: true, imageGradient: "from-indigo-600 to-blue-400" },

  // OD Mareva 2 — 5 Bedroom (continued)
  { id: "inv-mar2-5br-11", projectId: "mareva-2", name: "OD Mareva 2-V-85", type: "villa", bedrooms: 5, areaSqft: 10399, plotSqft: 10333, price: 20657888, status: "available", isPremium: true, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-5br-12", projectId: "mareva-2", name: "OD Mareva 2-V-86", type: "villa", bedrooms: 5, areaSqft: 10399, plotSqft: 10333, price: 20657888, status: "available", isPremium: true, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-5br-13", projectId: "mareva-2", name: "OD Mareva 2-V-91", type: "villa", bedrooms: 5, areaSqft: 10363, plotSqft: 11165, price: 20960888, status: "available", isPremium: true, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-5br-14", projectId: "mareva-2", name: "OD Mareva 2-V-81", type: "villa", bedrooms: 5, areaSqft: 10399, plotSqft: 10333, price: 21277888, status: "available", isPremium: true, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-5br-15", projectId: "mareva-2", name: "OD Mareva 2-V-84", type: "villa", bedrooms: 5, areaSqft: 10399, plotSqft: 10333, price: 21277888, status: "available", isPremium: true, imageGradient: "from-indigo-600 to-blue-400" },
  { id: "inv-mar2-5br-16", projectId: "mareva-2", name: "OD Mareva 2-V-342", type: "villa", bedrooms: 5, areaSqft: 10363, plotSqft: 10338, price: 22370888, status: "available", isPremium: true, imageGradient: "from-indigo-600 to-blue-400" },

  // OD Mareva — 5 Bedroom (6 units)
  { id: "inv-mar1-5br-2", projectId: "mareva-1", name: "OD Mareva-V-2", type: "villa", bedrooms: 5, areaSqft: 10290, plotSqft: 10333, price: 20405888, status: "available", isPremium: true, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-5br-3", projectId: "mareva-1", name: "OD Mareva-V-60", type: "villa", bedrooms: 5, areaSqft: 10290, plotSqft: 10612, price: 20448888, status: "available", isPremium: true, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-5br-4", projectId: "mareva-1", name: "OD Mareva-V-63", type: "villa", bedrooms: 5, areaSqft: 10363, plotSqft: 10333, price: 20524888, status: "available", isPremium: true, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-5br-5", projectId: "mareva-1", name: "OD Mareva-V-64", type: "villa", bedrooms: 5, areaSqft: 10363, plotSqft: 10333, price: 20524888, status: "available", isPremium: true, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-5br-6", projectId: "mareva-1", name: "OD Mareva-V-59", type: "villa", bedrooms: 5, areaSqft: 10290, plotSqft: 10188, price: 20994888, status: "available", isPremium: true, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-5br-7", projectId: "mareva-1", name: "OD Mareva-V-270", type: "villa", bedrooms: 5, areaSqft: 10399, plotSqft: 10334, price: 22518888, status: "available", isPremium: true, imageGradient: "from-violet-600 to-purple-400" },

  // OD Mareva — 6 Bedroom (11 units)
  { id: "inv-mar1-6br-1", projectId: "mareva-1", name: "OD Mareva-V-71", type: "villa", bedrooms: 6, areaSqft: 12779, plotSqft: 14773, price: 24178888, status: "available", isPremium: true, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-6br-2", projectId: "mareva-1", name: "OD Mareva-V-77", type: "villa", bedrooms: 6, areaSqft: 12779, plotSqft: 14773, price: 24178888, status: "available", isPremium: true, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-6br-3", projectId: "mareva-1", name: "OD Mareva-V-127", type: "villa", bedrooms: 6, areaSqft: 12779, plotSqft: 14780, price: 24179888, status: "available", isPremium: true, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-6br-4", projectId: "mareva-1", name: "OD Mareva-V-75", type: "villa", bedrooms: 6, areaSqft: 12779, plotSqft: 14773, price: 24432888, status: "available", isPremium: true, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-6br-5", projectId: "mareva-1", name: "OD Mareva-V-133", type: "villa", bedrooms: 6, areaSqft: 12986, plotSqft: 14773, price: 24503888, status: "available", isPremium: true, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-6br-6", projectId: "mareva-1", name: "OD Mareva-V-135", type: "villa", bedrooms: 6, areaSqft: 12986, plotSqft: 14773, price: 24503888, status: "available", isPremium: true, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-6br-7", projectId: "mareva-1", name: "OD Mareva-V-73", type: "villa", bedrooms: 6, areaSqft: 12986, plotSqft: 14773, price: 24761888, status: "available", isPremium: true, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-6br-8", projectId: "mareva-1", name: "OD Mareva-V-88", type: "villa", bedrooms: 6, areaSqft: 12779, plotSqft: 14639, price: 26955888, status: "available", isPremium: true, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-6br-9", projectId: "mareva-1", name: "OD Mareva-V-151", type: "villa", bedrooms: 6, areaSqft: 12986, plotSqft: 14639, price: 27318888, status: "available", isPremium: true, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-6br-10", projectId: "mareva-1", name: "OD Mareva-V-74", type: "villa", bedrooms: 6, areaSqft: 12986, plotSqft: 14776, price: 27341888, status: "available", isPremium: true, imageGradient: "from-violet-600 to-purple-400" },
  { id: "inv-mar1-6br-11", projectId: "mareva-1", name: "OD Mareva-V-143", type: "villa", bedrooms: 6, areaSqft: 12779, plotSqft: 14726, price: 27479888, status: "available", isPremium: true, imageGradient: "from-violet-600 to-purple-400" },

  // OD Mareva 2 — 6 Bedroom (1 unit)
  { id: "inv-mar2-6br-1", projectId: "mareva-2", name: "OD Mareva 2-V-231", type: "villa", bedrooms: 6, areaSqft: 12779, plotSqft: 14737, price: 27988888, status: "available", isPremium: true, imageGradient: "from-indigo-600 to-blue-400" },

  // OP Lavita — 6 Bedroom (2 units)
  { id: "inv-lav-1", projectId: "lavita", name: "OP Lavita-V-27", type: "mansion", bedrooms: 6, areaSqft: 20096, plotSqft: 22275, price: 46970888, status: "available", isPremium: true, imageGradient: "from-amber-700 to-yellow-400", floorPlan: "/images/inventory/lavita-v27-floorplan.png" },
  { id: "inv-lav-2", projectId: "lavita", name: "OP Lavita-V-47", type: "mansion", bedrooms: 6, areaSqft: 20096, plotSqft: 23824, price: 47696888, status: "available", isPremium: true, imageGradient: "from-amber-700 to-yellow-400", floorPlan: "/images/inventory/lavita-v47-floorplan.png" },
];

// ======== FLOOR PLANS ========
export const floorPlans: FloorPlan[] = [
  { id: "fp-avt-1", projectId: "address-villas-tierra", name: "Type A - 4 Bedroom Villa", bedrooms: 4, areaSqft: 7269, plotSqft: 8500, imageGradient: "from-emerald-100 to-teal-50", imageUrl: "/images/floorplans/address-villas-tierra-fp-1.png" },
  { id: "fp-avt-2", projectId: "address-villas-tierra", name: "Type B - 5 Bedroom Villa", bedrooms: 5, areaSqft: 9500, plotSqft: 11000, imageGradient: "from-teal-100 to-cyan-50", imageUrl: "/images/floorplans/address-villas-tierra-fp-2.png" },
  { id: "fp-avt-3", projectId: "address-villas-tierra", name: "Type C - 6 Bedroom Villa", bedrooms: 6, areaSqft: 12777, plotSqft: 15000, imageGradient: "from-cyan-100 to-sky-50", imageUrl: "/images/floorplans/address-villas-tierra-fp-3.png" },
  { id: "fp-lav-1", projectId: "lavita", name: "OP Lavita-V-27 - Type S1A", bedrooms: 6, areaSqft: 20096, plotSqft: 22275, imageGradient: "from-amber-100 to-yellow-50", imageUrl: "/images/inventory/lavita-v27-floorplan.png" },
  { id: "fp-lav-2", projectId: "lavita", name: "OP Lavita-V-47 - Type S1A", bedrooms: 6, areaSqft: 20096, plotSqft: 23824, imageGradient: "from-yellow-100 to-orange-50", imageUrl: "/images/inventory/lavita-v47-floorplan.png" },
  { id: "fp-mar1-1", projectId: "mareva-1", name: "4 Bedroom Villa", bedrooms: 4, areaSqft: 7254, plotSqft: 8800, imageGradient: "from-violet-100 to-purple-50" },
  { id: "fp-mar1-2", projectId: "mareva-1", name: "5 Bedroom Villa", bedrooms: 5, areaSqft: 9800, plotSqft: 12000, imageGradient: "from-purple-100 to-fuchsia-50" },
  { id: "fp-mar1-3", projectId: "mareva-1", name: "6 Bedroom Villa", bedrooms: 6, areaSqft: 12779, plotSqft: 16000, imageGradient: "from-fuchsia-100 to-pink-50" },
  { id: "fp-mar2-1", projectId: "mareva-2", name: "4 Bedroom Villa", bedrooms: 4, areaSqft: 7500, plotSqft: 9000, imageGradient: "from-indigo-100 to-blue-50" },
  { id: "fp-mar2-2", projectId: "mareva-2", name: "5 Bedroom Villa", bedrooms: 5, areaSqft: 10200, plotSqft: 13000, imageGradient: "from-blue-100 to-cyan-50" },
  { id: "fp-mir-1", projectId: "mirage", name: "5 Bedroom Villa", bedrooms: 5, areaSqft: 9500, plotSqft: 12000, imageGradient: "from-sky-100 to-blue-50", imageUrl: "/images/floorplans/mirage-fp-1.png" },
  { id: "fp-mir-2", projectId: "mirage", name: "6 Bedroom Villa", bedrooms: 6, areaSqft: 11297, plotSqft: 14000, imageGradient: "from-blue-100 to-indigo-50", imageUrl: "/images/floorplans/mirage-fp-2.png" },
  { id: "fp-pvo-1", projectId: "palace-villas-ostra", name: "4 Bedroom Palace Villa", bedrooms: 4, areaSqft: 7500, plotSqft: 9000, imageGradient: "from-rose-100 to-pink-50", imageUrl: "/images/floorplans/palace-villas-ostra-fp-1.png" },
  { id: "fp-pvo-2", projectId: "palace-villas-ostra", name: "5 Bedroom Palace Villa", bedrooms: 5, areaSqft: 10500, plotSqft: 13000, imageGradient: "from-pink-100 to-red-50", imageUrl: "/images/floorplans/palace-villas-ostra-fp-2.png" },
  { id: "fp-pc-1", projectId: "palmeira-collective", name: "4 Bedroom Bespoke Villa", bedrooms: 4, areaSqft: 7879, plotSqft: 10000, imageGradient: "from-teal-100 to-emerald-50", imageUrl: "/images/floorplans/palmeira-collective-fp-1.png" },
  { id: "fp-pal-1", projectId: "palmiera", name: "4 Bedroom Villa", bedrooms: 4, areaSqft: 8279, plotSqft: 10500, imageGradient: "from-orange-100 to-amber-50" },
  { id: "fp-p3-1", projectId: "palmiera-3", name: "4 Bedroom Villa - Type 1", bedrooms: 4, areaSqft: 5666, plotSqft: 7000, imageGradient: "from-cyan-100 to-sky-50", imageUrl: "/images/floorplans/palmiera-3-fp-1.png" },
  { id: "fp-p3-2", projectId: "palmiera-3", name: "4 Bedroom Villa - Type 2", bedrooms: 4, areaSqft: 5914, plotSqft: 8000, imageGradient: "from-sky-100 to-blue-50", imageUrl: "/images/floorplans/palmiera-3-fp-2.png" },
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
    answer: "The Oasis features nine distinctive clusters: Address Villas Tierra (branded by Address Hotels, 4-6BR), Lavita (ultra-luxury 6-7BR mansions), Mareva (4-6BR villas), Mareva 2 (next-phase 4-6BR villas), Mirage (premium 5-6BR villas), Palace Villas Ostra (Palace-branded 4-6BR villas), Palmeira Collective (limited edition 4BR villas — only 38 units), Palmiera (contemporary 4BR villas), and Palmiera 3 (4BR villas). Each cluster offers a unique lifestyle and price point. Contact us for detailed comparisons and personalised recommendations."
  },
  {
    question: "What payment plans are available?",
    answer: "Most clusters at The Oasis offer an 80/20 payment plan: 10% on booking, 70% during construction, and 20% on handover. The Mirage cluster offers a 90/10 plan with just 10% on handover. Post-handover payment plans may also be available for select units. As an authorised Emaar agent, we can help you navigate the payment options and find the best solution for your investment strategy."
  },
  {
    question: "When are the expected handover dates?",
    answer: "Handover dates vary by cluster: Palmiera 3 is expected earliest (Q4 2028), followed by Palmiera, Lavita, and Palmeira Collective (Q1-Q2 2029). Address Villas Tierra is expected in June 2029, Palace Villas Ostra in September 2029, and Mirage in Q4 2029. The Mareva clusters have later handover dates (Q1-Q2 2031). Register your interest with us to receive the latest construction updates and timeline information."
  },
  {
    question: "Is The Oasis freehold for foreign buyers?",
    answer: "Yes, The Oasis is a 100% freehold community, meaning foreign nationals can purchase properties with full ownership rights. Dubai's freehold property laws allow expats and international investors to buy, sell, and lease properties in designated freehold areas, which includes The Oasis by Emaar. Purchasing a property above AED 2 million also qualifies you for the UAE Golden Visa."
  },
  {
    question: "What amenities does The Oasis community offer?",
    answer: "The Oasis offers world-class amenities including crystal lagoons and private beaches, 25% green spaces with parks and jogging tracks, 1.5 million sqft of retail space with luxury brands, diverse dining options, sports facilities, water sports centres, children's play areas, cycling tracks, community centres, spa and wellness facilities, and 24/7 security with smart home technology. Branded clusters like Address Villas Tierra and Palace Villas Ostra also offer hotel-level concierge and hospitality services."
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
  // Real renders from Google Drive
  { id: "g1", category: "Exterior", alt: "Lavita Ultra-Luxury Waterfront Mansion", gradient: "from-amber-500 to-yellow-300", imageUrl: "/images/gallery/lavita-render-1.png" },
  { id: "g2", category: "Exterior", alt: "Lavita Mansion Exterior View", gradient: "from-amber-600 to-orange-300", imageUrl: "/images/gallery/lavita-render-2.png" },
  { id: "g3", category: "Exterior", alt: "Mirage Premium Villa Render", gradient: "from-sky-500 to-blue-300", imageUrl: "/images/gallery/mirage-render-1.png" },
  { id: "g4", category: "Exterior", alt: "Mirage Villa with Water View", gradient: "from-blue-500 to-indigo-300", imageUrl: "/images/gallery/mirage-render-2.png" },
  { id: "g5", category: "Exterior", alt: "Palmeira Collective Bespoke Villa", gradient: "from-teal-500 to-emerald-300", imageUrl: "/images/gallery/palmeira-collective-render-1.png" },
  { id: "g6", category: "Exterior", alt: "Palmeira Collective Garden View", gradient: "from-emerald-500 to-green-300", imageUrl: "/images/gallery/palmeira-collective-render-2.png" },
  { id: "g7", category: "Exterior", alt: "Address Villas Tierra Branded Residence", gradient: "from-emerald-500 to-teal-300", imageUrl: "/images/gallery/address-villas-tierra-factsheet-1.png" },
  { id: "g8", category: "Exterior", alt: "Palace Villas Ostra", gradient: "from-rose-500 to-pink-300", imageUrl: "/images/gallery/palace-villas-ostra-factsheet-1.png" },
  { id: "g9", category: "Exterior", alt: "Lavita Mansion Pool and Garden", gradient: "from-yellow-500 to-amber-300", imageUrl: "/images/gallery/lavita-render-3.png" },
  { id: "g10", category: "Exterior", alt: "Mirage Villa Architecture", gradient: "from-indigo-500 to-blue-300", imageUrl: "/images/gallery/mirage-render-3.png" },
  { id: "g11", category: "Exterior", alt: "Palmeira Collective Waterfront", gradient: "from-green-500 to-teal-300", imageUrl: "/images/gallery/palmeira-collective-render-3.png" },
  { id: "g12", category: "Master Plan", alt: "The Oasis Master Plan Map", gradient: "from-slate-500 to-blue-300", imageUrl: "/images/maps/masterplan.png" },
  { id: "g13", category: "Exterior", alt: "Lavita Mansion Side View", gradient: "from-orange-500 to-amber-300", imageUrl: "/images/gallery/lavita-render-4.png" },
  { id: "g14", category: "Exterior", alt: "Mirage Villa Garden", gradient: "from-cyan-500 to-sky-300", imageUrl: "/images/gallery/mirage-render-4.png" },
  { id: "g15", category: "Exterior", alt: "Palmeira Collective Interior Render", gradient: "from-teal-400 to-emerald-200", imageUrl: "/images/gallery/palmeira-collective-render-4.png" },
  { id: "g16", category: "Exterior", alt: "Lavita Waterfront Elevation", gradient: "from-amber-400 to-yellow-200", imageUrl: "/images/gallery/lavita-render-5.png" },
  { id: "g17", category: "Exterior", alt: "Mirage Pool Terrace", gradient: "from-sky-400 to-blue-200", imageUrl: "/images/gallery/mirage-render-5.png" },
  { id: "g18", category: "Exterior", alt: "Palmeira Collective Night Render", gradient: "from-emerald-400 to-teal-200", imageUrl: "/images/gallery/palmeira-collective-render-5.png" },
  { id: "g19", category: "Exterior", alt: "Lavita Grand Entrance", gradient: "from-yellow-400 to-orange-200", imageUrl: "/images/gallery/lavita-render-6.png" },
  { id: "g20", category: "Exterior", alt: "Mirage Sunset View", gradient: "from-indigo-400 to-violet-200", imageUrl: "/images/gallery/mirage-render-6.png" },
  { id: "g21", category: "Exterior", alt: "Palmeira Collective Landscaping", gradient: "from-green-400 to-emerald-200", imageUrl: "/images/gallery/palmeira-collective-render-6.png" },
  { id: "g22", category: "Exterior", alt: "Lavita Interior Design", gradient: "from-orange-400 to-amber-200", imageUrl: "/images/gallery/lavita-render-7.png" },
  { id: "g23", category: "Exterior", alt: "Mirage Interior Detail", gradient: "from-blue-400 to-cyan-200", imageUrl: "/images/gallery/mirage-render-7.png" },
  { id: "g24", category: "Exterior", alt: "Palmeira Collective Pool Area", gradient: "from-teal-400 to-cyan-200", imageUrl: "/images/gallery/palmeira-collective-render-7.png" },
  { id: "g25", category: "Exterior", alt: "Lavita Aerial Perspective", gradient: "from-amber-400 to-yellow-100", imageUrl: "/images/gallery/lavita-render-8.png" },
  { id: "g26", category: "Exterior", alt: "Mirage Landscaped Garden", gradient: "from-sky-400 to-blue-100", imageUrl: "/images/gallery/mirage-render-8.png" },
  { id: "g27", category: "Exterior", alt: "Palmeira Collective Elevation", gradient: "from-emerald-400 to-green-100", imageUrl: "/images/gallery/palmeira-collective-render-8.png" },
  // Fallback AI-generated images for amenities/community
  { id: "g28", category: "Amenities", alt: "Crystal lagoon and beach area", gradient: "from-cyan-500 to-sky-300", imageUrl: "/images/gallery/gallery-amenities-1.png" },
  { id: "g29", category: "Amenities", alt: "Infinity pool overlooking the waterway", gradient: "from-blue-500 to-cyan-300", imageUrl: "/images/gallery/gallery-amenities-2.png" },
  { id: "g30", category: "Community", alt: "Waterfront promenade at sunset", gradient: "from-orange-500 to-amber-300", imageUrl: "/images/gallery/gallery-community-1.png" },
  { id: "g31", category: "Community", alt: "Green parks and jogging tracks", gradient: "from-green-500 to-emerald-300", imageUrl: "/images/gallery/gallery-community-2.png" },
  { id: "g32", category: "Amenities", alt: "Children's play area and waterpark", gradient: "from-violet-400 to-purple-200", imageUrl: "/images/gallery/gallery-amenities-3.png" },
  // AI-generated property renders from brochure processing
  { id: "g33", category: "Exterior", alt: "Address Villas Tierra — Branded Luxury by Address Hotels", gradient: "from-emerald-500 to-teal-300", imageUrl: "/images/gallery/address-villas-tierra-render.png" },
  { id: "g34", category: "Exterior", alt: "Lavita Ultra-Luxury Waterfront Mansion", gradient: "from-amber-600 to-yellow-300", imageUrl: "/images/gallery/lavita-mansion-exterior.png" },
  { id: "g35", category: "Exterior", alt: "Mareva Elegant Waterfront Villa", gradient: "from-violet-500 to-purple-300", imageUrl: "/images/gallery/mareva-villa-exterior.png" },
  { id: "g36", category: "Exterior", alt: "Mirage Premium Villa — The Pinnacle", gradient: "from-sky-600 to-blue-300", imageUrl: "/images/gallery/mirage-villa-premium.png" },
  { id: "g37", category: "Exterior", alt: "Palace Villas Ostra — Palace-Branded Luxury", gradient: "from-rose-500 to-pink-300", imageUrl: "/images/gallery/palace-villa-ostra.png" },
  { id: "g38", category: "Exterior", alt: "Palmeira Collective — Limited Edition Villa", gradient: "from-teal-500 to-emerald-300", imageUrl: "/images/gallery/palmeira-collective-exterior.png" },
  { id: "g39", category: "Exterior", alt: "Palmiera Contemporary Waterfront Villa", gradient: "from-orange-500 to-amber-300", imageUrl: "/images/gallery/palmiera-villa-contemporary.png" },
  { id: "g40", category: "Exterior", alt: "Palmiera 3 Accessible Luxury Villa", gradient: "from-cyan-500 to-sky-300", imageUrl: "/images/gallery/palmiera-3-villa.png" },
  { id: "g41", category: "Interior", alt: "Ultra-Luxury Villa Interior — Grand Living Room", gradient: "from-amber-400 to-orange-200", imageUrl: "/images/gallery/luxury-interior-living.png" },
  { id: "g42", category: "Amenities", alt: "Crystal Lagoon Beach Club & Resort Pool", gradient: "from-cyan-400 to-blue-200", imageUrl: "/images/gallery/beach-club-amenity.png" },
  { id: "g43", category: "Master Plan", alt: "The Oasis Community — Master Plan Aerial View", gradient: "from-teal-400 to-cyan-200", imageUrl: "/images/gallery/masterplan-aerial.png" },
  { id: "g44", category: "Exterior", alt: "Mareva Villa — From Official Brochure", gradient: "from-violet-400 to-fuchsia-200", imageUrl: "/images/gallery/mareva-render-1.png" },
  { id: "g45", category: "Exterior", alt: "Mareva Waterfront Living — Brochure View", gradient: "from-indigo-400 to-blue-200", imageUrl: "/images/gallery/mareva-render-2.png" },
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
export const EMAIL = "sales@oasisemaar.com";
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
