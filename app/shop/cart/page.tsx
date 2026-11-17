import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { CartView } from "@/components/shop/cart-view";

export const metadata: Metadata = {
  ...createPageMetadata(
    "/shop/cart",
    "Cart | Illustrated Alex",
    "Review body jewelry in your Illustrated Alex cart before studio pickup in Claremont, NH.",
  ),
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-semibold sm:text-5xl">Cart</h1>
      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}
