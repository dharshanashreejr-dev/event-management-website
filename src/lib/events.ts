export type EventId =
  | "wedding"
  | "puberty"
  | "babyshower"
  | "corporate"
  | "birthday";

export type EventConfig = {
  id: EventId;
  title: string;
  short: string;
  blurb: string;
  hall: string;
  card: string;
  objectPos: string;
};

export const EVENTS: EventConfig[] = [
  {
    id: "wedding",
    title: "Wedding / Marriage",
    short: "Wedding",
    blurb:
      "Ceremony and reception styling with aisle florals, a composed stage, and warm evening light.",
    hall: "/media/hall-wedding.jpg",
    card: "/media/cards/wedding.jpg",
    objectPos: "center 46%",
  },
  {
    id: "puberty",
    title: "Puberty Function",
    short: "Puberty",
    blurb:
      "Traditional function décor with marigold, jasmine, turmeric drapes, and a ceremonial stage.",
    hall: "/media/hall-puberty.jpg",
    card: "/media/cards/puberty.jpg",
    objectPos: "center 48%",
  },
  {
    id: "babyshower",
    title: "Baby Shower",
    short: "Baby Shower",
    blurb:
      "Soft pastel florals, a gift table, and gentle lighting for an intimate celebration.",
    hall: "/media/hall-babyshower.jpg",
    card: "/media/cards/babyshower.jpg",
    objectPos: "center 44%",
  },
  {
    id: "corporate",
    title: "Corporate Events",
    short: "Corporate",
    blurb:
      "Clean stage, cooler lighting, and a composed hall for conferences, galas, and launches.",
    hall: "/media/hall-corporate.jpg",
    card: "/media/cards/corporate.jpg",
    objectPos: "center 42%",
  },
  {
    id: "birthday",
    title: "Birthday Party",
    short: "Birthday",
    blurb:
      "Festive yet composed styling with a cake table, string lights, and a tailored stage.",
    hall: "/media/hall-birthday.jpg",
    card: "/media/cards/birthday.jpg",
    objectPos: "center 45%",
  },
];

export const GRAND_HALL = {
  title: "Grand Hall",
  hall: "/media/hall-grand.jpg",
  blurb:
    "Chandelier-lit celebration hall with arched windows and a ready stage. Choose an occasion to restyle it.",
};

export const MEDIA = {
  exterior: "/media/exterior.jpg",
  arch: "/media/arch.jpg",
  enter: "/media/enter.mp4",
};

export function eventById(id: EventId) {
  const found = EVENTS.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown event: ${id}`);
  return found;
}
