import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Provençal",
  description: "Découvrir le provençal : mots, expressions et culture.",
  openGraph: { title: "Provençal", locale: "fr_FR", type: "website" },
};

export default function ProvencalHome() {
  return (
    <div className="space-y-10">
      <div className="home-intro space-y-6">
        <h1 className="text-3xl font-bold">Le provençal</h1>
        <p>
          Bienvenue sur l’espace dédié au provençal. Parcourez les mots, découvrez leur prononciation
          et leurs exemples, sans compte.
        </p>
        <div className="home-links">
          <Link
            href="/provencal/mot"
            className="rounded-md bg-primary px-4 py-2 font-medium text-on-primary"
          >
            Parcourir les mots
          </Link>
          <Link href="/provencal/quiz" className="text-primary underline">
            Essayer le quiz de démonstration
          </Link>
          <Link href="/carte" className="text-primary underline">
            Voir la carte des territoires
          </Link>
          <Link href="/provencal/evenement" className="text-primary underline">
            Découvrir l’agenda de démonstration
          </Link>
        </div>
      </div>
      <section aria-labelledby="origins-heading" className="editorial-section space-y-3">
        <h2 id="origins-heading" className="text-2xl font-bold">La langue et ses origines</h2>
        <p>
          Le provençal est une langue romane, issue du latin parlé au fil des siècles.
          Il appartient à l’ensemble des parlers de langue d’oc, aux côtés d’autres variétés
          régionales. Au Moyen Âge, les troubadours ont fait rayonner la poésie en langue d’oc.
          Le provençal présente des usages et des traditions d’écriture variés ; les graphies
          mistralienne et classique coexistent. Au XIXᵉ siècle, Frédéric Mistral et les
          félibres ont œuvré à sa transmission et à son renouveau littéraire.
        </p>
      </section>
      <section aria-labelledby="speakers-heading" className="editorial-section space-y-3">
        <h2 id="speakers-heading" className="text-2xl font-bold">Combien de locuteurs ?</h2>
        <p>
          Il n’existe pas ici de chiffre actuel fiable pour le seul provençal. À titre historique,
          une analyse de l’enquête « Étude de l’histoire familiale » de 1999 estimait à environ
          99 000 les personnes déclarant utiliser parfois le provençal avec leurs proches dans
          le périmètre provençal étudié. Ce chiffre ancien mesure un usage déclaré, pas le nombre
          actuel de tous les locuteurs ; son périmètre ne couvre pas tous les lieux où la langue est parlée.
        </p>
        <p>
          <a className="text-primary underline" href="https://www.researchgate.net/publication/341079131_Le_volet_linguistique_du_recensement_francais_de_1999_resultats_et_analyse_appliques_a_la_Provence_plurilingue_et_au_provencal">
            Analyse de l’enquête de 1999 par Philippe Blanchet et ses coauteurs
          </a>
          {" "}·{" "}
          <a className="text-primary underline" href="https://www.insee.fr/fr/metadonnees/source/serie/s1014">
            Présentation de l’enquête par l’Insee
          </a>
        </p>
      </section>
      <section aria-labelledby="culture-heading" className="editorial-section space-y-3">
        <h2 id="culture-heading" className="text-2xl font-bold">Une culture vivante</h2>
        <p>
          Le provençal accompagne une riche tradition de récits, de poésie et de chants.
          Le Félibrige, fondé en 1854, a contribué à faire connaître la langue d’oc et ses œuvres.
          Frédéric Mistral a publié <em>Mirèio</em> et le dictionnaire <em>Lou Tresor dóu Felibrige</em> ;
          il a reçu le prix Nobel de littérature en 1904. Sa démarche a aussi inspiré la
          préservation de pratiques et d’objets au Museon Arlaten.
        </p>
        <p>
          La culture provençale se transmet aussi dans les fêtes, les repas, les histoires
          et les échanges entre générations. Parmi les traditions de Noël figurent le gros
          souper et les treize desserts, dont la composition varie selon les familles.
          Aujourd’hui, enseignants, associations, institutions et personnes qui parlent
          la langue continuent de la faire vivre. Des cours universitaires associent son
          apprentissage à la découverte de sa littérature et de sa culture.
        </p>
      </section>
      <section aria-labelledby="resources-heading" className="editorial-section space-y-3">
        <h2 id="resources-heading" className="text-2xl font-bold">Pour aller plus loin</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li><a className="text-primary underline" href="https://formations.univ-amu.fr/fr/DE1/UHPR/UHPRPT">Aix-Marseille Université : diplôme de langue et culture provençales</a></li>
          <li><a className="text-primary underline" href="https://www.maregionsud.fr/actualites/detail/frederic-mistral-en-3-dates-cles">Région Sud : Frédéric Mistral en trois dates</a></li>
          <li><a className="text-primary underline" href="https://www.departement13.fr/vivre-en-provence/redecouvrir-la-provence/patrimoine-vivant-nos-traditions/accents-en-provencal-7">Département des Bouches-du-Rhône : le gros souper provençal</a></li>
          <li><a className="text-primary underline" href="https://www.museonarlaten.fr/lexposition-permanente-du-museon-arlaten/aux-origines-du-museon-arlaten">Museon Arlaten : langue et culture provençales</a></li>
        </ul>
      </section>
    </div>
  );
}
