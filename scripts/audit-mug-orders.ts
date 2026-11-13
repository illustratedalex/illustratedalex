/** Read-only by default. --import=ORDER_ID records one verified paid legacy order for recovery; never charges or confirms. */
import { createHash } from 'node:crypto';
import { products } from '../data/catalog.ts';
import { checkoutStore, closeCheckoutStore, type CheckoutRecord } from '../server/checkout-store.ts';
import { squareRequest } from '../server/checkout-workflow.ts';
import { printfulConfig } from '../lib/printful.ts';
import { validateUsShipping, type ShippedCheckoutLine } from '../lib/square/checkout.ts';

export async function auditMugOrders() {
  const environment = process.env.SQUARE_ENVIRONMENT;
  const pf = printfulConfig();
  if (!['production', 'sandbox'].includes(environment ?? '') || !process.env.SQUARE_ACCESS_TOKEN || !process.env.SQUARE_LOCATION_ID || !pf.token || !pf.store) {
    throw Error('Read-only audit requires server-side Square and Printful credentials for the selected environment. No secrets are printed.');
  }
  const importId = process.argv.find(arg => arg.startsWith('--import='))?.slice(9);
  if (importId && process.env.PRINTFUL_AUTO_CONFIRM === 'true') throw Error('Disable automatic confirmation before importing recovery orders.');
  const begin = process.env.AUDIT_BEGIN_TIME || '2026-11-06T05:00:00Z';
  let cursor: string | undefined; let inspected = 0; let mugs = 0; let imported = false;
  do {
    const params = new URLSearchParams({ begin_time: begin, location_id: process.env.SQUARE_LOCATION_ID!, limit: '100' });
    if (cursor) params.set('cursor', cursor);
    const payments = await squareRequest(`/v2/payments?${params}`);
    if (!payments.response.ok || !Array.isArray(payments.payload?.payments)) throw Error('Square payment listing could not be verified.');
    for (const payment of payments.payload.payments) {
      inspected++;
      if (payment.status !== 'COMPLETED' || !payment.order_id) continue;
      const result = await squareRequest(`/v2/orders/${encodeURIComponent(payment.order_id)}`);
      if (!result.response.ok) throw Error('Square order retrieval failed; audit incomplete.');
      const order = result.payload?.order;
      if (order?.reference_id !== 'illustratedalex-shop') continue;
      const shipped: ShippedCheckoutLine[] = [];
      for (const line of order.line_items ?? []) {
        const match = products.filter(p => p.fulfillment === 'printful-shipped').flatMap(p => p.variants).find(v => v.squareCatalogVariationId === line.catalog_object_id);
        if (!match?.printfulSyncVariantId) continue;
        const quantity = Number(line.quantity);
        if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) throw Error('Unexpected historical quantity; manual review required.');
        shipped.push({ syncVariantId: match.printfulSyncVariantId, quantity, retailPrice: ((match.priceCents ?? 0) / 100).toFixed(2) });
      }
      if (!shipped.length) continue;
      mugs++;
      const response = await fetch(`https://api.printful.com/orders/@${encodeURIComponent(order.id)}`, {
        headers: { Authorization: `Bearer ${pf.token}`, 'X-PF-Store-Id': pf.store! }, signal: AbortSignal.timeout(10000),
      });
      const data = await response.json().catch(() => null);
      if ((!response.ok && response.status !== 404) || (response.ok && data?.result?.external_id !== order.id)) throw Error('Printful lookup failed; absence is not established.');
      const recipient = order.fulfillments?.find((f: { type?: string }) => f.type === 'SHIPMENT')?.shipment_details?.recipient;
      const address = recipient?.address;
      const shipping = validateUsShipping({ name: recipient?.display_name, email: recipient?.email_address,
        phone: recipient?.phone_number, address1: address?.address_line_1, address2: address?.address_line_2,
        city: address?.locality, stateCode: address?.administrative_district_level_1, zip: address?.postal_code, country: address?.country });
      const recoverable = shipping.ok && payment.amount_money?.amount === order.total_money?.amount &&
        payment.amount_money?.currency === order.total_money?.currency && !(Number(payment.refunded_money?.amount ?? 0) > 0);
      if (importId === order.id && recoverable && shipping.ok) {
        const key = `legacy-${createHash('sha256').update(order.id).digest('hex').slice(0,32)}`;
        const importedRecord = await checkoutStore.locked(environment!, key, async session => {
          if (await session.get()) return true;
          const record: CheckoutRecord = { key, environment: environment!, fingerprint: 'legacy-import', orderRequest: null,
            orderId: order.id, amount: order.total_money.amount, currency: order.total_money.currency,
            paymentId: payment.id, state: 'paid', shipment: { externalId: order.id, shipping: shipping.shipping, items: shipped },
            fulfillment: 'pending', printfulId: data?.result?.id, attempts: 0, alert: 'legacy_order_imported_for_review' };
          await session.save(record); return true;
        });
        imported = importedRecord === true;
      }
      console.log(JSON.stringify({ orderId: order.id, paymentId: payment.id, printful: response.status === 404 ? 'missing' : data.result.status,
        printfulId: data?.result?.id, recoverable, imported: importId === order.id && imported }));
    }
    cursor = payments.payload.cursor;
  } while (cursor);
  if (importId && !imported) throw Error('Requested legacy order was not imported.');
  console.log(JSON.stringify({ inspected, mugPayments: mugs, complete: true }));
}
if (process.argv[1]?.endsWith('audit-mug-orders.ts')) auditMugOrders().catch(() => {
  console.error('Order audit could not complete. Check server credentials and provider access; no credentials or customer details were printed.'); process.exitCode = 1;
}).finally(closeCheckoutStore);
