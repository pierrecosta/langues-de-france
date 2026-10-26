# ADR-006 — Contenus canoniques et mini-jeux multiplateformes

- Statut : accepté
- Date : 2026-10-25
- Décideurs : porteur du projet

## Contexte

Le projet doit proposer les mêmes mini-jeux sur le web et Android. Le web sert les contenus publiés depuis Django ; Android doit rester jouable hors ligne. Les six fichiers historiques `src_init/provencal/*.json` ont des structures hétérogènes et certaines entrées incomplètes.

Les scores sont uniquement ludiques : le backend ne garantit pas leur honnêteté. Il doit néanmoins vérifier que la requête contient les champs attendus, avec les types et bornes définis.

## Périmètre

Import initial des seeds, source de vérité du contenu, export Android, règles de jeu partagées, sauvegarde des résultats web et synchronisation Android.

## Options étudiées

| Option | Avantages | Inconvénients | Coût / risque |
|--------|-----------|---------------|---------------|
| Django canonique, export versionné pour Android | Une source éditoriale ; le web lit l'API et Android embarque un instantané jouable hors ligne. | Nécessite un import/export versionné et une règle de rejet des scores périmés. | Coût moyen ; cohérence et traçabilité meilleures. |
| Fichiers JSON comme source de vérité pour chaque client | Facile à démarrer et à embarquer. | Modifications et validations risquent de diverger entre le site, les exports et les jeux. | Coût initial faible ; risque élevé de divergence. |
| Packs indépendants par plateforme | Chaque interface peut évoluer séparément. | Duplique les contenus et les règles, contraire à la parité demandée. | Coût et risque élevés. |

## Décision

1. Django est la source de vérité des contenus publiés. Les six seeds (`word`, `expression`, `food`, `lieux`, `receipy`, `activity`) sont importés une fois comme brouillons. Le mapping des fichiers et les critères d'enrichissement restent à définir avant l'import. Aucun champ manquant n'est inventé ; seules les entrées enrichies et validées sont publiées et jouables.
2. Le web obtient les contenus publics publiés via l'API Django. Android reçoit un export de contenu versionné dans ses assets et joue sans réseau.
3. Les règles, la difficulté et le barème sont communs aux deux plateformes et versionnés avec le code ; le back-office ne les modifie pas au MVP. Les interfaces et critères d'acceptation sont adaptés au web et Android.
4. Une personne non connectée peut jouer sur le web, mais seul un compte connecté peut sauvegarder sa progression. Android demande une connexion uniquement pour la synchronisation ; la connexion native et les jetons sont traités dans l'ADR-004.
5. L'API de progression accepte uniquement le schéma suivant, sans prétendre vérifier l'exactitude du résultat :

   - `submission_id` : UUID stable généré pour une partie ; une répétition est idempotente.
   - `game_id` : identifiant connu parmi les templates du catalogue.
   - `content_version` : entier positif correspondant à la version actuellement publiée.
   - `score` et `score_max` : entiers ; `score_max > 0` et `0 <= score <= score_max`.
   - Le compte est déterminé par la session web ou le jeton Android ; l'horodatage est produit par le serveur. Les champs inconnus sont refusés.

6. Chaque partie est conservée dans l'historique du compte et supprimée avec celui-ci.
7. Android met les résultats hors ligne en attente. Les retries réutilisent le même `submission_id`. À la déconnexion, la file en attente est supprimée. Si le serveur refuse un résultat parce que sa version n'est plus actuelle, l'application supprime ce résultat localement.

## Conséquences

- Positives :
  - Le site et Android utilisent les mêmes contenus validés, règles et scores.
  - Le jeu reste fonctionnel sans réseau sur Android.
  - Les sauvegardes de progression sont rattachées au compte authentifié, sans identifiant de compte fourni par le client.
- Négatives et dette acceptée :
  - Un résultat Android en attente peut être perdu après une publication qui change la version du contenu ; cette perte est signalée par l'application et le résultat local périmé est supprimé.
  - Les seeds nécessitent un mapping et une validation éditoriale avant publication.
  - La durée de vie, le renouvellement, la révocation et le stockage des jetons Android restent à préciser avant l'implémentation, selon l'ADR-004.
- Sécurité, scalabilité, performance :
  - Le serveur valide la forme, les types, les bornes, le template et la version courante ; il ne garantit pas l'authenticité du score.
  - L'identité est dérivée de la session ou du jeton validé ; l'autorisation est contrôlée côté serveur.
  - Les jetons natifs ne sont ni journalisés ni stockés en clair ; les données personnalisées ne sont jamais mises en cache partagé.

## Retour arrière

Le jeu Android reste jouable avec le dernier export embarqué. Si la synchronisation doit être suspendue, désactiver l'endpoint de progression sans bloquer le jeu hors ligne ; les utilisateurs peuvent continuer à jouer localement. Le web peut continuer à servir les contenus publics depuis Django.

## Vérification

- Les six seeds sont importés une fois comme brouillons ; un réimport ne remplace aucune modification Django.
- Une entrée incomplète n'est ni publique ni jouable ; une entrée validée est identique dans l'API web et l'export Android.
- Les tests des deux clients confirment les mêmes règles et scores pour un contenu et une version donnés.
- Les payloads incomplets, mal typés, hors bornes, avec un `game_id` inconnu, des champs supplémentaires ou une version périmée sont refusés.
- Un retry avec le même `submission_id` ne crée pas de doublon ; l'identité provient du compte authentifié.
- Android joue en mode avion, synchronise un résultat valide après reconnexion et supprime la file à la déconnexion ou au rejet d'une version périmée.
- L'historique de progression disparaît lors de la suppression du compte.

## Liens

- [ADR-001 — Backend Django modulaire](./ADR-001-backend-django.md)
- [ADR-004 — Comptes, invitations et permissions](./ADR-004-authentification.md)
- [Standard des contenus](../../standards/game-content.md)
- [Standard Android](../../standards/android.md)
- [Spécification de jeu multiplateforme](../../../.github/templates/game-spec-template.md)
