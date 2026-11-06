import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/SiteHeader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WordDetail } from "@/components/WordDetail";
import { WordList } from "@/components/WordList";
import { WordSearch } from "@/components/WordSearch";
import { getWord, listWords } from "@/lib/api";

describe("composants", () => {
  it("la bascule de thème change data-theme", async () => {
    document.documentElement.dataset.theme = "light";
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole("button"));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("l'en-tête expose une navigation nommée", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("navigation", { name: "Navigation principale" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Mots" })).toHaveAttribute("href", "/provencal/mot");
  });

  it("la liste lie vers /provencal/mot/{slug}", async () => {
    const words = await listWords("bonjorn");
    render(<WordList words={words} q="bonjorn" />);
    expect(screen.getByRole("link", { name: /Bonjorn/ })).toHaveAttribute(
      "href",
      "/provencal/mot/bonjorn",
    );
  });

  it("message clair sans résultat", () => {
    render(<WordList words={[]} q="xyz" />);
    expect(screen.getByRole("link", { name: "Parcourir toute la liste" })).toBeInTheDocument();
  });

  it("la fiche affiche forme, traduction et est sans violation axe", async () => {
    const word = await getWord("bonjorn");
    const { container } = render(
      <>
        <WordSearch q="" />
        <WordDetail word={word!} />
      </>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Bonjorn" })).toBeInTheDocument();
    expect(screen.getByText("Bonjour")).toBeInTheDocument();
    expect((await axe(container)).violations).toHaveLength(0);
  });
});
