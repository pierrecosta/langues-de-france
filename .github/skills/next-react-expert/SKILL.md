---
name: next-react-expert
description: Procédure technique Next.js App Router, React, TypeScript, Tailwind, React Query et Zustand pour une fonctionnalité frontend.
---

# Skill next-react-expert

## Objectif

Construire une fonctionnalité React solide techniquement. Le design et l'accessibilité sont traités par [design-system-accessibility](../design-system-accessibility/SKILL.md) ; ce skill ne les couvre pas.

## Périmètre

- Dans le périmètre : structure des composants, typage, gestion d'état, appels API, Next.js App Router, séparation serveur/client et tests.
- Hors périmètre : tokens, thèmes, contrastes, ARIA ; règles normatives ([standard frontend](../../../docs/standards/frontend.md)).

## Entrées

User story, contrat d'API, composants et tokens existants.

## Procédure

1. **Vérifier** via `context7` les API de Next.js, React, React Query, Zustand et Tailwind pour les versions du projet.
2. **Découper l'écran** en composants : un composant = une responsabilité ; extraire la logique dans des hooks.
3. **Typer** : types des props, des réponses d'API, des états ; pas de `any`.
4. **Choisir l'état** :
   - Données serveur → React Query (clés de requête stables, invalidation après mutation).
   - État d'interface partagé entre composants éloignés → Zustand.
   - État purement local → `useState`.
5. **Gérer** chargement, erreur et vide pour chaque appel API.
6. **Séparer** les données : pages publiques rendues côté serveur à partir de Django ; données privées chargées côté navigateur. Ne jamais exposer de secret dans une variable `NEXT_PUBLIC_*`.
7. **Configurer** les routes et métadonnées Next.js en s'appuyant sur les tokens du design system ; les pages publiques sont `noindex` et produisent les métadonnées sociales attendues.
8. **Tester** : composants (Vitest + Testing Library, rôles et libellés plutôt que classes CSS), puis un parcours Playwright pour le chemin principal.
9. **Contrôler** : build, lint, typage, tests ; corriger avant de passer à l'accessibilité.

## Livrables

Composants, hooks, tests.

## Critères de sortie

Build, lint, typage et tests passent ; chaque appel API gère chargement, erreur et vide.

## Voir aussi

- Agent : [frontend-react](../../agents/frontend-react.agent.md)
- Prompt : [create-react-feature](../create-react-feature/SKILL.md)
- Skill : [design-system-accessibility](../design-system-accessibility/SKILL.md)
