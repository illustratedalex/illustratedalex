"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryImage = { src: string; alt: string };

export function ProductGallery({
  images,
  fit = "contain",
}: {
  images: GalleryImage[];
  fit?: "cover" | "contain";
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  if (!current) return null;

  return (
    <div>
      <div className="relative aspect-square bg-[#16130f]">
        <Image
          src={current.src}
          alt={current.alt}
          fill
          priority={active === 0}
          sizes="(max-width: 1024px) 100vw, 45vw"
          className={fit === "cover" ? "object-cover" : "object-contain p-3"}
        />
      </div>
      {images.length > 1 ? (
        <ul className="mt-3 flex gap-2" aria-label="More photos of this piece">
          {images.map((image, index) => {
            const selected = index === active;
            return (
              <li key={image.src}>
                <button
                  type="button"
                  aria-pressed={selected}
                  aria-label={image.alt}
                  onClick={() => setActive(index)}
                  className={`relative h-16 w-16 overflow-hidden rounded-lg border ${selected ? "border-[#d8b06d]" : "border-[#7d5b2e]/50"} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8b06d]`}
                >
                  <Image src={image.src} alt="" fill sizes="64px" className="object-contain" />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
