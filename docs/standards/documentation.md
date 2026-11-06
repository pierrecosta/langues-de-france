# Standard documentaire

Source unique des règles de documentation. Appliqué par l'agent [documentation](../../.github/agents/documentation.agent.md) avec le skill [documentation-excellence](../../.github/skills/documentation-excellence/SKILL.md).

## Règles

- Markdown, en français ; identifiants techniques en anglais.
- Toute page documentaire contient : objectif, périmètre, prérequis, étapes, vérification observable.
- Une information = un seul emplacement ; les autres pages renvoient par lien relatif.
- Décisions d'architecture : un ADR par décision ([modèle](../../.github/templates/adr-template.md)) dans `docs/architecture/adr/`.
- Exigences : user stories selon le [modèle](../../.github/templates/user-story-template.md).
- Toute page nouvelle est référencée depuis le [README](../../README.md) ou le [catalogue](../process/catalog.md).

## Mise à jour à chaque itération

La documentation fait partie du livrable : une itération n'est pas terminée tant qu'elle n'est pas à jour.

1. Tout changement d'un agent, skill, prompt, modèle, standard, serveur MCP ou parcours met à jour dans la même itération : le fichier concerné, le [catalogue](../process/catalog.md), les [relations](../process/relations.md), le [workflow](../process/workflow.md) si une étape change, le [guide d'utilisation](../guides/utilisation.md) et le [README](../../README.md) si le fonctionnement visible change.
2. Une règle modifiée l'est uniquement dans son standard ; les autres pages gardent leur lien.
3. Fin d'itération : `python scripts/lint_pack.py` retourne « OK », puis la mémoire est synchronisée (ajout de l'utile, retrait de l'obsolète).

## Critère de conformité

`python scripts/lint_pack.py` ne signale aucune erreur ; liens valides ; pas de contenu dupliqué. Le lint ignore les dépendances, caches et fichiers générés (`.git`, `.next`, `.ruff_cache`, `.venv`, `__pycache__`, `node_modules`).
