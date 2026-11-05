/**
 * Static seed for the on-site shop. Not synced from Square Catalog.
 * Sell prices for jewelry are the inventory draft (3× wholesale).
 * Wholesale cost is intentionally not stored here.
 * Square variation ids stay null until Alex links Catalog objects.
 * Merch ids are local draft refs, not Printful or Printify product ids.
 * This file avoids path aliases so the seed tests and sandbox server can import it from Node.
 */

import { photoCountedListings } from "./photo-counted-listings.ts";

const SQUARE_GIFT_CARD_URL = "https://shop.illustratedalex.com/s/gift-cards";

export type DepartmentSlug = "aftercare" | "body-jewelry" | "merch";

export type PhotoStatus = "ready" | "coming" | "needed";

export type Fulfillment = "square-catalog" | "aftercare-later" | "pod-placeholder" | "square-gift-card";

export type CatalogVariant = {
  id: string;
  label: string;
  /** Overrides the product price when lengths do not share one shelf price. */
  priceCents?: number;
  /** On-hand count for this option when colors or styles are counted separately. */
  stockCount?: number;
  /** Square Catalog ITEM_VARIATION id. Null until register sync. */
  squareCatalogVariationId: string | null;
};

export type CatalogDepartment = {
  slug: DepartmentSlug;
  name: string;
  summary: string;
};

export type CatalogCategory = {
  slug: string;
  name: string;
  department: DepartmentSlug;
  summary: string;
};

export type CatalogProduct = {
  slug: string;
  /** Inventory or draft ref. Not used as the public title. */
  sku: string;
  /** Type – Material – Gauge – Style, with gauge omitted when it was never measured. */
  title: string;
  department: DepartmentSlug;
  category: string;
  /** Null means the price is still TBD. */
  priceCents: number | null;
  unit: "each" | "pair";
  stockCount: number | null;
  stockLabel: string | null;
  image: string | null;
  imageAlt: string | null;
  /** Extra photos after the primary image. First entry is the secondary shot. */
  gallery?: { src: string; alt: string }[];
  photoStatus: PhotoStatus;
  /** Lifestyle frames fill the tile. Studio packshots stay contained. */
  imageFit?: "cover" | "contain";
  description: string;
  materials: string[];
  variants: CatalogVariant[];
  featured: boolean;
  fulfillment: Fulfillment;
  /** Shown on merch that needs a print-on-demand account reconnected. */
  reconnect: string | null;
  externalHref: string | null;
  /**
   * True only for a plug, tunnel, or other flat-face blank that can take a UV print.
   * Thin posts, balls, and curved barbells stay unset.
   */
  customPrintEligible?: boolean;
};

const variation = (id: string, label: string, priceCents?: number, stockCount?: number): CatalogVariant => ({
  id,
  label,
  ...(priceCents === undefined ? {} : { priceCents }),
  ...(stockCount === undefined ? {} : { stockCount }),
  squareCatalogVariationId: null,
});

export const departments: CatalogDepartment[] = [
  {
    slug: "aftercare",
    name: "Aftercare",
    summary: "Piercing and tattoo aftercare. Product listings wait for the real saline and recovery SKUs.",
  },
  {
    slug: "body-jewelry",
    name: "Body Jewelry",
    summary: "Studio inventory draft for Claremont. Shelf prices match the latest inventory pass.",
  },
  {
    slug: "merch",
    name: "Merch",
    summary:
      "Illustrated Alex studio merch placeholders. Shitty Tees, Tattoo T’s, and Green Mountain Printing are separate shops and are not listed here.",
  },
];

export const categories: CatalogCategory[] = [
  {
    slug: "piercing-aftercare",
    name: "Piercing Aftercare",
    department: "aftercare",
    summary: "H2Ocean spray and alcohol-free rinses for healing piercings. Prices follow average online retail.",
  },
  {
    slug: "tattoo-aftercare",
    name: "Tattoo Aftercare",
    department: "aftercare",
    summary: "Tattoo wash, ointment, and film can land here later. The written Tegaderm guide stays on the aftercare page.",
  },
  {
    slug: "ear",
    name: "Ear",
    department: "body-jewelry",
    summary: "Lobes, cartilage, and tragus pieces from the studio draft.",
  },
  {
    slug: "eyebrow",
    name: "Eyebrow",
    department: "body-jewelry",
    summary: "Curved barbells for eyebrow piercings.",
  },
  {
    slug: "industrial",
    name: "Industrial",
    department: "body-jewelry",
    summary: "Straight industrial barbells.",
  },
  {
    slug: "lip-labret",
    name: "Lip / Labret",
    department: "body-jewelry",
    summary: "Labret posts, including long cheek labrets.",
  },
  {
    slug: "navel",
    name: "Navel",
    department: "body-jewelry",
    summary: "Belly rings from the studio draft.",
  },
  {
    slug: "nipples",
    name: "Nipples",
    department: "body-jewelry",
    summary: "No nipple jewelry is in this inventory draft.",
  },
  {
    slug: "nose",
    name: "Nose",
    department: "body-jewelry",
    summary: "No nostril jewelry is in this inventory draft.",
  },
  {
    slug: "septum",
    name: "Septum",
    department: "body-jewelry",
    summary: "No septum jewelry is in this inventory draft.",
  },
  {
    slug: "tongue",
    name: "Tongue",
    department: "body-jewelry",
    summary: "No tongue jewelry is in this inventory draft.",
  },
  {
    slug: "accessories",
    name: "Accessories",
    department: "merch",
    summary: "Hats and similar studio accessories. Photo and price still needed.",
  },
  {
    slug: "apparel",
    name: "Apparel",
    department: "merch",
    summary: "T-shirts, sweatshirts, and hoodies Alex has sold as studio merch. Print files are not connected.",
  },
  {
    slug: "gift-cards",
    name: "Gift Cards",
    department: "merch",
    summary: "Gift cards already exist on the Square register. This page points at that flow.",
  },
  {
    slug: "stickers",
    name: "Stickers",
    department: "merch",
    summary: "Studio sticker pack. Photo and price still needed.",
  },
];

