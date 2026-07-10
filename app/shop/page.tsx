import type { Metadata } from "next";
import { TrackedLink } from "@/components/tracked-link";
import { BOOKING_URL, SHOP_URL, GIFT_CARD_URL } from "@/data/site-content";
import type { AnalyticsEventName } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Implant-grade body jewelry, aftercare products, gift cards, and studio merchandise from Illustrated Alex — available through Square.",
};

type ShopCard = {
  label: string;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  eventName: AnalyticsEventName;
  eventSource: string;
  imageUrl?: string;
};

const shopCards: ShopCard[] = [
  {
    label: "Booking",
    title: "Book Appointment",
    description:
      "Schedule tattoo or piercing appointments through Square.",
    buttonLabel: "Book Now",
    href: BOOKING_URL,
    eventName: "book_now_click",
    eventSource: "shop_page_booking_card",
    imageUrl: "/images/brand/illustratedalex-logo-main.png",
  },
  {
    label: "Shop",
    title: "Body Jewelry & Aftercare",
    description:
      "Shop available jewelry, aftercare products, and studio items through the Square store.",
    buttonLabel: "Shop Now",
    href: SHOP_URL,
    eventName: "shop_click",
    eventSource: "shop_page_shop_card",
    imageUrl: "/images/gallery/facial-piercings.jpg",
  },
  {
    label: "Gift Cards",
    title: "Gift Cards",
    description: "Purchase Illustrated Alex gift cards through Square.",
    buttonLabel: "Buy Gift Card",
    href: GIFT_CARD_URL,
    eventName: "gift_card_click",
    eventSource: "shop_page_gift_card_card",
    imageUrl: "/images/brand/illustratedalex-logo-main.png",
  },
];

export default function ShopPage() {
  return (
    <div className="bg-[#111] text-[#f0dfbf]">
      <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#be9a62]">Shop</p>
          <h1 className="font-display text-5xl font-semibold text-[#f0dfbf] sm:text-6xl">Shop &amp; Booking</h1>
          <p className="max-w-3xl text-base leading-8 text-[#dbc8a7]">
            Book appointments, shop jewelry and aftercare, or purchase Illustrated Alex gift cards through Square.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {shopCards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-2xl border border-[#7d5b2e]/40 bg-[#0f0f0f] shadow-[0_8px_26px_rgba(0,0,0,0.35)]"
            >
              <div
                className="relative h-52 bg-gradient-to-br from-[#1b140c] via-[#231a10] to-[#0d0d0d] bg-cover bg-center"
                style={card.imageUrl ? { backgroundImage: `url("${card.imageUrl}")` } : undefined}
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/5" />
                {!card.imageUrl ? (
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold uppercase tracking-[0.16em] text-[#d5b47c]">
                    Image preview
                  </div>
                ) : null}
              </div>
              <div className="space-y-4 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#be9a62]">{card.label}</p>
                <h2 className="font-display text-3xl font-semibold text-[#f0dfbf]">{card.title}</h2>
                <p className="text-sm leading-7 text-[#dbc8a7]">{card.description}</p>
                <TrackedLink
                  href={card.href}
                  eventName={card.eventName}
                  eventParams={{ source: card.eventSource }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[#bc8f4d] bg-transparent px-6 py-2.5 text-xs font-semibold tracking-[0.1em] text-[#e7d4b4] hover:bg-[#bc8f4d]/10"
                >
                  {card.buttonLabel} ↗
                </TrackedLink>
              </div>
            </article>
          ))}
        </div>

        <p className="text-sm leading-7 text-[#be9a62]">
          Checkout opens through Square. For appointments, use the Book Appointment button. For gift certificates, use
          the Gift Cards button.
        </p>

        <section className="rounded-xl border border-[#7d5b2e]/35 bg-[#0f0f0f] p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold text-[#f0dfbf]">Coming Later: Merch &amp; Apparel</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#dbc8a7]">
            T-shirts, hoodies, hats, stickers, and other Illustrated Alex merchandise may be added as products become
            available.
          </p>
        </section>
      </div>
    </div>
  );
}
