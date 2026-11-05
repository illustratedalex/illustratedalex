import { STUDIO_PHONE } from "@/data/site-content";

/**
 * In-studio body jewelry catalog.
 * Update this file when inventory, sizes, or prices change — the shop pages read it directly.
 *
 * Pricing rule for identified pieces: sell price = 3 × wholesale.
 * Placeholder prices from receipt APM #525767 are proposed draft prices only.
 *
 * Omitted on purpose until Alex reviews them: ultra-low oddballs (industrial
 * barbells, XL cheek, discounted tragus) and the ~$81 14K gold hoop.
 * Tools such as forceps are not jewelry and do not belong on this list.
 */

export const JEWELRY_CATALOG_PATH = "/shop/jewelry";
export const JEWELRY_RECEIPT_REF = "APM #525767";

export type JewelryPrice = {
  /** Display amount including the dollar sign, e.g. "$5.70". */
  amount: string;
  /** What the amount buys, e.g. "matched pair". */
  unit: string;
  note?: string;
  /** Proposed 3× price that is not shelf-verified yet. */
  draft: boolean;
};

export type JewelryProduct = {
  id: string;
  name: string;
  description: string;
  /** Shopper-facing size line. Gauges stay TBD until they are measured. */
  sizes: string;
  price: JewelryPrice;
  /** Short status shown on the card. */
  status: string;
  image?: {
    src: string;
    alt: string;
  };
  photoComing: boolean;
};

export function jewelryInquiryUrl(productName: string): string {
  const body = `Hi Alex, I'm interested in the ${productName} from the studio jewelry catalog.`;
  return `sms:${STUDIO_PHONE}?&body=${encodeURIComponent(body)}`;
}

export const jewelryProducts: JewelryProduct[] = [
  {
    id: "stock-blue-spiral-tapers-001",
    name: "Ocean Blue Glitter Acrylic Spiral Tapers",
    description:
      "Sparkly deep-ocean-blue acrylic spirals that catch the light. Lightweight translucent acrylic with glitter, graduated spiral shape — wear as hanging spiral or taper. Clean with mild soap and water only (no alcohol). Best for healed lobes; ask our piercers about stretching safely.",
    sizes:
      "TBD — ask the studio. Mixed small to large (about 10 pieces photographed). Gauges are not measured yet — measure before go-live.",
    price: {
      amount: "$5.70",
      unit: "matched pair",
      note: "$2.85 each if sold singly. Sell price is 3× a researched wholesale of about $0.95 per piece.",
      draft: false,
    },
    status: "Draft · in stock pending size confirm",
    image: {
      src: "/images/jewelry/blue-spiral-tapers.jpg",
      alt: "Ocean blue glitter acrylic spiral ear tapers arranged on a white studio shelf",
    },
    photoComing: false,
  },
  {
    id: "draft-apm525767-steel-cz-studs-pair",
    name: "Steel Sterilized Piercing-Gun CZ Studs",
    description:
      "Sterilized steel studs with CZ ends, sold as a pair. Photo coming soon — this piece has not been shelf-verified.",
    sizes: "Sold as a pair",
    price: {
      amount: "$8.10",
      unit: "pair",
      note: "Draft price · proposed 3× wholesale · not shelf-verified.",
      draft: true,
    },
    status: "Photo coming · not shelf-verified",
    photoComing: true,
  },
  {
    id: "draft-apm525767-ti-threadless-double-flat-belly",
    name: "G23 PVD Titanium Threadless Double Flat CZ Belly",
    description:
      "Threadless double-flat CZ belly jewelry in G23 PVD titanium. Photo coming soon — this piece has not been shelf-verified.",
    sizes: '14G · lengths 1/2", 7/16", and 3/8"',
    price: {
      amount: "$9.72",
      unit: "each",
      note: "Draft price · proposed 3× wholesale · not shelf-verified.",
      draft: true,
    },
    status: "Photo coming · not shelf-verified",
    photoComing: true,
  },
  {
    id: "draft-apm525767-gold-ip-leaf-tragus-labret",
    name: "Gold IP Steel Threadless 5-CZ Leaf Tragus Labret",
    description:
      "Threadless tragus labret in gold IP steel with a 5-CZ leaf top. Photo coming soon — this piece has not been shelf-verified.",
    sizes: '16G · 5/16"',
    price: {
      amount: "$8.76",
      unit: "each",
      note: "Draft price · proposed 3× wholesale · not shelf-verified.",
      draft: true,
    },
    status: "Photo coming · not shelf-verified",
    photoComing: true,
  },
  {
    id: "draft-apm525767-ti-cz-dangle-cone-labret",
    name: "G23 Titanium Internal Threaded CZ Dangle Cone Labret",
    description:
      "Internal-threaded labret in G23 titanium with a CZ dangle cone. Photo coming soon — this piece has not been shelf-verified.",
    sizes: '16G · 5/16"',
    price: {
      amount: "$11.76",
      unit: "each",
      note: "Draft price · proposed 3× wholesale · not shelf-verified.",
      draft: true,
    },
    status: "Photo coming · not shelf-verified",
    photoComing: true,
  },
  {
    id: "draft-apm525767-gold-pvd-ti-cz-dangle-cone-labret",
    name: "G23 Gold PVD Titanium CZ Dangle Cone Labret",
    description:
      "G23 titanium labret with gold PVD and a CZ dangle cone. Photo coming soon — this piece has not been shelf-verified.",
    sizes: '16G · 5/16"',
    price: {
      amount: "$12.96",
      unit: "each",
      note: "Draft price · proposed 3× wholesale · not shelf-verified.",
      draft: true,
    },
    status: "Photo coming · not shelf-verified",
    photoComing: true,
  },
  {
    id: "draft-apm525767-ti-3cz-cluster-labret",
    name: "G23 Titanium 3-CZ Cluster Labret",
    description:
      "G23 titanium labret with a 3-CZ cluster top. Photo coming soon — this piece has not been shelf-verified.",
    sizes: '16G · 5/16"',
    price: {
      amount: "$12.00",
      unit: "each",
      note: "Draft price · proposed 3× wholesale · not shelf-verified.",
      draft: true,
    },
    status: "Photo coming · not shelf-verified",
    photoComing: true,
  },
  {
    id: "draft-apm525767-gold-pvd-ti-5cz-flower-labret",
    name: "G23 Gold PVD Titanium 5-CZ Petal Flower Labret",
    description:
      "G23 titanium labret with gold PVD and a 5-CZ petal flower top. Photo coming soon — this piece has not been shelf-verified.",
    sizes: '16G · 5/16"',
    price: {
      amount: "$15.96",
      unit: "each",
      note: "Draft price · proposed 3× wholesale · not shelf-verified.",
      draft: true,
    },
    status: "Photo coming · not shelf-verified",
    photoComing: true,
  },
];
