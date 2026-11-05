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

const PENDING_CREDENTIALS = "Checkout pending Square credentials.";
const PENDING_CATALOG =
  "Checkout pending Square Catalog links. Payment-only charges are disabled, so a card is not run unless every line has a catalog variation id.";

export function decideCheckout(input: CheckoutEnvironment): CheckoutDecision {
  if (input.environment === "production") {
    return { ready: false, reason: "Production charges are disabled." };
  }

  const sandboxReady =
    input.environment === "sandbox" &&
    Boolean(input.applicationId) &&
    Boolean(input.locationId) &&
    Boolean(input.checkoutUrl);

  if (!sandboxReady) {
    return { ready: false, reason: PENDING_CREDENTIALS };
  }

  if (input.lines.length === 0) {
    return { ready: false, reason: "Your cart is empty." };
  }

  if (input.lines.some((line) => !line.squareCatalogVariationId)) {
    return { ready: false, reason: PENDING_CATALOG };
  }

  return {
    ready: true,
    reason: "Sandbox checkout is ready. Square prices the order from Catalog variations, not from a typed-in amount.",
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
        error: "This piece is not linked to a Square Catalog variation yet. Checkout will not run a payment-only charge.",
      };
    }
    lines.push({
      catalog_object_id: variant.squareCatalogVariationId,
      quantity: String(item.quantity),
    });
  }

  return { ok: true, lines };
}

export function buildCatalogOrderRequest(input: {
  locationId: string;
  idempotencyKey: string;
  lines: CatalogOrderLine[];
}) {
  return {
    idempotency_key: input.idempotencyKey,
    order: {
      location_id: input.locationId,
      reference_id: "illustratedalex-shop",
      line_items: input.lines,
    },
  };
}

export function assertSandboxServer(env: {
  environment: string | undefined;
  accessToken: string | undefined;
  locationId: string | undefined;
}): { ok: true } | { ok: false; status: number; error: string } {
  if (env.environment !== "sandbox") {
    return {
      ok: false,
      status: 403,
      error: "Production charges are disabled. Set SQUARE_ENVIRONMENT=sandbox to test.",
    };
  }
  if (!env.accessToken || !env.locationId) {
    return { ok: false, status: 503, error: "Checkout pending Square credentials." };
  }
  return { ok: true };
}

const IDEMPOTENCY = /^[A-Za-z0-9_-]{8,45}$/;

export function isIdempotencyKey(value: unknown): value is string {
  return typeof value === "string" && IDEMPOTENCY.test(value);
}
