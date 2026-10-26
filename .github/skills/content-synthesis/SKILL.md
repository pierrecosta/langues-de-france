---
name: content-synthesis
description: Procédure de compilation de sources hétérogènes, définition des objectifs d'apprentissage, hiérarchisation de l'information et production de données brutes et d'images.
---

# Skill content-synthesis

## Objectif

Passer de connaissances de contributeurs et de références disponibles à un pack candidat minimal, rattaché à des objectifs d'apprentissage, sans rien inventer, destiné à l'import en brouillon dans Django.

## Périmètre

- Dans le périmètre : inventaire, extraction, dédoublonnage, objectifs, hiérarchisation, rationalisation en données et images.
- Hors périmètre : choix des mécaniques de jeu ([minigame-templates](../minigame-templates/SKILL.md)) ; le format exact est dans le [standard des contenus](../../../docs/standards/game-content.md).

## Entrées

Sources, public cible, durée d'usage visée, mémoire (packs existants).

## Procédure

1. **Inventorier** : relever les connaissances du contributeur et les références disponibles (origine, format, date, droits si connus). Une connaissance acquise ou mémorisée par le contributeur est recevable sans source externe. Vérifier les droits des images, sons et autres médias réutilisés.
2. **Extraire** : noter les affirmations, une par ligne, avec la référence lorsqu'elle est disponible ; ne pas paraphraser au-delà du sens et ne jamais inventer de citation.
3. **Compiler** :
   - fusionner les doublons ;
   - repérer les contradictions ; trancher par fiabilité puis par date, et noter le choix et la raison ;
   - signaler les lacunes importantes de contenu ; l'absence de source externe ne constitue pas à elle seule une lacune.
4. **Définir les objectifs** : 3 à 7 objectifs par pack, formulés avec un verbe observable (identifier, citer, associer, distinguer), classés par niveau.
5. **Hiérarchiser** chaque fait : `essentiel` (sans lui l'objectif n'est pas atteint), `important`, `complementaire`. Supprimer tout fait qui ne sert aucun objectif.
6. **Rationaliser** :
   - phrases courtes dans les limites de longueur du standard ;
   - paires terme/définition pour l'association et le trouve-le-mot ;
   - 3 distracteurs plausibles par fait (erreurs courantes, pas des absurdités) ;
   - une image quand elle remplace avantageusement du texte (schéma, comparaison, séquence, carte), avec texte alternatif.
7. **Valider** : relire chaque fait avec le contributeur et la référence lorsqu'elle existe ; vérifier que chaque objectif a assez de faits pour un jeu de 5 à 10 questions.
8. **Remplir** le [brief pédagogique](../../templates/learning-brief-template.md) et générer le pack candidat à importer en brouillon dans Django ; ne pas le traiter comme une publication.

## Livrables

Brief pédagogique, pack candidat `content-pack.json`, images, liste des contradictions tranchées.

## Critères de sortie

- Aucun fait sans objectif ; les références disponibles sont conservées, mais une source externe n'est pas obligatoire pour les connaissances du contributeur. Les contradictions sont tranchées par écrit.
- Chaque objectif a assez de matière pour être joué.
- Conformité au [standard des contenus](../../../docs/standards/game-content.md).

## Voir aussi

- Agent : [content-transformer](../../agents/content-transformer.agent.md)
- Prompt : [transform-content](../../prompts/transform-content.prompt.md)
- Skills : [grill-me](../grill-me/SKILL.md), [minigame-templates](../minigame-templates/SKILL.md)
