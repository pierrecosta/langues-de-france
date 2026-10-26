---
name: content-synthesis
description: Procédure de compilation de sources hétérogènes, définition des objectifs d'apprentissage, hiérarchisation de l'information et production de données brutes et d'images.
---

# Skill content-synthesis

## Objectif

Passer de sources brutes à un pack candidat minimal, vérifié et rattaché à des objectifs d'apprentissage, sans rien inventer, destiné à l'import en brouillon dans Django.

## Périmètre

- Dans le périmètre : inventaire, extraction, dédoublonnage, objectifs, hiérarchisation, rationalisation en données et images.
- Hors périmètre : choix des mécaniques de jeu ([minigame-templates](../minigame-templates/SKILL.md)) ; le format exact est dans le [standard des contenus](../../../docs/standards/game-content.md).

## Entrées

Sources, public cible, durée d'usage visée, mémoire (packs existants).

## Procédure

1. **Inventorier** : pour chaque source, noter origine, format, date, droits d'usage, fiabilité (officielle, secondaire, opinion). Écarter ou signaler celles sans droit d'usage.
2. **Extraire** : en tirer les affirmations factuelles, une par ligne, avec la source ; ne pas paraphraser au-delà du sens.
3. **Compiler** :
   - fusionner les doublons ;
   - repérer les contradictions ; trancher par fiabilité puis par date, et noter le choix et la raison ;
   - signaler les lacunes (sujet important sans source).
4. **Définir les objectifs** : 3 à 7 objectifs par pack, formulés avec un verbe observable (identifier, citer, associer, distinguer), classés par niveau.
5. **Hiérarchiser** chaque fait : `essentiel` (sans lui l'objectif n'est pas atteint), `important`, `complementaire`. Supprimer tout fait qui ne sert aucun objectif.
6. **Rationaliser** :
   - phrases courtes dans les limites de longueur du standard ;
   - paires terme/définition pour l'association et le trouve-le-mot ;
   - 3 distracteurs plausibles par fait (erreurs courantes, pas des absurdités) ;
   - une image quand elle remplace avantageusement du texte (schéma, comparaison, séquence, carte), avec texte alternatif.
7. **Valider** : relire chaque fait face à sa source ; vérifier que chaque objectif a assez de faits pour un jeu de 5 à 10 questions.
8. **Remplir** le [brief pédagogique](../../templates/learning-brief-template.md) et générer le pack candidat à importer en brouillon dans Django ; ne pas le traiter comme une publication.

## Livrables

Brief pédagogique, pack candidat `content-pack.json`, images, liste des contradictions tranchées.

## Critères de sortie

- Aucun fait sans source ni objectif ; contradictions tranchées par écrit.
- Chaque objectif a assez de matière pour être joué.
- Conformité au [standard des contenus](../../../docs/standards/game-content.md).

## Voir aussi

- Agent : [content-transformer](../../agents/content-transformer.agent.md)
- Prompt : [transform-content](../../prompts/transform-content.prompt.md)
- Skills : [grill-me](../grill-me/SKILL.md), [minigame-templates](../minigame-templates/SKILL.md)
