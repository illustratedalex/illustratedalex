export type CheckoutLine = {
  squareCatalogVariationId: string | null;
  fulfillment?: string;
};

export type CheckoutEnvironment = {
  environment: string | undefined;
  applicationId: string | undefined;
  locationId: string | undefined;
  checkoutUrl: string | undefined;
  lines: CheckoutLine[];
};

export type CheckoutDecision = {
  ready: boolean;
  reason: string;
};

export const STUDIO_HOLD_MESSAGE =
  "Available for in-studio pickup at 18 Opera House Square, Claremont, NH — call (603) 843-7005 to hold an item while online checkout finishes linking.";

const LIVE_ENVIRONMENTS = new Set(["production", "sandbox"]);

export function decideCheckout(input: CheckoutEnvironment): CheckoutDecision {
  const configured =
    LIVE_ENVIRONMENTS.has(input.environment ?? "") &&
    Boolean(input.applicationId) &&
    Boolean(input.locationId) &&
    Boolean(input.checkoutUrl);

  if (!configured) {
    return { ready: false, reason: STUDIO_HOLD_MESSAGE };
  }

  if (input.lines.length === 0) {
    return { ready: false, reason: "Your cart is empty." };
  }

  if (input.lines.some((line) => !line.squareCatalogVariationId)) {
    return { ready: false, reason: STUDIO_HOLD_MESSAGE };
  }

  const hasShipped = input.lines.some((line) => line.fulfillment === "printful-shipped");
  const hasStudioPickup = input.lines.some((line) => line.fulfillment !== "printful-shipped");
  if (hasShipped && hasStudioPickup) {
    return {
      ready: true,
      reason: "The mug ships free in the US. Jewelry and aftercare are held for pickup at 18 Opera House Square, Claremont, NH.",
    };
  }
  if (hasShipped) {
    return { ready: true, reason: "Made to order. Free US shipping." };
  }

  return {
    ready: true,
    reason: "Pay here for studio pickup at 18 Opera House Square, Claremont, NH.",
  };
}

export type CheckoutItemInput = {
  sku: string;
  variantId: string;
  quantity: number;
};

export type CatalogLineSource = {
  sku: string;
  fulfillment?: string;
  priceCents?: number | null;
  variants: { id: string; squareCatalogVariationId: string | null; printfulSyncVariantId?: number; priceCents?: number }[];
};

export type CatalogOrderLine = {
  catalog_object_id: string;
  quantity: string;
};

export type ShippedCheckoutLine = {
  syncVariantId: number;
  quantity: number;
  retailPrice: string;
};

export type LineResolution =
  | { ok: true; lines: CatalogOrderLine[]; shipped: ShippedCheckoutLine[]; hasStudioPickup: boolean }
  | { ok: false; status: number; error: string };

export function resolveCatalogLines(items: CheckoutItemInput[], catalog: CatalogLineSource[]): LineResolution {
  if (!Array.isArray(items) || items.length === 0) {
    return { ok: false, status: 400, error: "Cart is empty." };
  }
  if (items.length > 30) {
    return { ok: false, status: 400, error: "Cart is too large." };
  }

  const lines: CatalogOrderLine[] = [];
  const shipped: ShippedCheckoutLine[] = [];
  let hasStudioPickup = false;
  for (const item of items) {
    if (!item || typeof item.sku !== "string" || typeof item.variantId !== "string") {
      return { ok: false, status: 400, error: "Each line needs a SKU and a variant." };
    }
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20) {
      return { ok: false, status: 400, error: "Quantity must be a whole number from 1 to 20." };
    }
    const product = catalog.find((entry) => entry.sku === item.sku);
    const variant = product?.variants.find((entry) => entry.id === item.variantId);
    if (!product || !variant) {
      return { ok: false, status: 400, error: "Unknown item." };
    }
    if (!variant.squareCatalogVariationId) {
      return {
        ok: false,
        status: 409,
        error: STUDIO_HOLD_MESSAGE,
      };
    }
    lines.push({
      catalog_object_id: variant.squareCatalogVariationId,
      quantity: String(item.quantity),
    });
    if (product.fulfillment === "printful-shipped") {
      if (!variant.printfulSyncVariantId) {
        return { ok: false, status: 409, error: "This mug is not ready to ship yet. Call (603) 843-7005 and the studio can help." };
      }
      const cents = variant.priceCents ?? product.priceCents ?? null;
      shipped.push({
        syncVariantId: variant.printfulSyncVariantId,
        quantity: item.quantity,
        retailPrice: typeof cents === "number" ? (cents / 100).toFixed(2) : "0.00",
      });
    } else if (product.fulfillment === "square-catalog" || product.fulfillment === "aftercare-later") {
      hasStudioPickup = true;
    }
  }

  return { ok: true, lines, shipped, hasStudioPickup };
}

export type ShippingAddress = {
  name?: string;
  email?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  stateCode?: string;
  zip?: string;
  country?: string;
};

export type NormalizedShipping = {
  name: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  stateCode: string;
  zip: string;
  country: "US";
};

