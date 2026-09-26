import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { EVENTS, type EventId } from "@/lib/events";
import { cn } from "@/lib/cn";

type BookingPanelProps = {
  open: boolean;
  preset: EventId | "other";
  onClose: () => void;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  eventType: EventId | "other";
  date: string;
  guests: string;
  city: string;
  notes: string;
};

const STORAGE_KEY = "bala-decors-enquiries";

export function BookingPanel({ open, preset, onClose }: BookingPanelProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    eventType: preset,
    date: "",
    guests: "",
    city: "",
    notes: "",
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;
    setSent(false);
    setForm((prev) => ({ ...prev, eventType: preset }));
  }, [open, preset]);

  const visible = open;

  const set =
    (key: keyof FormState) =>
    (event: { target: { value: string } }) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const payload = { ...form, createdAt: new Date().toISOString() };
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as unknown[];
      localStorage.setItem(STORAGE_KEY, JSON.stringify([payload, ...existing].slice(0, 40)));
    } catch {
      /* ignore quota */
    }
    setSent(true);
  };

  return (
    <div
      className={cn(
        "absolute inset-0 z-40 flex justify-end transition-[opacity,visibility] duration-300",
        visible ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <button
        type="button"
        aria-label="Close booking"
        onClick={onClose}
        className="absolute inset-0 bg-night/55"
      />
      <aside
        className={cn(
          "relative flex h-full w-full max-w-md flex-col bg-ink text-paper shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          visible ? "translate-x-0" : "translate-x-6",
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b border-line px-5 py-5">
          <div>
            <p className="text-[10px] tracking-[0.24em] text-muted uppercase">Enquiry</p>
            <h3 className="type-display mt-1 text-2xl">Book this event</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 px-2 text-sm text-paper-dim hover:text-paper"
          >
            Close
          </button>
        </header>

        {sent ? (
          <div className="flex flex-1 flex-col justify-center gap-4 px-6">
            <p className="type-display text-3xl">Received.</p>
            <p className="max-w-sm text-sm leading-relaxed text-paper-dim">
              Thank you. Your enquiry is saved on this device. We will follow up with a
              plan, décor direction, and timing.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 min-h-11 self-start bg-paper px-5 text-[12px] font-medium tracking-[0.14em] text-night uppercase"
            >
              Back to hall
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-5">
            <Field label="Name">
              <input
                required
                value={form.name}
                onChange={set("name")}
                className="field"
                autoComplete="name"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Phone">
                <input
                  required
                  value={form.phone}
                  onChange={set("phone")}
                  className="field"
                  autoComplete="tel"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  className="field"
                  autoComplete="email"
                />
              </Field>
            </div>
            <Field label="Celebration">
              <select
                value={form.eventType}
                onChange={set("eventType")}
                className="field"
              >
                {EVENTS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
                <option value="other">Other celebration</option>
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date">
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={set("date")}
                  className="field"
                />
              </Field>
              <Field label="Guests">
                <input
                  required
                  inputMode="numeric"
                  value={form.guests}
                  onChange={set("guests")}
                  className="field"
                  placeholder="120"
                />
              </Field>
            </div>
            <Field label="City / venue">
              <input
                value={form.city}
                onChange={set("city")}
                className="field"
                placeholder="City or hall name"
              />
            </Field>
            <Field label="Notes">
              <textarea
                value={form.notes}
                onChange={set("notes")}
                className="field min-h-24 resize-y"
                placeholder="Palette, stage size, outdoor or indoor…"
              />
            </Field>
            <button
              type="submit"
              className="mt-2 min-h-11 bg-paper text-[12px] font-medium tracking-[0.16em] text-night uppercase transition-transform duration-150 active:scale-[0.96]"
            >
              Send enquiry
            </button>
            <p className="text-[11px] leading-relaxed text-muted">
              Stored locally in this browser for the demo. No account required.
            </p>
          </form>
        )}
      </aside>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] tracking-[0.14em] text-muted uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}
