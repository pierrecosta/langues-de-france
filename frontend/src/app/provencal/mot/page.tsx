import type { Metadata } from "next";
import { WordList } from "@/components/WordList";
import { WordSearch } from "@/components/WordSearch";
import { listWords } from "@/lib/api";

export const metadata: Metadata = {
  title: "Mots provençaux",
  description: "Liste des mots provençaux avec recherche.",
  openGraph: { title: "Mots provençaux", locale: "fr_FR", type: "website" },
};

export default async function WordsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw) ?? "";
  const words = await listWords(q);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mots provençaux</h1>
      <WordSearch q={q} />
      <WordList words={words} q={q} />
    </div>
  );
}