const US_STATES = new Set([
  "AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
]);

export function validateUsShipping(input: ShippingAddress | undefined): { ok: true; shipping: NormalizedShipping } | { ok: false; status: 400; error: string } {
  const name = cleanContact(input?.name, 255);
  const email = cleanContact(input?.email, 255);
  const address1 = cleanContact(input?.address1, 255);
  const address2 = cleanContact(input?.address2, 255);
  const city = cleanContact(input?.city, 255);
  const stateCode = cleanContact(input?.stateCode, 2).toUpperCase();
  const zip = cleanContact(input?.zip, 10);
  const country = cleanContact(input?.country, 2).toUpperCase() || "US";
  if (!name) return { ok: false, status: 400, error: "Enter the name for the shipping address." };
  if (!email.includes("@") || email.includes(" ")) return { ok: false, status: 400, error: "Enter an email for the shipping address." };
  if (!address1) return { ok: false, status: 400, error: "Enter a street address." };
  if (!city) return { ok: false, status: 400, error: "Enter a city." };
  if (!US_STATES.has(stateCode)) return { ok: false, status: 400, error: "Choose a US state." };
  if (!/^\d{5}$/.test(zip)) return { ok: false, status: 400, error: "Enter a 5-digit US ZIP code." };
  if (country !== "US") return { ok: false, status: 400, error: "Mugs ship free in the US only." };
  return {
    ok: true,
    shipping: {
      name,
      email,
      phone: pickupPhone(input?.phone),
      address1,
      address2,
      city,
      stateCode,
      zip,
      country: "US",
    },
  };
}

export type PickupContact = {
  displayName?: string;
  email?: string;
  phone?: string;
};

function cleanContact(value: string | undefined, max: number) {
  const trimmed = value?.trim() ?? "";
  return trimmed ? trimmed.slice(0, max) : "";
}

function pickupPhone(value: string | undefined) {
  const digits = (value ?? "").replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return "";
}

export function buildCatalogOrderRequest(input: {
  locationId: string;
  idempotencyKey: string;
  lines: CatalogOrderLine[];
  pickup?: PickupContact;
  shipment?: NormalizedShipping;
}) {
  const name = cleanContact(input.pickup?.displayName, 255);
  const email = cleanContact(input.pickup?.email, 255);
  const phone = pickupPhone(input.pickup?.phone);
  const validEmail = email.includes("@") && !email.includes(" ") ? email : "";
  const fulfillments: Record<string, unknown>[] = [];
  if (name) {
    const recipient: { display_name: string; email_address?: string; phone_number?: string } = { display_name: name };
    if (validEmail) recipient.email_address = validEmail;
    if (phone) recipient.phone_number = phone;
    fulfillments.push({
      type: "PICKUP",
      state: "PROPOSED",
      pickup_details: {
        recipient,
        schedule_type: "ASAP",
        prep_time_duration: "PT30M",
        note: "Pickup at 18 Opera House Square, Claremont, NH.",
      },
    });
  }
  if (input.shipment) {
    const recipient: Record<string, unknown> = {
      display_name: input.shipment.name,
      email_address: input.shipment.email,
      address: {
        address_line_1: input.shipment.address1,
        ...(input.shipment.address2 ? { address_line_2: input.shipment.address2 } : {}),
        locality: input.shipment.city,
        administrative_district_level_1: input.shipment.stateCode,
        postal_code: input.shipment.zip,
        country: "US",
      },
    };
    if (input.shipment.phone) recipient.phone_number = input.shipment.phone;
    fulfillments.push({
      type: "SHIPMENT",
      state: "PROPOSED",
      shipment_details: {
        recipient,
        shipping_note: "Free US shipping. Made to order.",
      },
    });
  }
  const buyerEmail = input.shipment?.email || validEmail;
  return {
    idempotency_key: input.idempotencyKey,
    order: {
      location_id: input.locationId,
      reference_id: "illustratedalex-shop",
      line_items: input.lines,
      ...(buyerEmail ? { buyer_email_address: buyerEmail } : {}),
      ...(fulfillments.length > 0 ? { fulfillments } : {}),
    },
  };
}

export function squareConnectOrigin(environment: string | undefined) {
  return environment === "production" ? "https://connect.squareup.com" : "https://connect.squareupsandbox.com";
}

export function assertCheckoutServer(env: {
  environment: string | undefined;
  accessToken: string | undefined;
  locationId: string | undefined;
}): { ok: true } | { ok: false; status: number; error: string } {
  if (env.environment !== "sandbox" && env.environment !== "production") {
    return { ok: false, status: 503, error: STUDIO_HOLD_MESSAGE };
  }
  if (!env.accessToken || !env.locationId) {
    return { ok: false, status: 503, error: STUDIO_HOLD_MESSAGE };
  }
  return { ok: true };
}

const IDEMPOTENCY = /^[A-Za-z0-9_-]{8,45}$/;

export function isIdempotencyKey(value: unknown): value is string {
  return typeof value === "string" && IDEMPOTENCY.test(value);
}
