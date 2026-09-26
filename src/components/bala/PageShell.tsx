import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-dvh bg-night px-5 pb-20 pt-28 text-paper sm:px-10 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        <p className="text-[11px] font-medium tracking-[0.32em] text-brass-soft uppercase">
          {eyebrow}
        </p>
        <h1 className="type-display mt-3 max-w-2xl text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] tracking-tight text-paper">
          {title}
        </h1>
        {intro ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper-dim sm:text-base">
            {intro}
          </p>
        ) : null}
        <div className="mt-10">{children}</div>
      </div>
      <SiteFooter />
    </main>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 max-w-5xl border-t border-line pt-10 text-[12px] text-muted">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="type-display text-lg tracking-[0.08em] text-paper">BALA DECORS</p>
          <p className="mt-3 max-w-xs leading-relaxed">
            Event styling studio crafting weddings, family functions and
            corporate celebrations — stage to seating, every detail designed.
          </p>
          <div className="mt-4 flex gap-2">
            <a
              href="https://www.instagram.com/bala_decor_event_planner"
              target="_blank"
              rel="noreferrer"
              className="hairline flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-paper"
              aria-label="Instagram"
            >
              IG
            </a>
            <a
              href="https://wa.me/918883697032"
              target="_blank"
              rel="noreferrer"
              className="hairline flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-paper"
              aria-label="WhatsApp"
            >
              WA
            </a>
            <a
              href="tel:8883697032"
              className="hairline flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:text-paper"
              aria-label="Call"
            >
              ☎
            </a>
          </div>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.2em] text-brass-soft uppercase">Explore</p>
          <div className="mt-3 flex flex-col gap-2">
            <Link to="/" className="hover:text-paper">Home</Link>
            <Link to="/about" className="hover:text-paper">About Us</Link>
            <Link to="/services" className="hover:text-paper">Services</Link>
            <Link to="/gallery" className="hover:text-paper">Gallery</Link>
            <Link to="/testimonials" className="hover:text-paper">Testimonials</Link>
            <Link to="/contact" className="hover:text-paper">Contact</Link>
          </div>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.2em] text-brass-soft uppercase">Services</p>
          <div className="mt-3 flex flex-col gap-2">
            <Link to="/services" className="hover:text-paper">Wedding Décor</Link>
            <Link to="/services" className="hover:text-paper">Puberty Function</Link>
            <Link to="/services" className="hover:text-paper">Baby Shower</Link>
            <Link to="/services" className="hover:text-paper">Corporate Events</Link>
            <Link to="/services" className="hover:text-paper">Birthday Party</Link>
            <Link to="/services" className="hover:text-paper">Bride & Groom Luxury Entry</Link>
          </div>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.2em] text-brass-soft uppercase">Contact</p>
          <div className="mt-3 flex flex-col gap-2 leading-relaxed">
            <span>Tirupur · Coimbatore · Erode · Gobichettipalayam</span>
            <a href="tel:8883697032" className="hover:text-paper">8883697032</a>
            <a href="tel:9095415110" className="hover:text-paper">9095415110</a>
            <span>Mon – Sun, 9:00 AM – 8:00 PM</span>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Bala Decors. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <p className="opacity-70">
            Demo project — content and select imagery are placeholders for showcase purposes.
          </p>
          <Link to="/admin" className="opacity-60 hover:opacity-100 hover:text-paper">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
