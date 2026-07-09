"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GalleryCategory, GalleryItem } from "@/data/site-content";
import { galleryCategories } from "@/data/site-content";

type GalleryItemWithAvailability = GalleryItem & { hasImage: boolean };

type GalleryPageClientProps = {
  items: GalleryItemWithAvailability[];
};

export function GalleryPageClient({ items }: GalleryPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<
    GalleryCategory | "All"
  >("All");

  const filtered =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const usedCategories = new Set(items.map((item) => item.category));

  return (
    <div className="space-y-8">
      {/* Category filters */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by category"
      >
        <button
          onClick={() => setActiveCategory("All")}
          className={`rounded border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] transition ${
            activeCategory === "All"
              ? "border-stone-400 bg-stone-800 text-stone-100"
              : "border-stone-800 text-stone-500 hover:border-stone-600 hover:text-stone-300"
          }`}
        >
          All
        </button>
        {galleryCategories.map((cat) => {
          if (!usedCategories.has(cat)) return null;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] transition ${
                activeCategory === cat
                  ? "border-stone-400 bg-stone-800 text-stone-100"
                  : "border-stone-800 text-stone-500 hover:border-stone-600 hover:text-stone-300"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-stone-600">
          No items in this category yet.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-lg border border-stone-800 bg-stone-900"
            >
              {item.hasImage ? (
                <Image
                  src={item.imageUrl}
                  alt={item.altText}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 bg-stone-900 p-6 text-center">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-stone-600">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-stone-700">{item.category}</p>
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-1 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-semibold text-stone-100">
                  {item.title}
                </p>
                {item.description ? (
                  <p className="mt-0.5 line-clamp-2 text-xs text-stone-400">
                    {item.description}
                  </p>
                ) : null}
                {item.instagramUrl ? (
                  <Link
                    href={item.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-[11px] text-stone-400 hover:text-stone-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Instagram ↗
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="text-xs text-stone-700">
        Showing {filtered.length} of {items.length} published work
        {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
      </p>
    </div>
  );
}
