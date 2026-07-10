import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { GalleryPageClient } from "@/components/gallery-page-client";
import { galleryItems, instagramHandles } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Tattoo and piercing work by Illustrated Alex — fine line, black & gray, realism, wildlife, cover-ups, sleeves, and piercing. Private studio in Claremont, NH.",
};

function hasPublicAsset(src: string) {
  const normalized = src.replace(/^\//, "");
  return existsSync(path.join(process.cwd(), "public", normalized));
}

const publishedItems = galleryItems
  .filter((item) => item.status === "published")
  .sort((a, b) => a.sortOrder - b.sortOrder)
  .map((item) => ({ ...item, hasImage: hasPublicAsset(item.imageUrl) }));

const instagramUrlsByHandle: Record<string, string> = {
  "@illustratedalex": "https://www.instagram.com/illustratedalex/",
  "@alexdoestattooing": "https://www.instagram.com/alexdoestattooing/",
  "@alexdoespiercing": "https://www.instagram.com/alexdoespiercing/",
};

export default function PortfolioPage() {
  return (
    <div className="bg-[#111] text-[#f0dfbf]">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#be9a62]">Portfolio</p>
        <h1 className="font-display text-4xl font-semibold text-[#f0dfbf] sm:text-5xl">Tattoo &amp; Piercing Work</h1>
        <p className="max-w-xl text-base text-[#dbc8a7]">
          Browse a curated selection of published tattoo and piercing work.
        </p>
      </div>

      <GalleryPageClient items={publishedItems} />

      <div className="mt-16 border-t border-[#7d5b2e]/40 pt-10">
        <h2 className="font-display text-3xl font-semibold text-[#f0dfbf]">Latest Work Lives on Instagram</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-[#dbc8a7]">
          This portfolio is a curated selection of tattoo and piercing work. For recent pieces, healed photos, works
          in progress, available designs, piercing updates, and day-to-day studio posts, follow Alex on Instagram.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {instagramHandles.map((handle) => (
            <Link
              key={handle}
              href={instagramUrlsByHandle[handle] ?? `https://instagram.com/${handle.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#bc8f4d] bg-transparent px-5 py-2.5 text-xs font-semibold tracking-[0.1em] text-[#e7d4b4] transition hover:bg-[#bc8f4d]/10"
            >
              {handle} ↗
            </Link>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
