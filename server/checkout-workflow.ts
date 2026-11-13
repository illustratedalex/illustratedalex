import { createHash } from 'node:crypto';
import { submitPrintfulOrder } from '../lib/printful.ts';
import { squareConnectOrigin } from '../lib/square/checkout.ts';
import type { CheckoutRecord, CheckoutSession } from './checkout-store.ts';

export function paymentKey(key: string) {
  return createHash('sha256').update(`payment:${key}`).digest('hex').slice(0, 40);
}
export async function squareRequest(path: string, body?: unknown) {
  const response = await fetch(`${squareConnectOrigin(process.env.SQUARE_ENVIRONMENT)}${path}`, {
    method: body ? 'POST' : 'GET', headers: {
      Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`, 'Content-Type': 'application/json', 'Square-Version': '2025-01-23',
    }, ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(10000), cache: 'no-store',
  });
  const payload = await response.json().catch(() => null);
  return { response, payload };
}

export async function notify(record: CheckoutRecord, session: CheckoutSession) {
  if (!record.alert) {
    if (record.notifiedAlert) { record.notifiedAlert = undefined; await session.save(record); }
    return;
  }
  if (record.notifiedAlert === record.alert) return;
  // No customer details, addresses, payment tokens, or provider error bodies leave this service.
  try {
    const response = await fetch(process.env.CHECKOUT_ALERT_WEBHOOK_URL!, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': `${record.environment}:${record.key}:${record.alert}` },
      body: JSON.stringify({ event: 'checkout_attention', environment: record.environment, checkoutKey: record.key,
        orderId: record.orderId, paymentId: record.paymentId, fulfillment: record.fulfillment, reason: record.alert }),
      signal: AbortSignal.timeout(5000),
    });
    if (response.ok) { record.notifiedAlert = record.alert; await session.save(record); }
  } catch { /* persisted alert remains in the outbox for recovery */ }
}

function acceptPayment(record: CheckoutRecord, payment: Record<string, unknown> | undefined) {
  const money = payment?.amount_money as { amount?: number; currency?: string } | undefined;
  if (payment?.status !== 'COMPLETED' || typeof payment.id !== 'string' || payment.order_id !== record.orderId ||
      money?.amount !== record.amount || money?.currency !== record.currency || payment.location_id !== process.env.SQUARE_LOCATION_ID) return false;
  record.state = 'paid'; record.paymentId = payment.id;
  record.receiptUrl = typeof payment.receipt_url === 'string' ? payment.receipt_url : undefined;
  record.fulfillment = record.shipment ? 'pending' : 'not_required';
  record.alert = undefined;
  return true;
}

export async function fulfill(record: CheckoutRecord, session: CheckoutSession) {
  if (record.state !== 'paid' || !record.shipment) return;
  // Before fulfillment/recovery verify the payment is still completed and not refunded.
  const paid = await squareRequest(`/v2/payments/${encodeURIComponent(record.paymentId!)}`);
  if (!paid.response.ok || !acceptPayment(record, paid.payload?.payment) || Number(paid.payload?.payment?.refunded_money?.amount ?? 0) > 0) {
    record.fulfillment = 'review'; record.alert = 'payment_requires_review';
    await session.save(record); await notify(record, session); return;
  }
  const result = await submitPrintfulOrder(record.shipment, Boolean(record.printfulId));
  record.attempts += 1;
  if (result.ok) {
    record.printfulId = result.id; record.printfulStatus = result.status;
    if (result.status === 'draft') { record.fulfillment = 'draft'; record.alert = 'printful_draft_needs_confirmation'; }
    else if (['pending','inprocess','partial','fulfilled'].includes(result.status)) { record.fulfillment = 'submitted'; record.alert = undefined; }
    else { record.fulfillment = 'review'; record.alert = 'printful_requires_review'; }
  } else { record.fulfillment = 'pending'; record.alert = result.reason; }
  await session.save(record);
  await notify(record, session);
}

export async function recover(record: CheckoutRecord, session: CheckoutSession) {
  if (record.state === 'payment_pending' && record.orderId) {
    // Never re-charge during recovery. A crash/timeout can have occurred after Square accepted payment.
    const order = await squareRequest(`/v2/orders/${encodeURIComponent(record.orderId)}`);
    if (order.response.ok) {
      for (const tender of order.payload?.order?.tenders ?? []) {
        const id = tender.payment_id || tender.id;
        if (typeof id !== 'string') continue;
        const paid = await squareRequest(`/v2/payments/${encodeURIComponent(id)}`);
        if (paid.response.ok && acceptPayment(record, paid.payload?.payment)) break;
      }
    }
    if (record.state === 'payment_pending') record.alert = 'payment_outcome_unknown_do_not_recharge';
    await session.save(record);
  }
  try { await fulfill(record, session); } catch { record.alert = 'recovery_provider_unavailable'; await session.save(record); }
  await notify(record, session);
}

export async function charge(record: CheckoutRecord, sourceId: string, session: CheckoutSession) {
  // Save before each side effect so interruption is recoverable, even on a cold server instance.
  const created = await squareRequest('/v2/orders', record.orderRequest);
  const order = created.payload?.order;
  if (!created.response.ok || !order?.id || !Number.isSafeInteger(order.total_money?.amount) || order.total_money.amount <= 0) {
    throw new Error('square_order_unavailable');
  }
  record.orderId = order.id; record.amount = order.total_money.amount; record.currency = order.total_money.currency;
  if (record.shipment) record.shipment.externalId = order.id;
  record.state = 'payment_pending'; record.alert = 'payment_outcome_unknown_do_not_recharge';
  await session.save(record);
  const paid = await squareRequest('/v2/payments', {
    source_id: sourceId, idempotency_key: paymentKey(record.key),
    amount_money: order.total_money, order_id: order.id, location_id: process.env.SQUARE_LOCATION_ID, autocomplete: true,
  });
  if (!acceptPayment(record, paid.payload?.payment)) {
    // Only an explicit terminal payment object establishes failure; HTTP errors alone are ambiguous.
    if (['FAILED','CANCELED'].includes(paid.payload?.payment?.status)) record.state = 'payment_failed';
    record.alert = record.state === 'payment_failed' ? 'payment_failed' : 'payment_outcome_unknown_do_not_recharge';
    await session.save(record); await notify(record, session); return;
  }
  await session.save(record);
  await fulfill(record, session);
}

export function checkoutResponse(record: CheckoutRecord) {
  const paid = record.state === 'paid';
  return Response.json({ orderId: record.orderId, paymentId: record.paymentId, receiptUrl: record.receiptUrl,
    status: paid ? 'COMPLETED' : record.state, fulfillment: record.fulfillment,
    message: paid ? record.fulfillment === 'submitted' || record.fulfillment === 'not_required'
      ? 'Payment received. Order recorded.' : 'Payment received. Your order is recorded and the studio is reviewing fulfillment. Do not pay again.'
      : record.state === 'payment_failed' ? 'Payment failed. Contact the studio before starting another checkout.'
        : 'We are checking your payment. Do not start another checkout or pay again. Contact the studio with this order number.',
  }, { status: paid ? 200 : 202, headers: { 'Cache-Control': 'no-store' } });
}
