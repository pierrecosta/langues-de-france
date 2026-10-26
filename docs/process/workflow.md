# Workflow multi-agents

## Objectif

Décrire l'enchaînement des rôles, de l'idée à la documentation.

## Périmètre

Séquence et points de contrôle. Les rôles sont dans le [catalogue](./catalog.md), les liens dans les [relations](./relations.md).

## Étapes

1. **Cadrage** — [po](../../.github/agents/po.agent.md) : backlog et critères d'acceptation. Challenge [grill-me](../../.github/agents/grill-me.agent.md).
2. **Architecture** — [architect](../../.github/agents/architect.agent.md) : ADR. Challenge grill-me.
3. **Implémentation** — [backend-python](../../.github/agents/backend-python.agent.md) et/ou [frontend-react](../../.github/agents/frontend-react.agent.md).
4. **Tests** — [qa-tests](../../.github/agents/qa-tests.agent.md) : couverture des critères d'acceptation.
5. **Revue** — [reviewer](../../.github/agents/reviewer.agent.md), puis [security](../../.github/agents/security.agent.md) si le changement touche à la sécurité.
6. **Documentation** — [documentation](../../.github/agents/documentation.agent.md) : pages et mémoire à jour.

## Variante : jeu pédagogique web et Android

Pour transformer des sources en mini-jeux web et Android :

1. [content-transformer](../../.github/agents/content-transformer.agent.md) : brief pédagogique et pack candidat. Challenge grill-me.
2. [backend-python](../../.github/agents/backend-python.agent.md) et l'équipe éditoriale : import unique en brouillon dans Django, mapping et validation ; Django devient la source de vérité.
3. [game-designer](../../.github/agents/game-designer.agent.md) : règles communes et parcours web/Android dans la spécification. Challenge grill-me.
4. [frontend-react](../../.github/agents/frontend-react.agent.md) et [android-dev](../../.github/agents/android-dev.agent.md) : implémentations correspondantes ; Android joue hors ligne et synchronise les scores selon les ADR.

Les tests, la revue et la documentation restent requis. Le contrat entre les rôles est le [standard des contenus](../standards/game-content.md) ; la synchronisation est décrite par l'[ADR-006](../architecture/adr/ADR-006-contenus-et-jeux-multiplateformes.md).

## Déclenchement

Chaque étape a son prompt (`/define-project`, `/design-architecture`, `/create-python-webapp`, `/create-react-feature`, `/test-change`, `/review-change`, `/document-change`, `/transform-content`, `/design-minigames`, `/create-android-game`). Entre deux étapes, le bouton de handoff transmet le contexte ; l'utilisateur valide avant de poursuivre. Détails : [guide d'utilisation](../guides/utilisation.md).

## Points de contrôle

- Avant chaque étape : lecture de la mémoire (`memory`).
- Fin des étapes 1 et 2 : challenge grill-me obligatoire.
- Fin de l'étape 5 : aucun point bloquant ouvert.
- À chaque itération : documentation et [relations](./relations.md) mises à jour avant de clore.

## Vérification

À l'étape 6, `python scripts/lint_pack.py` passe et la mémoire contient les décisions du cycle.
