import Link from "next/link";
import { JewelryCatalog } from "@/components/jewelry-catalog";
import { TrackedLink } from "@/components/tracked-link";
import { JEWELRY_CATALOG_PATH } from "@/data/jewelry";
import {
  AFTERCARE_SHOP_URL,
  BOOKING_URL,
  GIFT_CARD_URL,
  SHOP_URL,
  TEXT_STUDIO_URL,
} from "@/data/site-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  JEWELRY_CATALOG_PATH,
  "Body Jewelry | Illustrated Alex",
  "In-studio body jewelry at Illustrated Alex, 18 Opera House Square, Claremont, NH. Draft catalog — text the studio about a piece. Aftercare, gift cards, and booking stay on Square.",
);

const squarePaths = [
  {
    title: "Aftercare products",
    description: "Sterile saline and piercing aftercare still check out on Square.",
    href: AFTERCARE_SHOP_URL,
    label: "Shop aftercare",
    eventName: "shop_click" as const,
    source: "jewelry_page_aftercare",
  },
  {
    title: "Gift cards",
    description: "Illustrated Alex gift cards stay on Square.",
    href: GIFT_CARD_URL,
    label: "Buy a gift card",
    eventName: "gift_card_click" as const,
    source: "jewelry_page_gift_card",
  },
  {
    title: "Book an appointment",
    description: "Tattoo and piercing appointments still book through Square.",
    href: BOOKING_URL,
    label: "Book now",
    eventName: "book_now_click" as const,
    source: "jewelry_page_booking",
  },
];

export default function ShopJewelryPage() {
  return (
    <div className="bg-[#111] text-[#f0dfbf]">
      <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#be9a62]">Shop</p>
          <h1 className="font-display text-5xl font-semibold text-[#f0dfbf] sm:text-6xl">Body Jewelry</h1>
          <p className="max-w-3xl text-base leading-8 text-[#dbc8a7]">
            In-studio body jewelry at 18 Opera House Square. This list is a draft — sizes on the photographed spirals
            are not confirmed, and the other pieces are waiting on photos. Text the studio to ask about a piece. There
            is no online checkout here.
          </p>
          <TrackedLink
            href={TEXT_STUDIO_URL}
            eventName="text_studio_click"
            eventParams={{ source: "jewelry_page_header" }}
            className="inline-flex items-center justify-center rounded-full border border-[#bc8f4d] bg-[#bc8f4d] px-6 py-2.5 text-xs font-semibold tracking-[0.1em] text-[#1e1408]"
          >
            TEXT THE STUDIO
          </TrackedLink>
        </div>

        <JewelryCatalog />

        <section className="space-y-4">
          <h2 className="font-display text-3xl font-semibold text-[#f0dfbf]">Aftercare, gift cards, and booking</h2>
          <p className="max-w-3xl text-sm leading-7 text-[#dbc8a7]">
            Those still open through Square. The healing guide stays on the Aftercare page.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {squarePaths.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6">
                <h3 className="font-display text-2xl font-semibold text-[#f0dfbf]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#dbc8a7]">{item.description}</p>
                <TrackedLink
                  href={item.href}
                  eventName={item.eventName}
                  eventParams={{ source: item.source }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-full border border-[#bc8f4d] bg-transparent px-6 py-2.5 text-xs font-semibold tracking-[0.1em] text-[#e7d4b4] hover:bg-[#bc8f4d]/10"
                >
                  {item.label} ↗
                </TrackedLink>
              </article>
            ))}
          </div>
          <p className="text-sm leading-7 text-[#be9a62]">
            The rest of the Square shop, including anything not listed in this draft, is still at{" "}
            <TrackedLink
              href={SHOP_URL}
              eventName="shop_click"
              eventParams={{ source: "jewelry_page_square_shop" }}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-[#f0dfbf]"
            >
              shop.illustratedalex.com
            </TrackedLink>
            .{" "}
            <Link href="/aftercare" className="underline underline-offset-4 hover:text-[#f0dfbf]">
              Piercing and tattoo aftercare guidance
            </Link>{" "}
            stays on this site.
          </p>
        </section>
      </div>
    </div>
  );
}
