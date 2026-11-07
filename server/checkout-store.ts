import pg from 'pg';

export type CheckoutRecord = {
  key: string; environment: string; fingerprint: string;
  orderRequest: unknown;
  shipment: Parameters<typeof import('../lib/printful.ts').submitPrintfulOrder>[0] | null;
  state: 'created' | 'payment_pending' | 'payment_failed' | 'paid';
  orderId?: string; amount?: number; currency?: string;
  paymentId?: string; receiptUrl?: string;
  fulfillment?: 'pending' | 'draft' | 'submitted' | 'review' | 'not_required';
  printfulId?: number; printfulStatus?: string;
  alert?: string; notifiedAlert?: string; attempts: number;
};
export interface CheckoutSession {
  get(): Promise<CheckoutRecord | null>;
  save(record: CheckoutRecord): Promise<void>;
}
export interface CheckoutStore {
  locked<T>(environment: string, key: string, run: (session: CheckoutSession) => Promise<T>): Promise<T | null>;
  pending(environment: string): Promise<string[]>;
}
let pool: pg.Pool | undefined;
function database() {
  if (!process.env.CHECKOUT_DATABASE_URL) throw new Error('checkout_storage_missing');
  return pool ??= new pg.Pool({ connectionString: process.env.CHECKOUT_DATABASE_URL, max: 4, connectionTimeoutMillis: 5000 });
}
// Session advisory locks survive individual committed writes. No transaction spans a provider call.
// Use a direct/session-pooled Postgres URL, never a transaction-pooled connection.
export const checkoutStore: CheckoutStore = {
  async locked(environment, key, run) {
    const client = await database().connect();
    let acquired = false;
    try {
      const lock = await client.query('select pg_try_advisory_lock(hashtextextended($1, 0)) as acquired', [`${environment}:${key}`]);
      acquired = lock.rows[0].acquired;
      if (!acquired) return null;
      return await run({
        async get() {
          const result = await client.query('select record from shop_checkout where environment=$1 and checkout_key=$2', [environment, key]);
          return result.rows[0]?.record ?? null;
        },
        async save(record) {
          await client.query(`insert into shop_checkout(environment,checkout_key,record) values($1,$2,$3)
            on conflict(environment,checkout_key) do update set record=excluded.record, updated_at=now()`, [environment, key, JSON.stringify(record)]);
        },
      });
    } finally {
      let broken = false;
      if (acquired) await client.query('select pg_advisory_unlock(hashtextextended($1, 0))', [`${environment}:${key}`]).catch(() => { broken = true; });
      client.release(broken);
    }
  },
  async pending(environment) {
    const result = await database().query(`select checkout_key from shop_checkout where environment=$1
      and (record->>'state'='payment_pending' or record->>'fulfillment' in ('pending','draft','review','submitted') and coalesce(record->>'printfulStatus','')<>'fulfilled'
      or coalesce(record->>'alert','')<>coalesce(record->>'notifiedAlert',''))
      order by updated_at limit 5`, [environment]);
    return result.rows.map(row => row.checkout_key);
  },
};

/** CLI cleanup; application request handlers retain the shared pool. */
export async function closeCheckoutStore() { await pool?.end(); pool = undefined; }
