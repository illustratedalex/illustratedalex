import type { Metadata } from "next";
import Link from "next/link";
import { bookingUrl, mountainsideBio } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Mountainside Legacy",
  description:
    "Mountainside Tattoo in Bellows Falls, VT — 18 years of tattooing and piercing before Illustrated Alex moved to Claremont, NH.",
};

export default function MountainsidePage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-16 space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#968b80]">Legacy</p>
        <h1 className="font-serif text-5xl font-bold text-[#1a1511]">Mountainside Tattoo</h1>
        <p className="text-lg leading-8 text-[#5c5047]">
          Bellows Falls, Vermont. Eighteen years.
        </p>
      </div>

      <div className="space-y-6 border-t border-[#ddd4c4] pt-12">
        {mountainsideBio.map((para) => (
          <p key={para.slice(0, 30)} className="text-base leading-8 text-[#5c5047]">
            {para}
          </p>
        ))}
      </div>

      <div className="mt-14 grid gap-4 border-t border-[#ddd4c4] pt-10">
        {[
          { label: "Studio", value: "Mountainside Tattoo" },
          { label: "Location", value: "Bellows Falls, Vermont" },
          { label: "Years Active", value: "18 years" },
          { label: "Current Studio", value: "Illustrated Alex — 30 Opera House Square, Claremont NH" },
        ].map((item) => (
          <div key={item.label} className="flex gap-8 border-b border-[#e8e0d4] py-4 last:border-0">
            <span className="w-32 shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-[#968b80]">
              {item.label}
            </span>
            <span className="text-sm text-[#1a1511]">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/about"
          className="rounded-sm border border-[#1a1511]/25 px-7 py-3 text-center text-sm font-semibold text-[#1a1511] transition hover:border-[#1a1511]/50"
        >
          Full Story
        </Link>
        <Link
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm bg-[#1a1511] px-7 py-3 text-center text-sm font-semibold text-[#f3ede3] transition hover:bg-[#2e261e]"
        >
          Book at Illustrated Alex
        </Link>
      </div>
    </div>
  );
}
