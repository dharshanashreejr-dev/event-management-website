import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/bala/PageShell";
import { SectionTabs } from "@/components/bala/SectionTabs";
import { Faq } from "@/components/bala/Faq";

export const Route = createFileRoute("/services")({ component: Services });

type ServiceCard = {
  id: string;
  title: string;
  navLabel: string;
  tagline: string;
  detail: string;
  story: string[];
  hall: string;
  tags: string[];
  highlights: string[];
  wash: string;
};

const SERVICES: ServiceCard[] = [
  {
    id: "wedding",
    title: "Wedding / Marriage",
    navLabel: "Wedding",
    tagline: "One Theme, Arrival to Reception",
    detail:
      "Stage & mandap décor, entrance arches, floral backdrops, reception setups, bridal décor, ambient lighting and guest seating arrangements — planned as one cohesive theme from arrival to reception.",
    story: [
      "We start with your palette and venue walkthrough, then design a single visual theme that carries from the entrance arch through to the mandap, stage and reception floor — so nothing feels stitched together at the last minute.",
      "On the day, our team handles setup, lighting cues and last-minute styling touch-ups so your families can focus on the ceremony instead of the décor timeline.",
    ],
    hall: "/media/hall-wedding.jpg",
    tags: ["Mandap Décor", "Entrance Arch", "Bridal Styling", "Reception"],
    highlights: [
      "Themed mandap & stage design",
      "Floral entrance arches",
      "Reception floor & table styling",
      "On-site setup & live touch-ups",
    ],
    wash: "bg-wash-wedding",
  },
  {
    id: "puberty",
    title: "Puberty Function",
    navLabel: "Puberty",
    tagline: "Tradition First, Styled Beautifully",
    detail:
      "Traditional theme stages, floral & balloon backdrops, elegant seating, entrance décor and fully customized themes true to family tradition.",
    story: [
      "These functions carry a lot of family tradition, so we design around the rituals first — a stage that respects custom, then layer in colour, floral work and balloon detailing that still feels festive and personal.",
      "We coordinate seating layouts and entrance décor around your guest count and hall shape so the flow of the day stays smooth from start to finish.",
    ],
    hall: "/media/hall-puberty.jpg",
    tags: ["Theme Stage", "Balloon Art", "Traditional Décor"],
    highlights: [
      "Traditional theme stage design",
      "Floral & balloon backdrops",
      "Guest seating layout planning",
      "Custom colour themes",
    ],
    wash: "bg-wash-puberty",
  },
  {
    id: "babyshower",
    title: "Baby Shower",
    navLabel: "Baby Shower",
    tagline: "A Joyful, Photo-Ready Reveal",
    detail:
      "Themed backdrops, balloon arches, photo booths, table styling, welcome décor and fully customized setups for a joyful reveal.",
    story: [
      "Whether it's a soft pastel theme or a bold gender-reveal moment, we build the backdrop and photo corner as the centrepiece, then style tables and welcome décor to match.",
      "Every setup is customised — from balloon arch shape to prop selection — so the space photographs beautifully and feels personal to the parents-to-be.",
    ],
    hall: "/media/hall-babyshower.jpg",
    tags: ["Photo Booth", "Table Styling", "Welcome Décor"],
    highlights: [
      "Themed backdrop & balloon arches",
      "Photo booth & prop styling",
      "Table & welcome décor",
      "Gender-reveal setups on request",
    ],
    wash: "bg-wash-baby",
  },
  {
    id: "corporate",
    title: "Corporate Events",
    navLabel: "Corporate",
    tagline: "Polished, On-Brand, On Time",
    detail:
      "Branded stages, product launches, seminar setups, corporate décor, signage, lighting and structured seating for a polished, professional finish.",
    story: [
      "For product launches, seminars and company milestones, we build a stage and signage system around your brand colours and logo placement, keeping the look clean and professional rather than festive.",
      "We handle structured seating, lighting and AV-friendly staging so presenters, cameras and audiences all have a clear line of sight.",
    ],
    hall: "/media/hall-corporate.jpg",
    tags: ["Product Launch", "Signage", "Seminar Setup"],
    highlights: [
      "Branded stage & backdrop design",
      "Signage & wayfinding",
      "Structured seating layouts",
      "Lighting for stage & photography",
    ],
    wash: "bg-wash-corporate",
  },
  {
    id: "birthday",
    title: "Birthday Party",
    navLabel: "Birthday",
    tagline: "A Complete Setup, Every Age",
    detail:
      "Themed decorations, balloon décor, custom backdrops, cake tables, photo zones, lighting and complete party setups for every age.",
    story: [
      "From a first birthday to a milestone celebration, we build the theme around the age and personality of the guest of honour — colour, characters or a more grown-up palette, all custom to the brief.",
      "Cake tables, photo zones and ambient lighting are designed together so every corner of the party space feels intentional.",
    ],
    hall: "/media/hall-birthday.jpg",
    tags: ["Cake Table", "Photo Zone", "Themed Décor"],
    highlights: [
      "Custom theme & backdrop design",
      "Cake table & dessert styling",
      "Photo zone setup",
      "Setups for every age group",
    ],
    wash: "bg-wash-birthday",
  },
  {
    id: "grand",
    title: "Bride & Groom Luxury Entry",
    navLabel: "Grand Entry",
    tagline: "A Cinematic, Choreographed Arrival",
    detail:
      "Grand entrance experiences — floral tunnels, fog & spotlight effects, choreographed walkways and cinematic reveals for an unforgettable arrival.",
    story: [
      "This is our signature moment — a floral tunnel or lit walkway, fog effects and a spotlight reveal timed to your entry music, choreographed with the hall's layout in mind.",
      "We plan the full sequence in advance — cues, lighting and crew positions — so the arrival plays out exactly as rehearsed, with zero surprises on the day.",
    ],
    hall: "/media/hall-grand.jpg",
    tags: ["Floral Tunnel", "Spotlight Walk", "Grand Reveal"],
    highlights: [
      "Floral tunnel & lit walkways",
      "Fog & spotlight effects",
      "Choreographed entry timing",
      "Live percussion cues on request",
    ],
    wash: "bg-wash-grand",
  },
];

