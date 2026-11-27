export const upcomingLanguages = [
  { slug: "picard", name: "Picard / ch’ti", marker: "1", place: "Lille" },
  { slug: "breton", name: "Breton", marker: "2", place: "Quimper" },
  { slug: "basque", name: "Basque", marker: "3", place: "Bayonne" },
  { slug: "corse", name: "Corse", marker: "4", place: "Ajaccio" },
  { slug: "creole-reunionnais", name: "Créole réunionnais", marker: "5", place: "La Réunion" },
] as const;

export function getUpcomingLanguage(slug: string) {
  return upcomingLanguages.find((language) => language.slug === slug);
}
