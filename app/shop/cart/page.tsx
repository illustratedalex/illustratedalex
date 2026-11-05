import { createPageMetadata } from "@/lib/seo";
import { CartView } from "@/components/shop/cart-view";

export const metadata = createPageMetadata(
  "/shop/cart",
  "Cart | Illustrated Alex",
  "Review body jewelry in your Illustrated Alex cart. Checkout stays off until Square Catalog variations are linked.",
);

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
