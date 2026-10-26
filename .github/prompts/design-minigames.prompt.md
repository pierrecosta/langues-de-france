---
description: Concevoir les mini-jeux web et Android à règles communes à partir de contenus publiés et validés dans Django.
agent: game-designer
---

# Prompt design-minigames

## Objectif

Produire une spécification de jeu commune aux implémentations web et Android.

## Entrées

- Contenu publié et validé dans Django, export versionné et brief : ${input:pack:Référence du contenu et du brief}
- Préférences : ${input:preferences:Jeux souhaités, difficulté, durée d'une partie}

## Consigne

1. Vérifie que le pack est conforme au standard ; sinon, liste les corrections pour le content-transformer.
2. Applique le skill minigame-templates : associe chaque objectif à un template et vérifie la matière disponible.
3. Règle chaque jeu : questions, difficulté, essais, score, retours ludiques.
4. Rédige la spécification : règles et scores communs, parcours et critères propres au web et à Android, cas limites et critères d'acceptation Étant donné / Quand / Alors.
5. Remplis le tableau de couverture des faits essentiels.
6. Propose le challenge grill-me, enregistre dans la mémoire.

Résultat attendu : spécification implémentable sans question par les équipes web et Android. Étapes suivantes : `/create-react-feature` et `/create-android-game`.

## Voir aussi

- Agent : [game-designer](../agents/game-designer.agent.md)
- Modèle : [spécification de jeu](../templates/game-spec-template.md)
