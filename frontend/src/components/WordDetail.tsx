import type { Word } from "@/lib/api";

export function WordDetail({ word }: { word: Word }) {
  const variants = Object.entries(word.variants);
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold">{word.local}</h1>
      <dl className="space-y-2">
        <div>
          <dt className="font-semibold">Traduction</dt>
          <dd>{word.french}</dd>
        </div>
        {word.pronunciation && (
          <div>
            <dt className="font-semibold">Prononciation</dt>
            <dd>{word.pronunciation}</dd>
          </div>
        )}
        {word.category && (
          <div>
            <dt className="font-semibold">Catégorie</dt>
            <dd>{word.category}</dd>
          </div>
        )}
        {variants.length > 0 && (
          <div>
            <dt className="font-semibold">Variantes</dt>
            <dd>
              <ul>
                {variants.map(([name, value]) => (
                  <li key={name}>
                    {name} : {value}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}
        {word.example && (
          <div>
            <dt className="font-semibold">Exemple</dt>
            <dd>
              {word.example}
              {word.example_translation && (
                <span className="block text-muted">{word.example_translation}</span>
              )}
            </dd>
          </div>
        )}
        {word.cultural_notes && (
          <div>
            <dt className="font-semibold">Note culturelle</dt>
            <dd>{word.cultural_notes}</dd>
          </div>
        )}
      </dl>
    </article>
  );
}