const TABS = SERVICES.map((service) => ({ id: service.id, label: service.navLabel }));

const OFFERINGS = [
  "Stage Decoration",
  "Mandap Decoration",
  "Floral Decoration",
  "Balloon Decoration",
  "Entrance Decoration",
  "Reception Decoration",
  "Photo Booths",
  "Lighting & Ambience",
  "Table & Seating Styling",
  "Theme-Based Décor",
  "Custom Event Setups",
];

const FAQS = [
  {
    question: "How far in advance should we book?",
    answer:
      "For weddings and grand-entry setups, 2–3 months ahead gives us the most flexibility on themes and materials. For birthdays, baby showers and corporate events, 2–3 weeks is usually enough — but earlier is always better during peak season.",
  },
  {
    question: "Do you work at venues outside Tirupur?",
    answer:
      "Yes — alongside Tirupur, we regularly take on events across Coimbatore, Erode and Gobichettipalayam. Share your venue and date and we'll confirm availability.",
  },
  {
    question: "Can you customise a theme we've seen elsewhere?",
    answer:
      "Absolutely. Share references, colours or inspiration and we'll adapt the concept to your venue, budget and guest count rather than copying it exactly — so it still feels made for your event.",
  },
  {
    question: "What's included in a typical quote?",
    answer:
      "Décor design, materials, on-site setup and breakdown, and a dedicated team on the event day. Lighting, photo booths and add-ons like fog or spotlight effects are quoted separately based on what you choose.",
  },
  {
    question: "How do we get started?",
    answer:
      "Send us your event date, venue and the occasion via WhatsApp or the contact form. We'll follow up with theme ideas and a quote tailored to your guest count and budget.",
  },
];

