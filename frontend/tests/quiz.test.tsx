import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { Quiz } from "@/components/Quiz";
import { createQuiz } from "@/lib/quiz";
import words from "@/lib/words-fixture.json";

describe("quiz de démonstration", () => {
  it("crée cinq questions distinctes avec quatre réponses de la même catégorie", () => {
    const questions = createQuiz(words, () => 0.5);
    expect(questions).toHaveLength(5);
    expect(new Set(questions.map((question) => question.id)).size).toBe(5);
    for (const question of questions) {
      expect(new Set(question.choices).size).toBe(4);
      expect(question.choices.filter((choice) => choice === question.answer)).toHaveLength(1);
      const category = words.find((word) => word.slug === question.id)?.category;
      expect(question.choices.every((choice) => words.some((word) => word.local === choice && word.category === category))).toBe(true);
    }
  });

  it("réduit la partie à quatre questions ou signale un corpus insuffisant", () => {
    const group = words.filter((word) => word.category === "Salutations");
    expect(createQuiz(group, () => 0.5)).toHaveLength(4);
    expect(createQuiz(group.slice(0, 3), () => 0.5)).toEqual([]);
    const first = group[0];
    if (!first) throw new Error("La catégorie de test est vide.");
    expect(createQuiz([...group, { ...first, slug: "duplicate" }], () => 0.5)).toEqual([]);
    expect(createQuiz([...group, { ...first, slug: "variant", french: "Autre", local: "autre", variants: { autre: first.local } }], () => 0.5)).toEqual([]);
  });

  it("joue, corrige, montre un score temporaire et permet de rejouer", async () => {
    const user = userEvent.setup();
    const group = words.filter((word) => word.category === "Salutations");
    const { container } = render(<Quiz words={group} />);
    await user.click(screen.getByRole("button", { name: "Commencer le quiz" }));
    expect((await axe(container)).violations).toHaveLength(0);

    for (let index = 0; index < 4; index++) {
      expect(screen.getByRole("heading", { name: `Question ${index + 1} sur 4` })).toHaveFocus();
      const text = screen.getByText(/Comment dit-on/).textContent ?? "";
      const word = group.find((item) => text.includes(`« ${item.french} »`));
      expect(word).toBeDefined();
      await user.click(screen.getByRole("button", { name: word!.local }));
      expect(screen.getByRole("status")).toHaveTextContent("Bonne réponse !");
      const next = screen.getByRole("button", { name: index === 3 ? "Voir le résultat" : "Question suivante" });
      expect(next).toHaveFocus();
      expect(next).toHaveAccessibleDescription(/Bonne réponse/);
      await user.click(next);
    }

    expect(screen.getByRole("heading", { name: "Partie terminée" })).toHaveFocus();
    expect(screen.getByText(/Votre score : 4 sur 4/)).toBeInTheDocument();
    expect(screen.getByText("Ce résultat n’est pas enregistré.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Rejouer" }));
    expect(screen.getByRole("heading", { name: "Question 1 sur 4" })).toBeInTheDocument();
  });

  it("corrige une mauvaise réponse et affiche un état indisponible si nécessaire", async () => {
    const user = userEvent.setup();
    const group = words.filter((word) => word.category === "Salutations");
    const { unmount } = render(<Quiz words={group} />);
    await user.click(screen.getByRole("button", { name: "Commencer le quiz" }));
    const text = screen.getByText(/Comment dit-on/).textContent ?? "";
    const correct = group.find((item) => text.includes(`« ${item.french} »`));
    const wrong = group.find((item) => item !== correct);
    await user.click(screen.getByRole("button", { name: wrong!.local }));
    expect(screen.getByRole("status")).toHaveTextContent(`Ce n’est pas la bonne réponse.`);
    expect(screen.getByRole("status")).toHaveTextContent(correct!.local);
    unmount();
    render(<Quiz words={group.slice(0, 3)} />);
    await user.click(screen.getByRole("button", { name: "Commencer le quiz" }));
    expect(screen.getByRole("heading", { name: "Quiz indisponible" })).toBeInTheDocument();
  });
});
