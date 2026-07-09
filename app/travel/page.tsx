import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { bookingUrl, locations } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Travel",
  description:
    "Illustrated Alex is available as a traveling guest artist in Enfield, CT and Redondo Beach, CA — day, week, or longer bookings.",
};

export default function TravelPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Travel & Guest Artist"
        title="Where to Find Me"
        description="The work travels. Home studio is in Claremont, NH — with regular guest spots in Connecticut and California."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {locations.map((loc) => (
          <div
            key={loc.name}
            className="space-y-3 rounded-lg border border-stone-800 bg-stone-900/40 p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-600">
              {loc.label}
            </p>
            <p className="font-serif text-lg font-semibold text-stone-100">
              {loc.name}
            </p>
            <p className="text-sm leading-6 text-stone-400">
              {loc.description}
            </p>
            <p className="text-xs text-stone-600">{loc.address}</p>
          </div>
        ))}
      </div>

      <div className="max-w-3xl space-y-5">
        <h2 className="font-serif text-xl font-semibold text-stone-200">
          Guest Artist Bookings
        </h2>
        <p className="text-base leading-8 text-stone-400">
          Guest spots are available for day, week, or multi-week arrangements.
          Studio owners and event coordinators can reach out directly to discuss
          availability, logistics, and scheduling.
        </p>
        <p className="text-base leading-8 text-stone-400">
          Individual clients interested in booking during a guest spot should
          also reach out in advance — availability during travel periods fills
          up.
        </p>
      </div>

      <div className="rounded-lg border border-stone-800 bg-stone-900/40 p-6 space-y-4">
        <p className="font-serif text-lg font-semibold text-stone-100">
          Inquire About a Guest Spot
        </p>
        <p className="text-sm text-stone-400">
          Use the contact form to discuss scheduling, locations, or to express
          interest in a guest residency.
        </p>
        <Link
          href={bookingUrl}
          className="inline-flex items-center rounded bg-stone-100 px-6 py-2.5 text-sm font-semibold text-stone-950 transition hover:bg-stone-200"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
