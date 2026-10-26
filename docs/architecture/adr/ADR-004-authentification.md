# ADR-004 — Comptes, invitations et permissions

- Statut : proposé
- Date : 2026-10-25
- Décideurs : porteur du projet (validation à obtenir), architecte IA (proposition)

## Objectif

Protéger les comptes, les contributions et les fonctions d'administration tout en respectant le modèle d'inscription retenu.

## Périmètre

Inscription des utilisateurs, invitation au rôle contributeur, administration territoriale, sessions web du MVP, liens manuels d'invitation et de réinitialisation, suppression/anonymisation. L'authentification Android concerne une application native post-MVP.

## Prérequis

- Les visiteurs consultent librement et les comptes ordinaires peuvent s'inscrire librement.
- Le rôle contributeur est attribué sur invitation du super-administrateur uniquement.
- Le domaine `le-provencal.ovh` est utilisé dès le lancement.
- Une boîte e-mail permet l'envoi manuel ; aucun envoi transactionnel automatisé n'est prévu.

## Étapes

1. Utiliser les sessions Django, avec cookies `Secure`, `HttpOnly` et `SameSite`, et protection CSRF.
2. Après le MVP, si l'application Android est engagée, définir un mécanisme de jetons natifs géré par Django, distinct des sessions web, avec durée de vie, renouvellement, révocation et stockage sécurisé.
3. Créer des rôles globaux et territoriaux et appliquer les contrôles côté serveur à chaque action.
4. Générer des liens d'invitation et de réinitialisation à usage unique, à durée limitée et révocables.
5. Afficher le lien au super-administrateur afin qu'il le transmette manuellement ; ne jamais afficher ni envoyer un mot de passe.
6. Journaliser l'invitation, sa consommation et les changements de rôle sans enregistrer les secrets de session ou jetons.
7. À la suppression d'un compte, effacer/anonymiser les données personnelles et toute la progression ; conserver les contributions validées sans lien personnel lorsque possible.

## Contexte

Le site web du MVP possède des comptes, une progression et des contributions. L'inscription ordinaire est libre, mais les contributions sont sur invitation. L'équipe n'a pas prévu d'intégration SMTP/API et exploite elle-même le serveur. Aucun client mobile natif n'est livré au MVP.

## Options étudiées

| Option | Avantages | Inconvénients | Coût / risque |
|--------|-----------|---------------|---------------|
| Sessions Django sur le même domaine | Modèle intégré au backend, révocation centralisée, cookies non accessibles au JavaScript et CSRF contrôlable. | Le proxy et le frontend SSR doivent préserver correctement le contexte de session ; configuration des cookies nécessaire. | Coût faible ; risque moyen si le déploiement multi-origine est mal configuré. |
| Jetons JWT conservés dans le navigateur | API découplée et jetons utilisables par plusieurs clients. | Révocation et renouvellement plus complexes ; risque accru si les jetons sont exposés au JavaScript ou mal stockés. | Coût moyen à élevé, non justifié par le besoin web actuel. |
| Fournisseur d'identité tiers | Réduit la gestion locale de certains aspects d'authentification. | Dépendance, coût potentiel, configuration et transfert de données vers un tiers. | Coût et dépendance externes ; non retenu sans besoin multi-fournisseur. |

## Décision proposée

Utiliser les sessions Django pour le web du MVP. L'application mobile native, son authentification par jetons et la synchronisation hors ligne sont post-MVP et ne doivent pas retarder le lancement web.

Les utilisateurs anonymes peuvent jouer aux mini-jeux web, mais seule une session authentifiée peut enregistrer une progression. Si Android est développé après le MVP, l'identité associée à une synchronisation proviendra du jeton ; le client ne choisira pas le compte cible.

Les messages sont transmis manuellement par le super-administrateur. Les jetons sont à usage unique, temporaires et non réutilisables ; leur durée d'expiration reste à fixer avant implémentation. Un lien ne doit pas contenir d'information personnelle et ne doit pas être journalisé.

## Conséquences

- Positives :
  - Pas de fournisseur d'identité ni d'outil d'envoi automatisé à exploiter.
  - Le super-administrateur conserve le contrôle de l'accès contributeur.
  - La suppression/anonymisation des données personnelles est explicitement séparée de la conservation patrimoniale.
- Négatives et dette acceptée :
  - L'envoi manuel augmente le délai et la charge de support ; il n'y a pas de notification automatique.
  - Le super-administrateur devient un point de dépendance pour les invitations et réinitialisations.
  - L'expiration des liens et le processus de récupération doivent être testés et documentés.
  - Les détails du cycle de vie des jetons Android seront à fixer avant une éventuelle implémentation mobile post-MVP.
- Sécurité, scalabilité, performance :
  - Appliquer le moindre privilège ; une session ordinaire ne donne jamais le droit de contribuer.
  - Les administrateurs territoriaux ne peuvent gérer que leur territoire ; le super-administrateur gère les rôles globaux.
  - Prévoir limitation de débit sur l'inscription, la connexion, la création et la consommation des liens.
  - Pour une future application Android, ne jamais journaliser ni exposer les jetons ; le stockage local suivra le standard Android.
  - Les cookies et le transport sont HTTPS uniquement.

## Retour arrière

Le rôle contributeur peut être retiré immédiatement et les invitations non consommées révoquées. En cas d'incident, désactiver temporairement les contributions sans bloquer la consultation publique. Les sessions concernées peuvent être invalidées depuis le backend.

## Vérification

- Un compte ordinaire ne peut pas soumettre une contribution avant attribution du rôle.
- Une personne non connectée peut jouer mais ne peut pas enregistrer de progression.
- Après le MVP, les jetons Android révoqués, expirés ou mal formés seront refusés ; aucun identifiant de compte fourni par le client ne changera le propriétaire d'une progression.
- Un lien d'invitation ou de réinitialisation expiré, révoqué ou déjà utilisé est refusé.
- Les tests couvrent l'accès hors territoire, la révocation de rôle, la limitation de débit et la suppression/anonymisation.
- Les secrets de session et jetons ne sont pas écrits dans les journaux.

## Liens

- [Documentation Django — authentification et groupes](https://docs.djangoproject.com/en/6.1/topics/auth/default/)
- [Documentation Django — permissions d'administration](https://docs.djangoproject.com/en/6.1/ref/contrib/admin/)
- [README architecture](../README.md)
