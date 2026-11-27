import Link from "next/link";
import map from "@/lib/map-data.json";
import { upcomingLanguages } from "@/lib/languages";

type Marker = { x: number; y: number };

function UpcomingMarker({ language, position }: {
  language: (typeof upcomingLanguages)[number];
  position: Marker;
}) {
  return (
    <Link
      href={`/langues/${language.slug}`}
      aria-label={`${language.name} : espace en construction`}
      className="absolute flex min-h-12 min-w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary bg-surface font-bold text-primary hover:underline"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      <span aria-hidden="true">{language.marker}</span>
    </Link>
  );
}

export function TerritoryMap() {
  return (
    <div className="space-y-6">
      <p>
        Le provençal est le seul espace disposant de contenus. Les repères numérotés conduisent
        aux pages des autres langues prévues, encore en construction. Ils indiquent des points
        d’accès indicatifs et ne délimitent aucun territoire linguistique.
      </p>
      <section aria-labelledby="metropolitan-heading" className="editorial-section space-y-4">
        <h2 id="metropolitan-heading" className="text-xl font-bold">France métropolitaine</h2>
        <div className="relative mx-auto w-full max-w-lg rounded-md border border-border bg-surface">
          <svg viewBox="0 0 400 320" className="block h-auto w-full" aria-hidden="true">
            <path d={map.metropolitan.path} fill="var(--color-border)" fillRule="evenodd" />
          </svg>
          <Link
            href="/provencal"
            aria-label="Ouvrir l’espace provençal depuis la carte"
            className="absolute flex min-h-12 min-w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary font-bold text-on-primary shadow-lg hover:underline"
            style={{ left: `${map.metropolitan.markers.provencal.x}%`, top: `${map.metropolitan.markers.provencal.y}%` }}
          >
            <span aria-hidden="true">●</span>
          </Link>
          {upcomingLanguages.map((language) => {
            if (language.slug === "creole-reunionnais") return null;
            const position = map.metropolitan.markers[language.slug];
            return <UpcomingMarker key={language.slug} language={language} position={position} />;
          })}
        </div>
        <p>
          <Link href="/provencal" className="font-medium text-primary underline">
            Ouvrir l’espace provençal
          </Link>
        </p>
      </section>
      <section aria-labelledby="overseas-heading" className="editorial-section space-y-4">
        <h2 id="overseas-heading" className="text-xl font-bold">France d’outre-mer</h2>
        <p>Ces territoires sont représentés à des échelles différentes. Certains archipels très dispersés apparaissent sous forme de petits points.</p>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {map.overseas.map((territory) => (
            <li key={territory.id} className="rounded-md border border-border bg-surface p-3">
              <div className="relative">
                <svg viewBox="0 0 400 320" className="block h-auto w-full" aria-hidden="true">
                  <path d={territory.path} fill="var(--color-border)" fillRule="evenodd" />
                </svg>
                {"markers" in territory && territory.markers && (
                  <UpcomingMarker language={upcomingLanguages[4]} position={territory.markers["creole-reunionnais"]} />
                )}
              </div>
              <p className="text-sm font-medium">{territory.name}</p>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="languages-heading" className="editorial-section space-y-4">
        <h2 id="languages-heading" className="text-xl font-bold">Langues en construction</h2>
        <p>Les repères correspondent à des points indicatifs, pas à des frontières linguistiques.</p>
        <ul className="space-y-2">
          {upcomingLanguages.map((language) => (
            <li key={language.slug}>
              <Link className="text-primary underline" href={`/langues/${language.slug}`}>
                {language.marker}. {language.name} — espace en construction
              </Link>
              {" "}({language.place})
            </li>
          ))}
        </ul>
      </section>
      <p className="text-sm text-muted">
        Contours administratifs simplifiés, sans valeur de frontière linguistique. Source :{" "}
        <a className="underline" href="https://www.data.gouv.fr/datasets/contours-administratifs">
          data.gouv.fr, contours administratifs 2026
        </a>
        {" "}— IGN, © contributeurs OpenStreetMap et autres sources ;{" "}
        <a className="underline" href="https://opendatacommons.org/licenses/odbl/1-0/">
          licence ODbL
        </a>.
      </p>
    </div>
  );
}
