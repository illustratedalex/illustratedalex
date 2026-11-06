"use client";

import Link from "next/link";
import { formatPrice, getProduct, linePriceCents, productPath } from "@/data/catalog";
import { useCart } from "@/components/shop/cart-provider";

const controlClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#bc8f4d] text-[#f0dfbf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8b06d]";

export function CartView() {
  const { lines, ready, setQuantity, remove } = useCart();

  if (!ready) {
    return <p className="text-sm text-[#dbc8a7]">Loading cart.</p>;
  }

  if (lines.length === 0) {
    return (
      <div className="rounded-2xl border border-[#7d5b2e]/40 bg-[#14110d] p-6">
        <p className="text-base text-[#f0dfbf]">Your cart is empty.</p>
        <Link href="/shop/body-jewelry" className="mt-4 inline-flex min-h-11 items-center text-sm text-[#e1c18c] underline underline-offset-4">
          Browse body jewelry
        </Link>
      </div>
    );
  }

  const detailed = lines.flatMap((line) => {
    const product = getProduct(line.slug);
    const variant = product?.variants.find((entry) => entry.id === line.variantId);
    const cents = product && variant ? linePriceCents(product, variant) : null;
    if (!product || !variant || cents === null) return [];
    return [{ line, product, variant, lineCents: cents * line.quantity }];
  });
  const subtotal = detailed.reduce((sum, entry) => sum + entry.lineCents, 0);
  const hasShipped = detailed.some((entry) => entry.product.fulfillment === "printful-shipped");
  const hasStudioPickup = detailed.some((entry) => entry.product.fulfillment === "square-catalog" || entry.product.fulfillment === "aftercare-later");

  return (
    <div className="space-y-6">
      <ul className="space-y-4">
        {detailed.map(({ line, product, variant }) => (
          <li key={`${line.slug}-${line.variantId}`} className="rounded-2xl border border-[#7d5b2e]/40 bg-[#14110d] p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <Link href={productPath(product)} className="font-display text-2xl text-[#f0dfbf] underline-offset-4 hover:underline">
                  {product.title}
                </Link>
                <p className="mt-1 text-sm text-[#dbc8a7]">{variant.label}</p>
                <p className="mt-1 text-sm text-[#f2e1c2]">{formatPrice(linePriceCents(product, variant), product.unit)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" className={controlClass} aria-label={`Decrease ${product.title}`} onClick={() => setQuantity(line.slug, line.variantId, line.quantity - 1)}>
                  −
                </button>
                <span className="min-w-8 text-center text-sm" aria-live="polite">
                  {line.quantity}
                </span>
                <button type="button" className={controlClass} aria-label={`Increase ${product.title}`} onClick={() => setQuantity(line.slug, line.variantId, line.quantity + 1)}>
                  +
                </button>
                <button type="button" className="min-h-11 px-3 text-sm text-[#e1c18c] underline underline-offset-4" onClick={() => remove(line.slug, line.variantId)}>
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-base text-[#f0dfbf]">
        Subtotal {formatPrice(subtotal, "each")}.{" "}
        {hasShipped && hasStudioPickup
          ? "The mug ships free in the US. Jewelry and aftercare are held for pickup at 18 Opera House Square, Claremont, NH."
          : hasShipped
            ? "Made to order with free US shipping."
            : "Pickup is at 18 Opera House Square, Claremont, NH."}
      </p>
      <Link
        href="/shop/checkout"
        className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#bc8f4d] bg-[#bc8f4d] px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] text-[#1e1408] uppercase"
      >
        Review checkout
      </Link>
    </div>
  );
}
