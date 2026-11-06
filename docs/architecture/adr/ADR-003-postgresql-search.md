# ADR-003 — PostgreSQL partagé et recherche tolérante

- Statut : accepté (2026-10-26, PO délégué par le porteur ; révisable par le porteur)
- Date : 2026-10-25
- Décideurs : PO (délégation du porteur), architecte IA

## Objectif

Stocker les contenus, contributions et progressions dans une base relationnelle unique et fournir la recherche bilingue avec tolérance aux fautes.

## Périmètre

Modèle de données multi-territoires, variantes linguistiques, recherche français ↔ langue locale et médias du MVP.

## Prérequis

- PostgreSQL est demandé par le porteur du projet.
- La cible à terme du cahier des charges est de 5 000 mots et 500 expressions par territoire ; le MVP commence par le provençal.
- Les contenus et variantes doivent être rattachés à leur territoire et à leurs sources.

## Étapes

1. Définir un schéma relationnel partagé avec un identifiant de territoire sur chaque contenu.
2. Représenter les formes principales, variantes, sources et révisions dans des relations explicites.
3. Indexer les champs de recherche et mesurer les requêtes exactes et approximatives.
4. Activer les extensions `unaccent` et `pg_trgm` (migration ; à vérifier sur l'instance de production).
5. Conserver les médias dans un volume persistant sauvegardé avec la base.

## Contexte

Les données comportent des relations entre mots, variantes, catégories, sources, contributions, quiz et territoires. La recherche doit tolérer les fautes, sans qu'un volume initial important justifie un moteur spécialisé.

## Options étudiées

| Option | Avantages | Inconvénients | Coût / risque |
|--------|-----------|---------------|---------------|
| PostgreSQL relationnel partagé, index trigrammes | Cohérence relationnelle, filtres SQL, transactions et recherche approximative dans un seul service de données. | La qualité de la recherche régionale dépendra de la normalisation, des variantes et des tests éditoriaux ; l'extension doit être disponible sur l'hébergement choisi. | Coût faible ; risque technique faible à moyen. |
| Base séparée par territoire | Isolation forte entre territoires. | Migrations, sauvegardes, recherches globales et gestion des comptes plus complexes ; le besoin d'isolation physique n'est pas établi. | Coût d'exploitation élevé et réversibilité moyenne. |
| PostgreSQL plus moteur de recherche dédié | Fonctions de recherche et classement plus riches à grande échelle. | Synchronisation et exploitation d'un composant supplémentaire, sans nécessité démontrée pour le volume prévu. | Coût et complexité élevés au MVP. |

## Décision

Utiliser une base PostgreSQL unique avec un schéma partagé et des clés de territoire. Indexer les formes principales et variantes. Recherche MVP simple : extensions `unaccent` et `pg_trgm` activées par migration (recherche insensible aux accents, tolérante aux fautes, dans les deux sens français ↔ provençal) ; ne pas ajouter Elasticsearch ou un autre moteur externe au MVP.

Stocker les médias dans un volume persistant distinct des tables relationnelles, référencé par la base et inclus dans la sauvegarde hors serveur.

## Conséquences

- Positives :
  - Les données d'un territoire peuvent être ajoutées sans déploiement d'une nouvelle base.
  - Les filtres, relations et statistiques restent transactionnels.
  - Le système commence avec peu de composants.
- Négatives et dette acceptée :
  - La base partagée exige des filtres territoriaux systématiques et testés.
  - Le classement approximatif ne remplace pas la validation des graphies et variantes par les administrateurs.
  - Les médias nécessitent une stratégie de copie lors d'un changement d'hôte.
- Sécurité, scalabilité, performance :
  - Contrôler les droits applicatifs par territoire ; ne pas se fier aux identifiants fournis par le client.
  - Les index trigrammes sont documentés par PostgreSQL pour les recherches de similarité et certains opérateurs `LIKE`/`ILIKE`.
  - Mesurer avant d'ajouter un cache ou un moteur externe ; la cible de réponse produit reste inférieure à deux secondes.

## Retour arrière

Les contenus canoniques restent dans PostgreSQL. Si `pg_trgm` est indisponible ou insuffisant, remplacer l'index ou ajouter un moteur de recherche dérivé, réindexable depuis PostgreSQL, sans changer la source de vérité.

## Vérification

- Recherche dans les deux sens, filtres, variantes et pagination de 25 résultats.
- Jeux d'essais incluant accents, graphies attestées et fautes typographiques sont définis avec les administrateurs.
- Le temps de réponse est mesuré sur le corpus cible et comparé à l'objectif de deux secondes.
- Une vérification d'accès confirme qu'une requête ne révèle pas les données privées ou administratives d'un autre territoire.

## Liens

- [PostgreSQL 18 — pg_trgm](https://www.postgresql.org/docs/18/pgtrgm.html)
- [README architecture](../README.md)
