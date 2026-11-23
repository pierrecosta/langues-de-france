# Workflow multi-agents

## Objectif

Décrire l'enchaînement des rôles, de l'idée à la documentation.

## Périmètre

Séquence et points de contrôle. Les rôles sont dans le [catalogue](./catalog.md), les liens dans les [relations](./relations.md).

## Étapes

Choisir les étapes pertinentes pour l'incrément demandé ; une correction limitée ne nécessite pas automatiquement tous les rôles. Le [découpage produit](../product/increments-mvp.md) propose des résultats minimaux sans abandonner la vision finale.

1. **Cadrage si nécessaire** — [po](../../.github/agents/po.agent.md) : backlog et critères d'acceptation. Challenge [grill-me](../../.github/agents/grill-me.agent.md) pour une décision structurante.
2. **Architecture** — [architect](../../.github/agents/architect.agent.md) : ADR. Challenge grill-me.
3. **Implémentation** — [backend-python](../../.github/agents/backend-python.agent.md) et/ou [frontend-react](../../.github/agents/frontend-react.agent.md).
4. **Tests** — [qa-tests](../../.github/agents/qa-tests.agent.md) : couverture des critères d'acceptation.
5. **Revue** — [reviewer](../../.github/agents/reviewer.agent.md), puis [security](../../.github/agents/security.agent.md) si le changement touche à la sécurité.
6. **Documentation** — [documentation](../../.github/agents/documentation.agent.md) : pages et mémoire à jour.

## Variante : quiz web du MVP 2

Après le dictionnaire du MVP 1, pour préparer le QCM anonyme du MVP 2 :

1. [content-transformer](../../.github/agents/content-transformer.agent.md) : brief pédagogique et pack candidat. Challenge grill-me.
2. [backend-python](../../.github/agents/backend-python.agent.md) et l'équipe éditoriale : import unique en brouillon dans Django, mapping et validation éditoriale ; une source externe n'est pas obligatoire si le contributeur connaît la forme de mémoire, et les références disponibles sont enregistrées.
3. [game-designer](../../.github/agents/game-designer.agent.md) : règles et parcours des mini-jeux web du MVP, conçus pour pouvoir être portés plus tard. Challenge grill-me.
4. [frontend-react](../../.github/agents/frontend-react.agent.md) : implémentation des jeux dans le site web responsive, utilisable depuis un navigateur mobile.

Après le MVP, [android-dev](../../.github/agents/android-dev.agent.md) peut implémenter l'application native ; le jeu hors ligne et la synchronisation sont alors couverts par les ADR concernés. Les tests, la revue et la documentation restent requis. Le contrat entre les rôles est le [standard des contenus](../standards/game-content.md).

## Déclenchement

Des skills d'entrée existent pour les étapes (`/define-project`, `/design-architecture`, `/create-python-webapp`, `/create-react-feature`, `/test-change`, `/review-change`, `/document-change`, `/transform-content`, `/design-minigames`, `/create-android-game`). Selon le client, ils peuvent être invoqués explicitement ; ils ne sélectionnent pas nécessairement un agent. Les agents proposent des handoffs lorsque le client les prend en charge. Détails : [guide d'utilisation](../guides/utilisation.md).

## Points de contrôle

- Avant une étape dépendant de décisions antérieures : lecture ciblée de la mémoire pertinente (`memory`), puis comparaison avec les sources actuelles.
- Pour une décision structurante : challenge grill-me.
- Fin de l'étape 5 : aucun point bloquant ouvert.
- À chaque itération : documentation et [relations](./relations.md) mises à jour avant de clore.

## Vérification

À l'étape 6, `python scripts/lint_pack.py` passe et la mémoire contient les décisions du cycle.
