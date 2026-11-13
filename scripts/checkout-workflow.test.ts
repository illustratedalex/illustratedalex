import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { handleSquareCheckout } from '../server/square-checkout-handler.ts';
import { recover, paymentKey } from '../server/checkout-workflow.ts';
import type { CheckoutStore, CheckoutRecord, CheckoutSession } from '../server/checkout-store.ts';

class MemoryStore implements CheckoutStore {
  records = new Map<string, CheckoutRecord>(); busy = new Set<string>(); failSave = 0; saves = 0;
  async locked<T>(env: string, key: string, run: (s: CheckoutSession) => Promise<T>) {
    const id = `${env}:${key}`;
    if (this.busy.has(id)) return null;
    this.busy.add(id);
    try { return await run({ get: async () => structuredClone(this.records.get(id) ?? null), save: async r => {
      this.saves++; if (this.saves === this.failSave) throw Error('storage down');
      this.records.set(id, structuredClone(r));
    } }); } finally { this.busy.delete(id); }
  }
  async pending() { return [...this.records.values()].map(r => r.key); }
}
let savedEnv: NodeJS.ProcessEnv; let originalFetch: typeof fetch;
let store: MemoryStore; let charges: number; let creates: number; let alerts: number;
let printfulExists: boolean; let printfulDown: boolean; let paymentTimeout: boolean;
let printfulTimeout: boolean; let alertDown: boolean; let paymentStatus: string;
let printfulStatus: string; let refunded: number; let lookupsDown: boolean;
const shipping = { name: 'Sandbox Test', email: 'test@example.com', address1: '18 Opera House Square', city: 'Claremont', stateCode: 'NH', zip: '03743', country: 'US' };
const items = [{ sku: 'IA-MERCH-MUG', variantId: '11oz', quantity: 1 }];
function req(key = 'checkout-test-123', overrides = {}) {
  return new Request('http://localhost/api/shop/checkout', { method: 'POST', body: JSON.stringify({
    idempotencyKey: key, sourceId: 'cnon:card-nonce-ok', shipping, items, ...overrides,
  }) });
}
function payment() { return { id: 'payment-1', status: paymentStatus, order_id: 'square-order-1', location_id: 'LOC',
  amount_money: { amount: 1800, currency: 'USD' }, refunded_money: { amount: refunded }, receipt_url: 'https://squareup.com/receipt' }; }
function pf() { return { result: { id: 42, status: printfulStatus, external_id: 'square-order-1' } }; }
beforeEach(() => {
  savedEnv = { ...process.env }; originalFetch = globalThis.fetch; store = new MemoryStore();
  charges = creates = alerts = refunded = 0; printfulExists = printfulDown = paymentTimeout = printfulTimeout = alertDown = lookupsDown = false;
  paymentStatus = 'COMPLETED'; printfulStatus = 'draft';
  Object.assign(process.env, { SQUARE_SANDBOX_VARIATION_IDS_JSON: JSON.stringify({ 'IA-MERCH-MUG:11oz': 'SANDBOX-MUG' }), SQUARE_ENVIRONMENT: 'sandbox', SQUARE_ACCESS_TOKEN: 'fake', SQUARE_LOCATION_ID: 'LOC',
    PRINTFUL_SANDBOX_API_TOKEN: 'fake-test', PRINTFUL_SANDBOX_STORE_ID: 'test-store',
    CHECKOUT_ALERT_WEBHOOK_URL: 'https://alerts.example.test', CRON_SECRET: 'fake-test' });
  delete process.env.VERCEL_ENV;
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url.includes('squareup.com')) throw Error('Production Square forbidden in test');
    if (url.endsWith('/v2/orders')) return Response.json({ order: { id: 'square-order-1', total_money: { amount: 1800, currency: 'USD' } } });
    if (url.endsWith('/v2/payments') && init?.method === 'POST') {
      charges++; if (paymentTimeout) throw Error('timeout after Square accepted');
      return Response.json({ payment: payment() });
    }
    if (url.includes('/v2/orders/')) return Response.json({ order: { tenders: charges ? [{ id: 'payment-1' }] : [] } });
    if (url.includes('/v2/payments/')) return Response.json({ payment: payment() });
    if (url.includes('api.printful.com/orders/@')) {
      if (lookupsDown || printfulDown) return new Response(null, { status: 503 });
      return printfulExists ? Response.json(pf()) : new Response(null, { status: 404 });
    }
    if (url.includes('api.printful.com/orders')) {
      assert.equal(new Headers(init?.headers).get('X-PF-Store-Id'), 'test-store');
      assert.equal(url.includes('confirm=1'), false, 'sandbox must NEVER auto-confirm');
      const body = JSON.parse(String(init?.body)); assert.equal(body.external_id, 'square-order-1');
      creates++; printfulExists = true;
      if (printfulTimeout) throw Error('timeout after Printful accepted');
      return Response.json(pf());
    }
    if (url === 'https://alerts.example.test') {
      alerts++; const body = String(init?.body); assert.equal(body.includes('test@example.com'), false);
      return new Response(null, { status: alertDown ? 503 : 200 });
    }
    throw Error(`Unexpected test URL: ${url}`);
  };
});
afterEach(() => { globalThis.fetch = originalFetch; process.env = savedEnv; });

