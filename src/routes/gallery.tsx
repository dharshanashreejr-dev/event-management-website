import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/bala/PageShell";
import { InstagramEmbed } from "@/components/bala/InstagramEmbed";

export const Route = createFileRoute("/gallery")({ component: Gallery });

type Photo = {
  src: string;
  title: string;
  tag: string;
  category: string;
  detail: string;
  highlights: string[];
};

const CATEGORIES = [
  "All",
  "Wedding",
  "Puberty Function",
  "Baby Shower",
  "Corporate",
  "Birthday",
  "Entrance & Venue",
] as const;

const PHOTOS: Photo[] = [
  {
    src: "/media/hall-wedding.jpg",
    title: "Mandap & Reception",
    tag: "Wedding",
    category: "Wedding",
    detail:
      "A full wedding hall transformation — floral mandap as the centrepiece, a warm-lit stage for the muhurtham, and an aisle styled for the couple's grand walk. Every layer, from backdrop to seating, is planned around the ceremony timeline so nothing feels rushed on the day.",
    highlights: [
      "Fresh floral mandap with layered backdrop",
      "Warm ambient stage lighting for muhurtham",
      "Aisle runner & entry styling",
      "Reception seating arranged around the stage",
    ],
  },
  {
    src: "/media/hall-grand.jpg",
    title: "Grand Entry Walkway",
    tag: "Bride & Groom Entry",
    category: "Wedding",
    detail:
      "A chandelier-lit hall staged for a luxury bride-and-groom entry — dramatic lighting and a dedicated walkway designed for a memorable arrival moment that guests remember long after the event.",
    highlights: [
      "Chandelier & ambient hall lighting",
      "Dedicated entry walkway styling",
      "Grand stage backdrop for arrival photos",
      "Coordinated with reception decor theme",
    ],
  },
  {
    src: "/media/hall-puberty.jpg",
    title: "Traditional Theme Stage",
    tag: "Puberty Function",
    category: "Puberty Function",
    detail:
      "A traditional puberty function stage built around marigold and jasmine, keeping the ceremony rooted in classic South Indian styling with a warm, festive feel that respects the ritual while still looking photo-ready.",
    highlights: [
      "Marigold & jasmine garland drapes",
      "Ceremonial centrepiece with banana stems",
      "Traditional brass & lamp accents",
      "Seating styled for family rituals",
    ],
  },
  {
    src: "/media/hall-babyshower.jpg",
    title: "Pastel Welcome Setup",
    tag: "Baby Shower",
    category: "Baby Shower",
    detail:
      "A soft, pastel-toned baby shower setup — welcoming and gentle, with a dedicated gift table and a photo corner built for keepsake moments with the mum-to-be and family.",
    highlights: [
      "Pastel floral palette, soft balloon clusters",
      "Dedicated gift & favours table",
      "Photo-corner backdrop for portraits",
      "Name/theme signage on stage",
    ],
  },
  {
    src: "/media/hall-corporate.jpg",
    title: "Branded Stage",
    tag: "Corporate",
    category: "Corporate",
    detail:
      "A clean, signage-led corporate stage designed for product launches and seminars — minimal styling that keeps focus on the brand and the speaker instead of competing with them.",
    highlights: [
      "Brand-forward backdrop & signage",
      "Podium and speaker-area layout",
      "Seminar-style seating rows",
      "Neutral palette matched to brand colours",
    ],
  },
  {
    src: "/media/hall-birthday.jpg",
    title: "Themed Party Backdrop",
    tag: "Birthday",
    category: "Birthday",
    detail:
      "A festive birthday setup with a tailored theme backdrop and a styled cake table — built to be the main photo spot for the whole party, from cake-cutting to games.",
    highlights: [
      "Custom theme backdrop",
      "Styled cake table & dessert corner",
      "Balloon garlands & festive props",
      "Colour palette matched to the theme",
    ],
  },
  {
    src: "/media/arch.jpg",
    title: "Floral Entrance Arch",
    tag: "Entrance Décor",
    category: "Entrance & Venue",
    detail:
      "A statement floral arch at the entrance that sets the tone for guests before they even step inside — the first impression of the event, and one of the most photographed spots.",
    highlights: [
      "Full floral entrance arch",
      "Coordinated with venue theme colours",
      "Framed for guest entry photos",
      "Works across weddings, functions & corporate events",
    ],
  },
  {
    src: "/media/exterior.jpg",
    title: "Venue Exterior Styling",
    tag: "Venue Prep",
    category: "Entrance & Venue",
    detail:
      "Approach and exterior styling — lighting and signage set up ahead of the event so guests are welcomed from the moment they arrive at the venue, not just once they're inside.",
    highlights: [
      "Exterior & approach lighting",
      "Signage and directional decor",
      "Parking-to-entry guest flow styling",
      "Weatherproof setup for outdoor spaces",
    ],
  },
];

