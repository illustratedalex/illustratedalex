import { createHash } from 'node:crypto';
import { products } from '../data/catalog.ts';
import { printfulConfig } from '../lib/printful.ts';
import { assertCheckoutServer, buildCatalogOrderRequest, isIdempotencyKey, resolveCatalogLines, validateUsShipping,
  type CheckoutItemInput, type PickupContact, type ShippingAddress } from '../lib/square/checkout.ts';
import { checkoutStore, type CheckoutStore, type CheckoutRecord } from './checkout-store.ts';
import { charge, checkoutResponse, notify, recover } from './checkout-workflow.ts';

export async function handleSquareCheckout(request: Request, store: CheckoutStore = checkoutStore): Promise<Response> {
  const environment = process.env.SQUARE_ENVIRONMENT;
  const gate = assertCheckoutServer({ environment, accessToken: process.env.SQUARE_ACCESS_TOKEN, locationId: process.env.SQUARE_LOCATION_ID });
  if (!gate.ok) return Response.json({ error: gate.error }, { status: gate.status });
  // Shared production credentials on a Vercel preview must never charge customers.
  if (process.env.VERCEL_ENV === 'preview' && environment !== 'sandbox') return Response.json({ error: 'Preview requires Square sandbox.' }, { status: 503 });
  const body = await request.json().catch(() => null) as {
    idempotencyKey?: unknown; sourceId?: unknown; items?: CheckoutItemInput[]; pickup?: PickupContact; shipping?: ShippingAddress;
  } | null;
  if (!body || !isIdempotencyKey(body.idempotencyKey)) return Response.json({ error: 'A valid checkout key is required.' }, { status: 400 });
  if (typeof body.sourceId !== 'string' || body.sourceId.length < 4 || body.sourceId.length > 200) return Response.json({ error: 'Card token is missing.' }, { status: 400 });
  try {
    let catalog = products;
    if (environment === 'sandbox') {
      // Sandbox catalog IDs belong to a different Square account; never reuse production variations.
      const mapping = JSON.parse(process.env.SQUARE_SANDBOX_VARIATION_IDS_JSON || '{}') as Record<string, string>;
      catalog = products.map(product => ({ ...product, variants: product.variants.map(variant => ({ ...variant,
        squareCatalogVariationId: mapping[`${product.sku}:${variant.id}`] || null,
      })) }));
    }
    const resolved = resolveCatalogLines(body.items ?? [], catalog);
    if (!resolved.ok) return Response.json({ error: resolved.error }, { status: resolved.status });
    const shipping = resolved.shipped.length ? validateUsShipping(body.shipping) : null;
    if (shipping && !shipping.ok) return Response.json({ error: shipping.error }, { status: 400 });
    const orderRequest = buildCatalogOrderRequest({ locationId: process.env.SQUARE_LOCATION_ID!, idempotencyKey: body.idempotencyKey,
      lines: resolved.lines, pickup: resolved.hasStudioPickup ? body.pickup : undefined, shipment: shipping?.ok ? shipping.shipping : undefined });
    const fingerprint = createHash('sha256').update(JSON.stringify(orderRequest)).digest('hex');
    const response = await store.locked(environment!, body.idempotencyKey, async session => {
      let record = await session.get();
      if (record) {
        if (record.fingerprint !== fingerprint) return Response.json({ error: 'This checkout is already recorded with different details. Contact the studio; do not pay again.' }, { status: 409 });
        if (record.state !== 'created') {
          try { await recover(record, session); } catch { await notify(record, session); }
          return checkoutResponse(record);
        }
      }
      // Durable store, monitored alert destination, and fulfillment config must exist BEFORE payment.
      const pf = printfulConfig();
      if (!process.env.CHECKOUT_ALERT_WEBHOOK_URL?.startsWith('https://') || !process.env.CRON_SECRET || (resolved.shipped.length && (!pf.token || !pf.store))) {
        return Response.json({ error: 'Checkout is temporarily unavailable. Please contact the studio.' }, { status: 503 });
      }
      record ??= { key: body.idempotencyKey as string, environment: environment!, fingerprint, orderRequest,
        shipment: shipping?.ok ? { externalId: '', shipping: shipping.shipping, items: resolved.shipped } : null,
        state: 'created', attempts: 0 } satisfies CheckoutRecord;
      await session.save(record);
      try { await charge(record, body.sourceId as string, session); }
      catch {
        // Do not turn an uncertain payment into an invitation to pay again.
        record.alert ??= 'checkout_interrupted';
        try { await session.save(record); await notify(record, session); } catch { /* durable pre-payment record remains */ }
        if (record.state === 'created') return Response.json({ error: 'Checkout unavailable before payment. Retry this same checkout.' }, { status: 503 });
      }
      return checkoutResponse(record);
    });
    return response ?? Response.json({ error: 'This checkout is processing. Retry this same checkout; do not start a new one.' }, { status: 409 });
  } catch {
    return Response.json({ error: 'Checkout could not be verified. Retry this same checkout; do not pay with a new checkout.' }, { status: 503 });
  }
}
