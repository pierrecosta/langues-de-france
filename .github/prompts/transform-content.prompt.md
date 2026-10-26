---
description: Compiler des sources, définir les objectifs d'apprentissage et produire un pack candidat à importer dans Django.
agent: content-transformer
---

# Prompt transform-content

## Objectif

Produire le brief pédagogique et le pack de contenu à partir de sources.

## Entrées

- Sources : ${input:sources:Liste des fichiers, liens ou textes}
- Public et contexte : ${input:public:Qui apprend, où et combien de temps}

## Consigne

1. Lis la mémoire ; demande le public ou la durée s'ils manquent.
2. Inventorie les sources (origine, droits, fiabilité) et écarte celles sans droit d'usage.
3. Applique le skill content-synthesis : extraction, compilation, contradictions tranchées, 3 à 7 objectifs, hiérarchisation des faits.
4. Rationalise : phrases courtes, paires, distracteurs, images avec texte alternatif.
5. Remplis le brief pédagogique et génère un pack candidat `content-pack.json` et `images/` à importer comme brouillon dans Django ; le pack seul ne vaut pas publication.
6. Contrôle le pack, propose le challenge grill-me, enregistre dans la mémoire.

Résultat attendu : brief, pack candidat conforme, liste des sources écartées. Étape suivante : préparer l'import du pack en brouillon dans Django ; après validation éditoriale, lancer `/design-minigames`.

## Voir aussi

- Agent : [content-transformer](../agents/content-transformer.agent.md)
- Standard : [contenus](../../docs/standards/game-content.md)
