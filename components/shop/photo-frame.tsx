import Image from "next/image";
import type { CatalogProduct } from "@/data/catalog";

const badgeCopy: Record<CatalogProduct["photoStatus"], string | null> = {
  ready: null,
  coming: "Photo coming",
  needed: "Photo needed",
  mockup: "AI model mock-up",
};

export function PhotoFrame({
  product,
  sizes,
  priority = false,
}: {
  product: CatalogProduct;
  sizes: string;
  priority?: boolean;
}) {
  const badge = badgeCopy[product.photoStatus];

  if (product.image) {
    return (
      <div className="relative aspect-square bg-[#16130f]">
        <Image
          src={product.image}
          alt={product.imageAlt ?? product.title}
          fill
          priority={priority}
          sizes={sizes}
          className={product.photoStatus === "mockup" ? "object-cover" : "object-contain p-3"}
        />
        {badge ? (
          <span className="absolute top-3 left-3 rounded-full border border-[#d8b06d]/70 bg-[#0f0f0f]/90 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-[#f0dfbf] uppercase">
            {badge}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className="flex aspect-square flex-col items-center justify-center gap-2 bg-[#14110d] px-4 text-center"
      role="img"
      aria-label={badge ?? "No product photo"}
    >
      <span className="text-[11px] font-semibold tracking-[0.16em] text-[#d8b06d] uppercase">{badge}</span>
      <span className="max-w-[14rem] text-xs leading-5 text-[#dbc8a7]">No product photo yet. None is generated for this draft.</span>
    </div>
  );
}
