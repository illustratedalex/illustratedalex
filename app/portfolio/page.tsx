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

export default function PortfolioPage() {
  return (
    <div className="bg-[#111] text-[#f0dfbf]">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#be9a62]">Portfolio</p>
        <h1 className="font-display text-4xl font-semibold text-[#f0dfbf] sm:text-5xl">Tattoo &amp; Piercing Work</h1>
        <p className="max-w-xl text-base text-[#dbc8a7]">
          Browse published work by category, including tattoos, piercings, cover-ups, sleeves, and studio images.
        </p>
      </div>

      <GalleryPageClient items={publishedItems} />

      <div className="mt-16 border-t border-[#7d5b2e]/40 pt-10">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#be9a62]">Follow on Instagram</p>
        <div className="flex flex-wrap gap-3">
          {instagramHandles.map((handle) => (
            <Link
              key={handle}
              href={`https://instagram.com/${handle.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#dbc8a7] underline underline-offset-4 transition hover:text-[#f0dfbf]"
            >
              {handle}
            </Link>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
