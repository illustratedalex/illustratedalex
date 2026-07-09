import type { Metadata } from "next";
import Link from "next/link";
import { GalleryGrid } from "@/components/gallery-grid";
import { SectionHeading } from "@/components/section-heading";
import {
  aboutSummary,
  bookingUrl,
  galleryItems,
  locations,
  portfolioCategories,
  shopUrl,
  timeline,
} from "@/data/site-content";

export const metadata: Metadata = {
  title: "Illustrated Alex — Tattoo & Piercing",
  description:
    "Custom tattoos, professional piercing, and nearly four decades of experience. Private studio in Claremont, NH.",
};

const featuredGallery = galleryItems
  .filter((item) => item.status === "published" && item.featured)
  .sort((a, b) => a.sortOrder - b.sortOrder)
  .slice(0, 4);

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-24 px-4 py-16 sm:px-6 lg:px-8">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="space-y-6 border-b border-stone-800/50 pb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-stone-500">
          Tattoo &nbsp;•&nbsp; Piercing &nbsp;•&nbsp; Art
        </p>
        <h1 className="font-serif text-5xl font-bold tracking-tight text-stone-100 sm:text-6xl lg:text-7xl">
          Illustrated Alex
        </h1>
        <p className="max-w-2xl text-base leading-8 text-stone-400 sm:text-lg">
          Custom tattoos, professional piercing, and nearly four decades of
          experience in clean, client-focused body art. Based in Claremont,
          New Hampshire.
        </p>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Link
            href={bookingUrl}
            className="inline-flex items-center justify-center rounded bg-stone-100 px-7 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-200"
          >
            Book Appointment
          </Link>
          <Link
            href={shopUrl}
            className="inline-flex items-center justify-center rounded border border-stone-700 px-7 py-3 text-sm font-semibold text-stone-300 transition hover:border-stone-500 hover:text-stone-100"
          >
            Shop Jewelry &amp; Aftercare
          </Link>
        </div>
      </section>

      {/* ── Featured Work ────────────────────────────────────── */}
      <section className="space-y-8">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured Work"
          description="A private studio practice built around portfolio-first tattooing and professional piercing."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioCategories.map((cat) => (
            <Link
              key={cat}
              href="/portfolio"
              className="group flex aspect-[4/3] items-end rounded-lg border border-stone-800 bg-stone-900/60 p-5 transition hover:border-stone-700 hover:bg-stone-900"
            >
              <div>
                <p className="font-serif text-base font-semibold text-stone-200 transition group-hover:text-stone-100">
                  {cat}
                </p>
                <p className="mt-0.5 text-xs text-stone-600 transition group-hover:text-stone-500">
                  View work →
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="/portfolio"
          className="text-sm text-stone-500 transition hover:text-stone-300"
        >
          Browse full portfolio →
        </Link>
      </section>

      {/* ── The Studio ───────────────────────────────────────── */}
      <section className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-stone-500">
            The Studio
          </p>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-stone-100 sm:text-4xl">
            Private. Personal. Appointment-Based.
          </h2>
          <p className="text-base leading-8 text-stone-400">
            The studio at 30 Opera House Square in Claremont, NH is a
            one-on-one space — not a walk-in shop, not a factory. Tattooing,
            piercing, art, plants, natural textures, and a deliberately calm
            atmosphere that makes the work easier for everyone.
          </p>
          <p className="text-base leading-8 text-stone-400">
            Every appointment is built around the client: placement, design,
            healing, and long-term wear all considered before anything starts.
          </p>
          <Link
            href="/about"
            className="text-sm text-stone-500 transition hover:text-stone-300"
          >
            About Illustrated Alex →
          </Link>
        </div>

        <div className="space-y-3">
          {[
            {
              label: "Home Studio",
              value: "30 Opera House Square",
              sub: "Claremont, NH",
            },
            {
              label: "By Appointment",
              value: "Private studio",
              sub: "No walk-ins",
            },
            {
              label: "Experience",
              value: "Tattooing since 1986",
              sub: "Piercing since the 1990s",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-stone-800 bg-stone-900/40 px-5 py-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-600">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-medium text-stone-200">
                {item.value}
              </p>
              <p className="text-xs text-stone-500">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Where To Find Me ─────────────────────────────────── */}
      <section className="space-y-8">
        <SectionHeading eyebrow="Locations" title="Where to Find Me" />
        <div className="grid gap-3 sm:grid-cols-3">
          {locations.map((loc) => (
            <div
              key={loc.name}
              className="space-y-2 rounded-lg border border-stone-800 bg-stone-900/40 p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-600">
                {loc.label}
              </p>
              <p className="font-serif text-base font-semibold text-stone-200">
                {loc.name}
              </p>
              <p className="text-xs leading-5 text-stone-500">
                {loc.description}
              </p>
              <p className="text-xs text-stone-600">{loc.address}</p>
            </div>
          ))}
        </div>
        <Link
          href="/travel"
          className="text-sm text-stone-500 transition hover:text-stone-300"
        >
          Guest artist &amp; travel info →
        </Link>
      </section>

      {/* ── About ────────────────────────────────────────────── */}
      <section className="grid gap-8 border-t border-stone-800/50 pt-16 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="About"
            title="Nearly Four Decades in the Craft"
            description={aboutSummary}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {timeline.slice(0, 4).map((item) => (
              <div key={item.label}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-600">
                  {item.label}
                </p>
                <p className="mt-0.5 text-sm text-stone-300">{item.value}</p>
              </div>
            ))}
          </div>
          <Link
            href="/about"
            className="text-sm text-stone-500 transition hover:text-stone-300"
          >
            Full story →
          </Link>
        </div>

        <div className="space-y-3">
          {featuredGallery.length > 0 ? (
            <GalleryGrid items={featuredGallery} columns={2} />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex aspect-square items-center justify-center rounded-lg border border-stone-800 bg-stone-900"
                >
                  <p className="text-[10px] uppercase tracking-[0.14em] text-stone-700">
                    Portfolio
                  </p>
                </div>
              ))}
            </div>
          )}
          <Link
            href="/portfolio"
            className="block text-sm text-stone-500 transition hover:text-stone-300"
          >
            View full portfolio →
          </Link>
        </div>
      </section>

      {/* ── Booking & Store ──────────────────────────────────── */}
      <section className="grid gap-4 border-t border-stone-800/50 pt-16 sm:grid-cols-2">
        <div className="space-y-4 rounded-lg border border-stone-800 bg-stone-900/40 p-7">
          <p className="font-serif text-xl font-semibold text-stone-100">
            Book an Appointment
          </p>
          <p className="text-sm leading-7 text-stone-400">
            Tattoo consultations, piercing appointments, and guest artist
            bookings — all handled through Square.
          </p>
          <Link
            href={bookingUrl}
            className="inline-flex items-center rounded bg-stone-100 px-5 py-2.5 text-sm font-semibold text-stone-950 transition hover:bg-stone-200"
          >
            Book Now
          </Link>
        </div>
        <div className="space-y-4 rounded-lg border border-stone-800 bg-stone-900/40 p-7">
          <p className="font-serif text-xl font-semibold text-stone-100">
            Shop
          </p>
          <p className="text-sm leading-7 text-stone-400">
            Jewelry, aftercare products, gift cards, and merchandise — available
            through the Square store.
          </p>
          <Link
            href={shopUrl}
            className="inline-flex items-center rounded border border-stone-700 px-5 py-2.5 text-sm font-semibold text-stone-300 transition hover:border-stone-500 hover:text-stone-100"
          >
            Visit Store
          </Link>
        </div>
      </section>
    </div>
  );
}
