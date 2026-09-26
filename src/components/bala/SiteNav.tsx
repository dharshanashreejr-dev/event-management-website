import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { useTheme } from "@/lib/theme";
import { useNavVisibility } from "@/lib/nav-visibility";
import { cn } from "@/lib/cn";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { visible, reveal } = useNavVisibility();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // On every route except the cinematic home intro, the real navbar is
  // always shown. On "/", it stays gated behind the intro's reveal() call.
  const shouldShowNav = visible || !isHome;

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const goingDown = y > lastY.current;
        const pastThreshold = y > 96;

        setScrolled(y > 8);
        // Never hide the mobile menu mid-interaction, and never hide near
        // the very top of the page.
        setHidden(pastThreshold && goingDown && !open);

        lastY.current = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  if (!shouldShowNav) {
    return (
      <div className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 py-4 sm:justify-end sm:px-8">
        <button
          type="button"
          onClick={reveal}
          className="hud-panel rounded-full px-5 py-2.5 text-[11px] font-medium tracking-[0.18em] text-paper uppercase transition-transform duration-150 hover:text-brass-soft active:scale-[0.96]"
        >
          Plan Your Event
        </button>
      </div>
    );
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-3 transition-transform duration-300 ease-out sm:px-8 sm:py-4 animate-[nav-drop_0.5s_ease-out]",
        hidden ? "-translate-y-[130%]" : "translate-y-0",
      )}
    >
      <div
        className={cn(
          "hud-panel flex items-center gap-2 rounded-full px-4 py-2 transition-shadow duration-300",
          scrolled ? "shadow-[0_10px_30px_-12px_rgba(0,0,0,0.55)]" : "",
        )}
      >
        <Link
          to="/"
          className="type-display text-sm font-medium tracking-[0.18em] text-paper uppercase"
        >
          Bala Decors
        </Link>
      </div>

      <nav
        className={cn(
          "hud-panel hidden items-center gap-1 rounded-full px-2 py-1.5 transition-shadow duration-300 md:flex",
          scrolled ? "shadow-[0_10px_30px_-12px_rgba(0,0,0,0.55)]" : "",
        )}
      >
        {LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="rounded-full px-3.5 py-1.5 text-[12px] font-medium tracking-[0.08em] text-paper-dim uppercase transition-colors duration-150 hover:text-paper [&.active]:bg-paper/12 [&.active]:text-paper"
            activeOptions={{ exact: link.to === "/" }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <Link
          to="/admin"
          className="hud-panel hidden h-10 items-center rounded-full px-3.5 text-[11px] font-medium tracking-[0.1em] text-paper-dim uppercase transition-colors duration-150 hover:text-paper sm:flex"
          aria-label="Admin dashboard"
        >
          Admin
        </Link>
        <ThemeToggle />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="hud-panel flex h-10 w-10 items-center justify-center rounded-full text-paper md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="type-display text-lg">{open ? "×" : "≡"}</span>
        </button>
      </div>

      {open ? (
        <nav className="hud-panel absolute right-4 top-16 flex flex-col gap-1 rounded-[16px] p-2 md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="rounded-[10px] px-4 py-2 text-left text-[12px] font-medium tracking-[0.08em] text-paper-dim uppercase transition-colors duration-150 hover:text-paper [&.active]:bg-paper/12 [&.active]:text-paper"
              activeOptions={{ exact: link.to === "/" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-[10px] border-t border-line px-4 pt-3 pb-2 text-left text-[12px] font-medium tracking-[0.08em] text-paper-dim uppercase transition-colors duration-150 hover:text-paper"
          >
            Admin
          </Link>
        </nav>
      ) : null}
    </header>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      className="hud-panel flex h-10 items-center gap-2 rounded-full px-3 text-[11px] font-medium tracking-[0.12em] text-paper uppercase"
      aria-label="Toggle light and dark mode"
    >
      <span
        className={cn(
          "relative flex h-5 w-9 items-center rounded-full border border-paper/25 transition-colors duration-150",
          isLight ? "bg-paper/25" : "bg-night/60",
        )}
      >
        <span
          className={cn(
            "absolute h-3.5 w-3.5 rounded-full bg-brass-soft transition-transform duration-150",
            isLight ? "translate-x-[18px]" : "translate-x-[3px]",
          )}
        />
      </span>
      {isLight ? "Light" : "Dark"}
    </button>
  );
}
