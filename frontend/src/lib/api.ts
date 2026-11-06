import fixture from "./words-fixture.json";

export type Word = {
  slug: string;
  french: string;
  local: string;
  pronunciation: string;
  category: string;
  subcategory: string;
  variants: Record<string, string>;
  origin: string;
  example: string;
  example_translation: string;
  cultural_notes: string;
  false_friend: string;
  sensitivity_level: string;
  historical_status: string;
  source_url: string;
};

export const TERRITORY = "provencal";

/** Minuscules sans accents : « Été » et « ete » se correspondent. */
export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim();
}

const localWords = fixture as Word[];

function searchLocal(q: string): Word[] {
  const needle = normalize(q);
  if (!needle) return localWords;
  return localWords.filter(
    (w) => normalize(w.french).includes(needle) || normalize(w.local).includes(needle),
  );
}

function apiBase(): string | undefined {
  return process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || undefined;
}

async function fetchJson<T>(path: string): Promise<T | null> {
  const base = apiBase();
  if (!base) return null;
  try {
    const res = await fetch(`${base}/api/territories/${TERRITORY}/words${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (res.status === 404) throw new NotFound();
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (error) {
    if (error instanceof NotFound) throw error;
    return null; // API injoignable : repli sur les données locales
  }
}

class NotFound extends Error {}

/** Liste des mots publiés ; accepte une réponse tableau ou paginée ({ results }). */
export async function listWords(q = ""): Promise<Word[]> {
  const query = q.trim() ? `?q=${encodeURIComponent(q.trim())}` : "";
  try {
    const data = await fetchJson<Word[] | { results: Word[] }>(query);
    if (data) return Array.isArray(data) ? data : data.results;
  } catch (error) {
    if (!(error instanceof NotFound)) throw error;
  }
  return searchLocal(q);
}

/** Fiche d'un mot, ou null si absente (404). */
export async function getWord(slug: string): Promise<Word | null> {
  try {
    const data = await fetchJson<Word>(`/${encodeURIComponent(slug)}`);
    if (data) return data;
  } catch (error) {
    if (error instanceof NotFound) return null;
    throw error;
  }
  return localWords.find((w) => w.slug === slug) ?? null;
}
