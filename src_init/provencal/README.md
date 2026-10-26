# Seeds provençales

Pour le format attendu des seeds par territoire et les exemples JSON, voir le [README des seeds](../readme.md).

## Objectif

Documenter la provenance et les limites de transformation des données provençales avant leur import comme brouillons.

## Périmètre

Cette page décrit le dictionnaire historique extrait de `src_dict.csv` et les recettes candidates. Elle ne valide ni les formes linguistiques, ni les droits, ni l'aptitude à publier.

## Prérequis

- Conserver `src_dict.csv` comme source d'origine.
- Lire le [format cible des seeds](../readme.md) avant de préparer l'import.

## Étapes

1. Préserver les cellules brutes et leurs variantes sans interpréter les codes `Trad…`.
2. Faire confiance aux connaissances métier du contributeur. Ajouter les références lorsqu'elles sont connues ou accessibles ; ne pas inventer de source.
3. Vérifier les droits des images et autres médias avant leur réutilisation.
4. Vérifier la syntaxe des fichiers JSON avant tout import.

## Recettes

`recipe.json` contient les fiches de recettes provençales candidates. Les titres présents ont été conservés ; les champs `image-url`, `history`, `ingredients` et `description` restent à compléter. `source-url` peut rester vide si aucune référence n'est disponible ; renseigner toute source connue. Ces entrées sont des brouillons incomplets.

## Dictionnaire

`word.json` est une extraction historique dont les clés ne correspondent pas encore au format cible décrit dans le [README des seeds](../readme.md). Son mapping vers le contrat cible, notamment l'identité stable et les champs linguistiques manquants, reste à réaliser avant import.

Le format historique contient les champs suivants :

- `francais` : mot français de `Mot francais` dans `src_dict.csv`.
- `local` : cellule `Traduction` complète de la première occurrence retenue.
- `categorie` : valeur de `Thème`.
- `sousCategorie` : valeur de `Catégorie` pour l’occurrence principale.
- `variantes` : objet indexé par les noms de colonnes `Trad…`. Chaque valeur est une liste de cellules CSV brutes. Pour les mots français répétés, les autres cellules `Traduction` sont conservées sous la clé `Traduction`.

Les cellules ne sont pas découpées sur les espaces et les codes `Trad…` ne sont pas interprétés, car le dépôt ne fournit pas leur légende. Les 30 entrées initiales sont conservées ; leurs champs `sousCategorie` et `variantes` sont vides.

Le lot importé comprend les 200 premiers mots français distincts ayant une traduction non vide, dans l’ordre du CSV. La sélection est concentrée sur le thème `Nature`, selon l’ordre de la source.

## Source et validation

`src_dict.csv` est lu en encodage Windows-1252 et `word.json` est enregistré en UTF-8. La première occurrence d’un mot est utilisée comme forme principale provisoire ; cette règle technique ne vaut pas validation linguistique. Les codes source et la forme principale sont examinés avec les connaissances du contributeur ; une source externe n'est pas un prérequis. Ajouter la référence disponible et respecter les droits des images ou autres médias réutilisés.

## Vérification

Exécuter `python -m json.tool src_init/provencal/word.json`. La commande doit terminer sans erreur ; une erreur signale un JSON invalide. La syntaxe valide ne remplace pas la relecture éditoriale par un contributeur provençal ni la vérification des droits des médias.
