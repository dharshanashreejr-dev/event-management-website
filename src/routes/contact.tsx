import { useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { EVENTS } from "@/lib/events";
import { SiteFooter } from "@/components/bala/PageShell";
import { submitOrder } from "@/lib/orders";

export const Route = createFileRoute("/contact")({ component: Contact });

const STORAGE_KEY = "bala-decors-enquiries";

type FormState = {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  notes: string;
};

const EMPTY: FormState = {
  name: "",
  phone: "",
  email: "",
  eventType: EVENTS[0]?.id ?? "",
  notes: "",
};

const CITIES = [
  { label: "Coimbatore", query: "Coimbatore, Tamil Nadu" },
  { label: "Tirupur", query: "Tirupur, Tamil Nadu" },
  { label: "Erode", query: "Erode, Tamil Nadu" },
  { label: "Gobichettipalayam", query: "Gobichettipalayam, Tamil Nadu" },
];

const SOCIALS: Array<{ label: string; href: string }> = [
  { label: "IG", href: "https://www.instagram.com/bala_decor_event_planner" },
  { label: "YT", href: "#" },
  { label: "FB", href: "#" },
  { label: "IN", href: "#" },
];

function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState(CITIES[0].label);

  const set =
    (key: keyof FormState) => (event: { target: { value: string } }) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    const payload = { ...form, createdAt: new Date().toISOString() };
    try {
      const existing = JSON.parse(
        window.localStorage.getItem(STORAGE_KEY) ?? "[]",
      ) as unknown[];
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([payload, ...existing].slice(0, 40)),
      );
    } catch {
      /* ignore quota — local cache is a bonus, not the source of truth */
    }

    try {
      // The record that actually reaches the /admin dashboard.
      await submitOrder({
        data: {
          name: form.name,
          phone: form.phone,
          email: form.email || undefined,
          eventType: form.eventType,
          notes: form.notes || undefined,
          city,
        },
      });
      setSent(true);
      setForm(EMPTY);
    } catch {
      setError("Something went wrong sending that — please try again or WhatsApp us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const activeCity = CITIES.find((item) => item.label === city) ?? CITIES[0];

  return (
    <main className="min-h-dvh bg-night text-paper">
      {/* Hero banner — fixed dark scrim over the photo (not theme tokens),
          so the image and heading stay legible in both light and dark mode */}
      <div className="relative flex h-[90vh] min-h-[640px] w-full items-end overflow-hidden sm:h-[95vh] sm:min-h-[760px]">
        <img
          src="/media/hall-wedding.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 15%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        <div className="relative mx-auto w-full max-w-5xl px-5 pb-20 sm:px-10">
          <p className="text-[11px] font-medium tracking-[0.32em] text-amber-200 uppercase">
            Get in touch
          </p>
          <h1 className="type-display mt-3 text-[clamp(2.4rem,7vw,4rem)] leading-[1.02] tracking-tight text-white">
            Contact Us
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            Need help planning your next event? Look no further than Bala
            Decors.
          </p>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            We can provide everything you need to ensure your event is a
            success.
          </p>
        </div>
      </div>

      {/* Want to work with us */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-10 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="type-display text-[clamp(1.6rem,3.4vw,2.2rem)] tracking-tight text-paper">
              Want to Work With Us?
            </h2>

            <div className="mt-8 space-y-7">
              <div className="flex items-start gap-4">
                <span className="hairline flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-brass-soft">
                  ☎
                </span>
                <div>
                  <p className="text-[11px] tracking-[0.18em] text-muted uppercase">
                    Talk to our client support team
                  </p>
                  <p className="type-display mt-1 text-lg text-paper">
                    8883697032 · 9095415110
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="hairline flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-brass-soft">
                  ✉
                </span>
                <div>
                  <p className="text-[11px] tracking-[0.18em] text-muted uppercase">
                    Write to us about your needs
                  </p>
                  <a
                    href="mailto:hello@baladecors.com"
                    className="type-display mt-1 block text-lg text-paper underline underline-offset-4"
                  >
                    hello@baladecors.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="hairline flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-brass-soft">
                  ⚑
                </span>
                <div>
                  <p className="text-[11px] tracking-[0.18em] text-muted uppercase">
                    Service areas
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-paper-dim">
                    Tirupur · Coimbatore · Erode · Gobichettipalayam
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-9 flex gap-2.5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hairline flex h-10 w-10 items-center justify-center rounded-full text-[11px] font-medium tracking-wide text-paper-dim transition-colors hover:text-paper"
                  aria-label={social.label}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hairline rounded-[20px] bg-elevated p-5 sm:p-7">
            {sent ? (
              <div className="flex min-h-[360px] flex-col justify-center gap-3">
                <p className="type-display text-3xl text-paper">Received.</p>
                <p className="max-w-sm text-sm leading-relaxed text-paper-dim">
                  Thank you. We will follow up on WhatsApp or call with a plan,
                  décor direction and timing.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-2 min-h-11 self-start bg-paper px-5 text-[12px] font-medium tracking-[0.14em] text-night uppercase"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-4">
                <Field label="Full name">
                  <input
                    required
                    value={form.name}
                    onChange={set("name")}
                    className="field"
                    autoComplete="name"
                    placeholder="Enter your full name"
                  />
                </Field>
                <Field label="Phone number">
                  <input
                    required
                    value={form.phone}
                    onChange={set("phone")}
                    className="field"
                    autoComplete="tel"
                    placeholder="Enter your phone number"
                  />
                </Field>
                <Field label="Email ID">
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    className="field"
                    autoComplete="email"
                    placeholder="Enter your email ID"
                  />
                </Field>
                <Field label="Event type">
                  <select value={form.eventType} onChange={set("eventType")} className="field">
                    {EVENTS.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                    <option value="other">Other celebration</option>
                  </select>
                </Field>
                <Field label="Message">
                  <textarea
                    value={form.notes}
                    onChange={set("notes")}
                    className="field min-h-28 resize-y"
                    placeholder="Message"
                  />
                </Field>
                {error ? (
                  <p className="text-[12px] text-red-400">{error}</p>
                ) : null}
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-1 min-h-12 bg-paper text-[12px] font-medium tracking-[0.16em] text-night uppercase transition-transform duration-150 active:scale-[0.96] disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* What happens next */}
        <div className="mt-20">
          <p className="text-center text-[11px] font-medium tracking-[0.24em] text-brass-soft uppercase">
            After You Hit Submit
          </p>
          <h2 className="type-display mt-2 text-center text-2xl text-paper">
            What Happens Next
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { step: "1", title: "We Call You", body: "Our team reaches out within a few hours to confirm your date, venue and budget range." },
              { step: "2", title: "You Get a Plan", body: "A décor direction and itemised quote, tailored to your guest count and occasion." },
              { step: "3", title: "We Show Up", body: "Setup, styling and breakdown handled end-to-end by our own crew — start to finish." },
            ].map((item) => (
              <div key={item.step} className="hairline rounded-[18px] bg-elevated p-5 text-center">
                <p className="type-display text-2xl text-brass-soft">{item.step}</p>
                <h3 className="mt-2 text-base font-medium text-paper">{item.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-paper-dim">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* City tabs + map */}
        <div className="mt-20">
          <div className="flex flex-wrap justify-center gap-2.5">
            {CITIES.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setCity(item.label)}
                className={`min-h-9 rounded-full px-5 text-[12px] font-medium tracking-[0.06em] transition-colors ${
                  city === item.label
                    ? "bg-paper text-night"
                    : "hairline text-paper-dim hover:text-paper"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hairline mt-6 overflow-hidden rounded-[20px]">
            <iframe
              key={activeCity.label}
              title={`Map — ${activeCity.label}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(activeCity.query)}&output=embed`}
              className="h-[360px] w-full grayscale-[0.2] sm:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <div className="px-5 sm:px-10">
        <SiteFooter />
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] tracking-[0.14em] text-muted uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}