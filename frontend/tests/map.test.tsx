import { render, screen, within } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { TerritoryMap } from "@/components/TerritoryMap";
import { upcomingLanguages } from "@/lib/languages";
import map from "@/lib/map-data.json";

describe("carte des territoires", () => {
  it("distingue l’espace provençal des cinq espaces en construction", async () => {
    const { container } = render(<TerritoryMap />);
    expect(screen.getByRole("link", { name: "Ouvrir l’espace provençal depuis la carte" })).toHaveAttribute("href", "/provencal");
    expect(screen.getByRole("link", { name: /^Ouvrir l’espace provençal$/ })).toHaveAttribute("href", "/provencal");
    const overseas = screen.getByRole("region", { name: "France d’outre-mer" });
    expect(within(overseas).getAllByRole("listitem")).toHaveLength(13);
    expect(within(overseas).getByRole("link", { name: "Créole réunionnais : espace en construction" })).toHaveAttribute("href", "/langues/creole-reunionnais");
    for (const language of upcomingLanguages) {
      expect(screen.getByRole("link", { name: `${language.name} : espace en construction` })).toHaveAttribute("href", `/langues/${language.slug}`);
      expect(screen.getByRole("link", { name: `${language.marker}. ${language.name} — espace en construction` })).toHaveAttribute("href", `/langues/${language.slug}`);
    }
    expect(screen.getAllByText(/ne délimitent aucun territoire linguistique/)).toHaveLength(1);
    expect((await axe(container)).violations).toHaveLength(0);
  });

  it("dispose de contours locaux et d’un repère à l’intérieur de la carte", () => {
    expect(map.metropolitan.path).toMatch(/^M/);
    for (const marker of Object.values(map.metropolitan.markers)) {
      expect(marker.x).toBeGreaterThan(0);
      expect(marker.x).toBeLessThan(100);
      expect(marker.y).toBeGreaterThan(0);
      expect(marker.y).toBeLessThan(100);
    }
    expect(map.overseas.every((territory) => territory.path.startsWith("M"))).toBe(true);
  });
});
