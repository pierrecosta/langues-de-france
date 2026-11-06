# ADR-007 — Identité et import des seeds

- Statut : accepté (PO délégué, révisable par le porteur)
- Date : 2026-10-26
- Décideurs : PO (délégué), porteur du projet

## Contexte

Les seeds de `src_init/provencal/` (food, lieux, recipe, activity, word, expression) doivent être importés en base. Il faut une identité stable pour éviter les doublons et permettre des réimports sans perte.

## Options étudiées

| Option | Avantages | Inconvénients | Coût / risque |
|--------|-----------|---------------|---------------|
| A. Slug déterministe unique par (territoire, type) | Simple, idempotent, URL lisibles | Gestion des collisions | Faible |
| B. UUID généré à l'import | Aucune collision | Réimport non idempotent | Doublons |
| C. Réimport avec mise à jour | Seeds toujours à jour | Écrase le travail éditorial | Perte de données |

## Décision

Option A.

- Identité : le triplet (territoire, type, slug) est unique en base.
- Slug : entrées avec `id` (food, lieux, recipe, activity) : slug = `id` ; word : `slugify(local)` ; expression : `slugify(local-expression)`.
- `slugify` : minuscules, sans accents, tout caractère hors `[a-z0-9]` remplacé par un tiret, 80 caractères maximum.
- Collision : suffixe `-slugify(french)` (`-slugify(french-equivalent)` pour une expression), puis `-2`, `-3`… dans l'ordre du fichier.
- Import unique et idempotent : n'écrase jamais une entrée existante.
- Tout est importé en brouillon : une entrée incomplète reste brouillon, aucun champ n'est inventé.
- `--dry-run` : n'écrit rien. Dans tous les cas, un rapport indique les entrées créées, ignorées et en erreur.

## Conséquences

- Positives : réimport sans risque, URLs stables, travail éditorial préservé.
- Négatives et dette acceptée : pas de mise à jour automatique depuis les seeds ; changer l'ordre du fichier peut changer un suffixe numérique en cas de collision.
- Sécurité, scalabilité, performance : import en lecture de fichiers locaux, sans entrée utilisateur ; contrainte d'unicité indexée en base.

## Retour arrière

Si la règle de slug s'avère inadaptée : supprimer les entrées importées (toutes en brouillon, identifiables par le rapport), corriger `slugify` et réimporter. Une entrée publiée ne change pas de slug sans redirection.

## Liens

[ADR-003](./ADR-003-postgresql-search.md), [ADR-006](./ADR-006-contenus-et-jeux-multiplateformes.md).
