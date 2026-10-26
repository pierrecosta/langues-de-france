# Seeds provençales

## Dictionnaire

`word.json` est un tableau d’entrées avec les champs suivants :

- `francais` : mot français de `Mot francais` dans `src_dict.csv`.
- `local` : cellule `Traduction` complète de la première occurrence retenue.
- `categorie` : valeur de `Thème`.
- `sousCategorie` : valeur de `Catégorie` pour l’occurrence principale.
- `variantes` : objet indexé par les noms de colonnes `Trad…`. Chaque valeur est une liste de cellules CSV brutes. Pour les mots français répétés, les autres cellules `Traduction` sont conservées sous la clé `Traduction`.

Les cellules ne sont pas découpées sur les espaces et les codes `Trad…` ne sont pas interprétés, car le dépôt ne fournit pas leur légende. Les 30 entrées initiales sont conservées ; leurs champs `sousCategorie` et `variantes` sont vides.

Le lot importé comprend les 200 premiers mots français distincts ayant une traduction non vide, dans l’ordre du CSV. La sélection est concentrée sur le thème `Nature`, selon l’ordre de la source.

## Source et validation

`src_dict.csv` est lu en encodage Windows-1252 et `word.json` est enregistré en UTF-8. La première occurrence d’un mot est utilisée comme forme principale provisoire ; cette règle technique ne vaut pas validation linguistique. La source, les droits de réutilisation, la légende des colonnes et la forme principale doivent être vérifiés avant publication.
