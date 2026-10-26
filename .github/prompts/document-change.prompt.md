---
description: Mettre à jour la documentation et la mémoire après un changement.
agent: documentation
---

# Prompt document-change

## Objectif

Aligner documentation et mémoire sur un changement validé, sans créer de doublon.

## Entrées

- Changement : ${input:changement:Résumé ou référence du changement}

## Consigne

1. Liste les pages impactées (README, guides, standards, catalogue, relations, ADR).
2. Modifie à la source unique ; remplace toute copie par un lien relatif.
3. Applique le skill documentation-excellence à chaque page touchée.
4. Mets à jour le catalogue et les relations si un agent, skill, prompt ou standard a changé.
5. Lance `python scripts/lint_pack.py` jusqu'à « OK ».
6. Synchronise la mémoire : ajoute l'utile, retire l'obsolète.

Résultat attendu : pages à jour, lint « OK », liste des incohérences corrigées.

## Voir aussi

- Agent : [documentation](../agents/documentation.agent.md)
- Skill : [documentation-excellence](../skills/documentation-excellence/SKILL.md)
