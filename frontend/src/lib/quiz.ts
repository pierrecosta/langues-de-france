import { normalize, type Word } from "@/lib/api";

export type QuizQuestion = {
  id: string;
  french: string;
  answer: string;
  choices: string[];
};

function shuffle<T>(values: readonly T[], random: () => number): T[] {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j]!, result[i]!];
  }
  return result;
}

export function createQuiz(words: readonly Word[], random: () => number = Math.random): QuizQuestion[] {
  const complete = words.filter(
    (word) => word.slug.trim() && word.french.trim() && word.local.trim() && word.category.trim(),
  );
  const eligible = complete.filter((word) => {
    const french = normalize(word.french);
    const local = normalize(word.local);
    return complete.every((other) => {
      if (other === word) return true;
      return (
        normalize(other.french) !== french &&
        normalize(other.local) !== local &&
        !Object.values(other.variants).some((variant) => normalize(variant) === local) &&
        !Object.values(word.variants).some((variant) => normalize(variant) === normalize(other.local))
      );
    });
  });
  const playable = eligible.filter(
    (word) => eligible.filter((other) => other.category === word.category).length >= 4,
  );
  if (playable.length < 4) return [];

  return shuffle(playable, random).slice(0, 5).map((word) => {
    const distractors = shuffle(
      eligible.filter((other) => other.category === word.category && other !== word),
      random,
    ).slice(0, 3);
    return {
      id: word.slug,
      french: word.french,
      answer: word.local,
      choices: shuffle([word.local, ...distractors.map((other) => other.local)], random),
    };
  });
}
