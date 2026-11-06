# Spécification des mini-jeux web du MVP

## Objectif

Décrire les règles, écrans et critères des jeux `qcm` et `matching` (puis `true-false`) du site web responsive. À compléter par l'agent game-designer à partir du [modèle](../../.github/templates/game-spec-template.md).

## Périmètre

Jeux web du MVP provençal ; portage mobile post-MVP exclu.

## Prérequis

[Standard des contenus](../standards/game-content.md), [catalogue des templates](../../.github/skills/minigame-templates/SKILL.md), [backlog](./mvp-backlog.md) (US-006 à US-008).

## Vision

Public : curieux et apprenants du provençal. Promesse : réviser du vocabulaire en 2 à 3 minutes. Parties de 5 questions, sans chronomètre. Ton ludique et encourageant, jamais punitif. Version des règles : v0.1 (provisoire). Thème de lancement : Nature, à partir du premier pack (brouillon à valider).

## Contenus et règles partagées

- Version de contenu validée : à renseigner à la réception du pack Nature ; seuls les contenus publiés et validés sont jouables.
- Objectifs couverts : à renseigner (pack).
- Données utilisées : `facts` et `distractors` (qcm), `pairs` (matching). Aucune règle de jeu dans le pack.
- Ordre aléatoire à graine déterministe (graine injectable pour les tests).
- Score : 1 point par bonne réponse ou paire correcte ; `score_max` = nombre de questions (5) ou de paires (4 à 6). Aucune pénalité, aucun bonus de rapidité.
- Étoiles : 1 étoile à 60 % du maximum, 2 à 80 %, 3 à 100 %. En dessous de 60 %, 0 étoile avec un message d'encouragement. Barème provisoire, à valider par le porteur avant production.
- XP : l'XP des jeux n'est pas définie au MVP, seul l'XP de parcours existe (20 XP, une seule fois). Le quiz final de parcours est une partie de `qcm` de 5 questions : réussi si au moins 4 sur 5.
- Visiteur anonyme : il peut jouer ; le score n'est sauvegardé que pour un compte connecté (champs `submission_id`, `game_id`, `score`, `score_max` : voir ADR-006).
- Difficulté : selon `level` de l'objectif. Débutant : 2 essais par question pour le qcm. Intermédiaire et avancé : 1 essai. Pas d'indice au MVP, par simplicité.
- Retours : animation courte, message encourageant, explication du fait après chaque réponse. La vibration est facultative et jamais requise. Respecter `prefers-reduced-motion`.

## Parcours web

