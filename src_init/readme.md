# Seeds initiaux par territoire

## Objectif

Préparer des fichiers candidats à l'import Django en respectant le format cible de chaque catégorie et en repérant les informations manquantes.

## Périmètre

`src_init/` contient des sources d'initialisation, pas la source de vérité après import ni des contenus publiables. Django devient la source de vérité ; les entrées incomplètes restent des brouillons jusqu'à leur enrichissement et leur validation. Les exemples ci-dessous définissent le format cible. Les seeds provençales existantes peuvent encore contenir des clés historiques : elles ne sont pas réputées conformes ou publiables du seul fait de leur présence. Voir les [décisions d'architecture sur Django](../docs/architecture/adr/ADR-001-backend-django.md) et les [contenus et jeux multiplateformes](../docs/architecture/adr/ADR-006-contenus-et-jeux-multiplateformes.md).

## Prérequis

- Pour les faits linguistiques, une connaissance de mémoire d'un contributeur est recevable ; noter la référence si elle est disponible.
- Vérifier les droits des images, sons et autres médias avant réutilisation.
- Les formes linguistiques peuvent être proposées de mémoire par un contributeur ; une référence externe n'est pas un prérequis.
- Ajouter ou mettre à jour une référence si elle est connue ou accessible ; ne jamais en inventer.
- Utiliser UTF-8 et le format JSON pour les fichiers de seed JSON.

## Organisation

Chaque dossier de premier niveau représente un territoire. Il contient uniquement les fichiers des catégories pour lesquelles des données candidates sont disponibles.

```text
src_init/
  readme.md
  exemples/
    exemple.activity.json
    exemple.expression.json
    exemple.food.json
    exemple.lieux.json
    exemple.recipe.json
    exemple.word.json
  provencal/
    activity.json
    expression.json
    food.json
    lieux.json
    recipe.json
    word.json
    src_dict.csv
    README.md
```

Les exemples de `src_init/exemples/` ne sont pas des seeds de territoire et ne doivent jamais être importés. Le [README provençal](./provencal/README.md) décrit l'extraction du dictionnaire depuis `src_dict.csv`.

## Format cible

Chaque fichier JSON contient un tableau d'objets. Les noms de clés sont en anglais et en `kebab-case`, conformément au standard des données. Les champs obligatoires doivent toujours être présents avec le type indiqué ; une chaîne vide, `null` ou une liste vide signale une valeur manquante dans un brouillon et ne satisfait pas les critères de publication. Les liens renseignés sont des chaînes URL. Une source externe est facultative pour une connaissance linguistique ; si elle est connue ou accessible, renseigner `source-url` ou mettre à jour la référence correspondante. Ne jamais inventer de source. Les droits des images, sons et autres médias restent à vérifier avant réutilisation.

| Fichier | Champs requis et types (`?` indique un champ facultatif) | Périmètre et règles |
|---|---|---|
| `activity.json` | `id: string`, `title: string`, `description: string`, `image-url: string`, `source-url?: string` | Activités et expériences : foires, expositions, marchés, randonnées et parcours. Pour un événement à durée déterminée, `start-date` et `end-date` sont requis au format `YYYY-MM-DD`. Ces champs sont facultatifs pour une activité pérenne. Un lieu fixe (musée, abbaye, site historique) relève de `lieux`, même s'il propose des visites. |
| `expression.json` | `local-expression: string`, `pronunciation: string`, `literal-translation: string`, `meaning: string`, `french-equivalent: string`, `origin: string`, `sensitivity-level: string`, `usage-type: string`, `source-url?: string` | Décrire l'expression locale, sa prononciation, son sens littéral et son sens réel. Ne pas confondre traduction et équivalent français. |
| `food.json` | `id: string`, `title: string`, `image-url: string`, `history: string`, `source-url?: string` | Produit alimentaire ou spécialité locale. `description: string` est facultatif. |
| `lieux.json` | `id: string`, `title: string`, `source-url?: string` | Lieux à visiter, en priorité sites historiques, villages typiques, musées et autres lieux patrimoniaux ou culturels. `description: string` est facultative ; `image-urls: string[]` est facultatif et limité à trois photos. |
| `recipe.json` | `id: string`, `title: string`, `image-url: string`, `history: string`, `ingredients: string[]`, `description: string`, `source-url?: string` | Recette avec histoire, ingrédients et description complète. |
| `word.json` | `french-term: string`, `local-term: string`, `pronunciation: string`, `category: string`, `subcategory: string`, `variants: object`, `origin: string`, `example: string`, `example-translation: string`, `cultural-notes: string`, `false-friend: string`, `sensitivity-level: string`, `historical-status: string`, `source-url?: string` | Entrée du dictionnaire. Conserver les variantes attestées sans interpréter les codes source non documentés. |

Les identifiants `id` présents dans ces formats sont des chaînes non vides et uniques dans leur catégorie et leur territoire. Les nouveaux identifiants suivent le `kebab-case` ; les identifiants historiques ne sont pas modifiés avant vérification des références. La stratégie d'identité stable de `word` et `expression`, dont les sources actuelles n'ont pas d'identifiant, reste à définir avant import ; ne pas en fabriquer dans les seeds. Les champs de sensibilité, de statut historique et de type d'usage doivent suivre des valeurs contrôlées lorsqu'une taxonomie aura été définie ; ne pas créer de taxonomie locale implicite.

Les fichiers provençaux actuels sont des données historiques à mapper vers ce format cible. Ils ne sont pas tous complets, et certains utilisent encore des clés comme `nom`, `photos`, `traduction` ou `local`. Ne pas remplir automatiquement les nouveaux champs avec des suppositions. L'absence de source externe sur une forme linguistique ne bloque pas à elle seule une contribution ; conserver les références disponibles. Cette souplesse ne vaut pas autorisation de réutiliser une image ou un média sans droits vérifiés.

## Exemples

Chaque exemple est un tableau contenant un seul enregistrement. Les valeurs reprises des seeds existantes ne signifient pas qu'elles ont été validées ; les chaînes vides et valeurs nulles signalent explicitement des champs à compléter avant publication.

- [Activité](./exemples/exemple.activity.json)
- [Expression](./exemples/exemple.expression.json)
- [Produit alimentaire](./exemples/exemple.food.json)
- [Lieu](./exemples/exemple.lieux.json)
- [Recette](./exemples/exemple.recipe.json)
- [Vocabulaire](./exemples/exemple.word.json)

## Préparation et vérification

1. Créer un dossier pour le territoire sous `src_init/`.
2. Ajouter un fichier pour une catégorie disposant de données candidates ; suivre le format cible et utiliser les exemples comme aide de forme, jamais comme contenu à importer.
3. Faire confiance aux connaissances métier du contributeur. Ajouter les références disponibles et préserver les variantes ; ne pas inventer de source.
4. Vérifier les droits des médias avant leur réutilisation et signaler les champs descriptifs manquants au lieu d'inventer leur valeur.
5. Vérifier la syntaxe d'un fichier avec `python -m json.tool src_init/provencal/activity.json`. Une sortie JSON indentée et l'absence d'erreur confirment que le JSON est syntaxiquement valide.
6. Avant import, vérifier les types, les identifiants, la cohérence métier, les références disponibles, les droits des médias, les champs requis, les dates d'événement et le mapping Django. L'absence de référence externe ne suffit pas à refuser une entrée.

## Vérification

Exécuter `python -m json.tool src_init/provencal/activity.json`. La commande doit terminer sans erreur ; une erreur indique un fichier JSON à corriger. La validité syntaxique ne prouve ni la conformité au format cible ni la validation éditoriale.

## Voir aussi

- [Standard des contenus](../docs/standards/game-content.md)
- [ADR-001 — Backend Django modulaire](../docs/architecture/adr/ADR-001-backend-django.md)
- [ADR-006 — Contenus canoniques et mini-jeux multiplateformes](../docs/architecture/adr/ADR-006-contenus-et-jeux-multiplateformes.md)
