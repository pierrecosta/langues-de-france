export type DemoEvent = {
  slug: string;
  title: string;
  description: string;
  place: string;
  date: string;
};

const templates = [
  {
    slug: "atelier-decouverte",
    title: "Atelier de découverte du provençal",
    description: "Un atelier imaginaire pour découvrir quelques mots et expressions en provençal.",
    place: "Maison de quartier fictive, Provence",
    daysFromToday: 7,
  },
  {
    slug: "rencontre-conversation",
    title: "Rencontre autour de la langue",
    description: "Une rencontre imaginaire pour échanger autour de la langue et de sa transmission.",
    place: "Médiathèque fictive, Provence",
    daysFromToday: 14,
  },
  {
    slug: "soiree-contes",
    title: "Soirée de contes provençaux",
    description: "Une soirée imaginaire consacrée aux histoires et aux sonorités du provençal.",
    place: "Salle culturelle fictive, Provence",
    daysFromToday: 21,
  },
];

export function demoEvents(now: Date): DemoEvent[] {
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return templates.map(({ daysFromToday, ...event }) => ({
    ...event,
    date: new Date(today + daysFromToday * 86_400_000).toISOString().slice(0, 10),
  }));
}

export function formatEventDate(date: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
