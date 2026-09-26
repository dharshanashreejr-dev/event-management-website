import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavVisibility } from "@/lib/nav-visibility";
import { EVENTS, GRAND_HALL, MEDIA, type EventId } from "@/lib/events";
import { CinematicBackdrop, type Phase } from "@/components/bala/CinematicBackdrop";
import { ParticleField } from "@/components/bala/ParticleField";
import { IntroHud } from "@/components/bala/IntroHud";
import { HallHud } from "@/components/bala/HallHud";
import { BookingPanel } from "@/components/bala/BookingPanel";

const WASH_CLASS: Record<EventId | "grand", string> = {
  grand: "bg-wash-grand",
  wedding: "bg-wash-wedding",
  puberty: "bg-wash-puberty",
  babyshower: "bg-wash-baby",
  corporate: "bg-wash-corporate",
  birthday: "bg-wash-birthday",
};

export function Experience() {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState<Phase>("intro");
  const [selected, setSelected] = useState<EventId | null>(null);
  const [ambience, setAmbience] = useState(0.55);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const { visible, reveal } = useNavVisibility();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    const sources = [
      MEDIA.exterior,
      MEDIA.arch,
      GRAND_HALL.hall,
      ...EVENTS.map((item) => item.hall),
      ...EVENTS.map((item) => item.card),
    ];
    Promise.all(
      sources.map(
        (src) =>
          new Promise<void>((resolve) => {
            const image = new Image();
            image.onload = () => resolve();
            image.onerror = () => resolve();
            image.src = src;
          }),
      ),
    ).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [mounted]);

  const enterHall = useCallback(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase("hall");
      return;
    }
    setPhase("entering");
  }, []);

  const onEntered = useCallback(() => {
    setPhase("hall");
  }, []);

  useEffect(() => {
    if (phase !== "intro") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        enterHall();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, enterHall]);

  const hall = useMemo(() => {
    if (!selected) {
      return {
        src: GRAND_HALL.hall,
        objectPos: "center 45%",
        wash: WASH_CLASS.grand,
      };
    }
    const event = EVENTS.find((item) => item.id === selected)!;
    return {
      src: event.hall,
      objectPos: event.objectPos,
      wash: WASH_CLASS[event.id],
    };
  }, [selected]);

  if (!mounted) {
    return <div data-theme="dark" className="min-h-dvh bg-night" />;
  }

  return (
    <main
      // The cinematic intro/hall always stays pure dark, no matter what the
      // site-wide light/dark toggle is set to. Light/dark only takes visible
      // effect once the nav bar has been revealed (booking opened).
      data-theme={visible ? undefined : "dark"}
      className="relative h-dvh w-full overflow-hidden bg-night text-paper"
      onMouseMove={(event) => {
        if (phase !== "intro") return;
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        setPointer({ x, y });
      }}
    >
      {!ready ? <Loader /> : null}

      <CinematicBackdrop
        phase={phase}
        hallSrc={hall.src}
        objectPos={hall.objectPos}
        washClass={hall.wash}
        ambience={ambience}
        pointer={pointer}
        onEntered={onEntered}
      />
      <ParticleField intensity={phase === "entering" ? 2.4 : phase === "hall" ? 1.1 : 0.7} />
      <div className="vignette absolute inset-0 z-[15]" />
      <div className="grain absolute inset-0 z-[16]" />

      {phase === "intro" && ready ? <IntroHud onEnter={enterHall} /> : null}

      {phase === "entering" ? (
        <button
          type="button"
          onClick={onEntered}
          className="absolute bottom-6 right-6 z-30 text-[11px] tracking-[0.2em] text-paper-dim uppercase"
        >
          Skip
        </button>
      ) : null}

      {phase === "hall" ? (
        <HallHud
          selected={selected}
          ambience={ambience}
          onAmbience={setAmbience}
          onSelect={setSelected}
          onBack={() => setSelected(null)}
          onBook={() => {
            reveal();
            setBookingOpen(true);
          }}
        />
      ) : null}

      <BookingPanel
        open={bookingOpen}
        preset={selected ?? "other"}
        onClose={() => setBookingOpen(false)}
      />
    </main>
  );
}

function Loader() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-night">
      <p className="type-display text-2xl tracking-wide text-paper">BALA DECORS</p>
      <span className="mt-6 h-px w-40 origin-left bg-brass-soft/80 [animation:load-line_1.1s_ease_forwards]" />
    </div>
  );
}
