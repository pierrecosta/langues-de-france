# Standard des contenus pédagogiques et des mini-jeux

Source unique du format de données échangé entre [content-transformer](../../.github/agents/content-transformer.agent.md), [game-designer](../../.github/agents/game-designer.agent.md), [backend-python](../../.github/agents/backend-python.agent.md), [frontend-react](../../.github/agents/frontend-react.agent.md) et [android-dev](../../.github/agents/android-dev.agent.md).

## Principe

La base Django est la source de vérité des contenus publiés. Un **pack de contenu** = un fichier `content-pack.json` + un dossier `images/` ; c'est un format d'échange et pourra servir à un export mobile post-MVP, pas une seconde source de vérité. Les contenus web publiés sont servis par l'API Django. L'import des seeds historiques est unique ; les entrées incomplètes restent des brouillons jusqu'à validation. Aucune règle de jeu n'est dans le pack ; aucune donnée pédagogique n'est dans la spécification de jeu.

Les règles des mini-jeux web du MVP sont versionnées avec le code et non modifiables dans le back-office. Elles sont conçues pour pouvoir être portées vers Android après le MVP ; le client natif ne fait pas partie du lancement. Les critères d'acceptation du MVP sont détaillés dans la [spécification de jeu](../../.github/templates/game-spec-template.md).

## Règles

- JSON UTF-8, texte en français, identifiants (`id`, clés) en anglais, `kebab-case`.
- Chaque fait est rattaché à un **objectif d'apprentissage** (`objectiveId`), formulé avec un verbe observable (« identifier », « citer », « associer »).
- Une forme linguistique peut provenir de la mémoire ou de l'apprentissage d'un contributeur ; une source externe n'est pas obligatoire. Si une source est connue ou accessible, le contributeur l'ajoute dans `sources` et le fait la référence avec `sourceId`. Ne jamais inventer de référence et ne pas écarter une contribution uniquement faute de source externe.
- L'absence de référence externe n'annule pas la confiance accordée au contributeur ni la validation éditoriale. Les droits des images, sons et autres médias réutilisés restent à vérifier.
- Textes courts : question ≤ 140 caractères, réponse ≤ 60, pour un écran de téléphone.
- Images : SVG ou PNG/WebP ≤ 200 Ko, avec texte alternatif obligatoire (`alt`).
- Pas de donnée personnelle ; enregistrer la provenance et les droits lorsqu'une source ou un média externe est utilisé.

## Schéma minimal

```json
{
  "version": 1,
  "title": "Titre du pack",
  "language": "fr",
  "sources": [{ "id": "src-1", "label": "Nom", "origin": "URL ou fichier", "license": "Licence ou droits si connus" }],
  "objectives": [{ "id": "obj-1", "statement": "Identifier ...", "level": "debutant" }],
  "facts": [{
    "id": "fact-1", "objectiveId": "obj-1", "sourceId": "src-1",
    "statement": "Fait validé", "importance": "essentiel",
    "image": { "file": "images/fact-1.svg", "alt": "Description" }
  }],
  "pairs": [{ "id": "pair-1", "factId": "fact-1", "left": "Terme", "right": "Définition" }],
  "distractors": [{ "factId": "fact-1", "wrong": ["Faux 1", "Faux 2", "Faux 3"] }]
}
```

`importance` : `essentiel`, `important` ou `complementaire`. `level` : `debutant`, `intermediaire` ou `avance`. `version` est la version positive du contenu ; la gestion de résultats en attente d'un client mobile ne s'appliquera qu'après le MVP.

`sourceId` est facultatif lorsque le fait relève du savoir ou de la mémoire du contributeur. S'il est renseigné, il doit référencer une entrée existante dans `sources`. Une absence de `sourceId` ne bloque pas à elle seule la publication ; l'administrateur valide le contenu métier selon le workflow éditorial.

## Jeux : types autorisés

Identifiants des templates des mini-jeux web du MVP, documentés dans le skill [minigame-templates](../../.github/skills/minigame-templates/SKILL.md). Un futur client mobile reprendra ces règles.

`quiz`, `qcm`, `true-false`, `matching`, `word-find`, `speed-challenge`

Les identifiants et règles des templates sont la référence du jeu web au MVP. Un éventuel portage mobile devra conserver le même comportement et le même score ; ses parcours d'interface seront adaptés au support et validés dans cette phase ultérieure.

## Critère de conformité

Tout `objectiveId` et `factId` référencé existe ; tout `sourceId` présent référence une source existante ; chaque objectif a au moins un fait ; chaque image a un `alt` ; chaque fait `essentiel` est couvert par un jeu web. Seuls les contenus publiés et validés sont exposés par l'API publique et les jeux web du MVP. Un export mobile est prévu après le MVP.
