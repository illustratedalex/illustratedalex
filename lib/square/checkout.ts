export type CheckoutLine = {
  squareCatalogVariationId: string | null;
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
  variants: { id: string; squareCatalogVariationId: string | null }[];
};

export type CatalogOrderLine = {
  catalog_object_id: string;
  quantity: string;
};

export type LineResolution =
  | { ok: true; lines: CatalogOrderLine[] }
  | { ok: false; status: number; error: string };

export function resolveCatalogLines(items: CheckoutItemInput[], catalog: CatalogLineSource[]): LineResolution {
  if (!Array.isArray(items) || items.length === 0) {
    return { ok: false, status: 400, error: "Cart is empty." };
  }
  if (items.length > 30) {
    return { ok: false, status: 400, error: "Cart is too large." };
  }

  const lines: CatalogOrderLine[] = [];
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
  }

  return { ok: true, lines };
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
}) {
  const name = cleanContact(input.pickup?.displayName, 255);
  const email = cleanContact(input.pickup?.email, 255);
  const phone = pickupPhone(input.pickup?.phone);
  const validEmail = email.includes("@") && !email.includes(" ") ? email : "";
  const order: {
    location_id: string;
    reference_id: string;
    line_items: CatalogOrderLine[];
    buyer_email_address?: string;
    fulfillments?: {
      type: "PICKUP";
      state: "PROPOSED";
      pickup_details: {
        recipient: { display_name: string; email_address?: string; phone_number?: string };
        schedule_type: "ASAP";
        prep_time_duration: "PT30M";
        note: string;
      };
    }[];
  } = {
    location_id: input.locationId,
    reference_id: "illustratedalex-shop",
    line_items: input.lines,
  };
  if (validEmail) order.buyer_email_address = validEmail;
  if (name) {
    const recipient: { display_name: string; email_address?: string; phone_number?: string } = { display_name: name };
    if (validEmail) recipient.email_address = validEmail;
    if (phone) recipient.phone_number = phone;
    order.fulfillments = [
      {
        type: "PICKUP",
        state: "PROPOSED",
        pickup_details: {
          recipient,
          schedule_type: "ASAP",
          prep_time_duration: "PT30M",
          note: "Pickup at 18 Opera House Square, Claremont, NH.",
        },
      },
    ];
  }
  return {
    idempotency_key: input.idempotencyKey,
    order,
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
