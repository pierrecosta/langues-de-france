import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import UpcomingLanguagePage, { generateStaticParams } from "@/app/langues/[slug]/page";
import ProvencalHome from "@/app/provencal/page";
import { upcomingLanguages } from "@/lib/languages";

describe("langues", () => {
  it("présente chacune des cinq pages en construction avec un retour", async () => {
    expect(generateStaticParams()).toHaveLength(5);
    for (const language of upcomingLanguages) {
      const { unmount } = render(await UpcomingLanguagePage({ params: Promise.resolve({ slug: language.slug }) }));
      expect(screen.getByRole("heading", { name: language.name })).toBeInTheDocument();
      expect(screen.getByText(/en cours de construction/)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Retour à la carte" })).toHaveAttribute("href", "/carte");
      unmount();
    }
  });

  it("présente des informations sourcées et nuancées sur le provençal", async () => {
    const { container } = render(<ProvencalHome />);
    expect(screen.getByRole("heading", { name: "La langue et ses origines" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Une culture vivante" })).toBeInTheDocument();
    expect(screen.getByText(/pas le nombre actuel de tous les locuteurs/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Aix-Marseille Université/ })).toHaveAttribute("href", expect.stringContaining("univ-amu.fr"));
    expect(screen.getByRole("link", { name: /Région Sud/ })).toHaveAttribute("href", expect.stringContaining("maregionsud.fr"));
    expect(screen.getByRole("link", { name: /Département des Bouches-du-Rhône/ })).toHaveAttribute("href", expect.stringContaining("departement13.fr"));
    expect((await axe(container)).violations).toHaveLength(0);
  });
});
