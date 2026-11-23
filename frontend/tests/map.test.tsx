import { render, screen, within } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { TerritoryMap } from "@/components/TerritoryMap";
import map from "@/lib/map-data.json";

describe("carte des territoires", () => {
  it("propose uniquement l’espace provençal et décrit les contours", async () => {
    const { container } = render(<TerritoryMap />);
    expect(screen.getByRole("link", { name: "Ouvrir l’espace provençal depuis la carte" })).toHaveAttribute("href", "/provencal");
    expect(screen.getByRole("link", { name: /^Ouvrir l’espace provençal$/ })).toHaveAttribute("href", "/provencal");
    const overseas = screen.getByRole("region", { name: "France d’outre-mer" });
    expect(within(overseas).getAllByRole("listitem")).toHaveLength(13);
    expect(within(overseas).queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText(/ne délimite pas le territoire linguistique/)).toBeInTheDocument();
    expect((await axe(container)).violations).toHaveLength(0);
  });

  it("dispose de contours locaux et d’un repère à l’intérieur de la carte", () => {
    expect(map.metropolitan.path).toMatch(/^M/);
    expect(map.metropolitan.marker.x).toBeGreaterThan(0);
    expect(map.metropolitan.marker.x).toBeLessThan(100);
    expect(map.metropolitan.marker.y).toBeGreaterThan(0);
    expect(map.metropolitan.marker.y).toBeLessThan(100);
    expect(map.overseas.every((territory) => territory.path.startsWith("M"))).toBe(true);
  });
});
