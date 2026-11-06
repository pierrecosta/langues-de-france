---
name: design-architecture
description: "Concevoir l'architecture d'une solution avec ADR, en s'appuyant sur Context7 et la mémoire."
disable-model-invocation: true
---
# Prompt design-architecture

## Objectif

Concevoir et documenter l'architecture d'une solution, décision par décision.

## Entrées

- Backlog ou besoin : ${input:backlog:Référence du backlog ou résumé}
- Contraintes techniques : ${input:contraintes:Technologies imposées, hébergement, volumes}

## Consigne

1. Lis la mémoire et les ADR existants.
2. Vérifie via Context7 les versions et pratiques de chaque technologie envisagée.
3. Propose l'architecture (schéma Mermaid, composants, flux) et, pour chaque décision structurante, au moins deux alternatives comparées.
4. Applique le skill architecture-review, puis rédige un ADR par décision.
5. Évalue sécurité, scalabilité, performance et plan de retour arrière.
6. Propose le challenge grill-me, enregistre les décisions dans la mémoire et indique l'agent d'implémentation suivant.

Résultat attendu : schéma, ADR référencés dans `docs/architecture/README.md`, risques.

## Voir aussi

- Agent : [architect](../../agents/architect.agent.md)
- Skill : [architecture-review](../architecture-review/SKILL.md)
- Modèle : [ADR](../../templates/adr-template.md)
