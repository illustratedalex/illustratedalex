import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { bookingUrl, mountainsideBio } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Mountainside Legacy",
  description:
    "The Mountainside Tattoo years in Bellows Falls, Vermont — 18 years of studio history that continues today at Illustrated Alex Tattoo & Piercing in Claremont, NH.",
};

const mountainsideTimeline = [
  {
    period: "2006",
    detail: "Mountainside opens in Bellows Falls.",
  },
  {
    period: "Early Years",
    detail: "First shop and downtown presence.",
  },
  {
    period: "Growth",
    detail: "Move to the Square.",
  },
  {
    period: "Expansion",
    detail: "Larger multi-floor shop.",
  },
  {
    period: "18 Years",
    detail: "Serving Bellows Falls and surrounding towns.",
  },
  {
    period: "Today",
    detail: "Illustrated Alex in Claremont, NH.",
  },
];

export default function MountainsideLegacyPage() {
  return (
    <div className="bg-[#111] text-[#f0dfbf]">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#be9a62]">Legacy</p>
          <h1 className="font-display text-5xl font-semibold sm:text-6xl">Mountainside Tattoo</h1>
          <p className="max-w-3xl text-lg leading-8 text-[#dbc8a7]">
            Eighteen years in Bellows Falls, Vermont — a chapter built through real client work, consistency, and
            community trust.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
            <h2 className="font-display text-3xl font-semibold">The Mountainside Years</h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-[#dbc8a7]">
              {mountainsideBio.map((para) => (
                <p key={para.slice(0, 30)}>{para}</p>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#7d5b2e]/35 bg-[#19130e]">
              <Image
                src="/images/brand/illustratedalex-logo-main.png"
                alt="Illustrated Alex logo"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-contain p-8"
              />
            </div>
            <div className="rounded-xl border border-[#7d5b2e]/35 bg-gradient-to-br from-[#17120e] to-[#0e0e0e] p-6">
              <p className="text-sm leading-7 text-[#d9c39d]">
                Historical Mountainside photos are being prepared and will be added here. The work and stories from
                Bellows Falls continue through the current studio in Claremont.
              </p>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold">Mountainside Timeline</h2>
          <div className="mt-6 space-y-5">
            {mountainsideTimeline.map((entry) => (
              <div key={entry.period} className="grid gap-3 border-b border-[#7d5b2e]/30 pb-5 last:border-0 last:pb-0 sm:grid-cols-[170px_1fr]">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#be9a62]">{entry.period}</p>
                <p className="text-sm leading-7 text-[#dbc8a7]">{entry.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#7d5b2e]/35 bg-gradient-to-br from-[#17120e] to-[#0e0e0e] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#be9a62]">Original Shop</p>
            <p className="mt-3 text-sm leading-7 text-[#d9c39d]">
              Original downtown Mountainside location in Bellows Falls.
            </p>
          </div>
          <div className="rounded-xl border border-[#7d5b2e]/35 bg-gradient-to-br from-[#17120e] to-[#0e0e0e] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#be9a62]">The Square Years</p>
            <p className="mt-3 text-sm leading-7 text-[#d9c39d]">
              Mountainside&rsquo;s move to the Square and expansion into a larger multi-floor shop.
            </p>
          </div>
        </section>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/artists"
            className="rounded-full border border-[#bc8f4d] bg-transparent px-6 py-2.5 text-center text-xs font-semibold tracking-[0.1em] text-[#e7d4b4]"
          >
            BACK TO ARTISTS
          </Link>
          <Link
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#bc8f4d] bg-[#bc8f4d] px-6 py-2.5 text-center text-xs font-semibold tracking-[0.1em] text-[#1e1408]"
          >
            BOOK APPOINTMENT
          </Link>
        </div>
      </div>
    </div>
  );
}