function Services() {
  return (
    <>
      {/* Hero image — fully maxed vertical length matching grand layout proportion */}
      <div className="relative flex h-[90vh] min-h-[640px] w-full items-end overflow-hidden sm:h-[95vh] sm:min-h-[760px]">
        <img
          src="/media/hall-wedding.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 15%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        <div className="relative mx-auto w-full max-w-5xl px-5 pb-20 sm:px-10">
          <p className="text-[11px] font-medium tracking-[0.32em] text-amber-200 uppercase">
            Our Services
          </p>
          <h1 className="type-display mt-3 text-[clamp(2.2rem,6vw,3.6rem)] leading-[1.05] tracking-tight text-white">
            Reveal Our Services
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            Every category below is tailored to your venue, budget and theme.
            Jump to a category or scroll through — tell us the occasion and
            we'll take it from there.
          </p>
        </div>
      </div>

      <PageShell
        eyebrow="Our Services"
        title="Explore What We Offer"
        intro="Browse through our curated packages and specialized decor arrangements designed for every milestone celebration."
      >
        <SectionTabs tabs={TABS} />

        <div id="overview" className="scroll-mt-40 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="group hairline block overflow-hidden rounded-[20px] bg-elevated/60 opacity-0 [animation-fill-mode:forwards]"
              style={{
                animation: "card-in 0.6s ease-out forwards",
                animationDelay: `${index * 90}ms`,
              }}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={service.hall}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  style={{ objectPosition: "center 45%" }}
                />
                <div
                  className={`absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-40 ${service.wash}`}
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-night/80 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="type-display text-lg text-paper">{service.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-paper-dim">
                  {service.detail}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="hairline rounded-full bg-night/40 px-2.5 py-1 text-[10px] tracking-wide text-muted uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-16">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-40 grid gap-8 overflow-hidden rounded-[24px] bg-elevated/60 p-6 hairline md:grid-cols-2 md:items-center md:p-8"
            >
              <div
                className={`relative h-64 overflow-hidden rounded-[18px] md:h-80 ${
                  index % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <img
                  src={service.hall}
                  alt=""
                  className="h-full w-full object-cover"
                  style={{ objectPosition: "center 40%" }}
                />
                <div className={`absolute inset-0 opacity-25 mix-blend-soft-light ${service.wash}`} />
              </div>
              <div>
                <p className="text-[11px] font-medium tracking-[0.24em] text-brass-soft uppercase">
                  {service.title}
                </p>
                <h3 className="type-display mt-2 text-2xl text-paper">
                  {service.tagline}
                </h3>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-paper-dim">
                  {service.story.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {service.highlights.map((item) => (
                    <li
                      key={item}
                      className="hairline rounded-[12px] bg-night/30 px-3 py-2 text-[12px] text-paper-dim"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex min-h-11 items-center bg-paper px-5 py-2 text-[12px] font-medium tracking-[0.14em] text-night uppercase transition-transform duration-150 hover:bg-paper-dim active:scale-[0.96]"
                >
                  Enquire for This
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <p className="text-[11px] font-medium tracking-[0.24em] text-brass-soft uppercase">
            Also Showcasing
          </p>
          <h2 className="type-display mt-2 text-2xl text-paper">
            Every Detail, Styled to Perfection
          </h2>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {OFFERINGS.map((item, index) => (
              <span
                key={item}
                className="hairline rounded-full bg-elevated/60 px-4 py-2 text-[12px] text-paper-dim transition-colors duration-200 hover:bg-brass/20 hover:text-paper opacity-0 [animation-fill-mode:forwards]"
                style={{
                  animation: "card-in 0.5s ease-out forwards",
                  animationDelay: `${index * 55}ms`,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <p className="text-[11px] font-medium tracking-[0.24em] text-brass-soft uppercase">
            Good to Know
          </p>
          <h2 className="type-display mt-2 text-2xl text-paper">Frequently Asked Questions</h2>
          <div className="mt-5">
            <Faq items={FAQS} />
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 hairline rounded-[20px] bg-elevated/60 p-6">
          <p className="text-sm text-paper-dim">
            Ready to plan your event? Share your date and venue and we'll get back
            with a plan.
          </p>
          <Link
            to="/contact"
            className="min-h-11 flex items-center bg-paper px-5 py-2 text-[12px] font-medium tracking-[0.14em] text-night uppercase transition-transform duration-150 hover:bg-paper-dim active:scale-[0.96]"
          >
            Enquire Now
          </Link>
        </div>
      </PageShell>
    </>
  );
}