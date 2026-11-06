---
name: grill-me
description: Procédure de challenge — hypothèses, risques, alternatives, retour arrière et critères de succès, une question à la fois.
---

# Skill grill-me

## Objectif

Faire émerger les failles d'un plan ou d'une décision par un questionnement structuré, avant validation.

## Périmètre

- Dans le périmètre : interrogation d'un livrable (cadrage, architecture, contenu, conception de jeu, plan).
- Hors périmètre : produire la solution ; décider à la place de l'utilisateur.
- Quand l'utiliser : par [grill-me](../../agents/grill-me.agent.md) et par tout agent avant de valider un livrable critique.

## Entrées

Livrable à challenger et son contexte (objectif, contraintes, décisions antérieures).

## Procédure

1. **Lister les hypothèses implicites** du livrable (utilisateurs, volumes, délais, disponibilité des sources, compétences).
2. **Poser une seule question à la fois**, courte, avec une réponse recommandée ; attendre la réponse avant la suivante.
3. **Couvrir dans cet ordre** :
   - Hypothèses : sur quoi cela repose-t-il, comment le vérifier ?
   - Risques : que peut-il mal tourner, impact et probabilité ?
   - Alternatives : quelle option plus simple a été écartée et pourquoi ?
   - Dépendances et cas limites.
   - Retour arrière : comment annuler si c'est faux, à quel coût ?
   - Critères de succès : comment saura-t-on que c'est réussi, avec quelle mesure ?
4. **Creuser** quand une réponse est vague (« ça devrait aller ») : demander un fait, un chiffre ou un test.
5. **Ne pas bloquer** : si l'utilisateur tranche, noter la décision et continuer.
6. **Synthétiser** : décisions, risques résiduels acceptés, critères de succès, plan de retour arrière.
7. **Consigner** la synthèse dans `memory`.

## Livrables

Décisions prises, risques résiduels, critères de succès.

## Critères de sortie

- Plus aucune hypothèse non traitée.
- Décisions consignées dans la mémoire.

## Voir aussi

- Agent : [grill-me](../../agents/grill-me.agent.md)
- [Workflow](../../../docs/process/workflow.md)
