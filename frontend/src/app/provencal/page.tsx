import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Provençal",
  description: "Découvrir le provençal : mots, expressions et culture.",
  openGraph: { title: "Provençal", locale: "fr_FR", type: "website" },
};

export default function ProvencalHome() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Le provençal</h1>
      <p>
        Bienvenue sur l’espace dédié au provençal. Parcourez les mots, découvrez leur prononciation
        et leurs exemples, sans compte.
      </p>
      <Link
        href="/provencal/mot"
        className="inline-block rounded-md bg-primary px-4 py-2 font-medium text-on-primary"
      >
        Parcourir les mots
      </Link>
    </div>
  );
}
