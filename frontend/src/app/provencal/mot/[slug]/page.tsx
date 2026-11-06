import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WordDetail } from "@/components/WordDetail";
import { getWord } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const word = await getWord((await params).slug);
  if (!word) return { title: "Mot introuvable" };
  const title = `${word.local} (${word.french})`;
  return {
    title,
    description: `${word.local} : ${word.french} en provençal.`,
    robots: { index: false, follow: false },
    openGraph: { title, locale: "fr_FR", type: "article" },
  };
}

export default async function WordPage({ params }: Props) {
  const word = await getWord((await params).slug);
  if (!word) notFound();
  return (
    <div className="space-y-6">
      <Link href="/provencal/mot" className="underline">
        ← Tous les mots
      </Link>
      <WordDetail word={word} />
    </div>
  );
}
