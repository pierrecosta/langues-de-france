---
name: create-python-webapp
description: "Créer ou étendre un service backend Python (API, tests, documentation)."
disable-model-invocation: true
---
# Prompt create-python-webapp

## Objectif

Créer ou étendre un service backend Python conforme au standard.

## Entrées

- Fonctionnalité : ${input:fonctionnalite:Décris la fonctionnalité ou l'API}
- Story ou critères d'acceptation : ${input:criteres:Référence ou texte des critères}

## Consigne

1. Lis la mémoire ; vérifie via Context7 les API des bibliothèques utilisées.
2. Transforme les critères d'acceptation en cas de test, et écris les tests d'abord.
3. Implémente : validation d'entrée, logique, persistance (migrations pour tout changement de schéma), erreurs normalisées.
4. Ajoute logs structurés et endpoint de santé ; documente l'API.
5. Lance lint, typage et tests ; vérifie l'absence de secret.
6. Rédige la note d'impact et propose les handoffs vers qa-tests et reviewer.

Résultat attendu : code, tests qui passent, documentation d'API, note d'impact.

## Voir aussi

- Agent : [backend-python](../../agents/backend-python.agent.md)
- Standard : [backend](../../../docs/standards/backend.md)
