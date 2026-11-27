import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUpcomingLanguage, upcomingLanguages } from "@/lib/languages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return upcomingLanguages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const language = getUpcomingLanguage((await params).slug);
  if (!language) return { title: "Langue introuvable" };
  const title = `${language.name} — espace en construction`;
  return {
    title,
    description: `L’espace ${language.name} est en cours de construction.`,
    robots: { index: false, follow: false },
    openGraph: { title, locale: "fr_FR", type: "website" },
  };
}

export default async function UpcomingLanguagePage({ params }: Props) {
  const language = getUpcomingLanguage((await params).slug);
  if (!language) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{language.name}</h1>
      <p className="rounded-md border border-border bg-surface p-4">
        Cet espace est en cours de construction et ne propose pas encore de contenu.
        Aucune date d’ouverture n’est annoncée.
      </p>
      <p><Link className="text-primary underline" href="/carte">Retour à la carte</Link></p>
      <p><Link className="text-primary underline" href="/provencal">Découvrir l’espace provençal</Link></p>
    </div>
  );
}
