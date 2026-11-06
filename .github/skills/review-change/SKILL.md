---
name: review-change
description: "Relire un changement (qualité, standards, impacts, dette)."
disable-model-invocation: true
---
# Prompt review-change

## Objectif

Obtenir une revue classée et une décision sur un changement.

## Entrées

- Changement à relire : ${input:changement:Fichiers, diff ou description}
- Story ou critères d'acceptation : ${input:criteres:Référence ou texte}

## Consigne

1. Lis la story avant le code.
2. Identifie les standards applicables aux fichiers touchés.
3. Contrôle : correction, cas limites, erreurs, tests, documentation, impacts.
4. Classe chaque remarque : bloquant, important ou mineur, avec fichier et proposition.
5. Conclus : accepté, accepté sous réserve ou à corriger ; indique si un audit security est requis.

Résultat attendu : liste classée de remarques et décision motivée.

## Voir aussi

- Agent : [reviewer](../../agents/reviewer.agent.md)
- Agent suivant éventuel : [security](../../agents/security.agent.md)
