# Guide de contribution

## Objectif

Ajouter ou modifier un agent, un skill ou un prompt sans créer de doublon.

## Prérequis

Lire le [catalogue](../process/catalog.md) (règle de répartition) et le [standard documentaire](../standards/documentation.md).

## Ajouter un agent

1. Créer `.github/agents/<nom>.agent.md` : frontmatter (`name` identique au fichier, `description`, `tools`, `handoffs` optionnels) puis sections dans cet ordre : Objectif, Périmètre, Entrées, Procédure, Livrables, Critères de sortie, Voir aussi.
2. Si une procédure existe déjà, la référencer au lieu de la recopier.

## Ajouter un skill

Créer `.github/skills/<nom>/SKILL.md` (`name` identique au dossier, mêmes sections que les agents). Un skill décrit une procédure, jamais un rôle ni une règle normative.

## Ajouter un prompt

Créer `.github/skills/<nom>/SKILL.md` avec un frontmatter `description` ; il sert de point d'entrée `/nom` (`.github/prompts/` n'est plus utilisé).

## Finaliser

La documentation se met à jour dans la même itération que le changement ([règle](../standards/documentation.md)).

1. Ajouter l'élément au [catalogue](../process/catalog.md), aux [relations](../process/relations.md), au [workflow](../process/workflow.md) si c'est une étape, et au tableau « Je veux… » du [guide d'utilisation](./utilisation.md).
2. Lier l'élément aux agents, skills, standards et modèles voisins (section « Voir aussi »).
3. Exécuter `python scripts/lint_pack.py`.

## Vérification

Le lint retourne « OK » et l'élément apparaît dans le catalogue.
