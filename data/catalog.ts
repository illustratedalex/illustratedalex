/**
 * Static seed for the on-site shop. Not synced from Square Catalog.
 * Jewelry shelf prices are at least $4.99. Wholesale cost is not stored here.
 * Square variation ids stay null until Alex links Catalog objects.
 * Merch ids are local draft refs, not Printful or Printify product ids.
 * This file avoids path aliases so the seed tests and sandbox server can import it from Node.
 */

import { photoCountedListings } from "./photo-counted-listings.ts";
import squareVariationIds from "./square-variation-ids.json" with { type: "json" };

const SQUARE_GIFT_CARD_URL = "https://shop.illustratedalex.com/s/gift-cards";

export type DepartmentSlug = "aftercare" | "body-jewelry" | "merch";

export type PhotoStatus = "ready" | "coming" | "needed";

export type Fulfillment = "square-catalog" | "aftercare-later" | "pod-placeholder" | "square-gift-card" | "printful-shipped";

export type CatalogVariant = {
  id: string;
  label: string;
  /** Overrides the product price when lengths do not share one shelf price. */
  priceCents?: number;
  /** On-hand count for this option when colors or styles are counted separately. */
  stockCount?: number;
  /** Square Catalog ITEM_VARIATION id. Null until register sync. */
  squareCatalogVariationId: string | null;
  /** Printful sync variant id for made-to-order merch. Not shown in the shop. */
  printfulSyncVariantId?: number;
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
  /** False hides the product from the public shop until it is ready to sell. */
  published?: boolean;
  /**
   * True only for a plug, tunnel, or other flat-face blank that can take a UV print.
   * Thin posts, balls, and curved barbells stay unset.
   */
  customPrintEligible?: boolean;
};

const variation = (
  id: string,
  label: string,
  priceCents?: number,
  stockCount?: number,
  printfulSyncVariantId?: number,
): CatalogVariant => ({
  id,
  label,
  ...(priceCents === undefined ? {} : { priceCents }),
  ...(stockCount === undefined ? {} : { stockCount }),
  squareCatalogVariationId: null,
  ...(printfulSyncVariantId === undefined ? {} : { printfulSyncVariantId }),
});

export const departments: CatalogDepartment[] = [
  {
    slug: "aftercare",
    name: "Aftercare",
    summary: "Piercing spray, foam soap, and rinses, plus tattoo aftercare when it is added.",
  },
  {
    slug: "body-jewelry",
    name: "Body Jewelry",
    summary: "Body jewelry for pickup at the Claremont studio.",
  },
  {
    slug: "merch",
    name: "Merch",
    summary: "Mugs and gift cards are available now. Hoodies, tees, hats, and stickers are on the way.",
  },
];

export const categories: CatalogCategory[] = [
  {
    slug: "piercing-aftercare",
    name: "Piercing Aftercare",
    department: "aftercare",
    summary: "H2Ocean spray, foam soap, and alcohol-free rinses for healing piercings.",
  },
  {
    slug: "tattoo-aftercare",
    name: "Tattoo Aftercare",
    department: "aftercare",
    summary: "Tattoo wash, ointment, and film can be added later. The written healing guide stays on the aftercare page.",
  },
  {
    slug: "ear",
    name: "Ear",
    department: "body-jewelry",
    summary: "Lobes, cartilage, tragus, and other ear jewelry.",
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
    summary: "Navel rings, including curved barbells and flexible pregnancy rings.",
  },
  {
    slug: "nipples",
    name: "Nipples",
    department: "body-jewelry",
    summary: "Nipple barbells and shields for healed nipple piercings.",
  },
  {
    slug: "nose",
    name: "Nose",
    department: "body-jewelry",
    summary: "Nostril studs, including L-bend nose jewelry.",
  },
  {
    slug: "septum",
    name: "Septum",
    department: "body-jewelry",
    summary: "Circular horseshoes and rings for septum and similar placements.",
  },
  {
    slug: "tongue",
    name: "Tongue",
    department: "body-jewelry",
    summary: "Straight and decorative barbells for tongue piercings.",
  },
  {
    slug: "accessories",
    name: "Accessories",
    department: "merch",
    summary: "Hats and similar studio accessories.",
  },
  {
    slug: "apparel",
    name: "Apparel",
    department: "merch",
    summary: "T-shirts, sweatshirts, and hoodies with the Illustrated Alex mark.",
  },
  {
    slug: "drinkware",
    name: "Drinkware",
    department: "merch",
    summary: "Glossy white ceramic mugs printed with the Illustrated Alex skull logo. Made to order with free US shipping.",
  },
  {
    slug: "gift-cards",
    name: "Gift Cards",
    department: "merch",
    summary: "Digital gift cards in any amount for tattoos, piercings, or studio jewelry.",
  },
  {
    slug: "stickers",
    name: "Stickers",
    department: "merch",
    summary: "Studio sticker packs.",
  },
];

