import { Link } from "@tanstack/react-router";
import { EVENTS, GRAND_HALL, type EventConfig, type EventId } from "@/lib/events";
import { cn } from "@/lib/cn";

type HallHudProps = {
  selected: EventId | null;
  ambience: number;
  onAmbience: (value: number) => void;
  onSelect: (id: EventId) => void;
  onBack: () => void;
  onBook: () => void;
};

const WASH: Record<EventId | "grand", string> = {
  grand: "Choose a celebration. The hall restyles to match.",
  wedding: EVENTS[0].blurb,
  puberty: EVENTS[1].blurb,
  babyshower: EVENTS[2].blurb,
  corporate: EVENTS[3].blurb,
  birthday: EVENTS[4].blurb,
};

export function HallHud({
  selected,
  ambience,
  onAmbience,
  onSelect,
  onBack,
  onBook,
}: HallHudProps) {
  const title = selected
    ? EVENTS.find((item) => item.id === selected)?.title
    : "Have a Glimpse Here! And Go Inside!";
  const blurb = selected ? WASH[selected] : GRAND_HALL.blurb;

  return (
    <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-7">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium tracking-[0.28em] text-paper-dim uppercase">
            Bala Decors
          </p>
          <h2 className="type-display mt-2 max-w-xl text-[clamp(1.6rem,4vw,2.8rem)] leading-tight text-paper">
            {title}
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-paper-dim">{blurb}</p>
        </div>
        <AmbienceControl value={ambience} onChange={onAmbience} className="hidden sm:block" />
      </header>

      <div className="flex flex-col gap-4">
        <AmbienceControl
          value={ambience}
          onChange={onAmbience}
          className="w-full sm:hidden"
        />
        {selected ? (
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onBack}
              className="min-h-11 border border-paper/25 bg-night/40 px-5 py-2 text-[12px] font-medium tracking-[0.14em] text-paper uppercase transition-transform duration-150 hover:border-paper/50 active:scale-[0.96]"
            >
              Back to Grand Hall
            </button>
            <button
              type="button"
              onClick={onBook}
              className="min-h-11 bg-paper px-5 py-2 text-[12px] font-medium tracking-[0.14em] text-night uppercase transition-transform duration-150 hover:bg-paper-dim active:scale-[0.96]"
            >
              Book This Event
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="min-h-11 border border-paper/30 bg-night/30 px-5 py-2 text-[12px] font-medium tracking-[0.14em] text-paper uppercase transition-transform duration-150 hover:border-paper/55 active:scale-[0.96] flex items-center"
            >
              Home
            </Link>
            <button
              type="button"
              onClick={onBook}
              className="min-h-11 bg-paper px-5 py-2 text-[12px] font-medium tracking-[0.14em] text-night uppercase transition-transform duration-150 hover:bg-paper-dim active:scale-[0.96]"
            >
              Plan Your Event
            </button>
          </div>
        )}

        <div className="-mx-1 flex gap-3 overflow-x-auto pb-1 pt-1 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible">
          {EVENTS.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              active={selected === event.id}
              onSelect={() => onSelect(event.id)}
            />
          ))}
        </div>
        <p className="text-[11px] tracking-wide text-muted">
          Also styling engagements, receptions, housewarmings, and other gatherings.
        </p>
      </div>
    </div>
  );
}

function EventCard({
  event,
  active,
  onSelect,
}: {
  event: EventConfig;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative min-w-[148px] shrink-0 overflow-hidden text-left transition-transform duration-150 active:scale-[0.96] sm:min-w-0",
        "rounded-[20px] p-1.5",
        active ? "bg-paper/14 hairline" : "bg-night/35 hairline hover:bg-night/50",
      )}
    >
      <span className="block overflow-hidden rounded-[14px]">
        <img
          src={event.card}
          alt=""
          className="h-24 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-28"
          style={{ objectPosition: event.objectPos }}
        />
      </span>
      <span className="mt-2 block px-1 pb-1">
        <span className="block text-[12px] font-medium text-paper">{event.short}</span>
        <span className="mt-0.5 block text-[10px] tracking-wide text-muted">
          Restyle the hall
        </span>
      </span>
    </button>
  );
}

function AmbienceControl({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) {
  return (
    <label className={cn("hud-panel w-40 rounded-[20px] p-3", className)}>
      <span className="block text-[10px] tracking-[0.2em] text-muted uppercase">
        Ambience
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(value * 100)}
        onChange={(event) => onChange(Number(event.target.value) / 100)}
        className="mt-3 w-full accent-brass-soft"
        aria-label="Mix hall lighting from dark to light"
      />
      <span className="mt-1 flex justify-between text-[10px] text-muted">
        <span>Dark</span>
        <span>Light</span>
      </span>
    </label>
  );
}
