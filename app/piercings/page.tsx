import type { Metadata } from "next";
import Link from "next/link";
import { bookingUrl } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Piercings",
  description:
    "Professional body piercing by Illustrated Alex — practiced since the 1990s. Implant-grade jewelry, correct anatomy assessment, and real aftercare guidance in Claremont, NH.",
};

const piercingTypes = [
  "Earlobes", "Helix & Cartilage", "Tragus & Daith", "Industrial",
  "Nostril & Septum", "Eyebrow", "Lip & Labret", "Navel",
  "Surface Piercings", "Various body placements",
];

export default function PiercingsPage() {
  return (
    <div className="bg-[#111] text-[#f0dfbf]">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#be9a62]">Piercings</p>
          <h1 className="font-display text-5xl font-semibold text-[#f0dfbf] sm:text-6xl">Professional Body Piercing</h1>
          <p className="max-w-3xl text-lg leading-8 text-[#dbc8a7]">
            Practiced since the 1990s. Implant-grade materials, correct anatomy assessment, and honest aftercare guidance on every placement.
          </p>
        </div>

        <section className="rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <div className="space-y-8">
            {[
              {
                heading: "Quality Jewelry",
                body: "Implant-grade materials only. The right starter jewelry affects how well a piercing heals — this isn't a place to cut corners.",
              },
              {
                heading: "Anatomy First",
                body: "Not every placement works on every body. If something isn't going to heal well or wear well long-term, that gets discussed honestly before anything starts.",
              },
              {
                heading: "Real Aftercare",
                body: "Every piercing comes with clear aftercare guidance tailored to the placement. Ask questions — it's part of the appointment.",
              },
              {
                heading: "Experience",
                body: "Piercing since the 1990s means a practiced hand and a grounded understanding of healing, anatomy, and what actually works.",
              },
            ].map((item) => (
              <div key={item.heading} className="border-b border-[#7d5b2e]/30 pb-6 last:border-0">
                <h2 className="font-display text-2xl font-semibold text-[#f0dfbf]">{item.heading}</h2>
                <p className="mt-3 text-base leading-7 text-[#dbc8a7]">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#be9a62]">Common Placements</p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {piercingTypes.map((type) => (
              <li key={type} className="flex items-center gap-3 text-sm text-[#dbc8a7]">
                <span className="text-[#be9a62]">—</span>
                {type}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-[#be9a62]">
            Not seeing your placement? Ask — this isn&rsquo;t a complete list.
          </p>
        </section>

        <section className="mt-8 rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold text-[#f0dfbf]">Ready to book?</h2>
          <p className="mt-3 mb-6 text-sm leading-7 text-[#dbc8a7]">
            Piercing appointments start with a consultation — placement, jewelry, and aftercare discussed before
            anything starts. Walk-ins for quick services may be available when the schedule allows, but texting first is
            the fastest way to check.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#bc8f4d] bg-[#bc8f4d] px-8 py-3 text-center text-xs font-semibold tracking-[0.1em] text-[#1e1408]"
            >
              BOOK A PIERCING
            </Link>
            <Link
              href="/aftercare"
              className="rounded-full border border-[#bc8f4d] bg-transparent px-8 py-3 text-center text-xs font-semibold tracking-[0.1em] text-[#e7d4b4]"
            >
              PIERCING AFTERCARE
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
