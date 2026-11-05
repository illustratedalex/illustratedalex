"use client";

import { useEffect, useRef, useState } from "react";
import { formatPrice, getProduct, linePriceCents } from "@/data/catalog";
import { decideCheckout } from "@/lib/square/checkout";
import { useCart } from "@/components/shop/cart-provider";

type SquareCard = {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<{ status: string; token?: string; errors?: { message: string }[] }>;
  destroy: () => Promise<void>;
};

type SquareWindow = Window & {
  Square?: {
    payments: (applicationId: string, locationId: string) => { card: () => Promise<SquareCard> };
  };
};

export function CheckoutClient() {
  const { lines, ready } = useCart();
  const cardRef = useRef<SquareCard | null>(null);
  const [paying, setPaying] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const detailed = lines.flatMap((line) => {
    const product = getProduct(line.slug);
    const variant = product?.variants.find((entry) => entry.id === line.variantId);
    if (!product || !variant) return [];
    return [{ line, product, variant }];
  });

  const decision = decideCheckout({
    environment: process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT,
    applicationId: process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID,
    locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
    checkoutUrl: process.env.NEXT_PUBLIC_SQUARE_CHECKOUT_URL,
    lines: detailed.map(({ variant }) => ({ squareCatalogVariationId: variant.squareCatalogVariationId })),
  });

  useEffect(() => {
    if (!decision.ready) return;
    const applicationId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
    if (!applicationId || !locationId) return;

    let cancelled = false;
    const script = document.createElement("script");
    script.src = "https://sandbox.web.squarecdn.com/v1/square.js";
    script.async = true;
    script.onload = async () => {
      const payments = (window as SquareWindow).Square?.payments(applicationId, locationId);
      if (!payments || cancelled) return;
      const card = await payments.card();
      cardRef.current = card;
      if (!cancelled) await card.attach("#square-card");
    };
    document.body.appendChild(script);

    return () => {
      cancelled = true;
      void cardRef.current?.destroy();
      cardRef.current = null;
      script.remove();
    };
  }, [decision.ready]);

  async function pay() {
    const checkoutUrl = process.env.NEXT_PUBLIC_SQUARE_CHECKOUT_URL;
    if (!decision.ready || !checkoutUrl || !cardRef.current) return;
    setPaying(true);
    setResult(null);
    const tokenized = await cardRef.current.tokenize();
    if (tokenized.status !== "OK" || !tokenized.token) {
      setPaying(false);
      setResult(tokenized.errors?.[0]?.message || "Card tokenization failed.");
      return;
    }

    const response = await fetch(checkoutUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idempotencyKey: crypto.randomUUID(),
        sourceId: tokenized.token,
        items: detailed.map(({ product, line }) => ({
          sku: product.sku,
          variantId: line.variantId,
          quantity: line.quantity,
        })),
      }),
    });
    const payload = (await response.json().catch(() => null)) as { error?: string; orderId?: string } | null;
    setPaying(false);
    setResult(payload?.error || (payload?.orderId ? `Sandbox order ${payload.orderId} created.` : "Checkout did not complete."));
  }

  return (
    <div className="space-y-6">
      {!ready ? <p className="text-sm text-[#dbc8a7]">Loading cart.</p> : null}
      {ready && detailed.length === 0 ? <p className="text-sm text-[#f0dfbf]">Your cart is empty.</p> : null}
      {detailed.length > 0 ? (
        <ul className="space-y-3">
          {detailed.map(({ line, product, variant }) => (
            <li key={`${line.slug}-${line.variantId}`} className="flex items-start justify-between gap-4 text-sm">
              <span>
                {product.title}
                <span className="block text-[#dbc8a7]">
                  {variant.label} · {line.quantity}
                </span>
              </span>
              <span>{formatPrice((linePriceCents(product, variant) ?? 0) * line.quantity, "each")}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="rounded-2xl border border-[#7d5b2e]/50 bg-[#14110d] p-5">
        <p className="text-base leading-7 text-[#f0dfbf]">{decision.reason}</p>
        <p className="mt-3 text-sm leading-6 text-[#dbc8a7]">
          Orders are built with Square Catalog variation ids so a completed sale can decrement inventory. This draft has no variation ids yet, and production charges stay off.
        </p>
      </div>
      {decision.ready ? (
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            void pay();
          }}
        >
          <div id="square-card" className="min-h-16 rounded-xl bg-[#f0dfbf] p-3" />
          <button
            type="submit"
            disabled={paying}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#bc8f4d] bg-[#bc8f4d] px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] text-[#1e1408] uppercase disabled:opacity-60"
          >
            {paying ? "Processing" : "Pay in sandbox"}
          </button>
        </form>
      ) : null}
      {result ? (
        <p role="status" className="text-sm text-[#f2e1c2]">
          {result}
        </p>
      ) : null}
    </div>
  );
}
