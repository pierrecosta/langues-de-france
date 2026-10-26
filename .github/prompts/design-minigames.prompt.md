---
description: Concevoir les mini-jeux web du MVP à partir de contenus publiés dans Django, en prévoyant leur portabilité mobile future.
agent: game-designer
---

# Prompt design-minigames

## Objectif

Produire une spécification implémentable pour les mini-jeux web responsives du MVP et portable vers une application mobile post-MVP.

## Entrées

- Contenu publié et validé dans Django, export versionné et brief : ${input:pack:Référence du contenu et du brief}
- Préférences : ${input:preferences:Jeux souhaités, difficulté, durée d'une partie}

## Consigne

1. Vérifie que le pack est conforme au standard ; sinon, liste les corrections pour le content-transformer.
2. Applique le skill minigame-templates : associe chaque objectif à un template et vérifie la matière disponible.
3. Règle chaque jeu : questions, difficulté, essais, score, retours ludiques.
4. Rédige la spécification des règles, scores, parcours et cas limites du web MVP. Note les règles réutilisables plus tard, sans exiger de parcours ni de critères Android pour le lancement.
5. Remplis le tableau de couverture des faits essentiels.
6. Propose le challenge grill-me, enregistre dans la mémoire.

Résultat attendu : spécification du web MVP implémentable sans question par l'équipe frontend, avec des règles assez claires pour un portage ultérieur. Étape suivante : `/create-react-feature`. Lancer `/create-android-game` seulement après le MVP web.

## Voir aussi

- Agent : [game-designer](../agents/game-designer.agent.md)
- Modèle : [spécification de jeu](../templates/game-spec-template.md)