export const products: CatalogProduct[] = [
  {
    slug: "ocean-blue-glitter-spiral-tapers",
    sku: "IA-BLUE-SPIRAL-PAIR",
    title: "Spiral Tapers – Acrylic – Ocean Blue Glitter",
    department: "body-jewelry",
    category: "ear",
    priceCents: 570,
    unit: "pair",
    stockCount: 5,
    stockLabel: "5 pairs on hand (10 pieces, photo count). Sold only as matched pairs. Gauges not measured yet.",
    image: "/images/jewelry/blue-glitter-spiral-distributor-01.jpg",
    imageAlt: "Mixed sizes of blue glitter acrylic spiral tapers on a white background",
    gallery: [
      {
        src: "/images/jewelry/blue-glitter-spiral-distributor-02.jpg",
        alt: "Single blue glitter acrylic spiral taper on a white background",
      },
      {
        src: "/images/jewelry/ocean-blue-glitter-acrylic-spiral-tapers-alex.jpg",
        alt: "Studio photo of ocean-blue glitter acrylic spiral tapers on a shelf",
      },
    ],
    photoStatus: "ready",
    description:
      "Deep ocean-blue glitter acrylic spirals. Lightweight, sold only as a matched pair. Wear in healed lobes. Ask a piercer before using them to stretch.",
    materials: [
      "Acrylic with glitter",
      "Sold as a matched pair",
      "Clean with mild soap and water only — no alcohol",
      "Gauges are not measured yet",
    ],
    variants: [variation("matched-pair", "Matched pair")],
    featured: true,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
  },
  {
    slug: "milky-white-blank-plugs",
    sku: "IA-WHITE-BLANK-PLUGS",
    title: "Blank Plugs – Acrylic – Milky White – Double Flare",
    department: "body-jewelry",
    category: "ear",
    priceCents: 390,
    unit: "pair",
    stockCount: 4,
    stockLabel: "4 pairs on hand (8 pieces, photo count). Assorted gauges — ask the shop.",
    image: "/images/jewelry/achadirect-aspg.jpg",
    imageAlt: "White acrylic double-flare blank plugs",
    photoStatus: "ready",
    description:
      "Solid matte milky-white acrylic double-flare saddle plugs, sold as a matched pair. Assorted gauges — ask the shop before you order. These blanks can be worn for stretching or custom UV printed. The iris pair in the studio photos is an example only and is not this listing.",
    materials: ["Solid matte milky-white acrylic", "Double-flare saddle", "Assorted gauges — ask the shop", "Custom UV print eligible"],
    variants: [variation("assorted", "Assorted gauges — ask the shop")],
    featured: true,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
    customPrintEligible: true,
  },
  {
    slug: "black-blank-plugs",
    sku: "IA-BLACK-BLANK-PLUGS",
    title: "Blank Plugs – Acrylic – Black – Flat Face",
    department: "body-jewelry",
    category: "ear",
    priceCents: 390,
    unit: "pair",
    stockCount: 4,
    stockLabel: "4 pairs on hand (9 pieces; 1 leftover held). Assorted gauges — ask the shop.",
    image: "/images/jewelry/achadirect-aspg.jpg",
    imageAlt: "Acrylic double-flare blank plugs. Black blanks share this catalog photo until a black-only shot is available.",
    photoStatus: "ready",
    description:
      "Solid gloss black acrylic plugs with a flat face, sold as a matched pair. Assorted gauges — ask the shop before you order. The catalog photo is the shared blank style until a black-only shot is available. The octopus pair in the studio photos is an example only and is not this listing.",
    materials: ["Solid gloss black acrylic", "Flat face", "Assorted gauges — ask the shop", "Custom UV print eligible"],
    variants: [variation("assorted", "Assorted gauges — ask the shop")],
    featured: false,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
    customPrintEligible: true,
  },
  {
    slug: "dark-wood-blank-plugs",
    sku: "IA-WOOD-BLANK-PLUGS",
    title: "Blank Plugs – Dark Wood – Double Flare",
    department: "body-jewelry",
    category: "ear",
    priceCents: 774,
    unit: "pair",
    stockCount: 2,
    stockLabel: "2 pairs on hand (5 pieces; 1 leftover held). Assorted gauges — ask the shop.",
    image: "/images/jewelry/achadirect-pwkk.jpg",
    imageAlt: "Dark wood double-flare blank plugs",
    photoStatus: "ready",
    description:
      "Natural dark wood double-flare plugs, areng-style, species unconfirmed. Sold as a matched pair. Assorted gauges — ask the shop before you order. A custom print on this wood uses a white underbase. The skull pair in the studio photos is an example only and is not this listing.",
    materials: ["Natural dark wood (areng-style; species unconfirmed)", "Double flare", "Assorted gauges — ask the shop", "Custom UV print eligible with a white underbase"],
    variants: [variation("assorted", "Assorted gauges — ask the shop")],
    featured: false,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
    customPrintEligible: true,
  },
  {
    slug: "steel-bezel-set-cz-studs",
    sku: "OT-194",
    title: "Studs – Steel – Bezel-Set CZ",
    department: "body-jewelry",
    category: "ear",
    priceCents: 810,
    unit: "pair",
    stockCount: null,
    stockLabel: "Stock TBD — awaiting shelf photo count",
    image: null,
    imageAlt: null,
    photoStatus: "coming",
    description:
      "Steel bezel-set CZ studs, sold as a pair. The supplier lists them as sterilized. The public supplier catalog no longer has this SKU, so there is no product photo.",
    materials: ["Steel", "Bezel-set CZ", "Sold as a pair", "Supplier listed this pair as sterilized"],
    variants: [variation("pair", "Pair")],
    featured: false,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
  },
  {
    slug: "gold-ip-steel-5-cz-leaf-labret",
    sku: "MO-359",
    title: "Gold Leaf CZ Tragus Labret",
    department: "body-jewelry",
    category: "ear",
    priceCents: 876,
    unit: "each",
    stockCount: null,
    stockLabel: "Stock TBD — awaiting shelf photo count",
    image: "/images/jewelry/tragus-leaf-cz-gold-model-01.jpg",
    imageAlt: "Gold five-CZ leaf labret worn in a tragus",
    photoStatus: "ready",
    imageFit: "cover",
    description:
      "Gold ion-plated steel threadless push-in labret topped with a five-stone CZ leaf. Made for tragus, and it can sit in a flat or helix when the length is right. 16G, 8 mm (5/16 in).",
    materials: ["Steel, gold ion plated", "Clear CZ", "Threadless push-in", "16G", "8 mm (5/16 in) post", "Five-CZ leaf"],
    variants: [variation("8mm", "16G · 5/16 in (8 mm)")],
    featured: true,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
  },
  {
    slug: "steel-14g-ball-tragus-labret",
    sku: "LA-024",
    title: "Steel Internally Threaded Ball Tragus Labret 14G",
    department: "body-jewelry",
    category: "ear",
    priceCents: 81,
    unit: "each",
    stockCount: null,
    stockLabel: "Stock TBD — awaiting shelf photo count",
    image: "/images/jewelry/mo-010-la-024-steel-ball-tragus-labret.jpg",
    imageAlt: "Steel internally threaded ball labrets on a white background",
    gallery: [
      {
        src: "/images/jewelry/mo-010-la-024-steel-ball-tragus-labret-hand.jpg",
        alt: "Steel ball labrets held in a hand",
      },
    ],
    photoStatus: "ready",
    description: "Steel internally threaded ball-end tragus labret, 14G. Lengths 12 mm, 11 mm, and 10 mm are $0.81 each.",
    materials: ["Steel", "Internally threaded", "Ball end", "14G", "Tragus / ear labret"],
    variants: [variation("12mm", "12 mm"), variation("11mm", "11 mm"), variation("10mm", "10 mm")],
    featured: false,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
  },
  {
    slug: "steel-16g-ball-tragus-labret",
    sku: "MO-010",
    title: "Steel Internally Threaded Ball Tragus Labret 16G",
    department: "body-jewelry",
    category: "ear",
    priceCents: 81,
    unit: "each",
    stockCount: 49,
    stockLabel: "About 49 on hand (photo count). Lengths not separated.",
    image: "/images/jewelry/mo-010-la-024-steel-ball-tragus-labret.jpg",
    imageAlt: "Steel internally threaded ball labrets on a white background",
    gallery: [
      {
        src: "/images/jewelry/mo-010-la-024-steel-ball-tragus-labret-hand.jpg",
        alt: "Steel ball labrets held in a hand",
      },
    ],
    photoStatus: "ready",
    description: "Steel internally threaded ball-end tragus labret, 16G. The photo-counted loose ball labrets are mostly 16G and are listed here. Lengths are not separated. $0.81 each.",
    materials: ["Steel", "Internally threaded", "Ball end", "16G", "Tragus / ear labret"],
    variants: [
      variation("14mm", "14 mm"),
      variation("12mm", "12 mm"),
      variation("11mm", "11 mm"),
      variation("8mm", "8 mm"),
    ],
    featured: false,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
  },
  {
    slug: "steel-16g-curved-barbell",
    sku: "EY-012",
    title: "Curved Barbell – Steel – 16G – Internally Threaded",
    department: "body-jewelry",
    category: "eyebrow",
    priceCents: 171,
    unit: "each",
    stockCount: null,
    stockLabel: "Stock TBD — awaiting shelf photo count",
    image: "/images/jewelry/apm-ey-012-curved-barbell.jpg",
    imageAlt: "16G steel internally threaded curved barbells on a white background",
    photoStatus: "ready",
    description: "16G steel internally threaded curved barbell for eyebrow piercings. Lengths 16, 14, 11, 10, and 8 mm share one price.",
    materials: ["Steel", "Internally threaded", "16G", "Curved barbell"],
    variants: [
      variation("16mm", "16 mm"),
      variation("14mm", "14 mm"),
      variation("11mm", "11 mm"),
      variation("10mm", "10 mm"),
      variation("8mm", "8 mm"),
    ],
    featured: false,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
  },
  {
    slug: "steel-industrial-barbell",
    sku: "IB-036",
    title: "Industrial Barbell – Steel – 14G / 16G",
    department: "body-jewelry",
    category: "ear",
    priceCents: 60,
    unit: "each",
    stockCount: 116,
    stockLabel: "About 116 on hand (photo count across trays, ±15%). Gauge/length not separated.",
    image: "/images/jewelry/apm-ib-036-steel-industrial.jpg",
    imageAlt: "Plain steel industrial barbells in three lengths on a white background",
    photoStatus: "ready",
    description: "Basic steel industrial barbell in 14G and 16G. Lengths 38 mm, 35 mm, and 31 mm share one price.",
    materials: ["Steel", "Straight industrial barbell", "14G and 16G"],
    variants: [
      variation("14g-38mm", "14G · 38 mm"),
      variation("14g-35mm", "14G · 35 mm"),
      variation("14g-31mm", "14G · 31 mm"),
      variation("16g-38mm", "16G · 38 mm"),
      variation("16g-35mm", "16G · 35 mm"),
      variation("16g-31mm", "16G · 31 mm"),
    ],
    featured: false,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
  },
  {
    slug: "g23-ti-cz-dangle-cone-labret",
    sku: "T-MO-402",
    title: "Labret – G23 Titanium – 16G – Internally Threaded CZ Dangle Cone",
    department: "body-jewelry",
    category: "lip-labret",
    priceCents: 1176,
    unit: "each",
    stockCount: null,
    stockLabel: "Stock TBD — awaiting shelf photo count",
    image: "/images/jewelry/apm-t-mo-402-cz-dangle-cone.jpg",
    imageAlt: "G23 titanium internally threaded CZ dangle cone labret on a white background",
    photoStatus: "ready",
    description: "G23 titanium internally threaded labret with a CZ dangle cone. 16G, 8 mm post.",
    materials: ["G23 titanium", "Internally threaded", "16G", "8 mm post", "CZ dangle cone"],
    variants: [variation("8mm", "8 mm post")],
    featured: true,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
  },
  {
    slug: "g23-gold-pvd-ti-cz-dangle-cone-labret",
    sku: "T-MO-403",
    title: "Labret – G23 Gold PVD Titanium – 16G – Internally Threaded CZ Dangle Cone",
    department: "body-jewelry",
    category: "lip-labret",
    priceCents: 1296,
    unit: "each",
    stockCount: null,
    stockLabel: "Stock TBD — awaiting shelf photo count",
    image: "/images/jewelry/apm-t-mo-403-gold-cz-dangle-cone.jpg",
    imageAlt: "G23 gold PVD titanium internally threaded CZ dangle cone labret on a white background",
    photoStatus: "ready",
    description: "G23 titanium internally threaded labret with a gold PVD finish and a CZ dangle cone. 16G, 8 mm post.",
    materials: ["G23 titanium", "Gold PVD finish", "Internally threaded", "16G", "8 mm post", "CZ dangle cone"],
    variants: [variation("8mm", "8 mm post")],
    featured: true,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
  },
  {
    slug: "g23-gold-pvd-ti-5-cz-petal-flower-labret",
    sku: "T-MO-395",
    title: "Gold Petal Flower CZ Labret",
    department: "body-jewelry",
    category: "lip-labret",
    priceCents: 1596,
    unit: "each",
    stockCount: null,
    stockLabel: "Stock TBD — awaiting shelf photo count",
    image: "/images/jewelry/labret-petal-flower-gold-model-01.jpg",
    imageAlt: "Gold five-CZ petal flower labret worn on an ear",
    photoStatus: "ready",
    imageFit: "cover",
    description:
      "G23 titanium labret with gold PVD and an internally threaded five-CZ petal flower top. Secure threaded post, warm gold tone, clear stones. Listed with lip and labret jewelry; the same post is a dressy cartilage or lobe option when the length fits. 16G, 8 mm (5/16 in).",
    materials: ["G23 titanium, gold PVD", "Clear CZ", "Internally threaded", "16G", "8 mm (5/16 in) post", "Five-CZ petal flower"],
    variants: [variation("8mm", "16G · 5/16 in (8 mm)")],
    featured: true,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
  },
  {
    slug: "steel-16g-xl-cz-cheek-labret",
    sku: "LA-099",
    title: "Labret – Steel – 16G – XL CZ Cheek",
    department: "body-jewelry",
    category: "lip-labret",
    priceCents: 168,
    unit: "each",
    stockCount: null,
    stockLabel: "Stock TBD — awaiting shelf photo count",
    image: "/images/jewelry/apm-la-099-xl-cz-cheek.jpg",
    imageAlt: "16G steel XL CZ cheek labrets in several lengths on a white background",
    photoStatus: "ready",
    description: "16G steel cheek labret with a CZ end. Lengths 22 mm, 19 mm, and 16 mm share one price.",
    materials: ["Steel", "16G", "CZ end", "Extra-long cheek labret"],
    variants: [variation("22mm", "22 mm"), variation("19mm", "19 mm"), variation("16mm", "16 mm")],
    featured: false,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
  },
  {
    slug: "steel-14g-xl-cheek-labret",
    sku: "LA-054",
    title: "14G XL Steel Cheek Labret",
    department: "body-jewelry",
    category: "lip-labret",
    priceCents: 126,
    unit: "each",
    stockCount: null,
    stockLabel: "Stock TBD — awaiting shelf photo count",
    image: "/images/jewelry/la-054-074-xl-steel-cheek-labret.jpg",
    imageAlt: "XL steel cheek labrets in several lengths on a white background",
    gallery: [
      {
        src: "/images/jewelry/la-054-074-xl-steel-cheek-labret-alt.jpg",
        alt: "Another view of XL steel cheek labrets",
      },
    ],
    photoStatus: "ready",
    description: "14G extra-long steel cheek labret. Lengths 25 mm, 22 mm, and 16 mm are $1.26 each.",
    materials: ["Steel", "14G", "Extra-long cheek labret"],
    variants: [variation("25mm", "25 mm"), variation("22mm", "22 mm"), variation("16mm", "16 mm")],
    featured: false,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
  },
  {
    slug: "steel-16g-xl-cheek-labret",
    sku: "LA-074",
    title: "16G XL Steel Cheek Labret",
    department: "body-jewelry",
    category: "lip-labret",
    priceCents: null,
    unit: "each",
    stockCount: null,
    stockLabel: "Stock TBD — awaiting shelf photo count",
    image: "/images/jewelry/la-054-074-xl-steel-cheek-labret.jpg",
    imageAlt: "XL steel cheek labrets in several lengths on a white background",
    gallery: [
      {
        src: "/images/jewelry/la-054-074-xl-steel-cheek-labret-alt.jpg",
        alt: "Another view of XL steel cheek labrets",
      },
    ],
    photoStatus: "ready",
    description: "16G extra-long steel cheek labret. 25 mm, 22 mm, and 19 mm are $1.17 each. The 16 mm length is $1.08.",
    materials: ["Steel", "16G", "Extra-long cheek labret"],
    variants: [
      variation("25mm", "25 mm", 117),
      variation("22mm", "22 mm", 117),
      variation("19mm", "19 mm", 117),
      variation("16mm", "16 mm", 108),
    ],
    featured: false,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
  },
  {
    slug: "g23-pvd-ti-double-flat-cz-belly",
    sku: "T-BA-649",
    title: "Double Flat CZ Belly Ring",
    department: "body-jewelry",
    category: "navel",
    priceCents: 972,
    unit: "each",
    stockCount: null,
    stockLabel: "Stock TBD — awaiting shelf photo count",
    image: "/images/jewelry/belly-double-flat-cz-model-01.jpg",
    imageAlt: "Double flat CZ belly ring",
    photoStatus: "ready",
    imageFit: "cover",
    description:
      "Threadless push-in navel ring in G23 titanium with a PVD finish and two flat-set clear CZ gems. Lightweight and low-profile. Ask a piercer about fit for a new versus healed navel. 14G. Lengths 12 mm, 11 mm, and 10 mm share one price.",
    materials: ["G23 titanium, PVD coated", "Clear CZ", "Threadless push-in", "14G", "Double flat CZ"],
    variants: [
      variation("12mm", "14G · 1/2 in (12 mm)"),
      variation("11mm", "14G · 7/16 in (11 mm)"),
      variation("10mm", "14G · 3/8 in (10 mm)"),
    ],
    featured: true,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
  },
  {
    slug: "steel-double-gem-cz-belly",
    sku: "BA-002",
    title: "Belly Ring – Steel – Press-Fit Double Gem CZ",
    department: "body-jewelry",
    category: "navel",
    priceCents: 141,
    unit: "each",
    stockCount: 82,
    stockLabel: "82 on hand by color (photo count). Cart limited per color.",
    image: "/images/jewelry/gem-belly-board-2026-11-05.jpg",
    imageAlt: "Double gem belly rings sorted by color on a board",
    photoStatus: "ready",
    description:
      "Steel press-fit double gem CZ belly rings. Clear and aurora borealis are $1.41. Red, green, dark blue, black, light blue, and emerald are $1.59. The count is by color from the board photo.",
    materials: ["316L steel", "Press-fit double gem CZ"],
    variants: [
      variation("clear", "Clear", 141, 24),
      variation("ab", "Aurora borealis", 141, 1),
      variation("red", "Red", 159, 22),
      variation("green", "Green", 159, 13),
      variation("dark-blue", "Dark blue", 159, 9),
      variation("black", "Black/jet", 159, 8),
      variation("light-blue", "Light blue/aqua", 159, 4),
      variation("emerald", "Emerald/dark green", 159, 1),
    ],
    featured: false,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
  },
  {
    slug: "h2ocean-piercing-spray-4oz",
    sku: "90752-001",
    title: "H2Ocean Piercing Aftercare Spray 4oz",
    department: "aftercare",
    category: "piercing-aftercare",
    priceCents: 1600,
    unit: "each",
    stockCount: 0,
    stockLabel: "Out of stock",
    image: "/images/aftercare/h2ocean-piercing-spray-4oz-official.png",
    imageAlt: "H2Ocean piercing aftercare spray 4 oz bottle",
    gallery: [
      {
        src: "/images/aftercare/h2ocean-piercing-spray-4oz-full.png",
        alt: "Full view of the H2Ocean piercing aftercare spray 4 oz bottle",
      },
    ],
    photoStatus: "ready",
    description: "Sterile Red Sea salt and lysozyme piercing aftercare spray. Spray 3–6 times daily and let it air dry.",
    materials: ["4 oz", "Sterile Red Sea salt", "Lysozyme", "Spray 3–6 times daily", "Air dry"],
    variants: [variation("4oz", "4 oz")],
    featured: true,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
  },
  {
    slug: "h2ocean-piercing-spray-1-5oz",
    sku: "90773-010",
    title: "H2Ocean Piercing Aftercare Spray (Travel) 1.5oz",
    department: "aftercare",
    category: "piercing-aftercare",
    priceCents: 1200,
    unit: "each",
    stockCount: 0,
    stockLabel: "Out of stock",
    image: "/images/aftercare/h2ocean-piercing-spray-1-5oz.png",
    imageAlt: "Travel-size H2Ocean piercing aftercare spray 1.5 oz",
    photoStatus: "ready",
    description: "Travel-size H2Ocean piercing aftercare spray.",
    materials: ["1.5 oz", "Travel size", "Piercing aftercare spray"],
    variants: [variation("1-5oz", "1.5 oz")],
    featured: false,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
  },
  {
    slug: "h2ocean-healing-rinse-8oz",
    sku: "90901-510",
    title: "H2Ocean Healing Rinse — Arctic Ocean Mint 8oz",
    department: "aftercare",
    category: "piercing-aftercare",
    priceCents: 1000,
    unit: "each",
    stockCount: null,
    stockLabel: "Stock TBD",
    image: "/images/aftercare/h2ocean-healing-rinse-8oz-front.jpg",
    imageAlt: "H2Ocean Healing Rinse Arctic Ocean Mint 8 oz bottle, front",
    photoStatus: "ready",
    description: "Alcohol-free sea salt mouthwash with xylitol for oral piercings.",
    materials: ["8 oz", "Arctic Ocean Mint", "Alcohol-free", "Sea salt", "Xylitol", "For oral piercings"],
    variants: [variation("8oz", "8 oz")],
    featured: false,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
  },
  {
    slug: "recovery-mouth-rinse-8oz",
    sku: "MED-048",
    title: "Recovery Aftercare Sea Salt Mouth Rinse 8oz",
    department: "aftercare",
    category: "piercing-aftercare",
    priceCents: 1000,
    unit: "each",
    stockCount: null,
    stockLabel: "Stock TBD",
    image: "/images/aftercare/recovery-mouth-rinse-official.jpg",
    imageAlt: "Recovery Aftercare sea salt mouth rinse 8 oz bottle",
    photoStatus: "ready",
    description: "Alcohol-free peppermint Maris Sal sea salt mouth rinse for oral piercings.",
    materials: ["8 oz", "Peppermint", "Maris Sal sea salt", "Alcohol-free", "For oral piercings"],
    variants: [variation("8oz", "8 oz")],
    featured: false,
    fulfillment: "square-catalog",
    reconnect: null,
    externalHref: null,
  },
  {
    slug: "illustrated-alex-cap-or-beanie",
    sku: "IA-MERCH-CAP",
    title: "Cap or Beanie – Illustrated Alex",
    department: "merch",
    category: "accessories",
    priceCents: null,
    unit: "each",
    stockCount: null,
    stockLabel: null,
    image: null,
    imageAlt: null,
    photoStatus: "needed",
    description:
      "Studio cap or beanie with Illustrated Alex branding. Coming soon. No photo, no price, and no print-on-demand product id are on file. Square Online does not currently list a hat.",
    materials: ["Illustrated Alex studio branding", "Photo needed", "Price TBD"],
    variants: [variation("one-style", "Style TBD")],
    featured: false,
    fulfillment: "pod-placeholder",
    reconnect: null,
    externalHref: null,
  },
  {
    slug: "illustrated-alex-logo-tee",
    sku: "IA-MERCH-TEE",
    title: "T-Shirt – Illustrated Alex Logo",
    department: "merch",
    category: "apparel",
    priceCents: null,
    unit: "each",
    stockCount: null,
    stockLabel: null,
    image: null,
    imageAlt: null,
    photoStatus: "needed",
    description:
      "Illustrated Alex logo tee Alex has sold before. Coming soon. Photo needed. Price TBD. Reconnect Printify or Printful before this can be ordered. This draft ref is not a live print-on-demand product id.",
    materials: ["Illustrated Alex studio branding", "Photo needed", "Price TBD", "Reconnect Printify or Printful"],
    variants: [variation("size-tbd", "Size TBD")],
    featured: false,
    fulfillment: "pod-placeholder",
    reconnect: "Printify or Printful",
    externalHref: null,
  },
  {
    slug: "illustrated-alex-sweatshirt",
    sku: "IA-MERCH-SWEATSHIRT",
    title: "Sweatshirt – Illustrated Alex",
    department: "merch",
    category: "apparel",
    priceCents: null,
    unit: "each",
    stockCount: null,
    stockLabel: null,
    image: null,
    imageAlt: null,
    photoStatus: "needed",
    description:
      "Illustrated Alex sweatshirt. Coming soon. Photo needed. Price TBD. Reconnect Printify or Printful. No live product id is stored in this repo.",
    materials: ["Illustrated Alex studio branding", "Photo needed", "Price TBD", "Reconnect Printify or Printful"],
    variants: [variation("size-tbd", "Size TBD")],
    featured: false,
    fulfillment: "pod-placeholder",
    reconnect: "Printify or Printful",
    externalHref: null,
  },
  {
    slug: "illustrated-alex-hoodie",
    sku: "IA-MERCH-HOODIE",
    title: "Hoodie – Illustrated Alex",
    department: "merch",
    category: "apparel",
    priceCents: null,
    unit: "each",
    stockCount: null,
    stockLabel: null,
    image: null,
    imageAlt: null,
    photoStatus: "needed",
    description:
      "Illustrated Alex hoodie. Coming soon. Photo needed. Price TBD. Reconnect Printify or Printful. No live product id is stored in this repo.",
    materials: ["Illustrated Alex studio branding", "Photo needed", "Price TBD", "Reconnect Printify or Printful"],
    variants: [variation("size-tbd", "Size TBD")],
    featured: false,
    fulfillment: "pod-placeholder",
    reconnect: "Printify or Printful",
    externalHref: null,
  },
  {
    slug: "illustrated-alex-gift-card",
    sku: "IA-MERCH-GIFT-CARD",
    title: "Gift Card – Illustrated Alex",
    department: "merch",
    category: "gift-cards",
    priceCents: null,
    unit: "each",
    stockCount: null,
    stockLabel: null,
    image: "/images/brand/illustratedalex-logo-main.png",
    imageAlt: "Illustrated Alex logo, used as the gift card mark rather than a product photo",
    photoStatus: "ready",
    description:
      "Gift cards and appointment deposits already exist on the Square register. This page does not create a second gift-card price. Buy one through Square.",
    materials: ["Sold through Square gift cards today", "Amount is chosen on Square"],
    variants: [variation("square-gift-card", "Amount chosen on Square")],
    featured: false,
    fulfillment: "square-gift-card",
    reconnect: null,
    externalHref: SQUARE_GIFT_CARD_URL,
  },
  {
    slug: "illustrated-alex-sticker-pack",
    sku: "IA-MERCH-STICKERS",
    title: "Sticker Pack – Illustrated Alex Logo",
    department: "merch",
    category: "stickers",
    priceCents: null,
    unit: "each",
    stockCount: null,
    stockLabel: null,
    image: null,
    imageAlt: null,
    photoStatus: "needed",
    description:
      "Illustrated Alex sticker pack. Coming soon. Square Online does not currently list stickers. Photo needed. Price TBD.",
    materials: ["Illustrated Alex studio branding", "Photo needed", "Price TBD"],
    variants: [variation("pack", "Pack")],
    featured: false,
    fulfillment: "pod-placeholder",
    reconnect: null,
    externalHref: null,
  },
  ...photoCountedListings,
];

