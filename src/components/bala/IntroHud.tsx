type IntroHudProps = {
  onEnter: () => void;
};

export function IntroHud({ onEnter }: IntroHudProps) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-between px-5 py-8 text-center sm:px-10 sm:py-10">
      <p className="text-[11px] font-medium tracking-[0.32em] text-paper-dim uppercase">
        Event styling & management
      </p>

      <div className="stagger-in mx-auto flex max-w-3xl flex-col items-center gap-6">
        <h1 className="type-display text-[clamp(2.6rem,8vw,6.4rem)] leading-[0.95] tracking-tight text-paper">
          BALA DECORS
        </h1>
        <p className="type-display max-w-xl text-base italic leading-relaxed text-paper-dim sm:text-xl">
          Turning Every Celebration Into A Beautiful Memory
        </p>
        <button
          type="button"
          onClick={onEnter}
          className="mt-2 min-h-11 border border-paper/70 bg-paper px-7 py-2.5 text-[13px] font-medium tracking-[0.16em] text-night uppercase transition-transform duration-150 ease-out hover:bg-paper-dim active:scale-[0.96]"
        >
          Plan Your Event
        </button>
      </div>

      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={onEnter}
          className="enter-glow type-display min-h-11 px-4 py-2 text-sm font-medium uppercase sm:text-base"
        >
          ENTER
        </button>
        <span className="text-[11px] tracking-[0.22em] text-muted uppercase">
          Through the gates
        </span>
      </div>
    </div>
  );
}
