import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { GalleryPageClient } from "@/components/gallery-page-client";
import { SectionHeading } from "@/components/section-heading";
import { galleryItems, instagramHandles } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Portfolio of tattoo and piercing work by Illustrated Alex. Custom work, cover-ups, fine line, black & gray, realism, wildlife, and more.",
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
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Portfolio"
        title="The Work"
        description="Filter by style or browse everything. Only published work is shown here."
      />

      <GalleryPageClient items={publishedItems} />

      <div className="rounded-lg border border-stone-800 bg-stone-900/40 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-600">
          More on Instagram
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {instagramHandles.map((handle) => (
            <Link
              key={handle}
              href={`https://instagram.com/${handle.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-stone-700 px-3 py-1.5 text-xs text-stone-300 transition hover:border-stone-500 hover:text-stone-100"
            >
              {handle}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
