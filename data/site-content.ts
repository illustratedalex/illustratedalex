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
export const studioAddressFull = "30 Opera House Square\nClaremont, NH 03743";
export const BOOKING_URL =
  "https://book.squareup.com/appointments/7s9snq3nsbhzgk/location/L3SN2SYR67KKJ/services?buttonTextColor=ffffff&color=212121&locale=en&referrer=so";
/** @deprecated Use BOOKING_URL */
export const bookingUrl = BOOKING_URL;
export const shopUrl = "/shop";
export const GIFT_CARD_URL = "https://shop.illustratedalex.com/s/gift-cards";
export const STUDIO_PHONE = "+16038437005";
export const TEXT_STUDIO_URL =
  "sms:+16038437005?&body=Hi%20Alex%2C%20I%27m%20interested%20in%20booking%20a%20tattoo%20or%20piercing.";
export const GA_MEASUREMENT_ID = "G-Z9393L9072";

export const primaryNav = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/piercings", label: "Piercings" },
  { href: "/aftercare", label: "Aftercare" },
  { href: "/travel", label: "Travel" },
  { href: "/about", label: "About" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

export const mountainsideBio = [
  "Before Illustrated Alex, there was Mountainside Tattoo — a studio Alex owned and operated in Bellows Falls, Vermont for 18 years.",
  "Mountainside was where thousands of clients came through the door, where the craft was refined over long seasons in a small Vermont town, and where a real reputation was built one tattoo at a time.",
  "That chapter closed, but the work didn't stop. The move to Claremont, NH and the Illustrated Alex studio brought the same approach to a new space — personal, focused, and built around quality work.",
];

export const exploreTiles = [
  { href: "/portfolio", label: "Portfolio", description: "Custom tattoo work across styles and subjects" },
  { href: "/piercings", label: "Piercings", description: "Professional body piercing since the 1990s" },
  { href: "/aftercare", label: "Aftercare", description: "Tattoo and piercing healing guidance" },
  { href: "/travel", label: "Travel & Guest Spots", description: "Enfield CT · Redondo Beach CA" },
  { href: "/mountainside", label: "Mountainside Legacy", description: "18 years in Bellows Falls, VT" },
  { href: "/contact", label: "Contact", description: "Book an appointment or ask a question" },
];

export const locations = [
  {
    name: "Claremont, New Hampshire",
    label: "Home Studio",
    description: "Appointments recommended. Walk-ins may be available when the schedule allows.",
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
  "Nearly four decades in tattooing and piercing. 18 years at Mountainside Tattoo. Now at 30 Opera House Square in Claremont, NH — appointments recommended, with walk-in availability when schedule allows.";

export const aboutBio = [
  "Born in Holyoke, Massachusetts in 1971, Alex started tattooing in 1986 and built a career around custom work, consistency, and craftsmanship.",
  "Piercing services were added in the 1990s, expanding the studio offering while keeping the same standards for safety, quality, and aftercare.",
  "After settling in Vermont in 2001, Alex owned and operated Mountainside Tattoo in Bellows Falls for 18 years before opening Illustrated Alex Tattoo & Piercing in Claremont, New Hampshire.",
];

export const timeline: TimelineItem[] = [
  { label: "Born", value: "Holyoke, Massachusetts — 1971" },
  { label: "Tattooing Since", value: "1986" },
  { label: "Piercing Added", value: "1990s" },
  { label: "Settled in Vermont", value: "2001" },
  { label: "Mountainside Tattoo", value: "Owned for 18 years in Bellows Falls, VT" },
  { label: "Home Studio", value: "30 Opera House Square, Claremont, NH" },
  { label: "Guest Spots", value: "Enfield, CT · Redondo Beach, CA" },
];

export const services: Service[] = [
  {
    title: "Tattooing",
    description: "Custom tattoo work built around placement, style, and long-term wear.",
    detail: "Fine line, black & gray, cover-ups, custom concepts, and large-scale pieces.",
  },
  {
    title: "Piercings",
    description: "Professional piercing with anatomy-aware placement and quality jewelry.",
    detail: "Piercing services available since the 1990s with practical healing guidance.",
  },
  {
    title: "Aftercare",
    description: "Clear aftercare instructions for tattoos and piercings to support healing.",
  },
  {
    title: "Travel / Guest Spots",
    description: "Guest sessions in Enfield, CT and Redondo Beach, CA when dates are announced.",
  },
  {
    title: "Shop",
    description: "Artwork, merch, and studio items are available through the online shop.",
  },
];

// ---------------------------------------------------------------------------
// Gallery — placeholder data (ready to connect to DeadSignal Compass)
// Only items with status: "published" should be displayed.
// ---------------------------------------------------------------------------

export const galleryItems: GalleryItem[] = [
  {
    id: "raven-shoulder",
    title: "Raven Shoulder Piece",
    description: "Detailed shoulder tattoo with strong contrast and texture.",
    category: "Black & Gray",
    imageUrl: "/images/gallery/raven-shoulder.jpg",
    altText: "Raven tattoo on shoulder",
    status: "published",
    featured: true,
    sortOrder: 1,
  },
  {
    id: "scrooge",
    title: "Scrooge Portrait",
    description: "Character portrait tattoo with expressive line and shading.",
    category: "Tattoos",
    imageUrl: "/images/gallery/scrooge.jpg",
    altText: "Scrooge portrait tattoo",
    status: "published",
    featured: true,
    sortOrder: 2,
  },
  {
    id: "highland-cow",
    title: "Highland Cow",
    description: "Custom tattoo featuring a highland cow portrait.",
    category: "Tattoos",
    imageUrl: "/images/gallery/highland-cow.jpg",
    altText: "Highland cow tattoo",
    status: "published",
    featured: true,
    sortOrder: 3,
  },
  {
    id: "snake-spine",
    title: "Snake Spine",
    description: "Long-form spine work with flow and movement.",
    category: "Sleeves",
    imageUrl: "/images/gallery/snake-spine.jpg",
    altText: "Snake tattoo running down the spine",
    status: "published",
    featured: true,
    sortOrder: 4,
  },
  {
    id: "cherry-blossom-spine",
    title: "Cherry Blossom Spine",
    description: "Fine line floral composition designed for spine placement.",
    category: "Fine Line",
    imageUrl: "/images/gallery/cherry-blossom-spine.jpg",
    altText: "Cherry blossom tattoo along spine",
    status: "published",
    featured: true,
    sortOrder: 5,
  },
  {
    id: "dermal-piercing",
    title: "Dermal Piercing",
    description: "Clean dermal placement with professional jewelry.",
    category: "Piercings",
    imageUrl: "/images/gallery/dermal-piercing.jpg",
    altText: "Dermal piercing placement",
    status: "published",
    featured: false,
    sortOrder: 6,
  },
  {
    id: "eagle",
    title: "Eagle",
    description: "Bold eagle tattoo with dramatic black and gray value work.",
    category: "Black & Gray",
    imageUrl: "/images/gallery/eagle.jpg",
    altText: "Eagle tattoo in black and gray",
    status: "published",
    featured: false,
    sortOrder: 7,
  },
  {
    id: "floral-forearm",
    title: "Floral Forearm",
    description: "Fine line floral forearm piece.",
    category: "Fine Line",
    imageUrl: "/images/gallery/floral-forearm.jpg",
    altText: "Floral forearm tattoo",
    status: "published",
    featured: false,
    sortOrder: 8,
  },
  {
    id: "elephant-lion",
    title: "Elephant & Lion",
    description: "Rework and blend piece combining existing and new imagery.",
    category: "Cover-ups",
    imageUrl: "/images/gallery/elephant-lion.jpg",
    altText: "Elephant and lion tattoo composition",
    status: "published",
    featured: false,
    sortOrder: 9,
  },
  {
    id: "moth-hand",
    title: "Moth Hand",
    description: "Hand-sized custom moth inspired by classic flash structure.",
    category: "Flash",
    imageUrl: "/images/gallery/moth-hand.jpg",
    altText: "Moth tattoo on hand",
    status: "published",
    featured: false,
    sortOrder: 10,
  },
  {
    id: "memorial-wings",
    title: "Memorial Wings",
    description: "Memorial tattoo with soft black and gray blending.",
    category: "Black & Gray",
    imageUrl: "/images/gallery/memorial-wings.jpg",
    altText: "Memorial wings tattoo",
    status: "published",
    featured: false,
    sortOrder: 11,
  },
  {
    id: "rose-hand",
    title: "Rose Hand",
    description: "Fine line rose hand tattoo.",
    category: "Fine Line",
    imageUrl: "/images/gallery/rose-hand.jpg",
    altText: "Rose tattoo on hand",
    status: "published",
    featured: false,
    sortOrder: 12,
  },
  {
    id: "clown",
    title: "Clown",
    description: "Custom clown portrait with high-detail texture.",
    category: "Tattoos",
    imageUrl: "/images/gallery/clown.jpg",
    altText: "Clown portrait tattoo",
    status: "published",
    featured: false,
    sortOrder: 13,
  },
  {
    id: "butterfly-chest",
    title: "Butterfly Chest",
    description: "Fine line butterfly composition for chest placement.",
    category: "Fine Line",
    imageUrl: "/images/gallery/butterfly-chest.jpg",
    altText: "Butterfly tattoo on chest",
    status: "published",
    featured: false,
    sortOrder: 14,
  },
  {
    id: "gambling",
    title: "Gambling Concept",
    description: "Session build in progress around a gambling theme.",
    category: "In Progress",
    imageUrl: "/images/gallery/gambling.jpg",
    altText: "In-progress gambling themed tattoo",
    status: "published",
    featured: false,
    sortOrder: 15,
  },
  {
    id: "we-the-people",
    title: "We the People",
    description: "Black and gray lettering and symbolic custom design.",
    category: "Black & Gray",
    imageUrl: "/images/gallery/we-the-people.jpg",
    altText: "We the People black and gray tattoo",
    status: "published",
    featured: false,
    sortOrder: 16,
  },
  {
    id: "sun-moon-chest",
    title: "Sun & Moon Chest",
    description: "Custom chest piece with sun and moon elements.",
    category: "Tattoos",
    imageUrl: "/images/gallery/sun-moon-chest.jpg",
    altText: "Sun and moon chest tattoo",
    status: "published",
    featured: false,
    sortOrder: 17,
  },
  {
    id: "flower-sleeve",
    title: "Flower Sleeve",
    description: "Sleeve session with layered floral structure.",
    category: "Sleeves",
    imageUrl: "/images/gallery/flower-sleeve.jpg",
    altText: "Floral sleeve tattoo",
    status: "published",
    featured: false,
    sortOrder: 18,
  },
  {
    id: "floral-hip",
    title: "Floral Hip",
    description: "Fine line floral work designed to contour the hip.",
    category: "Fine Line",
    imageUrl: "/images/gallery/floral-hip.jpg",
    altText: "Floral hip tattoo",
    status: "published",
    featured: false,
    sortOrder: 19,
  },
  {
    id: "facial-piercings",
    title: "Facial Piercings",
    description: "Facial piercing setup with balanced spacing and jewelry.",
    category: "Piercings",
    imageUrl: "/images/gallery/facial-piercings.jpg",
    altText: "Facial piercing work",
    status: "published",
    featured: false,
    sortOrder: 20,
  },
  {
    id: "studio-door",
    title: "Studio Door",
    description: "Illustrated Alex private studio entrance.",
    category: "Studio",
    imageUrl: "/images/studio/studio-door.jpg",
    altText: "Illustrated Alex studio door in Claremont",
    status: "published",
    featured: false,
    sortOrder: 21,
  },
  {
    id: "studio-front",
    title: "Studio Front",
    description: "Front view of the Claremont studio location.",
    category: "Studio",
    imageUrl: "/images/studio/studio-front.jpg",
    altText: "Front of Illustrated Alex studio in Claremont",
    status: "published",
    featured: false,
    sortOrder: 22,
  },
  {
    id: "alex-tattooing",
    title: "Alex Tattooing",
    description: "In-session tattoo work at the private studio.",
    category: "Studio",
    imageUrl: "/images/studio/alex-tattooing.jpg",
    altText: "Alex tattooing at Illustrated Alex studio",
    status: "published",
    featured: false,
    sortOrder: 23,
  },
];

export const instagramHandles = [
  "@illustratedalex",
  "@alexdoestattooing",
  "@alexdoespiercing",
];
