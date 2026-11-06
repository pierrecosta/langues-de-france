---
name: create-react-feature
description: "Créer une fonctionnalité Next.js/React avec design system et accessibilité."
disable-model-invocation: true
---
# Prompt create-react-feature

## Objectif

Créer ou étendre une fonctionnalité frontend conforme aux standards.

## Entrées

- Fonctionnalité : ${input:fonctionnalite:Décris la fonctionnalité ou l'écran}
- Contrat d'API : ${input:api:Endpoints ou référence}

## Consigne

1. Lis la mémoire ; réutilise les composants et tokens existants.
2. Vérifie via Context7 les API de Next.js, React, React Query et Zustand.
3. Applique le skill next-react-expert : composants typés, séparation serveur/client, état adapté, gestion chargement/erreur/vide, tests.
4. Applique le skill design-system-accessibility : tokens, grille 4 px, Light et Dark, clavier, audit axe.
5. Vérifie le rendu avec Playwright en mobile et bureau, en Light et Dark ; teste aussi les métadonnées de partage et l'absence d'indexation des pages.
6. Lance build, lint, typage, tests ; propose les handoffs vers qa-tests et reviewer.

Résultat attendu : composants et tests, notes d'accessibilité, vérification Light/Dark.

## Voir aussi

- Agent : [frontend-react](../../agents/frontend-react.agent.md)
- Standards : [frontend](../../../docs/standards/frontend.md), [accessibilité](../../../docs/standards/accessibility.md)
