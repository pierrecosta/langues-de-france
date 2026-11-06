---
name: define-project
description: "Cadrer un projet — du besoin métier au backlog exploitable."
disable-model-invocation: true
---
# Prompt define-project

## Objectif

Produire la fiche de cadrage et le backlog priorisé d'un projet.

## Entrées

- Besoin : ${input:besoin:Décris le besoin métier}
- Contraintes : ${input:contraintes:Délais, budget, réglementation}

## Consigne

1. Lis la mémoire du projet et signale ce qui existe déjà.
2. Reformule le besoin en une phrase et pose-moi les questions manquantes, une à la fois.
3. Produis dans cet ordre : objectif mesurable, valeur métier, personas, périmètre inclus et exclu, user stories avec critères d'acceptation, priorisation MoSCoW, risques et dépendances, roadmap par jalons.
4. Termine en proposant le challenge grill-me, puis enregistre le résultat dans la mémoire.

Résultat attendu : un backlog où chaque story est testable. Étape suivante : `/design-architecture`.

## Voir aussi

- Agent : [po](../../agents/po.agent.md)
- Modèle : [user story](../../templates/user-story-template.md)
