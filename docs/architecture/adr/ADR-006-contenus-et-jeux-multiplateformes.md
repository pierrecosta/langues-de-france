# ADR-006 — Contenus canoniques et mini-jeux multiplateformes

- Statut : accepté
- Date : 2026-10-25
- Décideurs : porteur du projet

## Contexte

Le MVP propose des mini-jeux dans le site web responsive pour le territoire provençal. Le projet vise six territoires à terme. Une application mobile native, avec un éventuel portage Android hors ligne, est prévue après le MVP et ne conditionne pas son lancement. Django sert les contenus publiés ; les six fichiers historiques `src_init/provencal/*.json` ont des structures hétérogènes et certaines entrées incomplètes.

Les scores sont uniquement ludiques : le backend ne garantit pas leur honnêteté. Il doit néanmoins vérifier que la requête contient les champs attendus, avec les types et bornes définis.

## Périmètre

Import initial des seeds, source de vérité du contenu, mini-jeux web du MVP, sauvegarde des résultats web et règles conçues pour un éventuel portage mobile post-MVP.

## Options étudiées

| Option | Avantages | Inconvénients | Coût / risque |
|--------|-----------|---------------|---------------|
| Django canonique, avec export mobile ultérieur | Une source éditoriale ; le web lit l'API et une future application mobile pourra embarquer un instantané jouable hors ligne. | L'export et la synchronisation ne sont nécessaires qu'après le MVP web. | Coût initial faible ; cohérence maintenue pour l'évolution future. |
| Fichiers JSON comme source de vérité pour chaque client | Facile à démarrer et à embarquer. | Modifications et validations risquent de diverger entre le site, les exports et les jeux. | Coût initial faible ; risque élevé de divergence. |
| Packs indépendants par plateforme | Chaque interface peut évoluer séparément. | Duplique les contenus et les règles, contraire à la parité demandée. | Coût et risque élevés. |

## Décision

1. Django est la source de vérité des contenus publiés. Les six seeds (`word`, `expression`, `food`, `lieux`, `recipe`, `activity`) sont importés une fois comme brouillons. Le format cible de chaque catégorie et les exemples sont documentés dans [src_init/readme.md](../../../src_init/readme.md). Le mapping des formats historiques reste à définir avant l'import. Une source externe n'est pas obligatoire pour une forme linguistique connue de mémoire ; les références disponibles sont enregistrées et aucune n'est inventée. Les droits des médias réutilisés restent à vérifier. Seuls les contenus validés éditorialement sont publiés et jouables.
2. Le web obtient les contenus publiés via l'API Django ; les mini-jeux web responsives sont inclus dans le MVP provençal. Jouer dans un navigateur mobile ne requiert pas d'application native.
3. Les règles, la difficulté et le barème des jeux web sont versionnés avec le code ; le back-office ne les modifie pas au MVP. Les règles sont conçues pour pouvoir être portées vers une application mobile après le MVP, sans livrer ce client au lancement.
4. Une personne non connectée peut jouer sur le web, mais seul un compte connecté peut sauvegarder sa progression. L'authentification mobile native et ses jetons sont post-MVP et traités, le moment venu, dans l'ADR-004.
5. L'API de progression accepte uniquement le schéma suivant, sans prétendre vérifier l'exactitude du résultat :

   - `submission_id` : UUID stable généré pour une partie ; une répétition est idempotente.
   - `game_id` : identifiant connu parmi les templates du catalogue.
   - `content_version` : entier positif correspondant à la version actuellement publiée.
   - `score` et `score_max` : entiers ; `score_max > 0` et `0 <= score <= score_max`.
   - Le compte du MVP est déterminé par la session web ; l'horodatage est produit par le serveur. Les champs inconnus sont refusés. Une identité par jeton natif ne concernera qu'une future application mobile.

6. Chaque partie est conservée dans l'historique du compte et supprimée avec celui-ci.
7. Après le MVP, une éventuelle application Android pourra mettre les résultats terminés hors ligne en attente. Les retries réutiliseront le même `submission_id`. À la déconnexion, la file en attente sera supprimée. Si le serveur refuse un résultat parce que sa version n'est plus actuelle, l'application supprimera ce résultat localement.

## Conséquences

- Positives :
  - Le web utilise les contenus et règles du MVP ; une application mobile post-MVP pourra reprendre les mêmes contenus validés, règles et scores.
  - Le jeu web est accessible dans un navigateur responsive dès le MVP ; une application mobile native pourra être ajoutée plus tard.
  - Les sauvegardes de progression sont rattachées au compte authentifié, sans identifiant de compte fourni par le client.
- Négatives et dette acceptée :
  - Post-MVP, un résultat mobile en attente pourra être perdu après une publication qui change la version du contenu ; cette perte devra être signalée et le résultat local périmé supprimé.
  - Les seeds nécessitent un mapping et une validation éditoriale avant publication.
  - La durée de vie, le renouvellement, la révocation et le stockage des jetons Android restent à préciser avant l'implémentation, selon l'ADR-004.
- Sécurité, scalabilité, performance :
  - Le serveur valide la forme, les types, les bornes, le template et la version courante ; il ne garantit pas l'authenticité du score. Aucun dispositif antifraude n'est requis pour ces scores ludiques.
  - L'identité est dérivée de la session ou du jeton validé ; l'autorisation est contrôlée côté serveur.
  - Les règles sur les jetons natifs s'appliqueront à une éventuelle application post-MVP ; les données personnalisées ne sont jamais mises en cache partagé.

## Retour arrière

Le site et les mini-jeux web continuent à servir les contenus publics depuis Django. Après le MVP, si une application mobile existe, elle pourra continuer à jouer avec le dernier export embarqué si la synchronisation est suspendue.

## Vérification

- Les six seeds sont importés une fois comme brouillons ; un réimport ne remplace aucune modification Django.
- Une entrée incomplète n'est ni publique ni jouable ; les contenus validés sont exposés par l'API web. Après le MVP, un éventuel export mobile reprend les mêmes contenus.
- Les tests du client web du MVP confirment les règles et scores pour un contenu et une version donnés ; les tests de parité avec une application mobile auront lieu après son développement.
- Les payloads incomplets, mal typés, hors bornes, avec un `game_id` inconnu, des champs supplémentaires ou une version périmée sont refusés.
- Un retry avec le même `submission_id` ne crée pas de doublon ; l'identité provient du compte authentifié.
- Après le MVP, une application mobile testée joue en mode avion, synchronise un résultat valide après reconnexion et supprime la file à la déconnexion ou au rejet d'une version périmée.
- L'historique de progression disparaît lors de la suppression du compte.

## Liens

- [ADR-001 — Backend Django modulaire](./ADR-001-backend-django.md)
- [ADR-004 — Comptes, invitations et permissions](./ADR-004-authentification.md)
- [Standard des contenus](../../standards/game-content.md)
- [Standard Android](../../standards/android.md)
- [Spécification de jeu multiplateforme](../../../.github/templates/game-spec-template.md)
