import { createServerFn } from "@tanstack/react-start";

/**
 * Orders / enquiries submitted from the public Contact form, persisted to the
 * database (see `migrations/0001_orders.sql`) and read back on `/admin`.
 *
 * Auth note: the admin dashboard uses a hardcoded username/password (see
 * `src/routes/admin.tsx`) rather than the app's real "Sign in with Grok" auth,
 * per current requirements ("hardcoded user and pass for now"). To keep the
 * order list from being world-readable, `listOrders` re-checks the same
 * credentials on the server before returning any rows — the passcode is not
 * a secret token, it is the literal admin password, sent once per fetch.
 */

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "baladecors2026";

export type OrderRow = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  event_type: string;
  notes: string | null;
  city: string | null;
  status: string;
  created_at: string;
};

export const submitOrder = createServerFn({ method: "POST" })
  .validator(
    (data: {
      name: string;
      phone: string;
      email?: string;
      eventType: string;
      notes?: string;
      city?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const { getSql } = await import("./db");
    const sql = await getSql();
    const name = data.name.trim();
    const phone = data.phone.trim();
    if (!name || !phone) {
      throw new Error("Name and phone are required.");
    }
    await sql`
      insert into orders (name, phone, email, event_type, notes, city)
      values (${name}, ${phone}, ${data.email?.trim() || null}, ${data.eventType}, ${data.notes?.trim() || null}, ${data.city ?? null})
    `;
    return { ok: true as const };
  });

export const verifyAdmin = createServerFn({ method: "POST" })
  .validator((data: { username: string; password: string }) => data)
  .handler(async ({ data }) => {
    return { ok: data.username === ADMIN_USERNAME && data.password === ADMIN_PASSWORD };
  });

export const listOrders = createServerFn({ method: "POST" })
  .validator((data: { username: string; password: string }) => data)
  .handler(async ({ data }): Promise<OrderRow[]> => {
    if (data.username !== ADMIN_USERNAME || data.password !== ADMIN_PASSWORD) {
      throw new Error("Unauthorized");
    }
    const { getSql } = await import("./db");
    const sql = await getSql();
    const rows = await sql<OrderRow>`
      select id, name, phone, email, event_type, notes, city, status, created_at
      from orders
      order by created_at desc
      limit 200
    `;
    return rows;
  });

export const updateOrderStatus = createServerFn({ method: "POST" })
  .validator(
    (data: { username: string; password: string; id: number; status: string }) => data,
  )
  .handler(async ({ data }) => {
    if (data.username !== ADMIN_USERNAME || data.password !== ADMIN_PASSWORD) {
      throw new Error("Unauthorized");
    }
    const { getSql } = await import("./db");
    const sql = await getSql();
    await sql`update orders set status = ${data.status} where id = ${data.id}`;
    return { ok: true as const };
  });
