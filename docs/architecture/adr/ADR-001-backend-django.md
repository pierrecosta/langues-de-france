# ADR-001 — Backend Django modulaire

- Statut : proposé
- Date : 2026-10-25
- Décideurs : porteur du projet (validation à obtenir), architecte IA (proposition)

## Objectif

Choisir un backend Python qui permette de gérer les contenus territoriaux, les rôles, les contributions et leur validation sans multiplier les services.

## Périmètre

Backend du MVP provençal et ajout ultérieur de territoires. Le frontend public et les décisions de stockage sont traités dans des ADR séparés.

## Prérequis

- Projet neuf, sans code applicatif existant.
- Python demandé ; PostgreSQL et React sont préférés.
- L'administration territoriale et le workflow de validation sont requis au MVP.

## Étapes

1. Créer un projet Django organisé en modules fonctionnels.
2. Définir les modèles avec une clé de territoire et les rôles globaux et territoriaux.
3. Exposer une API JSON pour le frontend et protéger l'administration.
4. Appliquer les vérifications de déploiement Django avant publication.

## Contexte

Le MVP comprend plusieurs modules de contenu, un back-office, des contributions modérées et des rôles globaux et territoriaux. L'équipe d'exploitation est réduite et privilégie des solutions peu coûteuses et auto-hébergées.

## Options étudiées

| Option | Avantages | Inconvénients | Coût / risque |
|--------|-----------|---------------|---------------|
| Django en monolithe modulaire | ORM, authentification, groupes, permissions et interface d'administration intégrés ; bonne adéquation au back-office éditorial. | L'interface d'administration devra être restreinte et adaptée aux permissions par territoire ; l'API ajoute une frontière à maintenir. | Coût initial faible ; risque moyen de mauvaise configuration des permissions objet-territoire. |
| FastAPI avec API et back-office séparés | API explicite et documentation OpenAPI intégrée. | Authentification, permissions éditoriales et back-office à assembler ou développer séparément. | Coût et maintenance plus élevés pour une petite équipe. |
| Django avec pages et formulaires uniquement côté serveur | Déploiement plus simple et rendu HTML intégré. | S'écarte de la préférence React pour l'interface publique et peut mélanger plus fortement présentation et logique. | Coût initial faible ; réversibilité moyenne. |

## Décision proposée

Utiliser Django comme monolithe modulaire : domaines `territories`, `dictionary`, `expressions`, `culture`, `tourism`, `gastronomy`, `contributions`, `learning` et `accounts`. Utiliser l'administration Django comme base du back-office, avec des permissions vérifiées par territoire et une API JSON pour le frontend.

Ne pas séparer les modules en microservices. Le modèle porte un `territory_id` sur les contenus et les contributions ; l'ajout d'un territoire est une opération de données et de configuration, pas une copie de schéma ou de service.

Django est la source de vérité des contenus publiés. Les fichiers historiques `src_init/provencal/*.json` sont importés une fois comme brouillons ; après cet import, toute correction s'effectue dans Django. Les entrées incomplètes restent non publiées jusqu'à leur enrichissement et leur validation. Le mapping des fichiers vers les modèles et les critères de validation sont à définir avant l'import.

## Conséquences

- Positives :
  - Réutilisation de l'authentification, des groupes, des permissions et de l'administration Django.
  - Un seul processus applicatif Python pour les règles métier et le workflow de modération.
  - Les mêmes modèles et services s'appliquent au provençal et aux territoires ultérieurs.
- Négatives et dette acceptée :
  - Les permissions territoriales nécessitent une logique objet-territoire et des tests spécifiques ; les permissions globales seules ne suffisent pas.
  - L'interface d'administration standard n'est pas le produit public et devra être configurée pour les administrateurs territoriaux.
  - L'API JSON et ses contrats devront rester compatibles avec le frontend.
  - Les seeds historiques ne constituent pas un schéma canonique ; leur import exige un mapping explicite et ne doit pas écraser les modifications faites dans Django.
- Sécurité, scalabilité, performance :
  - Refuser par défaut toute opération sur un objet hors des territoires autorisés à l'utilisateur.
  - À ce volume, un monolithe Django et une seule base PostgreSQL suffisent ; mettre à l'échelle l'application avant d'introduire une architecture distribuée.
  - Exécuter `check --deploy` avec les réglages de production.

## Retour arrière

Les modules et l'API restent dans un seul dépôt et une seule base. Une interface ou un service peut être remplacé sans migrer les données métier. Si l'administration Django ne convient pas, la remplacer par une interface dédiée en conservant les mêmes modèles et permissions.

## Vérification

- Un administrateur d'un territoire ne peut ni lire ni modifier les objets d'un autre territoire.
- Un super-administrateur peut créer des territoires et gérer les administrateurs.
- Une nouvelle région peut être ajoutée par données et configuration sans dupliquer les modèles.
- Les vérifications de déploiement ne signalent pas d'erreur bloquante.

## Liens

- [Documentation Django — groupes et permissions](https://docs.djangoproject.com/en/6.1/topics/auth/default/)
- [Documentation Django — permissions de l'administration](https://docs.djangoproject.com/en/6.1/ref/contrib/admin/)
- [Documentation Django — vérification de déploiement](https://docs.djangoproject.com/en/6.1/ref/django-admin/#check)
- [README architecture](../README.md)
