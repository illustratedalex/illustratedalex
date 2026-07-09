import type { Metadata } from "next";
import Link from "next/link";
import { bookingUrl, GIFT_CARD_URL } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Implant-grade body jewelry, aftercare products, gift cards, and studio merchandise from Illustrated Alex — available through Square.",
};

const shopCategories = [
  {
    title: "Body Jewelry",
    description:
      "Implant-grade rings, studs, barbells, and specialty pieces. The right material and fit matters — especially for fresh piercings. Quality jewelry available for new placements and healed piercings alike.",
  },
  {
    title: "Aftercare Products",
    description:
      "Sterile saline spray, unscented healing lotion, and other essentials used and recommended in-studio. The same products recommended during appointments.",
  },
  {
    title: "Gift Cards",
    description:
      "Gift cards cover tattoo sessions, piercing appointments, jewelry, and merchandise. Available in any amount — a good option if you want to give someone the choice of what to book.",
  },
  {
    title: "Merchandise",
    description:
      "Illustrated Alex studio apparel and accessories. Availability varies — check the store for what's currently in stock.",
  },
];

export default function ShopPage() {
  return (
    <div className="bg-[#111] text-[#f0dfbf]">
      <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#be9a62]">Shop</p>
          <h1 className="font-display text-5xl font-semibold text-[#f0dfbf] sm:text-6xl">Jewelry, Aftercare &amp; More</h1>
          <p className="max-w-3xl text-base leading-8 text-[#dbc8a7]">
            Implant-grade body jewelry, aftercare essentials, gift cards, and merchandise — all handled through
            Square. Appointments are booked there too.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {shopCategories.map((cat) =>
            cat.title === "Gift Cards" ? (
              <Link
                key={cat.title}
                href={GIFT_CARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-[#7d5b2e]/35 bg-[#0f0f0f] p-6 hover:border-[#bc8f4d]/60 transition-colors"
              >
                <h2 className="font-display text-2xl font-semibold text-[#f0dfbf] group-hover:text-[#e7c98a]">{cat.title} ↗</h2>
                <p className="mt-2 text-sm leading-7 text-[#dbc8a7]">{cat.description}</p>
              </Link>
            ) : (
              <div key={cat.title} className="rounded-xl border border-[#7d5b2e]/35 bg-[#0f0f0f] p-6">
                <h2 className="font-display text-2xl font-semibold text-[#f0dfbf]">{cat.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[#dbc8a7]">{cat.description}</p>
              </div>
            ),
          )}
        </div>

        <div className="rounded-xl border border-[#7d5b2e]/35 bg-[#0f0f0f] p-6 sm:p-8">
          <p className="font-display text-3xl font-semibold text-[#f0dfbf]">Visit the Square Store</p>
          <p className="mt-3 text-sm leading-7 text-[#dbc8a7]">
            All purchases are handled through Square — browse jewelry, pick up aftercare products, grab a gift card,
            or check available merchandise. Tattoo and piercing appointments are also booked through Square.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="https://squareup.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#bc8f4d] bg-transparent px-6 py-2.5 text-xs font-semibold tracking-[0.1em] text-[#e7d4b4]"
            >
              OPEN STORE ↗
            </Link>
            <Link
              href={GIFT_CARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#bc8f4d] bg-transparent px-6 py-2.5 text-xs font-semibold tracking-[0.1em] text-[#e7d4b4]"
            >
              BUY GIFT CARD ↗
            </Link>
            <Link
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#bc8f4d] bg-[#bc8f4d] px-6 py-2.5 text-xs font-semibold tracking-[0.1em] text-[#1e1408]"
            >
              BOOK APPOINTMENT
            </Link>
          </div>
          <p className="mt-3 text-xs text-[#be9a62]">
            Store link will be updated with the live Square URL when available.
          </p>
        </div>
      </div>
    </div>
  );
}
