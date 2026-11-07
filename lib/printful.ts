import type { NormalizedShipping, ShippedCheckoutLine } from "./square/checkout.ts";

export function printfulOrdersUrl() {
  return printfulConfig().confirm ? "https://api.printful.com/orders?confirm=1" : "https://api.printful.com/orders";
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

export function printfulConfig() {
  const sandbox = process.env.SQUARE_ENVIRONMENT === "sandbox";
  return {
    token: sandbox ? process.env.PRINTFUL_SANDBOX_API_TOKEN : process.env.PRINTFUL_API_TOKEN,
    store: sandbox ? process.env.PRINTFUL_SANDBOX_STORE_ID : process.env.PRINTFUL_STORE_ID,
    confirm: !sandbox && process.env.PRINTFUL_AUTO_CONFIRM === "true",
  };
}

type PrintfulResult = { id: number; status: string; external_id?: string };
export async function submitPrintfulOrder(input: { externalId: string; shipping: NormalizedShipping; items: ShippedCheckoutLine[] }, existingOnly = false) {
  const config = printfulConfig();
  if (!config.token || !config.store || input.items.length === 0) return { ok: false as const, reason: "configuration_missing" };
  const headers = { Authorization: `Bearer ${config.token}`, "Content-Type": "application/json", "X-PF-Store-Id": config.store };
  const lookup = async () => {
    const response = await fetch(`https://api.printful.com/orders/@${encodeURIComponent(input.externalId)}`, {
      headers, signal: AbortSignal.timeout(10000), cache: "no-store",
    });
    const payload = await response.json().catch(() => null) as { result?: PrintfulResult } | null;
    return { response, result: payload?.result };
  };
  const valid = (value: PrintfulResult | undefined): value is PrintfulResult =>
    Number.isInteger(value?.id) && typeof value?.status === "string" && value.external_id === input.externalId;
  try {
    const existing = await lookup();
    if (existing.response.ok) return valid(existing.result)
      ? { ok: true as const, ...existing.result }
      : { ok: false as const, reason: "invalid_response" };
    // A failed lookup is never permission to submit a second order.
    if (existing.response.status !== 404) return { ok: false as const, reason: "lookup_failed" };
    if (existingOnly) return { ok: false as const, reason: "existing_order_missing" };
    const response = await fetch(`https://api.printful.com/orders${config.confirm ? "?confirm=1" : ""}`, {
      method: "POST", headers, body: JSON.stringify(buildPrintfulOrder(input)), signal: AbortSignal.timeout(10000),
    });
    const payload = await response.json().catch(() => null) as { result?: PrintfulResult } | null;
    if (response.ok && valid(payload?.result)) return { ok: true as const, ...payload.result };
    // Duplicate external_id, timeout-after-create, or a malformed response: next attempt reconciles by external ID.
    return { ok: false as const, reason: "submission_unverified" };
  } catch {
    return { ok: false as const, reason: "provider_unavailable" };
  }
}
