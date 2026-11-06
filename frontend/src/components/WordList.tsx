import Link from "next/link";
import { TERRITORY, type Word } from "@/lib/api";

export function WordList({ words, q }: { words: Word[]; q: string }) {
  if (words.length === 0) {
    return (
      <p role="status">
        Aucun mot ne correspond à « {q} ».{" "}
        <Link href="/provencal/mot" className="underline">
          Parcourir toute la liste
        </Link>
        .
      </p>
    );
  }
  return (
    <>
      <p role="status" className="text-muted">
        {words.length} mot{words.length > 1 ? "s" : ""}
      </p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {words.map((w) => (
          <li key={w.slug}>
            <Link
              href={`/${TERRITORY}/mot/${w.slug}`}
              className="block rounded-md border border-border p-3 hover:bg-surface"
            >
              <span className="font-semibold">{w.local}</span>
              <span className="text-muted"> — {w.french}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
