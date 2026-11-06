# Mémoire du projet

## Objectif

Ce dossier est le point de montage du serveur MCP `memory` : il contient la mémoire persistante des agents, **hors de tout conteneur**.

## Contenu

- `memory.jsonl` : graphe de connaissances (entités, relations, observations) créé automatiquement au premier usage.

## Utilisation

- Les agents lisent la mémoire avant une tâche et y consignent décisions, conventions, patterns et bugs connus (voir [instructions](../.github/copilot-instructions.md)).
- Le fichier est versionnable : il se partage avec l'équipe via Git. Ne jamais y stocker de secret.
- Sauvegarde : copier `memory.jsonl`. Remise à zéro : le supprimer.

## Vérification

Demander à Copilot « Que contient la mémoire du projet ? » : la réponse doit venir du serveur `memory`, et `memory.jsonl` apparaît dans ce dossier après la première écriture.
