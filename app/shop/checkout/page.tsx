import { createPageMetadata } from "@/lib/seo";
import { CheckoutClient } from "@/components/shop/checkout-client";

export const metadata = createPageMetadata(
  "/shop/checkout",
  "Checkout | Illustrated Alex",
  "Square sandbox checkout for Illustrated Alex. Production charges are disabled until Catalog variations are linked and Alex approves go-live.",
);

export default function CheckoutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-semibold sm:text-5xl">Checkout</h1>
      <p className="mt-4 text-base leading-8 text-[#dbc8a7]">
        Checkout pending Square credentials unless a sandbox application id, location id, and checkout server are configured. Production charges are disabled.
      </p>
      <div className="mt-8">
        <CheckoutClient />
      </div>
    </div>
  );
}
