import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { aboutBio, bookingUrl, timeline } from "@/data/site-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Illustrated Alex — tattooing since 1986, piercing since the 1990s, 18 years at Mountainside Tattoo, now at 30 Opera House Square in Claremont, NH.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="About"
        title="Illustrated Alex"
        description="Nearly four decades in tattooing and piercing. Not a brand, not a franchise — a person who does the work."
      />

      {/* Timeline */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {timeline.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-stone-800 bg-stone-900/40 px-5 py-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-600">
              {item.label}
            </p>
            <p className="mt-1.5 text-sm leading-6 text-stone-200">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Bio */}
      <div className="max-w-3xl space-y-5">
        {aboutBio.map((paragraph) => (
          <p key={paragraph} className="text-base leading-8 text-stone-400">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Philosophy */}
      <div className="max-w-3xl space-y-4 rounded-lg border border-stone-800 bg-stone-900/40 p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-600">
          The approach
        </p>
        <p className="text-base leading-8 text-stone-300">
          Tattooing is permanent. That fact shapes everything — from how
          consultations run, to how designs are drawn, to the care taken
          during every session. The work has to be right, and that means
          slowing down, asking questions, and making sure the client actually
          understands what they&rsquo;re committing to.
        </p>
        <p className="text-base leading-8 text-stone-300">
          Body piercing follows the same principle: correct placement, proper
          jewelry, real aftercare guidance. Not a quick transaction.
        </p>
        <p className="text-base leading-8 text-stone-300">
          The studio at 30 Opera House Square is a reflection of that —
          private, quiet, filled with plants and art and the kind of calm
          that makes a difference when someone is sitting for hours.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href={bookingUrl}
          className="inline-flex items-center justify-center rounded bg-stone-100 px-7 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-200"
        >
          Book a Consultation
        </Link>
        <Link
          href="/portfolio"
          className="inline-flex items-center justify-center rounded border border-stone-700 px-7 py-3 text-sm font-semibold text-stone-300 transition hover:border-stone-500 hover:text-stone-100"
        >
          See the Work
        </Link>
      </div>
    </div>
  );
}
