import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
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
    <div className={`grid gap-3 ${colClasses[columns]}`}>
      {items.map((item) => {
        const hasImage = hasPublicAsset(item.imageUrl);

        return (
          <article
            key={item.id}
            className="group relative aspect-square overflow-hidden rounded-lg border border-stone-800 bg-stone-900"
          >
            {hasImage ? (
              <Image
                src={item.imageUrl}
                alt={item.altText}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 bg-stone-900 p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-stone-600">
                  {item.title}
                </p>
                <p className="text-[10px] text-stone-700">{item.category}</p>
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 translate-y-1 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-xs font-semibold text-stone-100">{item.title}</p>
              {item.instagramUrl ? (
                <Link
                  href={item.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto mt-0.5 text-[11px] text-stone-400 hover:text-stone-200"
                >
                  Instagram ↗
                </Link>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
