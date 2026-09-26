import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { listOrders, updateOrderStatus, type OrderRow } from "@/lib/orders.server";

export const Route = createFileRoute("/admin")({ component: AdminPage });

const SESSION_KEY = "bala-decors-admin-session";

type Creds = { username: string; password: string };

const STATUS_OPTIONS = ["new", "contacted", "confirmed", "completed", "cancelled"];

function AdminPage() {
  const [creds, setCreds] = useState<Creds | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(SESSION_KEY);
      if (raw) setCreds(JSON.parse(raw) as Creds);
    } catch {
      /* ignore */
    }
    setChecking(false);
  }, []);

  const handleLogin = (next: Creds) => {
    setCreds(next);
    try {
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const handleLogout = () => {
    setCreds(null);
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
  };

  if (checking) {
    return <main className="min-h-dvh bg-night" />;
  }

  if (!creds) {
    return <LoginForm onSuccess={handleLogin} />;
  }

  return <Dashboard creds={creds} onLogout={handleLogout} />;
}

function LoginForm({ onSuccess }: { onSuccess: (creds: Creds) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      // listOrders itself re-checks these credentials server-side, so a
      // failed fetch here doubles as the login check — no separate
      // "is this the right password" round trip needed.
      await listOrders({ data: { username, password } });
      onSuccess({ username, password });
    } catch {
      setError("Incorrect username or password.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-dvh items-center justify-center bg-night px-5 text-paper">
      <form
        onSubmit={submit}
        className="hairline w-full max-w-sm rounded-[20px] bg-elevated p-7"
      >
        <p className="text-[11px] font-medium tracking-[0.24em] text-brass-soft uppercase">
          Bala Decors
        </p>
        <h1 className="type-display mt-2 text-2xl text-paper">Admin Sign In</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-paper-dim">
          Sign in to view enquiries submitted through the Contact page.
        </p>

        <label className="mt-6 block">
          <span className="mb-1.5 block text-[11px] tracking-[0.14em] text-muted uppercase">
            Username
          </span>
          <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="field"
            autoComplete="username"
          />
        </label>

        <label className="mt-4 block">
          <span className="mb-1.5 block text-[11px] tracking-[0.14em] text-muted uppercase">
            Password
          </span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="field"
            autoComplete="current-password"
          />
        </label>

        {error ? <p className="mt-3 text-[12px] text-red-400">{error}</p> : null}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 min-h-11 w-full bg-paper text-[12px] font-medium tracking-[0.16em] text-night uppercase transition-transform duration-150 active:scale-[0.96] disabled:opacity-60"
        >
          {busy ? "Checking…" : "Sign In"}
        </button>
      </form>
    </main>
  );
}

function Dashboard({ creds, onLogout }: { creds: Creds; onLogout: () => void }) {
  const [orders, setOrders] = useState<OrderRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    setRefreshing(true);
    setError(null);
    try {
      const rows = await listOrders({ data: creds });
      setOrders(rows);
    } catch {
      setError("Session expired or invalid — please sign in again.");
      onLogout();
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
    // Refresh every 30s so new enquiries show up without a manual reload.
    const id = window.setInterval(load, 30_000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setStatus = async (id: number, status: string) => {
    setOrders((prev) =>
      prev ? prev.map((o) => (o.id === id ? { ...o, status } : o)) : prev,
    );
    try {
      await updateOrderStatus({ data: { ...creds, id, status } });
    } catch {
      /* best-effort — a manual refresh will correct the UI if this failed */
    }
  };

  return (
    <main className="min-h-dvh bg-night px-5 py-10 text-paper sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium tracking-[0.24em] text-brass-soft uppercase">
              Bala Decors — Admin
            </p>
            <h1 className="type-display mt-1 text-2xl text-paper sm:text-3xl">
              Enquiries & Orders
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={load}
              disabled={refreshing}
              className="hairline min-h-10 rounded-full px-4 text-[12px] font-medium tracking-[0.1em] text-paper-dim uppercase transition-colors hover:text-paper disabled:opacity-60"
            >
              {refreshing ? "Refreshing…" : "Refresh"}
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="hairline min-h-10 rounded-full px-4 text-[12px] font-medium tracking-[0.1em] text-paper-dim uppercase transition-colors hover:text-paper"
            >
              Sign Out
            </button>
          </div>
        </div>

        {error ? <p className="mt-6 text-[13px] text-red-400">{error}</p> : null}

        {orders === null ? (
          <p className="mt-10 text-sm text-paper-dim">Loading enquiries…</p>
        ) : orders.length === 0 ? (
          <p className="mt-10 text-sm text-paper-dim">
            No enquiries yet — new Contact form submissions will show up here.
          </p>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[840px] border-collapse text-left text-[13px]">
              <thead>
                <tr className="border-b border-line text-[11px] tracking-[0.12em] text-muted uppercase">
                  <th className="py-3 pr-4">Received</th>
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 pr-4">Phone</th>
                  <th className="py-3 pr-4">Email</th>
                  <th className="py-3 pr-4">Event Type</th>
                  <th className="py-3 pr-4">City</th>
                  <th className="py-3 pr-4">Message</th>
                  <th className="py-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-line align-top">
                    <td className="py-3 pr-4 whitespace-nowrap text-paper-dim">
                      {new Date(order.created_at).toLocaleString()}
                    </td>
                    <td className="py-3 pr-4 font-medium text-paper">{order.name}</td>
                    <td className="py-3 pr-4">
                      <a href={`tel:${order.phone}`} className="text-paper-dim hover:text-paper">
                        {order.phone}
                      </a>
                    </td>
                    <td className="py-3 pr-4 text-paper-dim">{order.email || "—"}</td>
                    <td className="py-3 pr-4 text-paper-dim">{order.event_type}</td>
                    <td className="py-3 pr-4 text-paper-dim">{order.city || "—"}</td>
                    <td className="py-3 pr-4 max-w-xs text-paper-dim">{order.notes || "—"}</td>
                    <td className="py-3 pr-4">
                      <select
                        value={order.status}
                        onChange={(e) => setStatus(order.id, e.target.value)}
                        className="hairline rounded-full bg-elevated px-2.5 py-1 text-[12px] text-paper"
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
