# Brief pédagogique — Pack Nature (provençal)

## Contexte

- Public : débutants, 50 ans et plus, sans connaissance préalable du provençal.
- Usage : mini-jeux web responsive (MVP), parties de 5 questions de 2 à 3 minutes, sans chronomètre.
- Territoire : `provencal`. Thème : Nature. Pack candidat de 12 faits, tous en `provenance: brouillon`, à valider par le contributeur de référence (transmetteur provençal du Var) avant publication.
- Les graphies sont reprises telles quelles des seeds. Aucune graphie n'est tranchée ici.

## Sources

| Id | Nom | Origine | Droits d'usage | Fiabilité |
|----|-----|---------|----------------|-----------|
| src-1 | Seed vocabulaire provençal | `src_init/provencal/word.json` | À confirmer | Brouillon, non validé linguistiquement |
| src-2 | Seed expressions provençales | `src_init/provencal/expression.json` | À confirmer | Brouillon, non validé linguistiquement |

Aucune URL externe n'est reprise : les `source-url` des seeds ne sont pas vérifiées. Aucun média réutilisé.

## Objectifs d'apprentissage

| Id | Objectif (verbe observable) | Niveau |
|----|-----------------------------|--------|
| obj-1 | Associer quatre éléments du paysage (soleil, lune, mer, montagne) à leur nom provençal | debutant |
| obj-2 | Identifier le nom provençal de cinq plantes du terroir (lavande, romarin, thym, piment, petits pois) | debutant |
| obj-3 | Citer le sens de trois expressions provençales liées à la nature | intermediaire |

## Informations clés

| Fait | Objectif | Français → provençal (graphie des seeds) | Importance | Source |
|------|----------|------------------------------------------|------------|--------|
| fact-1 | obj-1 | Soleil → Soleu | essentiel | src-1 |
| fact-2 | obj-1 | Lune → Luna | essentiel | src-1 |
| fact-3 | obj-1 | Mer → Mar | essentiel | src-1 |
| fact-4 | obj-1 | Montagne → Montanha | important | src-1 |
| fact-5 | obj-2 | Lavande → Lavanda | essentiel | src-1 |
| fact-6 | obj-2 | Romarin → Roumanieu | important | src-1 |
| fact-7 | obj-2 | Thym → Farigoulo | important | src-1 |
| fact-8 | obj-2 | Piment → Pimentoun | complementaire | src-1 |
| fact-9 | obj-2 | Petits pois → Peses Verds | complementaire | src-1 |
| fact-10 | obj-3 | « Faire cantar li cigalo » = Profiter de la vie | important | src-2 |
| fact-11 | obj-3 | « Quand lou soulèu tomba » = À la tombée de la nuit | important | src-2 |
| fact-12 | obj-3 | « Entre dos aigo » = Hésiter | complementaire | src-2 |

Contradictions : aucune source concurrente n'a été comparée. Les doutes ci-dessous sont à trancher par le contributeur de référence, pas par le pack.

Points à faire valider :
1. Graphies. « Montanha », « Luna », « Mar » et « Lavanda » ressemblent à des formes de l'occitan classique, alors que les seeds indiquent l'origine « Mistral ». « Soleu », « Roumanieu » et « Farigoulo » ressemblent à des graphies mistralienn
2. « Peses Verds » est la forme du seed pour « Petits pois ». Il faut confirmer la graphie et le pluriel.
3. Expressions : sens et graphie de « Faire cantar li cigalo », « Quand lou soulèu tomba » et « Entre dos aigo ». « Faire cantar li cigalo » est la glose du seed.
4. Les prononciations des seeds ne sont pas reprises, faute de validation.
5. Exclus volontairement : les exemples de démonstration des seeds (« phrase de démonstration »), les notes culturelles génériques et les URL des seeds.
6. Vent/Vent et Arbre/Arbre (identiques au français) ont été écartés car peu utiles pédagogiquement.
7. Droits d'usage des seeds à confirmer.

## Représentations retenues

Donnée brute seule pour les 12 faits : textes courts adaptés à l'écran de téléphone, sans image. Aucun SVG : les termes se mémorisent par le texte et le jeu d'association. Aucun média externe, donc aucun droit d'image à vérifier.

## Jeux suggérés

À confirmer par le game-designer. Voir le [skill minigame-templates](../../../../.github/skills/minigame-templates/SKILL.md).

- obj-1 : `matching` (4 paires), puis `qcm`.
- obj-2 : `qcm` (5 faits), puis `true-false`.
- obj-3 : `qcm` (terme → sens).
- Quiz final de parcours : 5 questions tirées des faits essentiels et importants, 4/5 requis.
- Rappel : `speed-challenge` est hors MVP.

## Validation

- Challenge grill-me : à faire.
- Conformité au [standard des contenus](../../../../docs/standards/game-content.md) : à contrôler par `lint_pack.py` et relecture. Tous les faits ont un objectif, une provenance et une source de seed existante. Aucune image, donc aucun `alt` requis.
- Statut global : brouillon, en attente de validation par le contributeur de référence.
