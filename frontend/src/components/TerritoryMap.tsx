import Link from "next/link";
import map from "@/lib/map-data.json";

export function TerritoryMap() {
  return (
    <div className="space-y-6">
      <p>
        La Provence est le seul espace actuellement ouvert. Le repère indique un point d’accès
        situé à Marseille ; il ne délimite pas le territoire linguistique provençal.
      </p>
      <section aria-labelledby="metropolitan-heading" className="space-y-3">
        <h2 id="metropolitan-heading" className="text-xl font-bold">France métropolitaine</h2>
        <div className="relative mx-auto w-full max-w-lg rounded-md border border-border bg-surface">
          <svg viewBox="0 0 400 320" className="block h-auto w-full" aria-hidden="true">
            <path d={map.metropolitan.path} fill="var(--color-border)" fillRule="evenodd" />
          </svg>
          <Link
            href="/provencal"
            aria-label="Ouvrir l’espace provençal depuis la carte"
            className="absolute flex min-h-12 min-w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary font-bold text-on-primary shadow-lg hover:underline"
            style={{ left: `${map.metropolitan.marker.x}%`, top: `${map.metropolitan.marker.y}%` }}
          >
            <span aria-hidden="true">●</span>
          </Link>
        </div>
        <p>
          <Link href="/provencal" className="font-medium text-primary underline">
            Ouvrir l’espace provençal
          </Link>
        </p>
      </section>
      <section aria-labelledby="overseas-heading" className="space-y-3">
        <h2 id="overseas-heading" className="text-xl font-bold">France d’outre-mer</h2>
        <p>Ces territoires sont représentés à des échelles différentes et ne sont pas encore ouverts. Certains archipels très dispersés apparaissent sous forme de petits points.</p>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {map.overseas.map((territory) => (
            <li key={territory.id} className="rounded-md border border-border bg-surface p-3">
              <svg viewBox="0 0 400 320" className="block h-auto w-full" aria-hidden="true">
                <path d={territory.path} fill="var(--color-border)" fillRule="evenodd" />
              </svg>
              <p className="text-sm font-medium">{territory.name}</p>
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
