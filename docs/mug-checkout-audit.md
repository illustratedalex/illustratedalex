# Mug checkout reliability — November 7, 2026

Status: proposed code, not deployed. Automatic Printful confirmation remains disabled.

## Production evidence

- GitHub PR #7 merged as `07c295ccaa078f986c4bca3a1f62633d7ad4eaf7`.
- Vercel production deployment `dpl_HjLHXCTgfGxS5xmwJ7VQ53GXDV41` is READY, points to that commit, and is aliased to illustratedalex.com and www.illustratedalex.com.
- Project environment metadata lists PRINTFUL_API_TOKEN (sensitive), PRINTFUL_STORE_ID, and Square configuration for production **and preview**. Square environment metadata says production. This establishes configuration presence, not validity or provider access.
- No PRINTFUL_AUTO_CONFIRM entry exists. Current code therefore creates drafts by default.
- No checkout database, alert webhook, recovery cron secret, or sandbox credentials appeared in project environment metadata.
- A production runtime-log query covering the preceding two days for “Printful” returned no matching logs. Retention/completeness and actual customer-order outcomes are unknown.
- Sensitive Vercel variable read returns metadata without a token value. No connected Square account was available through the connected analytics service. No actual Square payments or Printful orders were inspected or changed.

## Exact behavior changes

| File | Change |
| --- | --- |
| server/square-checkout-handler.ts | Validate cart/address, block production payments on previews, select sandbox catalog separately, require durable storage/alerts/worker configuration before charge, bind checkout key to request fingerprint, replay existing checkout safely. |
| server/checkout-store.ts | Private Postgres ledger, committed state writes, session advisory locks shared by checkout and recovery; unique Square-order index. |
| migrations/001-checkout.sql | Environment-separated ledger table with no public grants. |
| server/checkout-workflow.ts | Persist before payment, hash the full payment idempotency key, verify COMPLETED payment/amount/currency/location/order, reconcile uncertain payment via Square tenders, verify refunds before fulfillment, persistent notification outbox. Recovery never POSTs a payment. |
| lib/printful.ts | Explicit store header on every request; external-ID lookup before submission; never create after failed lookup; validate returned ID/status/external ID; do not recreate a previously recorded Printful order if it disappears. Distinguish draft, submitted, and review states. Sandbox always drafts in a separate test store. |
| components/shop/checkout-client.tsx | Retain checkout key in localStorage after failure/reload, synchronous double-submit guard, catch network errors, clear cart only for verified COMPLETED payment, show fulfillment-review message and Square order ID. No card tokens or addresses stored in localStorage. |
| app/api/shop/recover/route.ts, vercel.json | Secret-authenticated hourly reconciliation and notification retries; five oldest pending records per run. Continues monitoring Printful until fulfilled. |
| scripts/audit-mug-orders.ts | Paginated read-only Square/Printful audit since November 6 Eastern midnight. Optional explicit single-order import to ledger, validating payment amount, refund state, shipping and mug mapping. Never charges, submits, or confirms a Printful order. |
| scripts/sandbox-checkout.ts | Real Square sandbox + isolated Printful draft smoke-test harness, including replay. |
| scripts/checkout-workflow.test.ts | Provider failure, crash, concurrency, refund, notification, and replay regression scenarios. |
| square.env.example, package.json, package-lock.json | Configuration documentation, pg dependency and test command. |

## Validation and limits

- 22 automated tests passed (13 reliability scenarios plus 9 catalog/checkout regressions), with mocked Square/Printful responses and an in-memory store.
- TypeScript and ESLint passed.
- Vercel-mode production build passed, including checkout and recovery server routes.
- Real sandbox harness was attempted and stopped before any API call: missing SQUARE_ACCESS_TOKEN for sandbox.
- Actual Postgres locking/migration, browser/card SDK, real Square sandbox transactions, Printful test drafts, real alert delivery and production recovery have NOT been verified. This proposal is not ready for production approval until those checks pass.

## Configuration and safe validation

1. Provision a private Postgres database. Use a direct or **session-pooled** TLS URL, never transaction pooling; advisory session locks require connection affinity. Apply `migrations/001-checkout.sql` and grant the application role SELECT/INSERT/UPDATE only. Keep backups, restrict access, and set a customer-address retention policy. Never place the URL in NEXT_PUBLIC variables.
2. Set CHECKOUT_DATABASE_URL, CHECKOUT_ALERT_WEBHOOK_URL (durable HTTPS alert receiver), and a strong random CRON_SECRET through secure environment settings. Alert receiver must deduplicate the Idempotency-Key and acknowledge only after durable delivery is queued. Verify alert receipt before launch; failed delivery stays pending and is retried. Monitor cron failures/backlog outside the same database so database outages are visible.
3. Configure separate Square sandbox credentials, application/location IDs, and SQUARE_SANDBOX_VARIATION_IDS_JSON for the test catalog. Configure PRINTFUL_SANDBOX_API_TOKEN and PRINTFUL_SANDBOX_STORE_ID for an isolated Printful store with matching synced mug variants. Do not use production credentials or confirm drafts. Keep PRINTFUL_AUTO_CONFIRM unset/false.
4. Set SANDBOX_SHIPPING_JSON to a valid non-customer test address, then run `SQUARE_ENVIRONMENT=sandbox node --experimental-strip-types scripts/sandbox-checkout.ts`. Verify in both dashboards that exactly one sandbox payment and one unconfirmed draft exist, and that the operational alert arrived. Remove the test draft manually afterward.
5. Test browser double tap, reload after lost response, and authenticated worker calls against the real test database. Exercise provider errors and confirm database locks on two simultaneous server instances. No production deployment is authorized by these instructions.

## Existing paid orders

With authorized server-side credentials, run the read-only audit:

`node --experimental-strip-types scripts/audit-mug-orders.ts`

It prints only provider IDs and fulfillment/recoverability status, not customer details or credentials. Inspect the complete report and provider dashboards. Orders with missing addresses, refunds, split/partial payments, ambiguous provider responses, or changed mappings need manual review. Do not infer absence from timeouts or permissions errors.

For one verified paid order requiring recovery, keep automatic confirmation false and explicitly import it:

`node --experimental-strip-types scripts/audit-mug-orders.ts --import=SQUARE_ORDER_ID`

This saves a recovery record only. The recovery worker checks payment/refund state again, looks up Printful using the same Square order ID as external_id, and creates a draft only when absence is verified. Existing Printful orders are reused, including drafts. No recovery path creates a new Square charge. Never re-enter an order under a new external ID.

## Operational boundaries

- A payment with unknown outcome remains blocked from another charge; staff reconciles it rather than assuming it failed. Deliberately starting a new checkout key is a new purchase; staff must not advise that while payment is uncertain.
- Browser storage is origin-scoped. The retained key covers retries on that origin; switching devices/origins or clearing storage needs staff reconciliation before paying again.
- Hourly worker processes at most five records per run to stay within execution limits. Before launch, check plan/cron limits and backlog volume; scale frequency/batch size only with appropriate runtime limits and monitoring.
- A Printful draft is recorded and alerted, **not** represented as production fulfillment. This code does not confirm existing drafts. Staff can confirm in Printful after review; automatic confirmation requires Alex's separate approval.
- Do not enable checkout if the ledger, worker or alert destination is not healthy. A database outage blocks new payments; already-paid orders retain their earlier durable record for reconciliation.
- Do not merge or deploy without Alex's approval after real sandbox and database validation. Production and automatic confirmation are separate decisions.

API references: https://developers.printful.com/docs/ and https://developer.squareup.com/docs/orders-api/manage-orders/retrieve-orders