const seededProducts: CatalogProduct[] = [
  {
    slug: "ocean-blue-glitter-spiral-tapers",
    sku: "IA-BLUE-SPIRAL-PAIR",
    title: "Spiral Tapers – Acrylic – Ocean Blue Glitter",
    department: "body-jewelry",
    category: "ear",
    priceCents: 570,
    unit: "pair",
    stockCount: 5,
    stockLabel: "In stock",
    image: "/images/jewelry/mfg-blue-glitter-spiral-single.jpg",
    imageAlt: "Single representative blue glitter acrylic spiral taper; sold as a matched pair",
    photoStatus: "ready",
    description:
      "Ocean-blue glitter acrylic spiral tapers, sold only as a matched pair. They are lightweight and meant for healed lobes. Clean them with mild soap and water only — no alcohol — and ask a piercer before using them to stretch. Gauges vary, so check with the studio before you order.",
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
    priceCents: 499,
    unit: "pair",
    stockCount: 4,
    stockLabel: "In stock",
    image: "/images/jewelry/white-acrylic-blank-plugs-clean.jpg",
    imageAlt: "Milky white acrylic double-flare blank plugs, face and side",
    gallery: [
      { src: "/images/jewelry/white-acrylic-blank-plugs-front-clean.jpg", alt: "Face of a milky white acrylic blank plug" },
      { src: "/images/jewelry/white-acrylic-blank-plugs-side-clean.jpg", alt: "Side of a milky white acrylic double-flare blank plug" },
    ],
    photoStatus: "ready",
    description:
      "Solid matte milky-white acrylic double-flare saddle plugs, sold as a matched pair. Wear them in healed lobes, including while stretching, and ask the studio which gauge is in the drawer before you order. The flat faces can take a custom UV print. The iris pair in the studio photos is an example only and is not this listing.",
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
    priceCents: 499,
    unit: "pair",
    stockCount: 4,
    stockLabel: "In stock",
    image: "/images/jewelry/black-acrylic-blank-plugs-clean.jpg",
    imageAlt: "Gloss black acrylic flat-face blank plugs, face and side",
    gallery: [
      { src: "/images/jewelry/black-acrylic-blank-plugs-front-clean.jpg", alt: "Face of a gloss black acrylic blank plug" },
      { src: "/images/jewelry/black-acrylic-blank-plugs-side-clean.jpg", alt: "Side of a gloss black acrylic blank plug" },
    ],
    photoStatus: "ready",
    description:
      "Solid gloss black acrylic plugs with a flat face, sold as a matched pair. They are for healed lobes, and gauges are assorted, so ask the studio before you order. The flat face can take a custom UV print. The octopus pair in the studio photos is an example only and is not this listing.",
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
    stockLabel: "In stock",
    image: "/images/jewelry/dark-wood-blank-plugs-clean.jpg",
    imageAlt: "Dark wood double-flare blank plugs, face and side",
    gallery: [
      { src: "/images/jewelry/dark-wood-blank-plugs-front-clean.jpg", alt: "Face of a dark wood blank plug" },
      { src: "/images/jewelry/dark-wood-blank-plugs-side-clean.jpg", alt: "Side of a dark wood double-flare blank plug" },
    ],
    photoStatus: "ready",
    description:
      "Natural dark wood double-flare plugs, areng-style, sold as a matched pair. Wear them in healed lobes and keep them dry; gauges are assorted, so ask the studio before you order. A custom UV print on this wood uses a white underbase. The skull pair in the studio photos is an example only and is not this listing.",
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
    stockLabel: "Check studio availability",
    image: "/images/jewelry/steel-bezel-set-cz-studs.jpg",
    imageAlt: "Pair of surgical steel studs with bezel-set clear CZ",
    photoStatus: "ready",
    description:
      "Surgical steel studs with a bezel-set clear CZ, sold as a matched pair. The supplier lists the pair as sterilized. They are a simple lobe option. Ask the studio about gauge before you order.",
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
    stockLabel: "Check studio availability",
    image: "/images/jewelry/tragus-leaf-cz-gold-model-01.jpg",
    imageAlt: "Gold five-CZ leaf labret worn in a tragus",
    photoStatus: "ready",
    imageFit: "cover",
    description:
      "Gold ion-plated steel threadless labret with a five-stone clear CZ leaf. It is made for a tragus and can sit in a flat or helix when the length is right. 16G with an 8 mm (5/16 in) post. Sold individually.",
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
    priceCents: 499,
    unit: "each",
    stockCount: null,
    stockLabel: "Check studio availability",
    image: "/images/jewelry/mfg-steel-internal-ball-labret.jpg",
    imageAlt: "Representative single steel internally threaded ball flat-back labret",
    photoStatus: "ready",
    description: "Surgical steel internally threaded labret with a ball end, 14G. The flat disc sits behind the piercing and the ball shows in front. Choose a 12 mm, 11 mm, or 10 mm post for a healed tragus or other ear piercing. Sold individually.",
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
    priceCents: 499,
    unit: "each",
    stockCount: 49,
    stockLabel: "In stock",
    image: "/images/jewelry/mfg-steel-internal-ball-labret.jpg",
    imageAlt: "Representative single steel internally threaded ball flat-back labret",
    photoStatus: "ready",
    description: "Surgical steel internally threaded labret with a ball end, 16G. The flat disc sits behind the piercing and the ball shows in front. Lengths are 14 mm, 12 mm, 11 mm, and 8 mm. Sold individually for a healed tragus or other ear piercing.",
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
    priceCents: 499,
    unit: "each",
    stockCount: null,
    stockLabel: "Check studio availability",
    image: "/images/jewelry/mfg-steel-internal-curved-barbell.jpg",
    imageAlt: "Single steel internally threaded curved barbell with ball ends",
    photoStatus: "ready",
    description: "Surgical steel internally threaded curved barbell, 16G, for an eyebrow or another curved placement. Lengths are 16 mm, 14 mm, 11 mm, 10 mm, and 8 mm. Sold individually. A piercer should confirm the length for a fresh piercing.",
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
    priceCents: 499,
    unit: "each",
    stockCount: 116,
    stockLabel: "In stock",
    image: "/images/jewelry/mfg-steel-industrial-barbell.jpg",
    imageAlt: "Single straight steel industrial barbell with ball ends",
    photoStatus: "ready",
    description: "Straight surgical steel industrial barbell in 14G or 16G, with ball ends. Lengths are 38 mm, 35 mm, and 31 mm. Sold individually for an industrial piercing. Ask a piercer which length and gauge fit the anatomy.",
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
    stockLabel: "Check studio availability",
    image: "/images/jewelry/T-MO-402-g23-ti-cz-dangle-cone-labret.jpg",
    imageAlt: "G23 titanium internally threaded CZ dangle cone labret on a white background",
    photoStatus: "ready",
    description: "Implant-grade G23 titanium labret, internally threaded, with a clear CZ and a dangling cone. 16G with an 8 mm post. Sold individually for a healed lip, labret, or cartilage piercing when the length fits.",
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
    stockLabel: "Check studio availability",
    image: "/images/jewelry/T-MO-403-g23-gold-pvd-ti-cz-dangle-cone-labret.jpg",
    imageAlt: "G23 gold PVD titanium internally threaded CZ dangle cone labret on a white background",
    photoStatus: "ready",
    description: "Implant-grade G23 titanium labret with a gold PVD finish, internally threaded, and a clear CZ dangling cone. 16G with an 8 mm post. Sold individually for a healed lip, labret, or cartilage piercing when the length fits.",
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
    stockLabel: "Check studio availability",
    image: "/images/jewelry/labret-petal-flower-gold-model-01.jpg",
    imageAlt: "Gold five-CZ petal flower labret worn on an ear",
    photoStatus: "ready",
    imageFit: "cover",
    description:
      "Implant-grade G23 titanium labret with a gold PVD finish and an internally threaded five-CZ petal flower. 16G with an 8 mm (5/16 in) post. Sold individually. It is listed with lip and labret jewelry and also works as a cartilage or lobe piece when the length fits.",
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
    priceCents: 499,
    unit: "each",
    stockCount: null,
    stockLabel: "Check studio availability",
    image: "/images/jewelry/apm-la-099-xl-cz-cheek.jpg",
    imageAlt: "16G steel XL CZ cheek labrets in several lengths on a white background",
    photoStatus: "ready",
    description: "Surgical steel cheek labret, 16G, with a CZ end and an extra-long post. Lengths are 22 mm, 19 mm, and 16 mm. Sold individually. Have a piercer confirm the length for your cheek.",
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
    priceCents: 499,
    unit: "each",
    stockCount: null,
    stockLabel: "Check studio availability",
    image: "/images/jewelry/la-054-074-xl-steel-cheek-labret.jpg",
    imageAlt: "XL steel cheek labrets in several lengths on a white background",
    photoStatus: "ready",
    description: "Extra-long surgical steel cheek labret, 14G. Lengths are 25 mm, 22 mm, and 16 mm. Sold individually for a cheek piercing. A piercer should confirm which length you need.",
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
    stockLabel: "Check studio availability",
    image: "/images/jewelry/la-054-074-xl-steel-cheek-labret.jpg",
    imageAlt: "XL steel cheek labrets in several lengths on a white background",
    photoStatus: "ready",
    description: "Extra-long surgical steel cheek labret, 16G. Lengths are 25 mm, 22 mm, 19 mm, and 16 mm. Sold individually for a cheek piercing. A piercer should confirm which length you need.",
    materials: ["Steel", "16G", "Extra-long cheek labret"],
    variants: [
      variation("25mm", "25 mm", 499),
      variation("22mm", "22 mm", 499),
      variation("19mm", "19 mm", 499),
      variation("16mm", "16 mm", 499),
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
    stockLabel: "Check studio availability",
    image: "/images/jewelry/belly-double-flat-cz-model-01.jpg",
    imageAlt: "Double flat CZ belly ring",
    photoStatus: "ready",
    imageFit: "cover",
    description:
      "Threadless push-in navel ring in implant-grade G23 titanium with a PVD finish and two flat-set clear CZs. It is lightweight and low-profile. 14G, in 12 mm, 11 mm, or 10 mm. Sold individually. Ask a piercer about fit for a new versus healed navel.",
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
    priceCents: 499,
    unit: "each",
    stockCount: 82,
    stockLabel: "In stock",
    image: "/images/jewelry/mfg-steel-clear-double-gem-belly.jpg",
    imageAlt: "Single steel curved belly ring with two clear press-set gems",
    photoStatus: "ready",
    description:
      "316L surgical steel press-fit navel ring with two gems. Colors are clear, aurora borealis, red, green, dark blue, black, light blue, and emerald. Sold individually for a healed navel. Choose a color when you add it to the cart.",
    materials: ["316L steel", "Press-fit double gem CZ"],
    variants: [
      variation("clear", "Clear", 499, 24),
      variation("ab", "Aurora borealis", 499, 1),
      variation("red", "Red", 499, 22),
      variation("green", "Green", 499, 13),
      variation("dark-blue", "Dark blue", 499, 9),
      variation("black", "Black/jet", 499, 8),
      variation("light-blue", "Light blue/aqua", 499, 4),
      variation("emerald", "Emerald/dark green", 499, 1),
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
    description: "H2Ocean piercing aftercare spray, 4 oz, made with sterile Red Sea salt and lysozyme. Spray it on a healing piercing 3 to 6 times a day and let it air dry. It is a sea-salt wash, not a foam soap.",
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
    description: "Travel-size H2Ocean piercing aftercare spray, 1.5 oz. The same sterile sea-salt formula as the larger spray, in a smaller bottle for a bag or trip. Spray a healing piercing and let it air dry.",
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
    stockLabel: "Check studio availability",
    image: "/images/aftercare/h2ocean-healing-rinse-8oz-front.jpg",
    imageAlt: "H2Ocean Healing Rinse Arctic Ocean Mint 8 oz bottle, front",
    photoStatus: "ready",
    description: "H2Ocean Healing Rinse, Arctic Ocean Mint, 8 oz. An alcohol-free sea-salt mouthwash with xylitol for oral piercings. Use it as a gentle rinse while a tongue, lip, or other oral piercing heals.",
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
    stockLabel: "Check studio availability",
    image: "/images/aftercare/recovery-mouth-rinse-official.jpg",
    imageAlt: "Recovery Aftercare sea salt mouth rinse 8 oz bottle",
    photoStatus: "ready",
    description: "Recovery aftercare mouth rinse, 8 oz, with peppermint and Maris Sal sea salt. Alcohol-free, for oral piercings such as a tongue or lip. Rinse as directed while the piercing heals.",
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
    description: "An Illustrated Alex cap or beanie with the studio mark. Coming soon.",
    materials: ["Illustrated Alex studio branding"],
    variants: [variation("one-style", "One style")],
    featured: false,
    fulfillment: "pod-placeholder",
    reconnect: null,
    published: false,
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
    description: "An Illustrated Alex logo t-shirt. Coming soon.",
    materials: ["Illustrated Alex studio branding"],
    variants: [variation("size-tbd", "Size when available")],
    featured: false,
    fulfillment: "pod-placeholder",
    reconnect: null,
    published: false,
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
    description: "An Illustrated Alex sweatshirt. Coming soon.",
    materials: ["Illustrated Alex studio branding"],
    variants: [variation("size-tbd", "Size when available")],
    featured: false,
    fulfillment: "pod-placeholder",
    reconnect: null,
    published: false,
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
    description: "An Illustrated Alex hoodie. Coming soon.",
    materials: ["Illustrated Alex studio branding"],
    variants: [variation("size-tbd", "Size when available")],
    featured: false,
    fulfillment: "pod-placeholder",
    reconnect: null,
    published: false,
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
    imageAlt: "Illustrated Alex gift card",
    photoStatus: "ready",
    description:
      "A digital Illustrated Alex gift card in any amount. Use it for a tattoo, a piercing, or studio jewelry. Buy it directly through Square.",
    materials: ["Digital gift card", "Any amount", "Tattoos, piercings, and studio jewelry"],
    variants: [variation("square-gift-card", "Amount chosen on Square")],
    featured: false,
    fulfillment: "square-gift-card",
    reconnect: null,
    externalHref: SQUARE_GIFT_CARD_URL,
  },
  {
    slug: "illustrated-alex-white-glossy-mug",
    sku: "IA-MERCH-MUG",
    title: "White Glossy Mug – Illustrated Alex",
    department: "merch",
    category: "drinkware",
    priceCents: 1800,
    unit: "each",
    stockCount: null,
    stockLabel: "Made to order · Free US shipping",
    image: "/images/merch/illustrated-alex-white-glossy-mug.jpg",
    imageAlt: "White glossy mug with the Illustrated Alex skull logo, handle on the right",
    gallery: [
      {
        src: "/images/merch/illustrated-alex-white-glossy-mug-left.jpg",
        alt: "White glossy mug with the Illustrated Alex skull logo, handle on the left",
      },
      {
        src: "/images/merch/illustrated-alex-white-glossy-mug-15oz.jpg",
        alt: "15 ounce white glossy mug with the Illustrated Alex skull logo",
      },
      {
        src: "/images/merch/illustrated-alex-white-glossy-mug-20oz.jpg",
        alt: "20 ounce white glossy mug with the Illustrated Alex skull logo",
      },
    ],
    photoStatus: "ready",
    description:
      "A glossy white ceramic coffee mug printed with the Illustrated Alex skull logo. It is dishwasher and microwave safe. Made to order and shipped to your door, with free US shipping included. The 11 oz mug is 3.8 in high and 3.2 in across, the 15 oz is 4.7 in high and 3.3 in across, and the 20 oz is 4.3 in high and 3.7 in across.",
    materials: [
      "Glossy white ceramic",
      "Dishwasher and microwave safe",
      "Free US shipping",
      "11 oz: 3.8 in high × 3.2 in diameter",
      "15 oz: 4.7 in high × 3.3 in diameter",
      "20 oz: 4.3 in high × 3.7 in diameter",
    ],
    variants: [
      variation("11oz", "11 oz", 1800, undefined, 5623128240),
      variation("15oz", "15 oz", 2000, undefined, 5623128241),
      variation("20oz", "20 oz", 2200, undefined, 5623128242),
    ],
    featured: false,
    fulfillment: "printful-shipped",
    reconnect: null,
    externalHref: null,
    published: true,
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
    description: "A pack of Illustrated Alex stickers. Coming soon.",
    materials: ["Illustrated Alex studio branding"],
    variants: [variation("pack", "Pack")],
    featured: false,
    fulfillment: "pod-placeholder",
    reconnect: null,
    published: false,
    externalHref: null,
  },
  ...photoCountedListings,
];

const squareIds = squareVariationIds as Record<string, Record<string, { squareCatalogVariationId: string }>>;

function linkSquareVariation(product: CatalogProduct): CatalogProduct {
  const byVariant = squareIds[product.slug];
  if (!byVariant) return product;
  return {
    ...product,
    variants: product.variants.map((variant) => ({
      ...variant,
      squareCatalogVariationId: byVariant[variant.id]?.squareCatalogVariationId ?? null,
    })),
  };
}

export const products: CatalogProduct[] = seededProducts.map(linkSquareVariation);

export const studioCaseNotes = [
  "Nose chain",
  "LOVE belly ring",
  "Nose hoop",
  "Other labret and industrial styles",
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

export function isPublished(product: CatalogProduct) {
  return product.published !== false;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug) ?? null;
}

export function publishedProducts() {
  return products.filter(isPublished);
}

export function productsIn(department: string, category?: string) {
  return publishedProducts()
    .filter((product) => product.department === department && (category === undefined || product.category === category))
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function categoriesWithProducts(department: DepartmentSlug) {
  return categoriesFor(department).filter((category) => productsIn(department, category.slug).length > 0);
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

/** Vendor reorder code or inventory code. Snake-case tray keys, merch drafts, and the internal spiral ref stay hidden. */
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
  if (cents === null) return "Coming soon";
  const amount = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
  return unit === "pair" ? `${amount} per pair` : amount;
}

export function stockNotice(product: CatalogProduct): { kind: "out" | "onhand" | "unknown"; label: string } | null {
  if (product.externalHref) return null;
  if (product.fulfillment === "printful-shipped") return { kind: "onhand", label: "Made to order · Free US shipping" };
  if (product.stockCount === 0) return { kind: "out", label: "Out of stock" };
  if (product.stockCount !== null && product.stockCount > 0) return { kind: "onhand", label: "In stock" };
  const priced = product.priceCents !== null || product.variants.some((variant) => variant.priceCents !== undefined);
  return { kind: "unknown", label: priced ? "Check studio availability" : "Coming soon" };
}

export function canAddToCart(product: CatalogProduct) {
  const priced = product.variants.some((variant) => linePriceCents(product, variant) !== null);
  if (!priced || product.externalHref !== null) return false;
  if (product.fulfillment === "printful-shipped") return true;
  if (product.stockCount === null || product.stockCount <= 0) return false;
  return product.fulfillment === "square-catalog";
}