const REELS: Array<{ url: string; title: string; tag: string }> = [
  {
    url: "https://www.instagram.com/reel/Db7-qNnBjbW/?stkn=MWI2NTJnNjltNjdqZw==",
    title: "Mandap Reveal",
    tag: "Wedding",
  },
  {
    url: "https://www.instagram.com/reel/DbgF2k_BrdY/?stkn=cGxiejQwanJxMGFs",
    title: "Stage Build Timelapse",
    tag: "Corporate",
  },
  {
    url: "https://www.instagram.com/reel/DbVqvh-hoZT/?stkn=MWlveTF0eWlwZ2p0Mw==",
    title: "Theme Styling Walkthrough",
    tag: "Puberty Function",
  },
  {
    url: "https://www.instagram.com/reel/DbN2fUDAdQS/?stkn=M3RyMTF5Z3ZiaTMz",
    title: "Balloon Décor Setup",
    tag: "Birthday",
  },
];

function Gallery() {
  const [active, setActive] = useState<Photo | null>(null);
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");

  const filteredPhotos = useMemo(
    () => (filter === "All" ? PHOTOS : PHOTOS.filter((photo) => photo.category === filter)),
    [filter],
  );

  return (
    <>
      {/* Hero image — fully maxed vertical length for grand hall impact */}
      <div className="relative flex h-[90vh] min-h-[640px] w-full items-end overflow-hidden sm:h-[95vh] sm:min-h-[760px]">
        <img
          src="/media/hall-grand.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 15%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        <div className="relative mx-auto w-full max-w-5xl px-5 pb-20 sm:px-10">
          <p className="text-[11px] font-medium tracking-[0.32em] text-amber-200 uppercase">
            Our Events
          </p>
          <h1 className="type-display mt-3 text-[clamp(2.2rem,6vw,3.6rem)] leading-[1.05] tracking-tight text-white">
            Gallery — Photos &amp; Reels
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            Every event we take on gets its own mood board, colour palette
            and layout plan — a sample of that work across weddings, family
            functions and corporate celebrations.
          </p>
        </div>
      </div>

      <PageShell
        eyebrow="Browse"
        title="Filter by Event Type"
        intro="Tap a category to filter, tap any photo for the full styling breakdown, or watch the reels below to see the build in motion."
      >
      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={`min-h-9 rounded-full px-4 text-[11px] font-medium tracking-[0.1em] uppercase transition-colors ${
              filter === category
                ? "bg-paper text-night"
                : "hairline text-paper-dim hover:text-paper"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Photo grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filteredPhotos.map((photo) => (
          <button
            key={photo.title}
            type="button"
            onClick={() => setActive(photo)}
            className="group hairline flex flex-col overflow-hidden rounded-[16px] bg-elevated text-left transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div className="relative overflow-hidden">
              <img
                src={photo.src}
                alt=""
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <span className="absolute left-2 top-2 rounded-full bg-night/60 px-2.5 py-1 text-[10px] tracking-wide text-paper uppercase">
                {photo.tag}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-1.5 p-4">
              <h3 className="type-display text-base text-paper">{photo.title}</h3>
              <p className="line-clamp-2 text-[12.5px] leading-relaxed text-paper-dim">
                {photo.detail}
              </p>
              <span className="mt-2 text-[11px] font-medium tracking-[0.14em] text-brass-soft uppercase">
                View details →
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Detail modal */}
      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/85 p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="hairline max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[20px] bg-elevated"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={active.src} alt="" className="max-h-[50vh] w-full object-cover" />
            <div className="p-5">
              <p className="text-[11px] tracking-[0.2em] text-brass-soft uppercase">
                {active.tag}
              </p>
              <h3 className="type-display mt-1 text-xl text-paper">{active.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper-dim">{active.detail}</p>

              <ul className="mt-4 space-y-1.5">
                {active.highlights.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-[12.5px] leading-relaxed text-paper-dim"
                  >
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brass-soft" />
                    {point}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setActive(null)}
                className="mt-5 min-h-10 bg-paper px-4 text-[12px] font-medium tracking-[0.14em] text-night uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Reels — compact, premium strip */}
      <div className="mt-16">
        <p className="text-[11px] font-medium tracking-[0.24em] text-brass-soft uppercase">
          Reels
        </p>
        <h2 className="type-display mt-2 text-2xl text-paper">
          Behind the Décor — In Motion
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-paper-dim">
          A short set of highlight reels, straight from Instagram.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {REELS.map((reel) => (
          <div key={reel.url} className="w-full max-w-[220px] justify-self-center sm:justify-self-auto">
            <InstagramEmbed url={reel.url} caption={`${reel.title} · ${reel.tag}`} />
          </div>
        ))}
      </div>

      <p className="mt-10 text-[12px] text-muted">
        Follow{" "}
        <a
          href="https://www.instagram.com/bala_decor_event_planner"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2"
        >
          @bala_decor_event_planner
        </a>{" "}
        on Instagram for the full reel library.
      </p>
      </PageShell>
    </>
  );
}