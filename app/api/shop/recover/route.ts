import { timingSafeEqual } from 'node:crypto';
import { checkoutStore } from '../../../../server/checkout-store';
import { recover } from '../../../../server/checkout-workflow';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const supplied = request.headers.get('authorization') ?? '';
  const expected = `Bearer ${secret}`;
  if (!secret || supplied.length !== expected.length || !timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))) return new Response(null, { status: 401 });
  if (process.env.VERCEL_ENV === 'preview' && process.env.SQUARE_ENVIRONMENT !== 'sandbox') return new Response(null, { status: 503 });
  let checked = 0;
  const environment = process.env.SQUARE_ENVIRONMENT;
  if (environment !== 'production' && environment !== 'sandbox') return new Response(null, { status: 503 });
  for (const key of await checkoutStore.pending(environment)) {
    await checkoutStore.locked(environment, key, async session => {
      const record = await session.get();
      if (!record) return;
      try { await recover(record, session); } catch { /* leave durable work pending for next run */ }
      checked++;
    });
  }
  return Response.json({ checked }, { headers: { 'Cache-Control': 'no-store' } });
}
