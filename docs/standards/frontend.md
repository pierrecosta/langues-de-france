# Standard frontend (React)

Source unique des règles frontend. Appliqué par l'agent [frontend-react](../../.github/agents/frontend-react.agent.md). L'accessibilité est traitée dans [accessibility.md](./accessibility.md).

## Règles

- Stack : Next.js App Router, React, TypeScript strict, Tailwind, React Query (données serveur), Zustand (état local partagé).
- Les mini-jeux du MVP sont des fonctionnalités web responsives du site ; le standard frontend ne signifie pas qu'une application mobile native est livrée.
- Rendu : pages de contenus publiés rendues côté serveur depuis l'API Django ; données de compte et de progression chargées côté navigateur après authentification.
- Partage : les pages publiques produisent des métadonnées Open Graph et sont marquées `noindex` ; aucune indexation moteur n'est activée au MVP.
- Cache : les données personnalisées ne sont jamais mises en cache partagé ; toute publication invalide les caches des pages et données publiques concernées.
- Thèmes **Light et Dark** obligatoires.
- Grille de **4 px** pour tous les espacements.
- **Design tokens** uniquement : aucune couleur, taille ou espacement codé en dur.
- Responsive : mobile d'abord, points de rupture définis dans les tokens.
- Composants petits, typés, testés (Vitest + Testing Library) ; tests de parcours avec Playwright.
- Pas de `any` ; pas d'effet de bord dans le rendu.

## Critère de conformité

Build, lint, typage et tests passent ; aucune valeur de style en dur ; rendu vérifié en Light et en Dark. Les routes publiques rendent aussi leurs métadonnées de partage et `noindex` dans le HTML initial ; les données privées restent hors des pages publiques et du cache partagé.
