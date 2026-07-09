import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Aftercare",
  description:
    "Tattoo and piercing aftercare guidance from Illustrated Alex. Always follow the direct instructions from your appointment.",
};

const tattooAftercare = [
  "Keep the wrap or bandage on for the time your artist specified — usually 1–4 hours, or overnight for second-skin film.",
  "Wash gently with unscented, antibacterial soap using clean hands. Pat dry with a clean paper towel.",
  "Apply a thin layer of unscented lotion or the product recommended by your artist. Skin needs to breathe — don't over-apply.",
  "Keep out of direct sun while healing. Once healed, always use SPF on tattooed skin.",
  "Avoid soaking — no pools, hot tubs, lakes, or long baths until fully healed (typically 2–4 weeks).",
  "Don't pick, scratch, or peel flaking skin. Let it shed on its own.",
  "Loose, clean clothing over fresh work. Avoid friction from tight waistbands, straps, or shoes depending on placement.",
];

const piercingAftercare = [
  "Rinse with sterile saline wound wash (0.9% sodium chloride) 1–2 times per day. Don't over-clean.",
  "Leave it alone. Avoid twisting, turning, or touching the jewelry unnecessarily.",
  "Don't use alcohol, hydrogen peroxide, Bactine, or harsh soaps — these damage healing tissue.",
  "Avoid submerging in pools, hot tubs, or open water during healing.",
  "Be mindful of sleeping pressure for ear and facial piercings. A travel pillow can help for ear work.",
  "Some redness, swelling, and clear or white discharge is normal early on. Yellow or green discharge, or worsening pain, is a sign to reach out.",
  "Healing timelines vary widely — earlobes may take 6–8 weeks, cartilage and other placements 6–12+ months.",
];

export default function AftercarePage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Aftercare"
        title="Protect your work while it heals"
        description="Healing is part of the process. What you do after your session matters as much as the session itself."
      />

      <div className="rounded border border-stone-700/40 bg-stone-900/30 px-5 py-4">
        <p className="text-sm leading-7 text-stone-400">
          <strong className="font-semibold text-stone-300">Note:</strong> These
          are general guidelines. Aftercare may vary based on your specific
          tattoo, piercing, placement, or healing. Always follow the direct
          instructions given to you during your appointment. If something feels
          off,{" "}
          <Link
            href="/contact"
            className="text-stone-300 underline hover:text-stone-100"
          >
            reach out to the studio
          </Link>{" "}
          rather than guessing.
        </p>
      </div>

      {/* Tattoo */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-semibold text-stone-200">
          Tattoo Aftercare
        </h2>
        <ul className="space-y-3 rounded-lg border border-stone-800 bg-stone-900/40 p-6">
          {tattooAftercare.map((tip) => (
            <li key={tip} className="flex gap-3 text-sm leading-7 text-stone-400">
              <span className="mt-1 shrink-0 text-stone-600" aria-hidden>
                —
              </span>
              {tip}
            </li>
          ))}
        </ul>
      </section>

      {/* Piercing */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-semibold text-stone-200">
          Piercing Aftercare
        </h2>
        <ul className="space-y-3 rounded-lg border border-stone-800 bg-stone-900/40 p-6">
          {piercingAftercare.map((tip) => (
            <li key={tip} className="flex gap-3 text-sm leading-7 text-stone-400">
              <span className="mt-1 shrink-0 text-stone-600" aria-hidden>
                —
              </span>
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <div className="rounded-lg border border-stone-800 bg-stone-900/40 p-6">
        <p className="text-base font-medium text-stone-200">
          Questions during healing?
        </p>
        <p className="mt-2 text-sm text-stone-500">
          Early attention prevents most healing issues. Don&rsquo;t wait — get
          in touch if anything looks or feels unusual.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center rounded border border-stone-700 px-5 py-2 text-sm font-medium text-stone-300 transition hover:border-stone-500 hover:text-stone-100"
        >
          Contact the Studio
        </Link>
      </div>
    </div>
  );
}
