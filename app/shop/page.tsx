import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { bookingUrl } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Jewelry, aftercare products, gift cards, and merchandise from Illustrated Alex — handled through the Square store.",
};

const shopCategories = [
  {
    title: "Body Jewelry",
    description:
      "Implant-grade rings, studs, barbells, and specialty pieces. Quality materials for new piercings and healed placements.",
  },
  {
    title: "Aftercare Products",
    description:
      "Sterile saline spray, unscented lotion, and other healing essentials recommended in-studio.",
  },
  {
    title: "Gift Cards",
    description:
      "Gift cards for tattoo sessions, piercing appointments, and merchandise. Available in any amount.",
  },
  {
    title: "Merchandise",
    description:
      "Illustrated Alex studio merchandise — apparel and accessories when available.",
  },
];

export default function ShopPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Shop"
        title="Jewelry, Aftercare & More"
        description="The Square store handles jewelry, aftercare products, gift cards, and merchandise. Appointments are also booked through Square."
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {shopCategories.map((cat) => (
          <div
            key={cat.title}
            className="rounded-lg border border-stone-800 bg-stone-900/40 p-6 space-y-2"
          >
            <h2 className="font-serif text-base font-semibold text-stone-200">
              {cat.title}
            </h2>
            <p className="text-sm leading-7 text-stone-400">{cat.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-stone-800 bg-stone-900/40 p-7 space-y-5">
        <p className="font-serif text-xl font-semibold text-stone-100">
          Visit the Square Store
        </p>
        <p className="text-sm leading-7 text-stone-400">
          All purchases and appointments are handled through Square. Browse
          available products and book sessions directly through the store.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="https://squareup.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded bg-stone-100 px-6 py-2.5 text-sm font-semibold text-stone-950 transition hover:bg-stone-200"
          >
            Open Store ↗
          </Link>
          <Link
            href={bookingUrl}
            className="inline-flex items-center justify-center rounded border border-stone-700 px-6 py-2.5 text-sm font-semibold text-stone-300 transition hover:border-stone-500 hover:text-stone-100"
          >
            Book Appointment
          </Link>
        </div>
        <p className="text-xs text-stone-700">
          Store link will be updated with the live Square URL when available.
        </p>
      </div>
    </div>
  );
}
