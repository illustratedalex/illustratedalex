import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { bookingUrl } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Piercings",
  description:
    "Professional body piercing at Illustrated Alex — correct anatomy assessment, quality jewelry, and real aftercare guidance. Claremont, NH.",
};

const piercingInfo = [
  {
    heading: "Professional Technique",
    body: "Piercing since the 1990s means a practiced hand and a grounded understanding of healing, anatomy, and jewelry fit. No guessing, no rushing.",
  },
  {
    heading: "Quality Jewelry",
    body: "Implant-grade materials only. The right starter jewelry matters more than most people realize — it directly affects how well a piercing heals.",
  },
  {
    heading: "Aftercare Included",
    body: "Every piercing comes with clear aftercare guidance tailored to the placement. Ask questions during the appointment.",
  },
  {
    heading: "Anatomy First",
    body: "Not every placement works on every body. If something isn't going to heal well or wear well long-term, that gets discussed honestly before anything starts.",
  },
];

const piercingTypes = [
  "Earlobes",
  "Helix & Cartilage",
  "Tragus & Daith",
  "Industrial",
  "Nostril & Septum",
  "Eyebrow",
  "Lip & Labret",
  "Navel",
  "Surface Piercings",
  "Various body placements",
];

export default function PiercingsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Piercings"
        title="Professional Body Piercing"
        description="Practiced since the 1990s. Quality materials, correct technique, and honest aftercare guidance on every placement."
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {piercingInfo.map((item) => (
          <div
            key={item.heading}
            className="rounded-lg border border-stone-800 bg-stone-900/40 p-6"
          >
            <h2 className="font-serif text-base font-semibold text-stone-200">
              {item.heading}
            </h2>
            <p className="mt-2 text-sm leading-7 text-stone-400">{item.body}</p>
          </div>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="font-serif text-xl font-semibold text-stone-200">
          Common Placements
        </h2>
        <ul className="grid gap-2 rounded-lg border border-stone-800 bg-stone-900/40 p-6 sm:grid-cols-2">
          {piercingTypes.map((type) => (
            <li key={type} className="flex items-center gap-2 text-sm text-stone-400">
              <span className="text-stone-700" aria-hidden>
                —
              </span>
              {type}
            </li>
          ))}
        </ul>
        <p className="text-sm text-stone-600">
          Not sure if your placement is listed? Ask — this isn&rsquo;t an
          exhaustive list.
        </p>
      </section>

      <div className="rounded-lg border border-stone-800 bg-stone-900/40 p-6 space-y-4">
        <p className="font-serif text-lg font-semibold text-stone-100">
          Ready to book?
        </p>
        <p className="text-sm text-stone-400">
          All piercing appointments are by consultation. Reach out to discuss
          placement, jewelry, and timing before booking.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={bookingUrl}
            className="inline-flex items-center justify-center rounded bg-stone-100 px-6 py-2.5 text-sm font-semibold text-stone-950 transition hover:bg-stone-200"
          >
            Book a Piercing
          </Link>
          <Link
            href="/aftercare"
            className="inline-flex items-center justify-center rounded border border-stone-700 px-6 py-2.5 text-sm font-semibold text-stone-300 transition hover:border-stone-500 hover:text-stone-100"
          >
            Piercing Aftercare
          </Link>
        </div>
      </div>
    </div>
  );
}
