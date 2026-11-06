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

type PayResult = { message: string; receiptUrl?: string | null };

const fieldClass =
  "mt-2 block min-h-11 w-full rounded-xl border border-[#7d5b2e] bg-[#14110d] px-3 text-sm text-[#f0dfbf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8b06d]";

export function CheckoutClient() {
  const { lines, ready, clear } = useCart();
  const cardRef = useRef<SquareCard | null>(null);
  const [paying, setPaying] = useState(false);
  const [result, setResult] = useState<PayResult | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const environment = process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT;
  const checkoutUrl = process.env.NEXT_PUBLIC_SQUARE_CHECKOUT_URL || "/api/shop/checkout";

  const detailed = lines.flatMap((line) => {
    const product = getProduct(line.slug);
    const variant = product?.variants.find((entry) => entry.id === line.variantId);
    if (!product || !variant) return [];
    return [{ line, product, variant }];
  });

  const decision = decideCheckout({
    environment,
    applicationId: process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID,
    locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
    checkoutUrl,
    lines: detailed.map(({ variant }) => ({ squareCatalogVariationId: variant.squareCatalogVariationId })),
  });

  useEffect(() => {
    if (!decision.ready) return;
    const applicationId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
    if (!applicationId || !locationId) return;

    let cancelled = false;
    const script = document.createElement("script");
    script.src =
      environment === "production" ? "https://web.squarecdn.com/v1/square.js" : "https://sandbox.web.squarecdn.com/v1/square.js";
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
  }, [decision.ready, environment]);

  async function pay() {
    if (!decision.ready || !cardRef.current) return;
    setPaying(true);
    setResult(null);
    const tokenized = await cardRef.current.tokenize();
    if (tokenized.status !== "OK" || !tokenized.token) {
      setPaying(false);
      setResult({ message: tokenized.errors?.[0]?.message || "Card tokenization failed." });
      return;
    }

    const response = await fetch(checkoutUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idempotencyKey: crypto.randomUUID(),
        sourceId: tokenized.token,
        pickup: { displayName: name, email, phone },
        items: detailed.map(({ product, line }) => ({
          sku: product.sku,
          variantId: line.variantId,
          quantity: line.quantity,
        })),
      }),
    });
    const payload = (await response.json().catch(() => null)) as { error?: string; orderId?: string; receiptUrl?: string | null } | null;
    setPaying(false);
    if (response.ok && payload?.orderId) {
      clear();
      setResult({ message: "Order confirmed", receiptUrl: payload.receiptUrl });
      return;
    }
    setResult({ message: payload?.error || "Checkout did not complete." });
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
      </div>
      {decision.ready ? (
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            void pay();
          }}
        >
          <label className="block text-sm text-[#f0dfbf]">
            Name for pickup
            <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" className={fieldClass} />
          </label>
          <label className="block text-sm text-[#f0dfbf]">
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" className={fieldClass} />
          </label>
          <label className="block text-sm text-[#f0dfbf]">
            Phone
            <input value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" autoComplete="tel" className={fieldClass} />
          </label>
          <div id="square-card" className="min-h-16 rounded-xl bg-[#f0dfbf] p-3" />
          <button
            type="submit"
            disabled={paying}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#bc8f4d] bg-[#bc8f4d] px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] text-[#1e1408] uppercase disabled:opacity-60"
          >
            {paying ? "Processing" : "Place order"}
          </button>
        </form>
      ) : null}
      {result ? (
        <p role="status" className="text-sm text-[#f2e1c2]">
          {result.message}
          {result.receiptUrl ? (
            <>
              {" "}
              <a href={result.receiptUrl} className="text-[#e1c18c] underline underline-offset-4">
                View receipt
              </a>
            </>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
