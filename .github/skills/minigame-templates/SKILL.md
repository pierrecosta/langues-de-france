---
name: minigame-templates
description: Procédure et catalogue de mini-jeux web du MVP, avec règles portables pour une application mobile future.
---

# Skill minigame-templates

## Objectif

Choisir et paramétrer, pour chaque objectif d'apprentissage, le bon template de jeu pour le web du MVP et conserver des règles portables en prévision d'un portage mobile post-MVP.

## Périmètre

- Dans le périmètre : règles des templates web du MVP, choix selon l'objectif, difficulté, score et retours ludiques ; portabilité des règles pour une future application mobile.
- Hors périmètre : format des données ([standard des contenus](../../../docs/standards/game-content.md)) et implémentation ([standard Android](../../../docs/standards/android.md), [standard frontend](../../../docs/standards/frontend.md)).

## Entrées

Pack de contenu, brief pédagogique, et le catalogue ci-dessous (référence unique des ids de jeu).

| Id | Jeu | Règle | Données utilisées | Idéal pour | Statut MVP |
|----|-----|-------|-------------------|------------|------------|
| `qcm` | QCM | 1 bonne réponse parmi 4 (le fait + 3 `wrong`) ; 5 questions, sans chronomètre | `facts`, `distractors` | Reconnaissance | Lot 1 (L2) |
| `matching` | Association | 1 partie = 1 tableau de 5 paires à relier par appuis successifs (4 à 6 selon la matière disponible) | `pairs` | Vocabulaire, définitions | Lot 1 (L2) |
| `true-false` | Vrai / Faux | Affirmation vraie ou rendue fausse avec un distracteur ; deux gros boutons ; 5 questions | `facts`, `distractors` | Corriger les idées reçues | Lot 2, après qcm et matching |
| `quiz` | Quiz | Question ; réponse parmi des lettres mélangées ou saisie ; un indice possible | `facts` | Rappel | Post-MVP (non planifié) |
| `word-find` | Trouve le mot | Deviner un mot depuis sa définition et ses lettres | `pairs` | Terminologie | Post-MVP (non planifié) |

Le défi chronométré (`speed-challenge`) est retiré du catalogue MVP (décision PO du 2026-10-26, Won't) : pas de chronomètre, pas de points de rapidité, pas de classement. Le « quiz final de parcours » (5 questions, 4/5 requis) est une partie de `qcm` avec seuil de réussite ; il n'est pas un template distinct.

## Procédure

1. **Associer** chaque objectif à un template selon « Idéal pour » ; varier les templates sur l'ensemble d'un pack.
2. **Vérifier la matière** : un jeu exige assez de données (ex. `matching` ≥ 4 paires, `qcm` ≥ 1 fait avec 3 distracteurs). Sinon renvoyer au [content-transformer](../../agents/content-transformer.agent.md).
3. **Régler la partie** : 5 questions par partie au MVP (2 à 3 min, sans chronomètre) ; pour `matching`, une partie = un tableau de 5 paires (4 ou 6 si la matière l'impose, jamais de second tableau) ; difficulté selon le niveau de l'objectif (débutant : indices et 2 essais ; avancé : un essai, pas d'indice) ; ordre aléatoire à graine déterministe pour les tests.
4. **Définir le score** : 1 point par bonne réponse ou paire correcte, étoiles à 60 % / 80 % / 100 % du maximum (barème provisoire, à valider par le porteur avant production). Aucune pénalité négative, aucun bonus de rapidité.
5. **Définir les retours ludiques** : animation courte, vibration légère, messages encourageants, explication du fait après la réponse ; jamais punitif.
6. **Prévoir les écrans** de chaque jeu : intro (règle en une phrase), partie, résultat (score, étoiles, rejouer, retour).
7. **Vérifier la facilité** : règle comprise en moins de 10 secondes ; une action principale par écran ; interactions adaptées au tactile pour le navigateur mobile.
8. **Écrire les critères d'acceptation** (Étant donné / Quand / Alors) dans la [spécification de jeu](../../templates/game-spec-template.md) pour le web MVP. Les critères Android, la rotation, le mode hors ligne et la synchronisation sont **post-MVP** (Won't) : ne pas les écrire avant la phase mobile.

## Livrables

Spécification de jeu avec tableau de couverture des faits essentiels.

## Critères de sortie

- Chaque objectif a au moins un jeu ; chaque fait essentiel est couvert.
- Chaque jeu web du MVP a des règles, un score et des cas limites testables ; les règles sont assez précises pour un éventuel portage ultérieur. Seuls les ids du catalogue sont utilisés.

## Voir aussi

- Agent : [game-designer](../../agents/game-designer.agent.md)
- Prompt : [design-minigames](../design-minigames/SKILL.md)
- Skills : [content-synthesis](../content-synthesis/SKILL.md) ; post-MVP : [android-compose](../android-compose/SKILL.md)
