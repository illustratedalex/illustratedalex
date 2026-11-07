/** Live Square SANDBOX + dedicated Printful test-store draft smoke test. Never use production credentials. */
import assert from 'node:assert/strict';
import { closeCheckoutStore } from '../server/checkout-store.ts';
import { handleSquareCheckout } from '../server/square-checkout-handler.ts';

async function main() {
  if (process.env.SQUARE_ENVIRONMENT !== 'sandbox') throw Error('Sandbox environment is required.');
  for (const key of ['SQUARE_ACCESS_TOKEN','SQUARE_LOCATION_ID','SQUARE_SANDBOX_VARIATION_IDS_JSON','PRINTFUL_SANDBOX_API_TOKEN',
    'PRINTFUL_SANDBOX_STORE_ID','CHECKOUT_DATABASE_URL','CHECKOUT_ALERT_WEBHOOK_URL','CRON_SECRET']) {
    if (!process.env[key]) throw Error(`Missing sandbox configuration: ${key}`);
  }
  if (process.env.PRINTFUL_SANDBOX_STORE_ID === process.env.PRINTFUL_STORE_ID) throw Error('Use a separate Printful test store.');
  if (process.env.PRINTFUL_AUTO_CONFIRM === 'true') throw Error('Keep automatic confirmation disabled.');
  const idempotencyKey = crypto.randomUUID();
  const shipping = JSON.parse(process.env.SANDBOX_SHIPPING_JSON || '{}');
  const body = { idempotencyKey, sourceId: 'cnon:card-nonce-ok', shipping,
    items: [{ sku: 'IA-MERCH-MUG', variantId: '11oz', quantity: 1 }] };
  const request = () => new Request('http://localhost/api/shop/checkout', { method: 'POST', body: JSON.stringify(body) });
  const first = await handleSquareCheckout(request()); const result = await first.json();
  assert.equal(first.status, 200); assert.equal(result.status, 'COMPLETED'); assert.equal(result.fulfillment, 'draft');
  const retry = await handleSquareCheckout(request()); const replay = await retry.json();
  assert.equal(replay.paymentId, result.paymentId); assert.equal(replay.orderId, result.orderId);
  console.log(JSON.stringify({ sandbox: true, paymentId: result.paymentId, orderId: result.orderId, fulfillment: result.fulfillment, replayMatched: true }));
}
main().catch(error => { console.error(error instanceof Error ? error.message : 'Sandbox validation failed'); process.exitCode = 1; }).finally(closeCheckoutStore);
