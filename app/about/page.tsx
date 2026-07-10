import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { bookingUrl } from "@/data/site-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Born in Holyoke, MA in 1971. Tattooing since 1986, piercing since the 1990s, 18 years at Mountainside Tattoo, and now working from Illustrated Alex Tattoo & Piercing in Claremont, NH.",
};

const careerTimeline = [
  {
    period: "1971",
    detail: "Born in Holyoke, Massachusetts.",
  },
  {
    period: "1986",
    detail: "Started tattooing and began building a career around custom work, clean execution, and client-focused design.",
  },
  {
    period: "1990s",
    detail: "Added professional body piercing services.",
  },
  {
    period: "2001",
    detail: "Settled in Vermont and continued building a regional client base.",
  },
  {
    period: "2006",
    detail: "Opened Mountainside Tattoo in Bellows Falls, Vermont.",
  },
  {
    period: "Mountainside Years",
    detail:
      "Owned and operated Mountainside Tattoo in Bellows Falls for 18 years, serving clients from Bellows Falls, Springfield, Westminster, Chester, Charlestown, and beyond.",
  },
  {
    period: "Today",
    detail: "Now working from Illustrated Alex Tattoo & Piercing at 30 Opera House Square in Claremont, New Hampshire.",
  },
];

const specialties = [
  "Custom tattoos designed around placement and long-term wear",
  "Cover-ups and reworks",
  "Fine line and floral detail",
  "Black and gray work",
  "Larger multi-session projects",
  "Professional piercing services",
  "Honest consultation and client-focused design",
];

export default function AboutPage() {
  return (
    <div className="bg-[#111] text-[#f0dfbf]">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <section className="mb-10 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#be9a62]">About</p>
            <h1 className="font-display text-5xl font-semibold text-[#f0dfbf] sm:text-6xl">About Illustrated Alex</h1>
            <p className="max-w-3xl text-lg leading-8 text-[#dbc8a7]">
              A tattoo artist-first career built from decades of custom work, piercing, studio ownership, and client
              trust.
            </p>
          </div>
          <div className="relative h-[300px] overflow-hidden rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] sm:h-[340px] lg:h-[390px]">
            <Image
              src="/images/studio/alex-tattooing.jpg"
              alt="Alex tattooing in the studio"
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
            />
          </div>
        </section>

        <section className="rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold text-[#f0dfbf]">Background</h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[#dbc8a7]">
            Alex was born in Holyoke, Massachusetts in 1971 and started tattooing in 1986. Piercing services were
            added in the 1990s, expanding the work while keeping the same focus on safety, anatomy, quality, and
            long-term wear.
          </p>
        </section>

        <section className="mt-8 rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold text-[#f0dfbf]">Timeline</h2>
          <div className="mt-6 space-y-5">
            {careerTimeline.map((entry) => (
              <div key={entry.period} className="grid gap-3 border-b border-[#7d5b2e]/30 pb-5 last:border-0 last:pb-0 sm:grid-cols-[180px_1fr]">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#be9a62]">{entry.period}</p>
                <p className="text-sm leading-7 text-[#dbc8a7]">{entry.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold text-[#f0dfbf]">From Mountainside to Illustrated Alex</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[#dbc8a7]">
            Mountainside Tattoo was more than a studio. It was a chapter built from artwork, trust, friendship, and
            thousands of stories carried on skin. After 18 years in Bellows Falls, the next chapter continues at
            Illustrated Alex Tattoo &amp; Piercing in Claremont, New Hampshire.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#7d5b2e]/35 bg-[#19130e]">
              <div className="absolute inset-5 z-0 rounded-[0.9rem] border border-[#a88245]/38 bg-[rgba(245,239,225,0.78)] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-10px_22px_rgba(86,60,26,0.14)] backdrop-blur-sm" />
              <Image
                src="/images/brand/illustratedalex-logo-main.png"
                alt="Illustrated Alex logo"
                fill
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-contain p-8"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/14 via-transparent to-transparent" />
            </div>
            <div className="flex items-center rounded-xl border border-[#7d5b2e]/35 bg-gradient-to-br from-[#17120e] to-[#0e0e0e] p-6">
              <p className="text-sm leading-7 text-[#d9c39d]">
                This section documents the Bellows Falls years, the original studio, the move to the Square, and the
                clients who helped shape the shop&rsquo;s story.
              </p>
            </div>
          </div>
          <Link
            href="/mountainside-legacy"
            className="mt-6 inline-block rounded-full border border-[#bc8f4d] bg-transparent px-6 py-2.5 text-xs font-semibold tracking-[0.1em] text-[#e7d4b4]"
          >
            READ THE MOUNTAINSIDE LEGACY
          </Link>
        </section>

        <section className="mt-8 rounded-xl border border-[#7d5b2e]/40 bg-[#0f0f0f] p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold text-[#f0dfbf]">Experience &amp; Work Style</h2>
          <p className="mt-4 text-base leading-8 text-[#dbc8a7]">
            The work stays client-focused from concept through healing. Every piece is approached with practical design
            planning and honest communication about what will hold up over time.
          </p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {specialties.map((item) => (
              <li key={item} className="text-sm text-[#dbc8a7]">
                • {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#bc8f4d] bg-[#bc8f4d] px-6 py-2.5 text-center text-xs font-semibold tracking-[0.1em] text-[#1e1408]"
          >
            BOOK APPOINTMENT
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-[#bc8f4d] bg-transparent px-6 py-2.5 text-center text-xs font-semibold tracking-[0.1em] text-[#e7d4b4]"
          >
            VIEW PORTFOLIO
          </Link>
        </div>
      </div>
    </div>
  );
}
