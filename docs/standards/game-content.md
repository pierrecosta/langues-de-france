# Standard des contenus pédagogiques et des mini-jeux

Source unique du format de données échangé entre [content-transformer](../../.github/agents/content-transformer.agent.md), [game-designer](../../.github/agents/game-designer.agent.md), [backend-python](../../.github/agents/backend-python.agent.md), [frontend-react](../../.github/agents/frontend-react.agent.md) et [android-dev](../../.github/agents/android-dev.agent.md).

## Principe

La base Django est la source de vérité des contenus publiés. Un **pack de contenu** = un fichier `content-pack.json` + un dossier `images/` ; c'est un format d'échange et un export versionné pour le jeu Android hors ligne, pas une seconde source de vérité. Les contenus web publiés sont servis par l'API Django. L'import des seeds historiques est unique ; les entrées incomplètes restent des brouillons jusqu'à validation. Aucune règle de jeu n'est dans le pack ; aucune donnée pédagogique n'est dans la spécification de jeu.

Les règles de jeu sont partagées entre le web et Android, versionnées avec le code et non modifiables dans le back-office au MVP. Les interfaces et critères d'acceptation propres à chaque plateforme sont détaillés dans la [spécification de jeu](../../.github/templates/game-spec-template.md).

## Règles

- JSON UTF-8, texte en français, identifiants (`id`, clés) en anglais, `kebab-case`.
- Chaque fait porte sa **source** (`sourceId`) : aucune information sans origine.
- Chaque fait est rattaché à un **objectif d'apprentissage** (`objectiveId`) ; un objectif est formulé avec un verbe observable (« identifier », « citer », « associer »).
- Textes courts : question ≤ 140 caractères, réponse ≤ 60, pour un écran de téléphone.
- Images : SVG ou PNG/WebP ≤ 200 Ko, avec texte alternatif obligatoire (`alt`).
- Pas de donnée personnelle ; droits d'usage des sources vérifiés et notés dans `sources`.

## Schéma minimal

```json
{
  "version": 1,
  "title": "Titre du pack",
  "language": "fr",
  "sources": [{ "id": "src-1", "label": "Nom", "origin": "URL ou fichier", "license": "Licence ou droits" }],
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

`importance` : `essentiel`, `important` ou `complementaire`. `level` : `debutant`, `intermediaire` ou `avance`. `version` est la version positive de l'export de contenu ; les résultats Android en attente ne sont acceptés par l'API que si leur version correspond à la version actuellement publiée.

## Jeux : types autorisés

Identifiants des templates de jeu, partagés par la spécification et l'application. Les règles de chaque type sont dans le skill [minigame-templates](../../.github/skills/minigame-templates/SKILL.md).

`quiz`, `qcm`, `true-false`, `matching`, `word-find`, `speed-challenge`

Les identifiants et les règles de ces templates sont communs aux clients web et Android. Le comportement de jeu et le score doivent être identiques ; les parcours d'interface et critères d'acceptation sont adaptés à la plateforme.

## Critère de conformité

Tout `objectiveId`, `sourceId` et `factId` référencé existe ; chaque objectif a au moins un fait ; chaque image a un `alt` ; chaque fait `essentiel` est couvert par au moins un jeu. Seuls les contenus publiés et validés sont exposés dans l'API publique ou l'export Android.
