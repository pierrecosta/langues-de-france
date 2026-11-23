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

1. Consulte les décisions pertinentes dans la mémoire et les documents actuels ; signale toute indisponibilité ou contradiction.
2. Reformule l'objectif final et demande une à une les seules précisions nécessaires à l'incrément.
3. Propose un premier résultat utilisable, son périmètre, ses critères observables, ses dépendances et la prochaine extension. Conserve explicitement l'objectif final et les décisions déjà prises.
4. Complète le backlog, les personas ou la priorisation seulement si la demande ou le périmètre le justifie. Soumets tout arbitrage produit important au porteur.
5. Pour une décision structurante, propose le challenge grill-me ; enregistre les décisions durables si la mémoire est disponible.

Résultat attendu : un incrément testable et sa suite ; un backlog complet seulement s'il est demandé ou nécessaire. L'architecture est une étape possible, pas automatique.

## Voir aussi

- Agent : [po](../../agents/po.agent.md)
- Modèle : [user story](../../templates/user-story-template.md)
