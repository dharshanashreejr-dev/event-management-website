import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type SectionTab = {
  id: string;
  label: string;
};

/**
 * A sticky row of pill tabs that sits just under the main site nav.
 * It highlights whichever section is currently in view (scroll-spy) and
 * smooth-scrolls to a section when a pill is tapped, offsetting for the
 * fixed header.
 */
export function SectionTabs({ tabs }: { tabs: SectionTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const clickLock = useRef<string | null>(null);

  useEffect(() => {
    const sections = tabs
      .map((tab) => document.getElementById(tab.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (clickLock.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-160px 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [tabs]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    clickLock.current = id;
    setActive(id);
    const y = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
    window.setTimeout(() => {
      clickLock.current = null;
    }, 900);
  };

  return (
    <div className="sticky top-[72px] z-20 -mx-5 mb-10 overflow-x-auto px-5 sm:top-[84px] sm:-mx-10 sm:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="hud-panel inline-flex w-max items-center gap-1 rounded-full p-1.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => scrollTo(tab.id)}
            className={cn(
              "whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] font-medium tracking-[0.08em] uppercase transition-colors duration-150",
              active === tab.id
                ? "bg-paper text-night"
                : "text-paper-dim hover:text-paper",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
