import { createPageMetadata } from "@/lib/seo";
import { CheckoutClient } from "@/components/shop/checkout-client";

export const metadata = createPageMetadata(
  "/shop/checkout",
  "Checkout | Illustrated Alex",
  "Pay for studio pickup at Illustrated Alex, 18 Opera House Square, Claremont, NH.",
);

export default function CheckoutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-semibold sm:text-5xl">Checkout</h1>
      <p className="mt-4 text-base leading-8 text-[#dbc8a7]">
        Pickup at 18 Opera House Square, Claremont, NH. Call (603) 843-7005 if you want the studio to hold a piece.
      </p>
      <div className="mt-8">
        <CheckoutClient />
      </div>
    </div>
  );
}
