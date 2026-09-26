import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { InstagramEmbed } from "@/components/bala/InstagramEmbed";
import { SiteFooter } from "@/components/bala/PageShell";

export const Route = createFileRoute("/about")({ component: About });

// ---- data (demo content — replace with real copy/photos later) ----

const TILES = [
  { title: "Wedding", img: "/media/cards/wedding.jpg", blurb: "Mandap, florals & reception styling." },
  { title: "Corporate Event", img: "/media/cards/corporate.jpg", blurb: "Branded stages & product launches." },
  { title: "Beach Wedding", img: "/media/exterior.jpg", blurb: "Destination décor by the shore." },
  { title: "Stage Dance", img: "/media/cards/birthday.jpg", blurb: "Lighting & performance-ready stages." },
  { title: "Birthday", img: "/media/cards/babyshower.jpg", blurb: "Theme décor for every age." },
];

const CAROUSEL = [
  { img: "/media/hall-wedding.jpg", caption: "Wedding mandap & reception styling" },
  { img: "/media/hall-puberty.jpg", caption: "Traditional puberty function stage" },
  { img: "/media/hall-babyshower.jpg", caption: "Pastel baby shower setup" },
  { img: "/media/hall-corporate.jpg", caption: "Branded corporate stage" },
  { img: "/media/hall-birthday.jpg", caption: "Themed birthday backdrop" },
];

const STATS = [
  { value: "500+", label: "Events Styled" },
  { value: "9+", label: "Years in Business" },
  { value: "4", label: "Cities Served" },
  { value: "4.8/5", label: "Average Rating" },
];

const VALUES = [
  {
    title: "Planned Down to the Minute",
    body: "Every event gets a run-of-show — setup, ceremony cues and teardown timed so nothing is left to chance on the day.",
  },
  {
    title: "One Team, Every Detail",
    body: "Décor, lighting, seating and stage design are handled by one coordinated crew, not separate vendors passed between each other.",
  },
  {
    title: "Built Around Your Budget",
    body: "We plan the look first, then fit it to what you want to spend — transparent costing with no surprise add-ons later.",
  },
];

const PROCESS = [
  { step: "01", title: "Enquiry & Brief", body: "Share your date, venue and vision — we get on a call within a day." },
  { step: "02", title: "Mood Board & Quote", body: "A tailored décor direction and a clear, itemised quote to review." },
  { step: "03", title: "Setup Day", body: "Our crew handles stage, florals, lighting and seating — start to finish." },
  { step: "04", title: "You Celebrate", body: "You arrive to a fully styled venue and simply enjoy the event." },
];

const BLOG_SEED = [
  {
    title: "How to Plan an Event Like a Pro: 12 Essential Tips",
    body: "Planning an event means managing many moving parts, from vendors to guest experience — here's where to start.",
  },
  {
    title: "5 Décor Trends Every Kerala Wedding Is Using",
    body: "From floral tunnels to ambient uplighting, these are the details guests remember the most.",
  },
  {
    title: "Corporate Event Styling: Making the Right Impression",
    body: "Branded stages, clean signage and considered lighting turn a routine seminar into a memorable launch.",
  },
];

const BLOG_MORE = [
  {
    title: "Baby Shower Themes That Never Go Out of Style",
    body: "Pastel palettes, balloon arches and a well-styled photo corner — the details that make a shower memorable.",
  },
  {
    title: "Budgeting for Your Big Day: A Practical Guide",
    body: "A simple framework for splitting your décor budget across stage, florals, lighting and seating.",
  },
  {
    title: "Behind the Scenes: Building a Stage in Under 6 Hours",
    body: "A look at how our team turns an empty hall into a fully styled stage before doors open.",
  },
];

function GoldSeal() {
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24 shrink-0" aria-hidden>
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f3d98b" />
          <stop offset="50%" stopColor="#c9973f" />
          <stop offset="100%" stopColor="#8a6a2c" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="52" fill="url(#goldGrad)" stroke="#5c4520" strokeWidth="2" />
      <circle cx="60" cy="60" r="42" fill="none" stroke="#5c4520" strokeWidth="1.5" strokeDasharray="3 4" />
      <text x="60" y="52" textAnchor="middle" fontSize="9" fill="#3a2c14" fontWeight="700">
        CERTIFIED
      </text>
      <text x="60" y="66" textAnchor="middle" fontSize="10" fill="#3a2c14" fontWeight="700">
        ISO 9001
      </text>
      <text x="60" y="78" textAnchor="middle" fontSize="8" fill="#3a2c14">
        : 2015
      </text>
    </svg>
  );
}

function AutoCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % CAROUSEL.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[22px] hairline bg-elevated">
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {CAROUSEL.map((slide) => (
          <div key={slide.img} className="relative min-w-full">
            <img
              src={slide.img}
              alt=""
              className="h-72 w-full object-cover sm:h-96"
              style={{ objectPosition: "center 42%" }}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-5 pb-4 pt-10">
              <p className="text-sm font-medium text-white">{slide.caption}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
        {CAROUSEL.map((slide, i) => (
          <button
            key={slide.img}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-brass-soft" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function About() {
  const [showMore, setShowMore] = useState(false);

  return (
    <main className="min-h-dvh bg-night text-paper">
      {/* HERO — fixed dark scrim over the photo (not theme tokens), so the
          image and heading stay legible in both light and dark mode */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <img
          src="/media/hall-grand.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 38%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-900/30 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-16 sm:px-10">
          <p className="text-[11px] font-medium tracking-[0.32em] text-amber-200 uppercase">
            Kerala's Trusted Event Styling Studio
          </p>
          <h1 className="type-display mt-3 max-w-2xl text-[clamp(2.2rem,6vw,3.8rem)] leading-[1.05] tracking-tight text-white">
            About Bala Decors
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            We design your vision — from an intimate housewarming to a
            500-guest wedding reception, our team plans every inch of the
            space so you can simply arrive and celebrate.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 px-6 py-3 text-[13px] font-semibold tracking-wide text-white shadow-lg transition-transform duration-150 active:scale-[0.96]"
            >
              Talk to Expert
            </Link>
            <a
              href="https://wa.me/918883697032"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#25D366] px-6 py-3 text-[13px] font-semibold tracking-wide text-night shadow-lg transition-transform duration-150 active:scale-[0.96]"
            >
              Whatsapp Us
            </a>
          </div>
        </div>

        <a
          href="https://wa.me/918883697032"
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-xl"
          aria-label="Chat on WhatsApp"
          style={{ animation: "float-y 3.5s ease-in-out infinite" }}
        >
          ✆
        </a>
      </section>

      {/* FILLED BACKGROUND WRAPPER for the rest of the page — follows theme
          tokens fully, so it goes fully light in light mode, fully dark in dark mode */}
      <div className="relative bg-[radial-gradient(ellipse_at_top,_var(--color-elevated)_0%,_var(--color-night)_60%)] px-5 py-20 sm:px-10">
        <div className="mx-auto max-w-5xl space-y-24">

          {/* STATS STRIP */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="hairline rounded-[16px] bg-elevated p-5 text-center">
                <p className="type-display text-2xl text-paper sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-[11px] tracking-[0.12em] text-muted uppercase">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* STORY */}
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-[11px] font-medium tracking-[0.24em] text-brass-soft uppercase">
                Our Story
              </p>
              <h2 className="type-display mt-2 text-2xl text-paper sm:text-3xl">
                Turning Every Celebration Into a Memory
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-paper-dim sm:text-base">
                Bala Decors began as a small styling crew working weekend
                weddings around Tirupur, and has since grown into a full
                event-management studio serving Coimbatore, Erode and
                Gobichettipalayam. Along the way, the mission never changed:
                every family and every brand deserves a celebration that feels
                designed just for them.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-paper-dim sm:text-base">
                Today our team plans weddings, puberty functions, baby
                showers, corporate launches and birthday parties — handling
                décor, lighting, seating and stage design as one connected
                experience, start to finish.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <GoldSeal />
                <div>
                  <p className="type-display text-lg text-paper">ISO 9001:2015 Certified</p>
                  <p className="text-[13px] text-paper-dim">
                    Quality-managed event execution, every time.
                  </p>
                </div>
              </div>
            </div>
            <AutoCarousel />
          </div>

          {/* VALUES */}
          <div>
            <p className="text-[11px] font-medium tracking-[0.24em] text-brass-soft uppercase">
              How We Work
            </p>
            <h2 className="type-display mt-2 text-2xl text-paper sm:text-3xl">
              What Sets Bala Decors Apart
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {VALUES.map((value) => (
                <div key={value.title} className="hairline rounded-[18px] bg-elevated p-5">
                  <h3 className="type-display text-lg text-paper">{value.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-paper-dim">{value.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* WHERE WE WORK */}
          <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div>
              <p className="text-[11px] font-medium tracking-[0.24em] text-brass-soft uppercase">
                Where We Work
              </p>
              <h2 className="type-display mt-2 text-2xl text-paper sm:text-3xl">
                Four Cities, One Standard of Finish
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-paper-dim sm:text-base">
                Whether it's a hall in Tirupur, a resort lawn near
                Coimbatore, or a community function hall in Erode or
                Gobichettipalayam, the same crew, checklist and quality
                standard travels with the job — nothing is sub-contracted
                out to a "local partner" you've never met.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["Tirupur", "Coimbatore", "Erode", "Gobichettipalayam"].map((city) => (
                  <div key={city} className="hairline rounded-[14px] bg-elevated px-3 py-3 text-center">
                    <p className="text-[12px] font-medium tracking-wide text-paper">{city}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-64 overflow-hidden rounded-[20px] hairline sm:h-80">
              <img
                src="/media/arch.jpg"
                alt=""
                className="h-full w-full object-cover"
                style={{ objectPosition: "center 40%" }}
              />
            </div>
          </div>

          {/* PROCESS */}
          <div>
            <p className="text-[11px] font-medium tracking-[0.24em] text-brass-soft uppercase">
              How It Works
            </p>
            <h2 className="type-display mt-2 text-2xl text-paper sm:text-3xl">
              From Enquiry to Event Day
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((item) => (
                <div key={item.step} className="hairline rounded-[18px] bg-elevated p-5">
                  <p className="type-display text-3xl text-brass-soft">{item.step}</p>
                  <h3 className="mt-2 text-base font-medium text-paper">{item.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-paper-dim">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SERVICE TILES */}
          <div>
            <p className="text-[11px] font-medium tracking-[0.24em] text-brass-soft uppercase">
              What We Style
            </p>
            <h2 className="type-display mt-2 text-2xl text-paper sm:text-3xl">
              Every Occasion, One Studio
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {TILES.map((tile) => (
                <Link
                  key={tile.title}
                  to="/services"
                  className="group relative block h-56 overflow-hidden rounded-[18px] hairline"
                >
                  <img
                    src={tile.img}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ objectPosition: "center 42%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="type-display text-lg text-white">{tile.title}</p>
                    <p className="mt-1 text-[12px] leading-snug text-white/75">{tile.blurb}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* REEL */}
          <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div>
              <p className="text-[11px] font-medium tracking-[0.24em] text-brass-soft uppercase">
                See Us in Action
              </p>
              <h2 className="type-display mt-2 text-2xl text-paper sm:text-3xl">
                One Reel, Straight From the Field
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper-dim">
                A quick look at a recent setup — more highlights live on our
                Instagram.
              </p>
              <a
                href="https://www.instagram.com/bala_decor_event_planner"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-[12px] tracking-wide text-brass-soft underline underline-offset-2"
              >
                @bala_decor_event_planner
              </a>
            </div>
            <InstagramEmbed url="https://www.instagram.com/reel/DUXsoDugFfN/?stkn=MXN3MGR4d2R5MXI5cA==" />
          </div>

          {/* BLOG / LEARN MORE */}
          <div>
            <p className="text-[11px] font-medium tracking-[0.24em] text-brass-soft uppercase">
              Stories
            </p>
            <h2 className="type-display mt-2 text-2xl text-paper sm:text-3xl">
              From the Bala Decors Journal
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[...BLOG_SEED, ...(showMore ? BLOG_MORE : [])].map((post) => (
                <div key={post.title} className="hairline rounded-[18px] bg-elevated p-5">
                  <h3 className="type-display text-lg text-paper">{post.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-paper-dim">{post.body}</p>
                  <span className="mt-4 inline-block text-[12px] font-medium tracking-wide text-brass-soft">
                    Learn More &gt;&gt;
                  </span>
                </div>
              ))}
            </div>
            {!showMore ? (
              <button
                type="button"
                onClick={() => setShowMore(true)}
                className="mt-8 mx-auto block rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 px-7 py-3 text-[12px] font-semibold tracking-[0.14em] text-white uppercase"
              >
                Load More
              </button>
            ) : null}
          </div>

        </div>
      </div>

      <div className="px-5 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <SiteFooter />
        </div>
      </div>
    </main>
  );
}
