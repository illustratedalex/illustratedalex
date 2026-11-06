import { products } from "../data/catalog.ts";
import {
  assertCheckoutServer,
  buildCatalogOrderRequest,
  isIdempotencyKey,
  resolveCatalogLines,
  squareConnectOrigin,
  type CheckoutItemInput,
  type PickupContact,
} from "../lib/square/checkout.ts";

const SQUARE_VERSION = "2025-01-23";

type SquareMoney = { amount?: number; currency?: string };
type SquareOrder = { id?: string; total_money?: SquareMoney };
type SquareErrorBody = { errors?: { detail?: string; code?: string }[] };

function serverEnv() {
  return {
    environment: process.env.SQUARE_ENVIRONMENT,
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    locationId: process.env.SQUARE_LOCATION_ID,
  };
}

async function squarePost(path: string, accessToken: string, body: unknown) {
  const response = await fetch(`${squareConnectOrigin(process.env.SQUARE_ENVIRONMENT)}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Square-Version": SQUARE_VERSION,
    },
    body: JSON.stringify(body),
  });
  const payload = (await response.json().catch(() => null)) as (SquareErrorBody & { order?: SquareOrder; payment?: { id?: string; status?: string; receipt_url?: string } }) | null;
  return { response, payload };
}

function squareErrorMessage(payload: SquareErrorBody | null, fallback: string) {
  const detail = payload?.errors?.find((error) => typeof error.detail === "string")?.detail;
  return detail || fallback;
}

/**
 * Creates a Square Order from Catalog variation ids, then pays that order.
 * Sandbox and production both use Catalog variation ids. Payment-only amounts are refused.
 * The payment amount is the order total Square calculated, never a client price.
 *
 * Mounted at app/api/shop/checkout on Vercel. The GoDaddy static export stashes app/api.
 * scripts/square-sandbox-server.ts can still serve the same handler locally.
 */
export async function handleSquareCheckout(request: Request): Promise<Response> {
  const gate = assertCheckoutServer(serverEnv());
  if (!gate.ok) {
    return Response.json({ error: gate.error }, { status: gate.status });
  }

  const body = (await request.json().catch(() => null)) as {
    idempotencyKey?: unknown;
    sourceId?: unknown;
    items?: CheckoutItemInput[];
    pickup?: PickupContact;
  } | null;

  if (!body || !isIdempotencyKey(body.idempotencyKey)) {
    return Response.json({ error: "A valid idempotency key is required." }, { status: 400 });
  }
  if (typeof body.sourceId !== "string" || body.sourceId.length < 4 || body.sourceId.length > 200) {
    return Response.json({ error: "Card token is missing." }, { status: 400 });
  }

  const resolved = resolveCatalogLines(body.items ?? [], products);
  if (!resolved.ok) {
    return Response.json({ error: resolved.error }, { status: resolved.status });
  }

  const accessToken = process.env.SQUARE_ACCESS_TOKEN as string;
  const locationId = process.env.SQUARE_LOCATION_ID as string;
  const orderRequest = buildCatalogOrderRequest({
    locationId,
    idempotencyKey: body.idempotencyKey,
    lines: resolved.lines,
    pickup: body.pickup,
  });

  const created = await squarePost("/v2/orders", accessToken, orderRequest);
  const order = created.payload?.order;
  if (!created.response.ok || !order?.id || !order.total_money || typeof order.total_money.amount !== "number") {
    return Response.json(
      { error: squareErrorMessage(created.payload, "Square could not create the order.") },
      { status: created.response.ok ? 502 : created.response.status },
    );
  }

  const paymentKey = `${body.idempotencyKey.slice(0, 36)}-pay`.slice(0, 45);
  const paid = await squarePost("/v2/payments", accessToken, {
    source_id: body.sourceId,
    idempotency_key: paymentKey,
    amount_money: {
      amount: order.total_money.amount,
      currency: order.total_money.currency || "USD",
    },
    order_id: order.id,
    location_id: locationId,
    autocomplete: true,
  });

  if (!paid.response.ok) {
    return Response.json(
      { error: squareErrorMessage(paid.payload, "Square could not take the payment."), orderId: order.id },
      { status: paid.response.status },
    );
  }

  return Response.json({
    orderId: order.id,
    paymentId: paid.payload?.payment?.id ?? null,
    status: paid.payload?.payment?.status ?? "COMPLETED",
    receiptUrl: paid.payload?.payment?.receipt_url ?? null,
  });
}
