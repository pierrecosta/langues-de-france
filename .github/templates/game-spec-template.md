# Spécification des mini-jeux web du MVP

## Vision

Public, promesse, durée d'une partie, ton (ludique, encourageant) et version des règles. Le MVP cible le web responsive ; une application mobile native est une phase ultérieure.

## Contenus et règles partagées

- Version de contenu validée :
- Objectifs couverts :
- Règles du jeu web du MVP, conçues pour rester portables :
- Données utilisées : `facts`, `pairs`, `distractors`…
- Score et progression du web :

## Parcours et critères du MVP web

### Web

Parcours, actions principales, états de chargement/erreur/hors connexion, critères d'acceptation.

## Portage mobile natif après le MVP

Ne remplir cette section que lors de la phase mobile post-MVP.

### Android

Parcours, actions principales, usage hors ligne, synchronisation éventuelle, critères d'acceptation.

## Jeux

Une section par jeu, identifiant issu du [catalogue des templates](../skills/minigame-templates/SKILL.md).

### Jeu : `<id-template>`

- Règles : déroulé d'une partie, nombre de questions, essais.
- Score et progression : points, bonus, étoiles ; à aligner sur les règles web lors du portage.
- Retours ludiques : animation, vibration, message.
- Écrans : intro, partie, résultat (contenu et actions), adaptés à chaque plateforme.
- Cas limites : pack trop court, réponse vide, interruption, rotation, perte réseau et résultat périmé.
- Critères d'acceptation du MVP web : liste testable (Étant donné… Quand… Alors…). Les critères Android sont à ajouter au portage mobile post-MVP.

## Contraintes techniques

Renvoi au [standard Android](../../docs/standards/android.md), au [standard frontend](../../docs/standards/frontend.md) et au [standard des contenus](../../docs/standards/game-content.md) ; écarts éventuels justifiés.

## Couverture

Tableau fait `essentiel` → jeu qui le couvre.

## Validation

Résultat du challenge grill-me.
