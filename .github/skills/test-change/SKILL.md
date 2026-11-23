---
name: test-change
description: "Définir et exécuter les tests d'un changement à partir des critères d'acceptation."
disable-model-invocation: true
---
# Prompt test-change

## Objectif

Couvrir un changement par des tests et produire un rapport d'exécution.

## Entrées

- Changement ou story : ${input:changement:Référence ou résumé}
- Critères d'acceptation : ${input:criteres:Référence ou texte}

## Consigne

1. Construis la matrice critère d'acceptation → cas de test (nominal, limite, erreur).
2. Écris les tests manquants, indépendants et déterministes.
3. Exécute les tests et contrôles adaptés au changement. Pour une interface concernée, vérifie les parcours Playwright pertinents ; pour les données concernées, vérifie les permissions effectives avant toute interrogation postgres. Pour un portage Android post-MVP, lance `./gradlew lint test` et vérifie les parcours hors ligne et de synchronisation concernés.
4. Analyse chaque échec : bug produit, test fragile ou donnée de test.
5. Rapporte les résultats et les contrôles non réalisés ; enregistre les bugs durables si la mémoire est disponible.

Résultat attendu : tests versionnés, matrice de couverture, rapport.

## Voir aussi

- Agent : [qa-tests](../../agents/qa-tests.agent.md)