test('successful payment persists a draft, alerts staff, and replay never charges or creates twice', async () => {
  const first = await handleSquareCheckout(req(), store); const body = await first.json();
  assert.equal(body.status, 'COMPLETED'); assert.equal(body.fulfillment, 'draft'); assert.match(body.message, /reviewing/);
  assert.equal(alerts, 1);
  await handleSquareCheckout(req(), store);
  assert.equal(charges, 1); assert.equal(creates, 1); assert.equal(alerts, 1);
});
test('provider outage retains paid order; recovery creates once without charging', async () => {
  printfulDown = true;
  const response = await handleSquareCheckout(req(), store); assert.equal((await response.json()).fulfillment, 'pending');
  printfulDown = false; printfulStatus = 'pending';
  await store.locked('sandbox', 'checkout-test-123', async s => recover((await s.get())!, s));
  assert.equal(charges, 1); assert.equal(creates, 1);
  assert.equal(store.records.values().next().value?.fulfillment, 'submitted');
});
test('timeout after Printful creation reconciles existing external ID', async () => {
  printfulTimeout = true;
  await handleSquareCheckout(req(), store); await handleSquareCheckout(req(), store);
  assert.equal(charges, 1); assert.equal(creates, 1);
  assert.equal(store.records.values().next().value?.printfulId, 42);
});
test('payment response lost after charge is reconciled from Square before fulfillment', async () => {
  paymentTimeout = true;
  const result = await handleSquareCheckout(req(), store); assert.equal(result.status, 202); assert.equal(creates, 0);
  await handleSquareCheckout(req(), store);
  assert.equal(charges, 1); assert.equal(creates, 1);
});
test('unknown/pending/failed Square outcome never fulfills or charges again', async () => {
  paymentStatus = 'PENDING';
  const result = await handleSquareCheckout(req(), store); assert.equal(result.status, 202);
  await handleSquareCheckout(req(), store); assert.equal(creates, 0); assert.equal(charges, 1);
});
test('crash writing paid state still leaves durable payment_pending record for recovery', async () => {
  store.failSave = 3;
  await handleSquareCheckout(req(), store);
  await handleSquareCheckout(req(), store);
  assert.equal(charges, 1); assert.equal(creates, 1);
});
test('missing Printful credentials, storage, or alert setup blocks before charge', async () => {
  delete process.env.PRINTFUL_SANDBOX_API_TOKEN;
  assert.equal((await handleSquareCheckout(req(), store)).status, 503); assert.equal(charges, 0);
  process.env.PRINTFUL_SANDBOX_API_TOKEN = 'fake'; store.failSave = 1;
  assert.equal((await handleSquareCheckout(req(), store)).status, 503); assert.equal(charges, 0);
  delete process.env.CHECKOUT_ALERT_WEBHOOK_URL;
  assert.equal((await handleSquareCheckout(req(), store)).status, 503); assert.equal(charges, 0);
});
test('request fingerprint collision and concurrent replay cannot charge twice', async () => {
  const responses = await Promise.all([handleSquareCheckout(req(), store), handleSquareCheckout(req(), store)]);
  assert.equal(charges, 1); assert.ok(responses.some(r => r.status === 409));
  assert.equal((await handleSquareCheckout(req('checkout-test-123', { items: [{ ...items[0], quantity: 2 }] }), store)).status, 409);
  assert.equal(charges, 1);
});
test('notification failures remain durable and are retried', async () => {
  alertDown = true; await handleSquareCheckout(req(), store);
  assert.equal(store.records.values().next().value?.notifiedAlert, undefined);
  alertDown = false; await handleSquareCheckout(req(), store);
  assert.ok(store.records.values().next().value?.notifiedAlert); assert.equal(charges, 1);
});
test('lookup outage cannot trigger duplicate Printful creation', async () => {
  await handleSquareCheckout(req(), store); lookupsDown = true;
  await handleSquareCheckout(req(), store); assert.equal(creates, 1);
});
test('refund blocks fulfillment recovery', async () => {
  printfulDown = true; await handleSquareCheckout(req(), store);
  printfulDown = false; refunded = 1800; await handleSquareCheckout(req(), store);
  assert.equal(creates, 0); assert.equal(store.records.values().next().value?.fulfillment, 'review');
});
test('sandbox ignores global auto-confirm, production credentials forbidden on preview', async () => {
  process.env.PRINTFUL_AUTO_CONFIRM = 'true'; await handleSquareCheckout(req(), store); assert.equal(creates, 1);
  process.env.VERCEL_ENV = 'preview'; process.env.SQUARE_ENVIRONMENT = 'production';
  assert.equal((await handleSquareCheckout(req('another-checkout'), store)).status, 503);
});
test('full key hashing avoids payment-key prefix collisions', () => {
  assert.notEqual(paymentKey('a'.repeat(36) + '1'), paymentKey('a'.repeat(36) + '2'));
});
