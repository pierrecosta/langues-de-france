import type { Metadata } from "next";
import { TerritoryMap } from "@/components/TerritoryMap";

export const metadata: Metadata = {
  title: "Carte des territoires",
  description: "Découvrez les territoires représentés et ouvrez l’espace provençal.",
  robots: { index: false, follow: false },
  openGraph: { title: "Carte des territoires", locale: "fr_FR", type: "website" },
};

export default function MapPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Carte des territoires</h1>
      <TerritoryMap />
    </div>
  );
}
