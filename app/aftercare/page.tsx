import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aftercare",
  description:
    "Tattoo and piercing aftercare guidance from Illustrated Alex. Separate sections for tattoos and piercings. Always follow the instructions from your appointment first.",
};

const tattooAftercare = [
  "Keep the wrap or bandage on for the time your artist specified — usually 1–4 hours, or overnight for second-skin film.",
  "Wash gently with unscented antibacterial soap using clean hands. Pat dry with a clean paper towel.",
  "Apply a thin layer of unscented lotion or the product your artist recommended. Skin needs to breathe — don't over-apply.",
  "Keep out of direct sun while healing. Once healed, always use SPF on tattooed skin.",
  "Avoid soaking — no pools, hot tubs, lakes, or long baths until fully healed (typically 2–4 weeks).",
  "Don't pick, scratch, or peel flaking skin. Let it shed on its own.",
  "Loose, clean clothing over fresh work. Avoid friction from straps, waistbands, or shoes depending on placement.",
];

const piercingAftercare = [
  "Rinse with sterile saline wound wash (0.9% sodium chloride) 1–2 times per day. Don't over-clean.",
  "Leave it alone. Avoid twisting, turning, or touching the jewelry unnecessarily.",
  "Don't use alcohol, hydrogen peroxide, Bactine, or harsh soaps — these damage healing tissue.",
  "Avoid submerging in pools, hot tubs, or open water during healing.",
  "Be mindful of sleeping pressure for ear and facial piercings.",
  "Some redness, swelling, and clear or white discharge is normal early on. Yellow or green discharge or worsening pain — reach out.",
  "Healing timelines vary widely. Earlobes: 6–8 weeks. Cartilage and other placements: 6–12+ months.",
];

export default function AftercarePage() {
  return (
    <div className="bg-[#111] text-[#f0dfbf]">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#be9a62]">Aftercare</p>
          <h1 className="font-display text-5xl font-semibold text-[#f0dfbf] sm:text-6xl">Healing Your Work</h1>
          <p className="max-w-3xl text-lg leading-8 text-[#dbc8a7]">
            What you do after the session matters as much as the session itself.
          </p>
        </div>

        <div className="mb-8 rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] px-6 py-5 text-sm leading-7 text-[#dbc8a7]">
          These are general guidelines. Aftercare varies by placement and individual healing. Always follow the direct
          instructions given during your appointment. If something feels off,{" "}
          <Link href="/contact" className="text-[#e1c18c] underline underline-offset-2 hover:text-[#f0dfbf]">
            reach out to the studio
          </Link>{" "}
          rather than guessing.
        </div>

        <section className="rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold text-[#f0dfbf]">Tattoo Aftercare</h2>
          <ul className="mt-6 space-y-4">
            {tattooAftercare.map((tip, i) => (
              <li key={i} className="flex gap-4 border-b border-[#7d5b2e]/30 pb-4 last:border-0">
                <span className="mt-0.5 shrink-0 text-xs font-semibold text-[#be9a62]">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm leading-7 text-[#dbc8a7]">{tip}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold text-[#f0dfbf]">Piercing Aftercare</h2>
          <ul className="mt-6 space-y-4">
            {piercingAftercare.map((tip, i) => (
              <li key={i} className="flex gap-4 border-b border-[#7d5b2e]/30 pb-4 last:border-0">
                <span className="mt-0.5 shrink-0 text-xs font-semibold text-[#be9a62]">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm leading-7 text-[#dbc8a7]">{tip}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-8 rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <p className="text-base font-medium text-[#f0dfbf]">Questions during healing?</p>
          <p className="mt-2 mb-5 text-sm text-[#dbc8a7]">
            Early attention prevents most healing issues. Don&rsquo;t wait — reach out if anything looks or feels unusual.
          </p>
          <Link
            href="/contact"
            className="rounded-full border border-[#bc8f4d] bg-transparent px-6 py-2.5 text-xs font-semibold tracking-[0.1em] text-[#e7d4b4]"
          >
            CONTACT THE STUDIO
          </Link>
        </div>
      </div>
    </div>
  );
}
