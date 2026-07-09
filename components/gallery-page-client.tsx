"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { GalleryCategory, GalleryItem } from "@/data/site-content";
import { galleryCategories } from "@/data/site-content";
import { trackEvent } from "@/lib/analytics";

type GalleryItemWithAvailability = GalleryItem & { hasImage: boolean };

export function GalleryPageClient({ items }: { items: GalleryItemWithAvailability[] }) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "All">("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "All" ? items : items.filter((item) => item.category === activeCategory);
  const usedCategories = new Set(items.map((item) => item.category));
  const activeLightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] ?? null : null;

  const hasPrev = lightboxIndex !== null && filtered.slice(0, lightboxIndex).some((i) => i.hasImage);
  const hasNext = lightboxIndex !== null && filtered.slice(lightboxIndex + 1).some((i) => i.hasImage);

  const openLightbox = (index: number) => {
    if (!filtered[index]?.hasImage) return;
    trackEvent("portfolio_image_open", {
      source: "portfolio_grid",
      item_id: filtered[index].id,
      category: filtered[index].category,
    });
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    let idx = lightboxIndex - 1;
    while (idx >= 0 && !filtered[idx]?.hasImage) idx--;
    if (idx >= 0) setLightboxIndex(idx);
  }, [lightboxIndex, filtered]);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    let idx = lightboxIndex + 1;
    while (idx < filtered.length && !filtered[idx]?.hasImage) idx++;
    if (idx < filtered.length) setLightboxIndex(idx);
  }, [lightboxIndex, filtered]);

  const setCategory = (cat: GalleryCategory | "All") => {
    setActiveCategory(cat);
    setLightboxIndex(null);
  };

  // Keyboard navigation and body scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  return (
    <>
      <div className="space-y-8">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <button
            onClick={() => setCategory("All")}
            className={`min-h-10 border-b-2 px-1.5 py-2 text-[11px] font-medium uppercase tracking-[0.14em] transition ${
              activeCategory === "All"
                ? "border-[#c19a5c] text-[#f0dfbf]"
                : "border-transparent text-[#b59a72] hover:text-[#f0dfbf]"
            }`}
          >
            All
          </button>
          {galleryCategories.map((cat) => {
            if (!usedCategories.has(cat)) return null;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`min-h-10 border-b-2 px-1.5 py-2 text-[11px] font-medium uppercase tracking-[0.14em] transition ${
                  activeCategory === cat
                    ? "border-[#c19a5c] text-[#f0dfbf]"
                    : "border-transparent text-[#b59a72] hover:text-[#f0dfbf]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-[#c3ac86]">
              Images for this category are being added.{" "}
              <Link
                href="https://instagram.com/illustratedalex"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#f0dfbf]"
              >
                See recent work on Instagram
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item, index) => (
              <article key={item.id}>
                <button
                  type="button"
                  onClick={() => openLightbox(index)}
                  disabled={!item.hasImage}
                  aria-label={item.hasImage ? `View larger: ${item.title}` : item.title}
                  className={`group w-full text-left ${item.hasImage ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div className="relative h-[260px] overflow-hidden rounded-lg border border-[#7d5b2e]/35 bg-[#1a1a1a] sm:h-[240px] lg:h-[230px]">
                    {item.hasImage ? (
                      <>
                        <Image
                          src={item.imageUrl}
                          alt={item.altText}
                          fill
                          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                          className="object-cover transition duration-300 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <span className="rounded-full border border-[#bc8f4d]/70 bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f0dfbf] backdrop-blur-sm">
                            View
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="h-full w-full bg-gradient-to-b from-[#1e1a14] to-[#111]">
                        <div className="flex h-full items-end p-4">
                          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#7d6a4a]/60">
                            Studio · Portfolio
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
                <p className="mt-2 text-sm font-medium text-[#f0dfbf]">{item.title}</p>
                <p className="mt-0.5 text-xs text-[#b59a72]">{item.category}</p>
                {item.instagramUrl ? (
                  <Link
                    href={item.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs text-[#d4c09c] underline underline-offset-3"
                  >
                    Instagram ↗
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        )}

        <p className="text-xs text-[#b59a72]">
          {filtered.length} of {items.length} published
          {activeCategory !== "All" ? ` — ${activeCategory}` : ""}
        </p>
      </div>

      {/* Lightbox */}
      {activeLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Image preview: ${activeLightboxItem.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-2 sm:p-4"
          onClick={closeLightbox}
        >
          {/* Prev */}
          {hasPrev && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#7d5b2e]/60 bg-black/70 text-[#f0dfbf] backdrop-blur-sm transition hover:border-[#bc8f4d] hover:text-[#e7c98a] sm:left-3"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M10 2L4 8l6 6" />
              </svg>
            </button>
          )}

          {/* Next */}
          {hasNext && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#7d5b2e]/60 bg-black/70 text-[#f0dfbf] backdrop-blur-sm transition hover:border-[#bc8f4d] hover:text-[#e7c98a] sm:right-3"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 2l6 6-6 6" />
              </svg>
            </button>
          )}

          {/* Close */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close preview"
            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#7d5b2e]/60 bg-black/70 text-[#f0dfbf] backdrop-blur-sm transition hover:border-[#bc8f4d] hover:text-[#e7c98a] sm:right-4 sm:top-4"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>

          {/* Modal panel — stopPropagation so clicking inside doesn't close */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-[#7d5b2e]/50 bg-[#0f0f0f] shadow-2xl"
          >
            {/* Image */}
            <div className="relative max-h-[65vh] min-h-[220px] w-full bg-[#111] sm:min-h-[280px]">
              <Image
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.altText}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-contain"
                priority
              />
            </div>

            {/* Meta */}
            <div className="border-t border-[#7d5b2e]/40 px-4 py-3 sm:px-5 sm:py-4">
              <p className="font-display text-lg font-semibold text-[#f0dfbf] sm:text-xl">{activeLightboxItem.title}</p>
              <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#be9a62]">
                {activeLightboxItem.category}
              </p>
              {activeLightboxItem.description && (
                <p className="mt-2 text-sm leading-6 text-[#dbc8a7]">{activeLightboxItem.description}</p>
              )}
              {activeLightboxItem.instagramUrl && (
                <Link
                  href={activeLightboxItem.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs text-[#d4c09c] underline underline-offset-3 hover:text-[#f0dfbf]"
                >
                  View on Instagram ↗
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
