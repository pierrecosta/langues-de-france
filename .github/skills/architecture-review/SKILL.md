---
name: architecture-review
description: Procédure de revue d'architecture et de rédaction d'ADR — alternatives, compromis, sécurité, scalabilité, performance.
---

# Skill architecture-review

## Objectif

Vérifier qu'une architecture est justifiée, complète et traçable, et produire des ADR que l'équipe peut relire dans un an sans le contexte oral.

## Périmètre

- Dans le périmètre : revue des décisions structurantes, alternatives et compromis, évaluation des qualités (sécurité, scalabilité, performance, exploitabilité), rédaction d'ADR.
- Hors périmètre : règles de code (voir les [standards](../../../docs/standards/)) ; choisir à la place de l'utilisateur.
- Quand l'utiliser : par [architect](../../agents/architect.agent.md) pendant la conception, par [reviewer](../../agents/reviewer.agent.md) quand un changement modifie la structure.

## Entrées

- Description ou schéma de l'architecture, contraintes, backlog.
- ADR existants, mémoire du projet.

## Procédure

1. **Identifier les décisions structurantes** : celles coûteuses à inverser (stockage, découpage en services, framework, authentification, hébergement). Les autres n'ont pas besoin d'ADR.
2. **Pour chacune, lister au moins deux alternatives**, y compris « ne rien faire » ou la solution la plus simple.
3. **Comparer** selon des critères explicites : coût, complexité, risque, réversibilité, compétences de l'équipe, performance, sécurité.
4. **Évaluer les qualités** : 
   - Sécurité : surfaces d'attaque, données sensibles, secrets, moindre privilège.
   - Scalabilité : goulots, état partagé, croissance attendue.
   - Performance : chemin critique, volumes, latence cible.
   - Exploitabilité : logs, supervision, sauvegarde, déploiement.
5. **Vérifier les faits techniques** (versions, limites, fin de support) via `context7`.
6. **Rédiger l'ADR** avec le [modèle](../../templates/adr-template.md) : contexte, décision, alternatives rejetées avec raison, conséquences (positives et négatives), validation.
7. **Définir** le critère qui prouvera que la décision était bonne et le plan de retour arrière.
8. **Relire** : un lecteur extérieur comprend-il pourquoi ce choix et pas un autre ?

## Livrables

- ADR complets dans `docs/architecture/adr/`.
- Tableau des risques avec réponse.

## Critères de sortie

- Chaque décision structurante a un ADR avec alternatives, conséquences et validation.
- Les conséquences négatives sont écrites, pas seulement les bénéfices.
- Le plan de retour arrière existe pour toute décision difficile à inverser.

## Voir aussi

- Agents : [architect](../../agents/architect.agent.md), [reviewer](../../agents/reviewer.agent.md)
- Skill : [grill-me](../grill-me/SKILL.md)
- [Standard documentaire](../../../docs/standards/documentation.md)
