import type { Metadata } from "next";
import { Quiz } from "@/components/Quiz";
import words from "@/lib/words-fixture.json";

export const metadata: Metadata = {
  title: "Quiz provençal — démonstration",
  description: "Essayez un quiz de démonstration sur quelques mots provençaux.",
  robots: { index: false, follow: false },
  openGraph: { title: "Quiz provençal — démonstration", locale: "fr_FR", type: "website" },
};

export default function QuizPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Quiz provençal</h1>
      <p className="demo-notice rounded-md border border-border p-4">
        Démonstration : ce quiz utilise des mots locaux de test, pas les mots publiés du dictionnaire.
        Aucun compte n’est nécessaire et le score n’est pas enregistré.
      </p>
      <Quiz words={words} />
    </div>
  );
}