Fiche thème ou parcours → intro (règle en une phrase, bouton « Jouer ») → partie → résultat (score, étoiles, « Rejouer », « Retour »). Une action principale par écran, cibles tactiles d'au moins 44 px, texte de base 18 px, thèmes Light et Dark au contraste AA.
États : chargement (indicateur), erreur de chargement (message + « Réessayer »), perte réseau pendant la partie (la partie continue ; l'envoi du score est retenté à la fin avec le même `submission_id`).

## Jeux

### Jeu : `qcm`

- **Règles** : 5 questions tirées de faits distincts du pack. Chaque question présente 1 bonne réponse (le fait) et 3 mauvaises (`wrong`), mélangées. L'utilisateur touche une réponse ; la réponse est validée immédiatement. Débutant : si elle est fausse, un second essai est permis ; la bonne réponse est révélée après l'échec final. Les autres niveaux : un seul essai.
- **Score et progression** : 1 point par question réussie (au premier ou au second essai pour le niveau débutant). Étoiles 60/80/100 %. Le quiz de parcours est réussi à 4/5.
- **Retours ludiques** : animation douce sur la bonne réponse ; sur la mauvaise, message neutre (« Presque ! ») et explication du fait ; pas de son obligatoire.
- **Écrans** : intro ; question (énoncé, 4 boutons de réponse, indicateur « 3/5 ») ; correction (bonne réponse, explication, bouton « Suivant ») ; résultat (score x/5, étoiles, « Rejouer », « Retour »).
- **Cas limites** :
  - Moins de 5 faits jouables : la partie est réduite au nombre de faits disponibles (minimum 1) ; en dessous, le jeu est indisponible et le renvoi est fait au content-transformer.
  - Fait sans 3 `wrong` : exclu du tirage.
  - Actualisation ou fermeture en cours de partie : la partie est perdue, sans pénalité.
  - Double appui rapide : un seul appui est pris en compte.
  - Rejouer : nouveau tirage.
  - Réponse correcte identique entre deux réponses affichées : dédoublonnage avant affichage.
- **Critères d'acceptation** :
  - Étant donné un pack avec au moins 5 faits ayant 3 `wrong`, quand je démarre une partie, alors 5 questions de faits distincts s'affichent, chacune avec 4 réponses dont exactement 1 correcte.
  - Étant donné une question affichée, quand je touche la bonne réponse, alors elle est signalée comme correcte, l'explication s'affiche et mon score augmente de 1.
  - Étant donné un niveau débutant, quand je touche une mauvaise réponse, alors un message encourageant s'affiche et je peux réessayer une fois sans perdre de point.
  - Étant donné un niveau intermédiaire ou avancé, quand je touche une mauvaise réponse, alors la bonne réponse est révélée et la question est comptée comme ratée sans pénalité.
  - Étant donné 4 bonnes réponses sur 5 à un quiz de parcours, quand je termine, alors le parcours est réussi ; avec 3 sur 5, il ne l'est pas et « Rejouer » est proposé.
  - Étant donné un score de 3/5, quand le résultat s'affiche, alors j'ai 1 étoile ; 4/5 donne 2 étoiles ; 5/5 donne 3 étoiles ; 2/5 donne 0 étoile et un message d'encouragement.
  - Étant donné une graine fixe, quand je lance deux parties, alors l'ordre des questions et des réponses est identique.
  - Étant donné un visiteur anonyme, quand je termine une partie, alors aucune sauvegarde n'est tentée et une invitation à se connecter est proposée.
  - Étant donné un compte connecté, quand je termine une partie, alors un résultat est envoyé une seule fois avec un `submission_id` ; un renvoi avec le même identifiant ne crée pas de doublon.
  - Étant donné 3 faits seulement, quand je démarre, alors la partie compte 3 questions et `score_max` vaut 3.
  - Étant donné un écran de 360 px de large, quand je joue, alors aucune défilement horizontal n'apparaît et chaque bouton de réponse mesure au moins 44 px de haut.

### Jeu : `matching`

- **Règles** : une partie = un tableau de 5 paires (4 à 6 selon les paires disponibles), sans second tableau. Deux colonnes mélangées indépendamment : `left` (terme provençal) et `right` (traduction ou définition). L'utilisateur touche un élément de gauche puis un de droite. Si la paire correspond, elle est verrouillée en vert ; sinon les deux éléments se désélectionnent avec une animation douce. Le nombre d'essais est illimité. La partie se termine quand toutes les paires sont reliées.
- **Score et progression** : `score_max` = nombre de paires. 1 point par paire reliée du premier coup (sans erreur préalable sur cet élément de gauche). Étoiles 60/80/100 % du maximum. Une paire reliée après une erreur n'apporte aucun point mais n'est jamais retirée.
- **Retours ludiques** : paire correcte verrouillée avec animation ; erreur : message « Essaie encore » sans compteur d'erreurs visible ; fin : explication des paires en récapitulatif.
- **Écrans** : intro ; tableau (deux colonnes, indicateur « 2/5 paires ») ; résultat (score, étoiles, liste des paires, « Rejouer », « Retour »).
- **Cas limites** :
  - Moins de 4 paires jouables : jeu indisponible, demande de correction au content-transformer.
  - Plus de 6 paires dans le pack : tirage de 5 paires de faits distincts.
  - Deux paires avec le même `right` : l'une est exclue du tirage pour éviter l'ambiguïté.
  - Appui deux fois sur le même élément : désélection.
  - Appui sur un élément déjà verrouillé : ignoré.
  - Interruption : la partie est perdue, sans pénalité.
  - Texte long : retour à la ligne, jamais de troncature.
- **Critères d'acceptation** :
  - Étant donné un pack avec au moins 5 paires, quand je démarre, alors un seul tableau de 5 paires s'affiche, avec les deux colonnes mélangées indépendamment.
  - Étant donné un pack de 4 paires exactement, quand je démarre, alors le tableau compte 4 paires et `score_max` vaut 4.
  - Étant donné un pack de 3 paires, quand j'ouvre le jeu, alors il est indisponible et un message clair s'affiche.
  - Étant donné un élément de gauche sélectionné, quand je touche son correspondant à droite, alors la paire est verrouillée et le compteur augmente.
  - Étant donné un élément de gauche sélectionné, quand je touche un mauvais élément de droite, alors la sélection est annulée avec un message encourageant et aucun point n'est retiré.
  - Étant donné 5 paires reliées dont 1 après une erreur, quand le résultat s'affiche, alors le score est 4/5 et j'ai 2 étoiles.
  - Étant donné toutes les paires reliées, quand la dernière est verrouillée, alors l'écran de résultat s'affiche avec « Rejouer » et « Retour ».
  - Étant donné un écran de 360 px de large, quand je joue, alors chaque élément mesure au moins 44 px de haut, sans défilement horizontal.
  - Étant donné un compte connecté, quand je termine, alors un seul résultat est envoyé avec un `submission_id` unique.

### Jeu : `true-false` (lot 2)

À spécifier après la livraison de `qcm` et `matching`.

## Contraintes techniques

Standard frontend et [standard des contenus](../standards/game-content.md) ; accessibilité : [standard d'accessibilité](../standards/accessibility.md) (navigation clavier, libellés, contraste AA). Le standard Android est post-MVP et hors lancement. Les règles ci-dessus sont indépendantes de l'interface pour un portage ultérieur.

## Couverture

Tableau à remplir à la réception du pack Nature validé.

| Fait `essentiel` (id) | Objectif | Jeu qui le couvre | Parties/tirage |
|-----------------------|----------|-------------------|----------------|
| _(en attente du pack)_ | | | |

Règle : chaque fait `essentiel` est joué dans au moins un jeu ; un fait absent de tout tirage possible est renvoyé au content-transformer.

## Validation

- Challenge grill-me : à faire.
- Décisions provisoires à valider par le porteur : barème d'étoiles, XP, seuil 4/5.
- Questions ouvertes : maximum de faits par partie si le pack est petit ; ajout d'indices post-MVP.

## Vérification

Chaque jeu a des critères « Étant donné / Quand / Alors » testables, et le tableau de couverture relie chaque fait essentiel du pack à un jeu.
