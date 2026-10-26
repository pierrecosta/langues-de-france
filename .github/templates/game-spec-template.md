# Spécification de jeu multiplateforme

## Vision

Public, promesse, durée d'une partie, ton (ludique, encourageant), plateformes cibles (web, Android) et version des règles.

## Contenus et règles partagées

- Version de contenu validée :
- Objectifs couverts :
- Règles communes aux plateformes :
- Données utilisées : `facts`, `pairs`, `distractors`…
- Score et progression communs :

## Parcours et critères par plateforme

### Web

Parcours, actions principales, états de chargement/erreur/hors connexion, critères d'acceptation.

### Android

Parcours, actions principales, usage hors ligne, synchronisation éventuelle, critères d'acceptation.

## Jeux

Une section par jeu, identifiant issu du [catalogue des templates](../skills/minigame-templates/SKILL.md).

### Jeu : `<id-template>`

- Règles : déroulé d'une partie, nombre de questions, essais.
- Score et progression : points, bonus, étoiles ; identiques sur le web et Android.
- Retours ludiques : animation, vibration, message.
- Écrans : intro, partie, résultat (contenu et actions), adaptés à chaque plateforme.
- Cas limites : pack trop court, réponse vide, interruption, rotation, perte réseau et résultat périmé.
- Critères d'acceptation communs et critères spécifiques : liste testable (Étant donné… Quand… Alors…).

## Contraintes techniques

Renvoi au [standard Android](../../docs/standards/android.md), au [standard frontend](../../docs/standards/frontend.md) et au [standard des contenus](../../docs/standards/game-content.md) ; écarts éventuels justifiés.

## Couverture

Tableau fait `essentiel` → jeu qui le couvre.

## Validation

Résultat du challenge grill-me.
