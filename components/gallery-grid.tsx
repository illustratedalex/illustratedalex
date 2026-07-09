import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { GalleryItem } from "@/data/site-content";

type GalleryGridProps = {
  items: GalleryItem[];
  columns?: 2 | 3 | 4;
};

function hasPublicAsset(src: string) {
  const normalized = src.replace(/^\//, "");
  return existsSync(path.join(process.cwd(), "public", normalized));
}

const colClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function GalleryGrid({ items, columns = 4 }: GalleryGridProps) {
  return (
    <div className={`grid gap-4 ${colClasses[columns]}`}>
      {items.map((item) => {
        const hasImage = hasPublicAsset(item.imageUrl);
        return (
          <article key={item.id}>
            <div className="relative aspect-[3/4] overflow-hidden bg-[#e3dccf]">
              {hasImage ? (
                <Image
                  src={item.imageUrl}
                  alt={item.altText}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-end justify-end bg-gradient-to-b from-[#cec5b3] to-[#b8af9e] p-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#2a2118]/40">
                    Studio · Portfolio
                  </p>
                </div>
              )}
            </div>
            <p className="mt-2 text-xs font-medium text-[#2b2b2b]">{item.title}</p>
          </article>
        );
      })}
    </div>
  );
}
