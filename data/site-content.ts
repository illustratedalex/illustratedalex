// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

export type Service = {
  title: string;
  description: string;
  detail?: string;
};

export type TimelineItem = {
  label: string;
  value: string;
};

// ---------------------------------------------------------------------------
// Gallery — shaped to match DeadSignal Compass gallery fields
// ---------------------------------------------------------------------------

export const galleryCategories = [
  "Tattoos",
  "Piercings",
  "Cover-ups",
  "Sleeves",
  "Fine Line",
  "Black & Gray",
  "Flash",
  "In Progress",
  "Studio",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];
export type GalleryItemStatus = "published" | "draft" | "archived";

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  category: GalleryCategory;
  imageUrl: string;
  altText: string;
  status: GalleryItemStatus;
  featured: boolean;
  sortOrder: number;
  instagramUrl?: string;
};

// ---------------------------------------------------------------------------
// Static content
// ---------------------------------------------------------------------------

export const businessName = "Illustrated Alex";
export const businessTagline = "Tattoo • Piercing • Art";
export const businessFullName = "Illustrated Alex Tattoo & Piercing";

export const studioAddress = "30 Opera House Square, Claremont, NH";
export const bookingUrl = "/contact#book";
export const shopUrl = "/shop";

export const primaryNav = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/piercings", label: "Piercings" },
  { href: "/aftercare", label: "Aftercare" },
  { href: "/travel", label: "Travel" },
  { href: "/about", label: "About" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

export const locations = [
  {
    name: "Claremont, New Hampshire",
    label: "Home Studio",
    description: "Private, appointment-based studio.",
    address: "30 Opera House Square, Claremont, NH",
    type: "home" as const,
  },
  {
    name: "Enfield, Connecticut",
    label: "Guest Artist",
    description: "Available for guest bookings.",
    address: "Enfield, CT",
    type: "guest" as const,
  },
  {
    name: "Redondo Beach, California",
    label: "Guest Artist",
    description: "West Coast guest spots available.",
    address: "Redondo Beach, CA",
    type: "guest" as const,
  },
];

export const portfolioCategories = [
  "Fine Line & Floral",
  "Black & Gray",
  "Realism",
  "Wildlife",
  "Custom Concepts",
  "Piercing",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

export const aboutSummary =
  "Nearly four decades in tattooing and piercing. 18 years at Mountainside Tattoo. Now at 30 Opera House Square in Claremont, NH — private, appointment-based, built around the work.";

export const aboutBio = [
  "Illustrated Alex started tattooing in 1986 — long before it was mainstream, back when the craft was passed down shop to shop and you earned your seat. Born in Holyoke, Massachusetts in 1971, the foundation was built on real work, with real clients, and real accountability.",
  "Body piercing was added in the 1990s, extending the range without ever softening the standards. Eighteen years at Mountainside Tattoo gave the work depth and consistency — and eventually led to setting up the current private studio at 30 Opera House Square in Claremont, New Hampshire.",
  "Guest artist work takes the studio to Enfield, CT and Redondo Beach, CA. Different cities, same approach: portfolio-first, appointment-based, no shortcuts.",
];

export const timeline: TimelineItem[] = [
  { label: "Born", value: "Holyoke, Massachusetts — 1971" },
  { label: "Tattooing Since", value: "1986" },
  { label: "Piercing Added", value: "1990s" },
  { label: "Mountainside Tattoo", value: "18 years" },
  { label: "Home Studio", value: "30 Opera House Square, Claremont, NH" },
  { label: "Guest Spots", value: "Enfield, CT · Redondo Beach, CA" },
];

export const services: Service[] = [
  {
    title: "Custom Tattooing",
    description:
      "Every tattoo is drawn around the person wearing it — placement, style, and long-term wear all considered before the machine starts.",
    detail:
      "Specialties include fine line, black & gray, realism, wildlife, cover-ups, and large-scale sleeve work.",
  },
  {
    title: "Body Piercing",
    description:
      "Professional piercing with correct anatomy assessment, quality jewelry, and real aftercare guidance included in every appointment.",
    detail:
      "Piercing since the &rsquo;90s. Practiced across most placements, with an emphasis on healing and long-term comfort.",
  },
  {
    title: "Cover-ups & Reworks",
    description:
      "Old work you regret? Cover-ups and reworks are a specialty — reshaping, layering, and designing around what&rsquo;s already there.",
    detail: "Bring photos. A strong cover-up starts with a thorough consultation.",
  },
  {
    title: "Sleeves & Large-Scale Work",
    description:
      "Full and half sleeves, chest pieces, and larger body work planned across sessions with a cohesive design from start to finish.",
  },
  {
    title: "Traveling Guest Artist",
    description:
      "Available for guest spots at studios and private events — day, week, month, or longer. Currently visiting Enfield, CT and Redondo Beach, CA.",
  },
];

// ---------------------------------------------------------------------------
// Gallery — placeholder data (ready to connect to DeadSignal Compass)
// Only items with status: "published" should be displayed.
// ---------------------------------------------------------------------------

export const galleryItems: GalleryItem[] = [
  {
    id: "tattoo-1",
    title: "Black & Gray Custom Piece",
    description: "Custom black and gray work, forearm placement.",
    category: "Black & Gray",
    imageUrl: "/images/gallery/tattoo-1.jpg",
    altText: "Custom black and gray tattoo on forearm",
    status: "published",
    featured: true,
    sortOrder: 1,
  },
  {
    id: "tattoo-2",
    title: "Fine Line Portrait",
    description: "Detailed fine line portrait work.",
    category: "Fine Line",
    imageUrl: "/images/gallery/tattoo-2.jpg",
    altText: "Fine line portrait tattoo",
    status: "published",
    featured: true,
    sortOrder: 2,
  },
  {
    id: "piercing-1",
    title: "Professional Piercing",
    description: "Clean placement, quality jewelry.",
    category: "Piercings",
    imageUrl: "/images/gallery/piercing-1.jpg",
    altText: "Professional body piercing",
    status: "published",
    featured: false,
    sortOrder: 3,
  },
  {
    id: "coverup-1",
    title: "Cover-up Transformation",
    description: "Old work fully covered with a fresh custom design.",
    category: "Cover-ups",
    imageUrl: "/images/gallery/coverup-1.jpg",
    altText: "Cover-up tattoo transformation",
    status: "published",
    featured: true,
    sortOrder: 4,
  },
  {
    id: "flash-1",
    title: "Studio Flash Design",
    description: "Ready-to-go flash available for appointments.",
    category: "Flash",
    imageUrl: "/images/gallery/flash-1.jpg",
    altText: "Studio flash tattoo design",
    status: "published",
    featured: false,
    sortOrder: 5,
  },
  {
    id: "sleeve-1",
    title: "Sleeve in Progress",
    description: "Half sleeve build-out across multiple sessions.",
    category: "Sleeves",
    imageUrl: "/images/gallery/sleeve-1.jpg",
    altText: "Half sleeve tattoo in progress",
    status: "published",
    featured: false,
    sortOrder: 6,
  },
  {
    id: "tattoo-3",
    title: "Wildlife Detail",
    description: "High-detail wildlife piece.",
    category: "Tattoos",
    imageUrl: "/images/gallery/tattoo-3.jpg",
    altText: "Wildlife detail tattoo",
    status: "published",
    featured: false,
    sortOrder: 7,
  },
  {
    id: "tattoo-4",
    title: "Custom Color Work",
    description: "Full-color custom tattoo.",
    category: "Tattoos",
    imageUrl: "/images/gallery/tattoo-4.jpg",
    altText: "Custom color tattoo",
    status: "published",
    featured: false,
    sortOrder: 8,
  },
  {
    id: "studio-1",
    title: "Studio",
    description: "Clean, personal workspace.",
    category: "Studio",
    imageUrl: "/images/gallery/studio-1.jpg",
    altText: "Tattoo studio workspace",
    status: "published",
    featured: false,
    sortOrder: 9,
  },
  {
    id: "draft-1",
    title: "Upcoming Work",
    description: "Draft — not yet shown.",
    category: "Tattoos",
    imageUrl: "/images/gallery/draft-1.jpg",
    altText: "Draft gallery item",
    status: "draft",
    featured: false,
    sortOrder: 10,
  },
];

export const instagramHandles = [
  "@illustratedalex",
  "@alexdoestattooing",
  "@alexdoespiercing",
];
