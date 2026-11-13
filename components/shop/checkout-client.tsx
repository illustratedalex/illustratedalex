"use client";

import { useEffect, useRef, useState } from "react";
import { formatPrice, getProduct, linePriceCents } from "@/data/catalog";
import { decideCheckout, validateUsShipping } from "@/lib/square/checkout";
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
  const busyRef = useRef(false);
  const [paying, setPaying] = useState(false);
  const [result, setResult] = useState<PayResult | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [zip, setZip] = useState("");
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
    lines: detailed.map(({ product, variant }) => ({
      squareCatalogVariationId: variant.squareCatalogVariationId,
      fulfillment: product.fulfillment,
    })),
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

  const needsShipping = detailed.some((entry) => entry.product.fulfillment === "printful-shipped");
  const needsPickup = detailed.some((entry) => entry.product.fulfillment === "square-catalog" || entry.product.fulfillment === "aftercare-later");

  async function pay() {
    if (!decision.ready || !cardRef.current || busyRef.current) return;
    if (needsShipping) {
      const shipping = validateUsShipping({ name, email, phone, address1, address2, city, stateCode, zip, country: "US" });
      if (!shipping.ok) {
        setResult({ message: shipping.error });
        return;
      }
    }
    busyRef.current = true;
    setPaying(true);
    try {
    setResult(null);
    const tokenized = await cardRef.current.tokenize();
    if (tokenized.status !== "OK" || !tokenized.token) {
      setPaying(false);
      setResult({ message: tokenized.errors?.[0]?.message || "Card tokenization failed." });
      return;
    }

    // Retain the same checkout identity across network errors, double taps, and reloads.
    // Never store card tokens or customer addresses in browser storage.
    let checkoutKey = localStorage.getItem("ia-pending-checkout");
    if (!checkoutKey) {
      checkoutKey = crypto.randomUUID();
      localStorage.setItem("ia-pending-checkout", checkoutKey);
    }
    const response = await fetch(checkoutUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idempotencyKey: checkoutKey,
        sourceId: tokenized.token,
        pickup: { displayName: name, email, phone },
        ...(needsShipping ? { shipping: { name, email, phone, address1, address2, city, stateCode, zip, country: "US" } } : {}),
        items: detailed.map(({ product, line }) => ({
          sku: product.sku,
          variantId: line.variantId,
          quantity: line.quantity,
        })),
      }),
    });
    const payload = (await response.json().catch(() => null)) as { error?: string; message?: string; status?: string; orderId?: string; receiptUrl?: string | null } | null;
    setPaying(false);
    if (response.ok && payload?.orderId && payload.status === "COMPLETED") {
      localStorage.removeItem("ia-pending-checkout");
      clear();
      setResult({ message: `${payload.message || "Payment received."} Order: ${payload.orderId}`, receiptUrl: payload.receiptUrl });
      return;
    }
    setResult({ message: payload?.message || payload?.error || "Checkout could not be verified. Retry this same checkout; do not start a new payment." });
    } catch {
      setResult({ message: "Checkout could not be verified. Retry this same checkout; do not start a new payment. Call (603) 843-7005 if you need help." });
    } finally {
      busyRef.current = false;
      setPaying(false);
    }
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
          {needsShipping && needsPickup ? (
            <p className="text-sm leading-6 text-[#dbc8a7]">
              The mug ships free to this US address. Jewelry and aftercare are held for pickup at 18 Opera House Square, Claremont, NH.
            </p>
          ) : null}
          {needsShipping && !needsPickup ? <p className="text-sm leading-6 text-[#dbc8a7]">Free US shipping. Made to order.</p> : null}
          <label className="block text-sm text-[#f0dfbf]">
            {needsShipping ? "Full name" : "Name for pickup"}
            <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required={needsShipping} className={fieldClass} />
          </label>
          <label className="block text-sm text-[#f0dfbf]">
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required={needsShipping} className={fieldClass} />
          </label>
          <label className="block text-sm text-[#f0dfbf]">
            Phone <span className="font-normal text-[#be9a62]">(optional)</span>
            <input value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" autoComplete="tel" className={fieldClass} />
          </label>
          {needsShipping ? (
            <>
              <label className="block text-sm text-[#f0dfbf]">
                Street address
                <input value={address1} onChange={(event) => setAddress1(event.target.value)} autoComplete="address-line1" required className={fieldClass} />
              </label>
              <label className="block text-sm text-[#f0dfbf]">
                Apt or suite <span className="font-normal text-[#be9a62]">(optional)</span>
                <input value={address2} onChange={(event) => setAddress2(event.target.value)} autoComplete="address-line2" className={fieldClass} />
              </label>
              <label className="block text-sm text-[#f0dfbf]">
                City
                <input value={city} onChange={(event) => setCity(event.target.value)} autoComplete="address-level2" required className={fieldClass} />
              </label>
              <label className="block text-sm text-[#f0dfbf]">
                State
                <input value={stateCode} onChange={(event) => setStateCode(event.target.value.toUpperCase())} autoComplete="address-level1" maxLength={2} required placeholder="NH" className={fieldClass} />
              </label>
              <label className="block text-sm text-[#f0dfbf]">
                ZIP code
                <input value={zip} onChange={(event) => setZip(event.target.value)} autoComplete="postal-code" inputMode="numeric" required pattern="[0-9]{5}" className={fieldClass} />
              </label>
              <p className="text-sm text-[#dbc8a7]">Country: United States. Free US shipping.</p>
            </>
          ) : null}
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
