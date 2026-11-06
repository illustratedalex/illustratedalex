"use client";

import { useState } from "react";
import { canAddToCart, formatPrice, linePriceCents, type CatalogProduct } from "@/data/catalog";
import { useCart } from "@/components/shop/cart-provider";

const buttonClass =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-[#bc8f4d] px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0dfbf]";

export function AddToCart({ product }: { product: CatalogProduct }) {
  const { add } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [message, setMessage] = useState<string | null>(null);

  if (product.externalHref) {
    return (
      <a href={product.externalHref} target="_blank" rel="noopener noreferrer" className={`${buttonClass} bg-[#bc8f4d] text-[#1e1408]`}>
        Buy a Gift Card
      </a>
    );
  }

  if (product.stockCount === 0) {
    return (
      <button type="button" disabled className={`${buttonClass} cursor-not-allowed border-[#7d5b2e] text-[#be9a62]`}>
        Out of stock
      </button>
    );
  }

  if (!canAddToCart(product)) {
    const priced = product.variants.some((variant) => linePriceCents(product, variant) !== null);
    const label = priced ? "Check studio availability" : "Coming soon";
    return (
      <div className="space-y-2">
        <button type="button" disabled className={`${buttonClass} cursor-not-allowed border-[#7d5b2e] text-[#be9a62]`}>
          {label}
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const result = add(product.slug, variantId);
        setMessage(result ?? "Added to cart.");
      }}
    >
      {product.variants.length > 1 ? (
        <label className="block text-sm text-[#f0dfbf]">
          {product.variants.some((variant) => variant.stockCount !== undefined) ? "Option" : "Size"}
          <select
            value={variantId}
            onChange={(event) => setVariantId(event.target.value)}
            className="mt-2 block min-h-11 w-full rounded-xl border border-[#7d5b2e] bg-[#14110d] px-3 text-sm text-[#f0dfbf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8b06d]"
          >
            {product.variants.map((variant) => {
              const cents = linePriceCents(product, variant);
              const priced = product.variants.some((entry) => entry.priceCents !== undefined);
              const onHand = "";
              return (
                <option key={variant.id} value={variant.id}>
                  {priced && cents !== null ? `${variant.label} · ${formatPrice(cents, "each")}${onHand}` : `${variant.label}${onHand}`}
                </option>
              );
            })}
          </select>
        </label>
      ) : (
        <p className="text-sm text-[#dbc8a7]">Size: {product.variants[0]?.label}</p>
      )}
      <button type="submit" className={`${buttonClass} bg-[#bc8f4d] text-[#1e1408]`}>
        Add to cart
      </button>
      <p aria-live="polite" className="min-h-6 text-sm text-[#f2e1c2]">
        {message}
      </p>
    </form>
  );
}
