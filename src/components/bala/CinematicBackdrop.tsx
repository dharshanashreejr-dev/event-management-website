import { useEffect, useRef, useState } from "react";
import { MEDIA } from "@/lib/events";
import { cn } from "@/lib/cn";

export type Phase = "intro" | "entering" | "hall";

type CinematicBackdropProps = {
  phase: Phase;
  hallSrc: string;
  objectPos: string;
  washClass: string;
  ambience: number;
  pointer: { x: number; y: number };
  onEntered: () => void;
};

export function CinematicBackdrop({
  phase,
  hallSrc,
  objectPos,
  washClass,
  ambience,
  pointer,
  onEntered,
}: CinematicBackdropProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const doneRef = useRef(false);
  const [frontHall, setFrontHall] = useState(hallSrc);
  const [backHall, setBackHall] = useState(hallSrc);
  const [showFront, setShowFront] = useState(true);

  useEffect(() => {
    if (hallSrc === (showFront ? frontHall : backHall)) return;
    if (showFront) setBackHall(hallSrc);
    else setFrontHall(hallSrc);
    setShowFront((value) => !value);
  }, [hallSrc, showFront, frontHall, backHall]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (phase !== "entering") {
      video.pause();
      return;
    }

    doneRef.current = false;
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      onEntered();
    };

    video.currentTime = 0;
    const play = video.play();
    if (play && typeof play.catch === "function") {
      play.catch(() => window.setTimeout(finish, 2100));
    }

    const fallback = window.setTimeout(finish, 6400);
    video.addEventListener("ended", finish);
    return () => {
      window.clearTimeout(fallback);
      video.removeEventListener("ended", finish);
    };
  }, [phase, onEntered]);

  const px = pointer.x * 18;
  const py = pointer.y * 12;
  const light = ambience;
  const dark = 1 - ambience;
  const brightness = 0.72 + light * 0.5;
  const contrast = 1.02 + dark * 0.06;
  const hallFilter = `brightness(${brightness}) contrast(${contrast}) saturate(${0.92 + light * 0.18})`;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-night">
      <div
        className="absolute inset-0 origin-center will-change-transform"
        style={{
          perspective: "1400px",
          transform:
            phase === "entering"
              ? "translate3d(0,0,520px) scale(1.48)"
              : `translate3d(${px}px, ${py}px, 0)`,
          transition:
            phase === "entering"
              ? "transform 2.15s cubic-bezier(0.22, 0.01, 0.18, 1)"
              : "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <img
          src={MEDIA.exterior}
          alt=""
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            phase === "intro" && "kenburns",
          )}
        />
        <img
          src={MEDIA.arch}
          alt=""
          className="absolute inset-0 h-full w-full object-cover mix-blend-screen"
          style={{
            opacity: phase === "hall" ? 0 : 0.38,
            transform: `translate3d(${px * 0.35}px, ${py * 0.35}px, 80px) scale(1.04)`,
            transition: "opacity 600ms ease",
          }}
        />
      </div>

      <video
        ref={videoRef}
        src={MEDIA.enter}
        muted
        playsInline
        preload="auto"
        className={cn(
          "absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-500",
          phase === "entering" ? "opacity-100" : "opacity-0",
        )}
      />

      {phase === "entering" ? (
        <div className="motion-streak pointer-events-none absolute inset-0 z-[2] bg-paper/10" />
      ) : null}

      <div
        className={cn(
          "absolute inset-0 z-[3] transition-opacity duration-700",
          phase === "hall" ? "opacity-100" : "opacity-0",
        )}
      >
        <img
          src={backHall}
          alt=""
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            showFront ? "opacity-0" : "opacity-100",
          )}
          style={{ objectPosition: objectPos, filter: hallFilter }}
        />
        <img
          src={frontHall}
          alt=""
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            showFront ? "opacity-100" : "opacity-0",
          )}
          style={{ objectPosition: objectPos, filter: hallFilter }}
        />
        <div
          className={cn("absolute inset-0 mix-blend-multiply transition-opacity duration-500", washClass)}
          style={{ opacity: 0.12 + dark * 0.28 }}
        />
        <div
          className="absolute inset-0 bg-brass-soft mix-blend-screen transition-opacity duration-500"
          style={{ opacity: 0.04 + light * 0.16 }}
        />
        <div
          className="absolute inset-0 bg-night mix-blend-multiply transition-opacity duration-500"
          style={{ opacity: dark * 0.38 }}
        />
      </div>
    </div>
  );
}