export const studioCaseNotes = [
  "Nose chain",
  "LOVE belly ring",
  "Nose hoop",
  "Other labret and industrial styles already on the Square register",
] as const;

export function categoryPath(category: CatalogCategory) {
  return `/shop/${category.department}/${category.slug}`;
}

export function productPath(product: CatalogProduct) {
  return `/shop/products/${product.slug}`;
}

export function getDepartment(slug: string) {
  return departments.find((department) => department.slug === slug) ?? null;
}

export function getCategory(department: string, slug: string) {
  return categories.find((category) => category.department === department && category.slug === slug) ?? null;
}

export function categoriesFor(department: DepartmentSlug) {
  return categories
    .filter((category) => category.department === department)
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug) ?? null;
}

export function productsIn(department: string, category?: string) {
  return products
    .filter((product) => product.department === department && (category === undefined || product.category === category))
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function featuredProducts() {
  const order = [
    "ocean-blue-glitter-spiral-tapers",
    "g23-pvd-ti-double-flat-cz-belly",
    "gold-ip-steel-5-cz-leaf-labret",
    "g23-gold-pvd-ti-5-cz-petal-flower-labret",
    "g23-gold-pvd-ti-cz-dangle-cone-labret",
    "g23-ti-cz-dangle-cone-labret",
    "h2ocean-piercing-spray-4oz",
    "milky-white-blank-plugs",
  ];
  return order.map((slug) => getProduct(slug)).filter((product): product is CatalogProduct => product !== null);
}

export function jewelryCategoriesWithProducts() {
  return categoriesFor("body-jewelry").filter((category) => productsIn("body-jewelry", category.slug).length > 0);
}

const vendorSkuPattern = /^(?:T-)?[A-Z]{2,3}-\d{3}$|^\d{5}-\d{3}$|^[A-Z]{2,3}-\d{2,3}-[A-Z0-9]+$/;
const inventoryCodePattern = /^[A-Z0-9][A-Z0-9*?-]{1,}$/;

/** Vendor reorder code or inventory code from the photo count. Snake-case tray keys, merch drafts, and the internal spiral ref stay hidden. */
export function displaySku(product: CatalogProduct) {
  if (product.slug === "ocean-blue-glitter-spiral-tapers") return null;
  if (product.sku.startsWith("IA-MERCH")) return null;
  if (/^[a-z0-9]+(?:_[a-z0-9]+)+$/.test(product.sku)) return null;
  if (vendorSkuPattern.test(product.sku)) return product.sku;
  if (product.customPrintEligible && product.sku.startsWith("IA-")) return product.sku;
  if (inventoryCodePattern.test(product.sku)) return product.sku;
  if (product.sku === "OUFER moon 2PCS" || product.sku === "14G Steel Barbell (APM)") return product.sku;
  return null;
}

export function linePriceCents(product: CatalogProduct, variant?: CatalogVariant) {
  return variant?.priceCents ?? product.priceCents;
}

export function priceSummary(product: CatalogProduct) {
  const amounts = [
    ...new Set(
      product.variants
        .map((variant) => linePriceCents(product, variant))
        .filter((cents): cents is number => cents !== null),
    ),
  ].sort((a, b) => a - b);
  if (amounts.length === 0) return formatPrice(null, product.unit);
  if (amounts.length === 1) return formatPrice(amounts[0], product.unit);
  return `${formatPrice(amounts[0], "each")}–${formatPrice(amounts[amounts.length - 1], "each")}`;
}

export function formatPrice(cents: number | null, unit: CatalogProduct["unit"]) {
  if (cents === null) return "Price TBD";
  const amount = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
  return unit === "pair" ? `${amount} per pair` : amount;
}

export function stockNotice(product: CatalogProduct): { kind: "out" | "onhand" | "unknown"; label: string } | null {
  if (product.stockCount === 0) return { kind: "out", label: product.stockLabel || "Out of stock" };
  if (product.stockCount !== null && product.stockCount > 0) {
    return { kind: "onhand", label: product.stockLabel || `${product.stockCount} on hand` };
  }
  if (product.stockLabel) return { kind: "unknown", label: product.stockLabel };
  return null;
}

export function canAddToCart(product: CatalogProduct) {
  if (product.stockCount === null || product.stockCount <= 0) return false;
  const priced = product.variants.some((variant) => linePriceCents(product, variant) !== null);
  return priced && product.externalHref === null && product.fulfillment === "square-catalog";
}
