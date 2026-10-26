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

| Id | Jeu | Règle | Données utilisées | Idéal pour |
|----|-----|-------|-------------------|------------|
| `quiz` | Quiz | Question ; réponse choisie parmi des lettres mélangées ou saisie ; un indice possible | `facts` | Rappel |
| `qcm` | QCM | 1 bonne réponse parmi 4 (le fait + 3 `wrong`) | `facts`, `distractors` | Reconnaissance |
| `true-false` | Vrai / Faux | Affirmation vraie ou rendue fausse avec un distracteur ; deux gros boutons | `facts`, `distractors` | Corriger les idées reçues |
| `matching` | Association | Relier 4 à 6 paires par appuis successifs | `pairs` | Vocabulaire, définitions |
| `word-find` | Trouve le mot | Deviner un mot depuis sa définition et ses lettres | `pairs` | Terminologie |
| `speed-challenge` | Défi chronométré (type Kahoot) | Série de QCM courts, 15 s par question, points selon la rapidité, classement local | `facts`, `distractors` | Révision rapide |

Le défi chronométré se joue en solo ou sur un seul appareil (un ou plusieurs joueurs en alternance) ; le multi-appareil et le classement compétitif sont hors périmètre.

## Procédure

1. **Associer** chaque objectif à un template selon « Idéal pour » ; varier les templates sur l'ensemble d'un pack.
2. **Vérifier la matière** : un jeu exige assez de données (ex. `matching` ≥ 4 paires, `qcm` ≥ 1 fait avec 3 distracteurs). Sinon renvoyer au [content-transformer](../../agents/content-transformer.agent.md).
3. **Régler la partie** : 5 à 10 questions ; difficulté selon le niveau de l'objectif (débutant : indices et 2 essais ; avancé : un essai, pas d'indice) ; ordre aléatoire à graine déterministe pour les tests.
4. **Définir le score** : points par bonne réponse, bonus de série ou de rapidité (uniquement pour `speed-challenge`), seuils d'étoiles. Aucune pénalité négative.
5. **Définir les retours ludiques** : animation courte, vibration légère, messages encourageants, explication du fait après la réponse ; jamais punitif.
6. **Prévoir les écrans** de chaque jeu : intro (règle en une phrase), partie, résultat (score, étoiles, rejouer, retour).
7. **Vérifier la facilité** : règle comprise en moins de 10 secondes ; une action principale par écran ; interactions adaptées au tactile pour le navigateur mobile.
8. **Écrire les critères d'acceptation** (Étant donné / Quand / Alors) dans la [spécification de jeu](../../templates/game-spec-template.md) pour le web MVP. Ajouter les critères Android, la rotation, le mode hors ligne et la synchronisation uniquement lors du portage mobile post-MVP.

## Livrables

Spécification de jeu avec tableau de couverture des faits essentiels.

## Critères de sortie

- Chaque objectif a au moins un jeu ; chaque fait essentiel est couvert.
- Chaque jeu web du MVP a des règles, un score et des cas limites testables ; les règles sont assez précises pour un éventuel portage ultérieur. Seuls les ids du catalogue sont utilisés.

## Voir aussi

- Agent : [game-designer](../../agents/game-designer.agent.md)
- Prompt : [design-minigames](../../prompts/design-minigames.prompt.md)
- Skills : [content-synthesis](../content-synthesis/SKILL.md), [android-compose](../android-compose/SKILL.md)
