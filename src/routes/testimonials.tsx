import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/bala/PageShell";
import { InstagramEmbed } from "@/components/bala/InstagramEmbed";

export const Route = createFileRoute("/testimonials")({ component: Testimonials });

// Demo content for showcase purposes — replace with real client reviews once shared.
const REVIEWS = [
  {
    quote:
      "Excellent... everyone was surprised seeing the setup. Definitely will invite them for our next function too. Highly recommended, it was the highlight of our whole wedding.",
    name: "Anjali & Rahul",
    tag: "Wedding · Coimbatore",
    initials: "AR",
    time: "3 months ago",
  },
  {
    quote:
      "This is the best event decor team in Coimbatore. Our product launch stage was amazing with this company. Very professional and on time with everything.",
    name: "Sathish Kumar",
    tag: "Corporate Event · Erode",
    initials: "SK",
    time: "2 months ago",
  },
  {
    quote:
      "In my point of view, best decorators in Tirupur and very good with traditional styling. Our daughter's puberty function looked beautiful.",
    name: "Priya Menon",
    tag: "Puberty Function · Tirupur",
    initials: "PM",
    time: "4 months ago",
  },
  {
    quote:
      "From the balloon arch to the cake table, everything matched the theme perfectly. My son had the best birthday yet — guests are still talking about it.",
    name: "Karthik Raja",
    tag: "Birthday Party · Gobichettipalayam",
    initials: "KR",
    time: "1 month ago",
  },
  {
    quote:
      "Soft, pastel and exactly the mood we wanted for the baby shower. The photo corner was a huge hit with our guests, thank you Bala Decors team.",
    name: "Divya & Family",
    tag: "Baby Shower · Coimbatore",
    initials: "DF",
    time: "5 months ago",
  },
  {
    quote:
      "The grand entry walkway they set up for our reception was unforgettable — lighting, timing, everything was spot on. Worth every rupee.",
    name: "Naveen & Meera",
    tag: "Bride & Groom Entry · Tirupur",
    initials: "NM",
    time: "6 months ago",
  },
];

const VIDEO_REVIEWS: Array<{ url: string; title: string; tag: string }> = [
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
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-brass-soft" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.54-5.17 3.54-8.66z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.87-3.01c-1.08.72-2.46 1.15-4.06 1.15-3.12 0-5.77-2.11-6.72-4.94H1.28v3.1A11.99 11.99 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.28a12 12 0 0 0 0 10.78l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.28 6.61l4 3.1C6.23 6.86 8.88 4.75 12 4.75z"
      />
    </svg>
  );
}

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.quote.length > 120;

  return (
    <figure className="hairline flex h-full flex-col justify-between rounded-[20px] bg-elevated p-5">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Stars />
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-brass-soft" aria-label="Verified">
              <path
                fill="currentColor"
                d="M12 2 9.5 4.5 6 4l-1 3.5L1.5 9 3 12l-1.5 3L6 16l1 3.5L9.5 19.5 12 22l2.5-2.5 3.5.5 1-3.5 3.5-1.5L21 12l1.5-3L19 6l-1-3.5L14.5 4.5z"
              />
            </svg>
          </div>
          <GoogleMark />
        </div>
        <blockquote className="type-display mt-3 text-[14.5px] italic leading-relaxed text-paper-dim">
          “{expanded || !isLong ? review.quote : `${review.quote.slice(0, 120)}…`}”
        </blockquote>
        {isLong ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-1.5 text-[11px] font-medium tracking-wide text-brass-soft uppercase"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        ) : null}
      </div>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="hairline flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brass/25 text-[12px] font-medium text-paper">
          {review.initials}
        </span>
        <span>
          <span className="block text-[12.5px] font-medium text-paper">{review.name}</span>
          <span className="block text-[11px] tracking-wide text-muted uppercase">
            {review.tag} · {review.time}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

function Testimonials() {
  return (
    <>
      {/* Hero image — stretched vertical length to match grand banner proportion */}
      <div className="relative flex h-[90vh] min-h-[640px] w-full items-end overflow-hidden sm:h-[95vh] sm:min-h-[760px]">
        <img
          src="/media/hall-corporate.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 15%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        <div className="relative mx-auto w-full max-w-5xl px-5 pb-20 sm:px-10">
          <p className="text-[11px] font-medium tracking-[0.32em] text-amber-200 uppercase">
            Client Testimonials
          </p>
          <h1 className="type-display mt-3 text-[clamp(2.2rem,6vw,3.6rem)] leading-[1.05] tracking-tight text-white">
            See What Our Clients Have to Say
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            Clients keep coming back to Bala Decors for the attention to
            detail, the on-time setup and the stress-free planning
            experience — here's some of that feedback, straight from the
            families and companies we've worked with.
          </p>
        </div>
      </div>

      <PageShell
        eyebrow="Reviews"
        title="Google & Video Reviews"
        intro="Demo reviews shown for showcase purposes — send over your real client feedback and we'll drop it in exactly as shared."
      >
        {/* Google-style review cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((review) => (
          <ReviewCard key={review.name + review.tag} review={review} />
        ))}
      </div>

      {/* Video reviews */}
      <div className="mt-16">
        <p className="text-[11px] font-medium tracking-[0.24em] text-brass-soft uppercase">
          Video Reviews
        </p>
        <h2 className="type-display mt-2 text-2xl text-paper">
          Watch Our Video Reviews
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-paper-dim">
          Hear directly from our clients about their experience with Bala
          Decors — short clips straight from the events we've styled.
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {VIDEO_REVIEWS.map((reel) => (
          <div key={reel.url} className="w-full max-w-[260px] justify-self-center sm:justify-self-auto">
            <InstagramEmbed url={reel.url} caption={`${reel.title} · ${reel.tag}`} />
          </div>
        ))}
      </div>
      </PageShell>
    </>
  );
}