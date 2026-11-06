import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Page introuvable</h1>
      <p>
        Ce contenu n’existe pas ou n’est pas publié.{" "}
        <Link href="/provencal/mot" className="underline">
          Parcourir les mots
        </Link>
        .
      </p>
    </div>
  );
}
