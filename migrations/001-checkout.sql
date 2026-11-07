-- Apply to a dedicated private Postgres database before enabling this checkout.
-- Application role needs only SELECT/INSERT/UPDATE. No browser grants or public API exposure.
create table if not exists shop_checkout (
  environment text not null check (environment in ('sandbox','production')),
  checkout_key text not null,
  record jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key(environment,checkout_key)
);
create unique index if not exists shop_checkout_square_order
  on shop_checkout(environment,(record->>'orderId')) where record->>'orderId' is not null;
revoke all on shop_checkout from public;
