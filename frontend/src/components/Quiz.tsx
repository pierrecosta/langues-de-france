"use client";

import { useEffect, useRef, useState } from "react";
import { createQuiz, type QuizQuestion } from "@/lib/quiz";
import type { Word } from "@/lib/api";

export function Quiz({ words }: { words: Word[] }) {
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const nextButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (questions) heading.current?.focus();
  }, [questions, index, finished]);

  useEffect(() => {
    if (answer !== null) nextButton.current?.focus();
  }, [answer]);

  function start() {
    setQuestions(createQuiz(words));
    setIndex(0);
    setAnswer(null);
    setScore(0);
    setFinished(false);
  }

  function choose(choice: string) {
    if (answer !== null || !questions) return;
    const currentQuestion = questions[index];
    if (!currentQuestion) throw new Error("Question de quiz introuvable.");
    setAnswer(choice);
    if (choice === currentQuestion.answer) setScore((current) => current + 1);
  }

  function next() {
    if (!questions || answer === null) return;
    if (index + 1 === questions.length) {
      setFinished(true);
    } else {
      setIndex((current) => current + 1);
      setAnswer(null);
    }
  }

  const button = "min-h-12 rounded-md border border-border px-4 py-2 text-left hover:bg-surface disabled:cursor-not-allowed";
  const primary = "min-h-12 rounded-md bg-primary px-4 py-2 font-medium text-on-primary";

  if (questions === null) {
    return (
      <div className="space-y-4">
        <p>Choisissez la traduction provençale de chaque mot français. Sans chronomètre.</p>
        <button type="button" className={primary} onClick={start}>Commencer le quiz</button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="space-y-4">
        <h2 ref={heading} tabIndex={-1} className="text-xl font-bold">Quiz indisponible</h2>
        <p>Il n’y a pas assez de mots de démonstration distincts pour préparer ce quiz.</p>
        <button type="button" className={primary} onClick={start}>Réessayer</button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="space-y-4">
        <h2 ref={heading} tabIndex={-1} className="text-xl font-bold">Partie terminée</h2>
        <p>Votre score : {score} sur {questions.length}. Bravo d’avoir joué !</p>
        <p>Ce résultat n’est pas enregistré.</p>
        <button type="button" className={primary} onClick={start}>Rejouer</button>
      </div>
    );
  }

  const question = questions[index];
  if (!question) throw new Error("Question de quiz introuvable.");
  return (
    <div className="space-y-4">
      <h2 ref={heading} tabIndex={-1} className="text-xl font-bold">
        Question {index + 1} sur {questions.length}
      </h2>
      <p>Comment dit-on « {question.french} » en provençal ?</p>
      <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label="Choisissez une réponse">
        {question.choices.map((choice) => (
          <button key={choice} type="button" className={button} disabled={answer !== null} onClick={() => choose(choice)}>
            {choice}
          </button>
        ))}
      </div>
      <div id="quiz-feedback" role="status" aria-live="polite">
        {answer !== null && (
          <p>
            {answer === question.answer ? "Bonne réponse !" : "Ce n’est pas la bonne réponse."}{" "}
            « {question.french} » se dit « {question.answer} ».
          </p>
        )}
      </div>
      {answer !== null && (
        <button ref={nextButton} type="button" className={primary} aria-describedby="quiz-feedback" onClick={next}>
          {index + 1 === questions.length ? "Voir le résultat" : "Question suivante"}
        </button>
      )}
    </div>
  );
}
