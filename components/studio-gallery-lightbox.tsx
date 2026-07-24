"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type StudioGalleryItem = {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  sizes?: string;
  priority?: boolean;
};

type StudioGalleryLightboxProps = {
  items: StudioGalleryItem[];
  gridClassName?: string;
};

export function StudioGalleryLightbox({ items, gridClassName = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" }: StudioGalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const hasPrev = activeIndex !== null && activeIndex > 0;
  const hasNext = activeIndex !== null && activeIndex < items.length - 1;

  const goPrev = useCallback(() => {
    setActiveIndex((current) => (current === null || current <= 0 ? current : current - 1));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current === null || current >= items.length - 1 ? current : current + 1));
  }, [items.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, goPrev, goNext]);

  const activeItem = activeIndex !== null ? items[activeIndex] ?? null : null;

  return (
    <>
    <div className={gridClassName}>
        {items.map((item, index) => (
        <article key={item.src} className={item.className}>
          <button
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open studio image ${index + 1}`}
            className={`group relative w-full overflow-hidden rounded-xl border border-[#7d5b2e]/35 text-left ${item.aspectClass ?? "aspect-[4/3]"}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes={item.sizes ?? "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"}
              priority={item.priority}
              loading={item.priority ? undefined : "lazy"}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </button>
        </article>
      ))}
    </div>

      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Studio image fullscreen preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6"
          onClick={close}
        >
          {hasPrev && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goPrev();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#7d5b2e]/60 bg-black/70 text-[#f0dfbf] transition hover:border-[#bc8f4d]"
            >
              <span aria-hidden="true">‹</span>
            </button>
          )}

          {hasNext && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goNext();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#7d5b2e]/60 bg-black/70 text-[#f0dfbf] transition hover:border-[#bc8f4d]"
            >
              <span aria-hidden="true">›</span>
            </button>
          )}

          <button
            type="button"
            onClick={close}
            aria-label="Close preview"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#7d5b2e]/60 bg-black/70 text-[#f0dfbf] transition hover:border-[#bc8f4d]"
          >
            <span aria-hidden="true">×</span>
          </button>

          <div onClick={(event) => event.stopPropagation()} className="relative h-[78vh] w-full max-w-6xl overflow-hidden rounded-xl border border-[#7d5b2e]/50 bg-[#0f0f0f]">
            <Image src={activeItem.src} alt={activeItem.alt} fill sizes="90vw" className="object-contain" priority />
          </div>
        </div>
      )}
    </>
  );
}
