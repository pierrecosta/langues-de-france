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
3. Exécute les suites, les parcours Playwright (chemin principal et un chemin d'erreur) et les contrôles de données en lecture seule via postgres ; pour un portage Android post-MVP, lance aussi `./gradlew lint test`, vérifie les jeux hors ligne puis les parcours en ligne de connexion/synchronisation/déconnexion et le rejet d'un résultat périmé.
4. Analyse chaque échec : bug produit, test fragile ou donnée de test.
5. Rapporte et enregistre les bugs connus dans la mémoire.

Résultat attendu : tests versionnés, matrice de couverture, rapport.

## Voir aussi

- Agent : [qa-tests](../../agents/qa-tests.agent.md)
