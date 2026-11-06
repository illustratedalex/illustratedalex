import type { NormalizedShipping, ShippedCheckoutLine } from "./square/checkout.ts";

export function printfulOrdersUrl() {
  return process.env.PRINTFUL_AUTO_CONFIRM === "true" ? "https://api.printful.com/orders?confirm=1" : "https://api.printful.com/orders";
}

export function buildPrintfulOrder(input: { externalId: string; shipping: NormalizedShipping; items: ShippedCheckoutLine[] }) {
  const recipient: Record<string, string> = {
    name: input.shipping.name,
    address1: input.shipping.address1,
    city: input.shipping.city,
    state_code: input.shipping.stateCode,
    country_code: "US",
    zip: input.shipping.zip,
    email: input.shipping.email,
  };
  if (input.shipping.address2) recipient.address2 = input.shipping.address2;
  if (input.shipping.phone) recipient.phone = input.shipping.phone;
  return {
    external_id: input.externalId,
    recipient,
    items: input.items.map((item) => ({
      sync_variant_id: item.syncVariantId,
      quantity: item.quantity,
      retail_price: item.retailPrice,
    })),
  };
}

export async function submitPrintfulOrder(input: { externalId: string; shipping: NormalizedShipping; items: ShippedCheckoutLine[] }) {
  const token = process.env.PRINTFUL_API_TOKEN;
  if (!token || input.items.length === 0) return { skipped: true as const };
  const url = printfulOrdersUrl();
  const body = JSON.stringify(buildPrintfulOrder(input));
  const post = (withStore: boolean) =>
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...(withStore && process.env.PRINTFUL_STORE_ID ? { "X-PF-Store-Id": process.env.PRINTFUL_STORE_ID } : {}),
      },
      body,
    });
  try {
    let response = await post(false);
    if ((response.status === 400 || response.status === 403) && process.env.PRINTFUL_STORE_ID) {
      response = await post(true);
    }
    const payload = (await response.json().catch(() => null)) as { result?: { id?: number; status?: string } } | null;
    if (!response.ok) {
      console.error("Printful order was not created", response.status);
      return { ok: false as const };
    }
    return { ok: true as const, id: payload?.result?.id ?? null, status: payload?.result?.status ?? null };
  } catch (error) {
    console.error("Printful order was not created", error);
    return { ok: false as const };
  }
}
