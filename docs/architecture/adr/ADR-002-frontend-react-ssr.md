# ADR-002 — Frontend React avec rendu serveur

- Statut : accepté
- Date : 2026-10-25
- Décideurs : porteur du projet, architecte IA

## Objectif

Fournir une interface React accessible et des pages de contenu partageables avec aperçu social rendu côté serveur. L'indexation par les moteurs de recherche est hors périmètre pour le moment.

## Périmètre

Site public responsive du MVP provençal, y compris ses mini-jeux web, URLs dédiées par contenu et rendu des métadonnées sociales. Une application mobile native est hors périmètre du MVP et prévue après.

## Prérequis

- Les contenus publics doivent disposer d'URLs dédiées partageables et de métadonnées sociales rendues dans le HTML.
- Aucune indexation par les moteurs de recherche n'est souhaitée au MVP.
- React est la préférence du porteur du projet.
- Le déploiement doit pouvoir fonctionner dans un conteneur Docker auto-hébergé.

## Étapes

1. Construire le frontend en React avec Next.js et son routeur App.
2. Rendre côté serveur les pages publiques et leurs métadonnées depuis l'API Django.
3. Réserver les interactions côté client aux fonctions nécessitant un état interactif.
4. Publier le frontend sous le même domaine et derrière le reverse proxy commun.

## Contexte

Les liens de contenus seront transmis directement à des connaissances. Les aperçus doivent donc inclure des métadonnées sociales dans le HTML initial, même si le site n'est pas indexé. Une application monopage seule ne garantit pas que les robots de partage exécutent JavaScript pour obtenir ces métadonnées.

## Options étudiées

| Option | Avantages | Inconvénients | Coût / risque |
|--------|-----------|---------------|---------------|
| Next.js avec rendu serveur et métadonnées sociales | S'appuie sur React et produit les aperçus de partage dans le HTML de chaque route publique. | Ajoute un runtime Node.js et un déploiement distinct de Django ; demande de maîtriser les frontières serveur/client. | Coût moyen ; répond au besoin de partage. |
| Application React monopage (SPA) | Déploiement statique simple et peu coûteux. | Les robots de partage peuvent ne pas exécuter JavaScript ; les aperçus sociaux ne sont pas garantis. | Coût faible ; compromis sur les aperçus. |
| Pages Django rendues côté serveur avec React limité aux interactions | Rendu HTML et métadonnées possibles dans un seul runtime applicatif. | React n'est pas le mode principal de construction de l'interface et le mélange des responsabilités est plus difficile à faire évoluer. | Coût opérationnel faible ; compromis avec la préférence React. |

## Décision

Utiliser Next.js comme frontend React rendu côté serveur pour les pages publiques et les mini-jeux responsives du MVP provençal. Jouer depuis un navigateur mobile relève du site web et ne signifie pas qu'une application native est livrée. Générer les métadonnées sociales par territoire et par contenu. Ajouter `noindex` et ne pas publier de sitemap d'indexation tant que l'indexation n'est pas souhaitée. Les URLs canoniques suivent la forme `/{territoire}/{type}/{slug}` ; l'identifiant métier reste stable et un ancien slug redirige vers l'URL canonique.

Construire l'application en mode autonome pour le conteneur Docker et conserver Django comme source de vérité métier. Placer le frontend et le backend derrière le même domaine : `/` pour Next.js, `/api/` pour Django et `/admin/` pour le back-office.

Next.js rend côté serveur les pages publiques à partir de l'API Django. Les données de compte et de progression sont chargées côté navigateur après connexion ; elles ne sont pas incluses dans le rendu public ni dans un cache partagé. Toute publication invalide les caches des pages et données publiques concernées.

## Conséquences

- Positives :
  - Les URL partagées ont des aperçus sociaux dans le HTML initial, sans dépendre de l'indexation.
  - L'interface reste basée sur React et s'intègre au déploiement Docker.
  - La séparation du frontend et du backend reste une frontière de déploiement, sans imposer des microservices métier.
- Négatives et dette acceptée :
  - Deux runtimes applicatifs doivent être construits, surveillés et mis à jour.
  - Le mécanisme d'invalidation de cache à la publication doit rester cohérent avec les routes publiques.
  - Les pages privées chargées côté navigateur doivent gérer les sessions expirées et les refus d'accès.
- Sécurité, scalabilité, performance :
  - Les pages publiques peuvent être mises en cache si leur cache est invalidé à chaque publication ; les pages personnalisées et d'administration ne doivent jamais l'être en cache partagé.
  - Les appels authentifiés du navigateur restent protégés par les mécanismes de session et CSRF décrits dans l'ADR-004.
  - Mesurer le temps de réponse des pages publiques et de recherche ; ne pas ajouter de CDN avant d'en mesurer le besoin.

## Retour arrière

Les URLs canoniques et le contrat de l'API restent indépendants du framework. Si le rendu serveur devient trop coûteux à exploiter, pré-rendre les pages éditoriales ou remplacer le frontend sans changer les modèles et les URL publiques.

## Vérification

- Une page publique publiée de chaque type renvoie le HTML initial avec titre, description, URL canonique et métadonnées Open Graph adaptés.
- Les pages sont marquées `noindex` et aucun sitemap d'indexation n'est exposé.
- Une publication invalide les pages et données en cache concernées.
- Les pages publiques restent accessibles sans compte.
- Les vues privées et les réponses personnalisées ne sont pas mises en cache publiquement.
- Le conteneur de production contient les fichiers nécessaires au rendu serveur autonome.

## Liens

- [Next.js — métadonnées et images Open Graph](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Next.js — sortie autonome](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)
- [README architecture](../README.md)
