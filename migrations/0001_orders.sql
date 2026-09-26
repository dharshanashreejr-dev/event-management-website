-- Enquiries / orders submitted from the public Contact form, read back on
-- the /admin dashboard. Applies automatically to the local PGLite fallback on
-- startup, and to Neon during `npm run build` when DATABASE_URL is set.

create table if not exists "orders" (
  "id" bigserial primary key,
  "name" text not null,
  "phone" text not null,
  "email" text,
  "event_type" text not null,
  "notes" text,
  "city" text,
  "status" text not null default 'new',
  "created_at" timestamptz not null default now()
);

create index if not exists "orders_created_at_idx" on "orders" ("created_at" desc);
