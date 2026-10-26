---
name: documentation-excellence
description: Procédure de validation d'une page documentaire — objectif, périmètre, prérequis, étapes et vérification observable.
---

# Skill documentation-excellence

## Objectif

S'assurer qu'une page est complète, vérifiable, sans doublon, et qu'un lecteur novice peut atteindre son but en la suivant seule.

## Périmètre

- Dans le périmètre : contrôle de structure, de clarté, de liens, de cohérence et de doublons.
- Hors périmètre : les règles elles-mêmes (voir le [standard documentaire](../../../docs/standards/documentation.md)).
- Quand l'utiliser : par [documentation](../../agents/documentation.agent.md) pour toute page créée ou modifiée.

## Entrées

Page ou ensemble de pages à valider ; [modèle de documentation](../../templates/documentation-template.md).

## Procédure

1. **Vérifier la structure** : objectif, périmètre, prérequis, étapes, vérification observable. Une section manquante = correction obligatoire.
2. **Tester l'objectif** : tient-il en une phrase et dit-il ce que le lecteur saura faire ?
3. **Tester les étapes** : chacune est une action unique, ordonnée, avec la commande ou le clic exact ; aucune étape ne suppose un savoir non cité dans les prérequis.
4. **Tester la vérification** : le lecteur peut constater le succès (sortie attendue, fichier créé, écran affiché).
5. **Chasser les doublons** : si un paragraphe existe ailleurs, le remplacer par un lien relatif et garder une seule source.
6. **Contrôler la langue** : français ; identifiants, commandes et clés en anglais.
7. **Contrôler les liens** : relatifs, valides, et la page est référencée depuis le [README](../../../README.md) ou le [catalogue](../../../docs/process/catalog.md).
8. **Lancer** `python scripts/lint_pack.py` ; corriger puis relancer jusqu'à « OK ».

## Livrables

Pages corrigées et liste des écarts traités.

## Critères de sortie

- Le lint passe.
- Chaque page décrit une vérification observable et ne duplique aucune autre.

## Voir aussi

- Agent : [documentation](../../agents/documentation.agent.md)
- Standard : [documentation](../../../docs/standards/documentation.md)
