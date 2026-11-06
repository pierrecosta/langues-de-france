# ADR-005 — Déploiement Docker et exploitation

- Statut : accepté (2026-10-26, PO délégué par le porteur ; révisable par le porteur)
- Date : 2026-10-25
- Décideurs : PO (délégation du porteur), architecte IA

## Objectif

Déployer le MVP localement puis sur OVH, avec une migration AWS possible sans imposer Kubernetes au lancement.

## Périmètre

Conteneurs applicatifs, domaine et TLS, volumes persistants, sauvegardes et critères de réévaluation de l'hébergement.

## Prérequis

- Projet neuf ; exploitation auto-gérée par une équipe réduite.
- Docker préféré ; Kubernetes reste une option ultérieure.
- Domaine `le-provencal.ovh` utilisé dès le lancement.
- Seuil demandé de réévaluation AWS : plus de 2 000 000 visiteurs par jour ; l'objectif fonctionnel de réponse reste inférieur à deux secondes.
- Sauvegarde de production hors serveur chaque jour ; test de restauration mensuel.

## Étapes

1. Utiliser Docker Compose pour le développement local et le premier déploiement OVH.
2. Faire passer le trafic par un reverse proxy HTTPS qui distribue `/`, `/api/` et `/admin/`.
3. Persister PostgreSQL et les médias hors du cycle de vie des conteneurs applicatifs.
4. Construire et étiqueter des images reproductibles ; conserver la configuration et les secrets hors du dépôt.
5. Sauvegarder la base et les médias quotidiennement vers un emplacement distinct du serveur.
6. Tester une restauration complète au moins une fois par mois.
7. Réévaluer OVH si le seuil de trafic est atteint ou si l'objectif de performance n'est plus tenu après optimisation et redimensionnement raisonnables.

## Contexte

Le projet démarre à faible volume, sur un seul territoire, avec un développement local puis un hébergement OVH. AWS est envisagé à plus grande échelle ; l'équipe souhaite limiter les opérations et ne pas gérer Kubernetes trop tôt.

## Options étudiées

| Option | Avantages | Inconvénients | Coût / risque |
|--------|-----------|---------------|---------------|
| Docker Compose sur une VM OVH | Contrôle des coûts, fonctionnement proche du poste local, faible nombre de composants et images portables. | Mises à jour, surveillance, sauvegardes, sécurité système et incidents sont à la charge du porteur. | Coût bas ; risque opérationnel moyen, réduit par les sauvegardes et procédures. |
| Services managés dès le départ | Réduit l'administration du système et peut fournir des sauvegardes/haute disponibilité intégrées. | Coût et dépendance plus élevés ; moins adapté à la préférence d'auto-exploitation initiale. | Coût moyen à élevé. |
| Kubernetes au lancement | Fournit des primitives d'orchestration et de déploiement avancées. | Apprentissage et exploitation disproportionnés pour le trafic et l'équipe initiaux. | Coût opérationnel élevé ; risque de sur-ingénierie. |

## Décision

Utiliser Docker Compose sur un serveur OVH pour le premier déploiement, avec des conteneurs séparés pour Next.js, Django, PostgreSQL et le reverse proxy. Garder les services applicatifs aussi stateless que possible ; ne pas introduire Kubernetes, cache distribué ou file de tâches au MVP.

Utiliser `le-provencal.ovh` et HTTPS dès le lancement. Les invitations et liens de récupération sont créés dans l'application puis transmis manuellement depuis la boîte existante ; aucune dépendance à un service e-mail transactionnel.

Faire une sauvegarde quotidienne de PostgreSQL et des médias vers un stockage hors serveur, puis restaurer ces données dans un environnement isolé au moins une fois par mois. Une copie sur le même disque n'est pas une sauvegarde de production.

Réévaluer AWS lorsque le trafic dépasse 2 000 000 de visiteurs par jour ou plus tôt si, après optimisation et redimensionnement raisonnables d'OVH, l'objectif de réponse inférieur à deux secondes ne peut plus être respecté. Ce seuil est un déclencheur de réévaluation et non une obligation d'attendre si la fiabilité est menacée.

## Conséquences

- Positives :
  - L'environnement local et OVH partagent les mêmes images conteneurisées.
  - Le coût et la complexité initiaux restent limités.
  - Les services applicatifs sont portables vers AWS sans migration immédiate vers Kubernetes.
- Négatives et dette acceptée :
  - Le porteur assure les mises à jour, la supervision, les sauvegardes et la réponse aux incidents.
  - L'absence d'e-mail transactionnel impose des opérations manuelles.
  - Le stockage local des médias devra être copié ou migré lors d'un changement d'hôte.
- Sécurité, scalabilité, performance :
  - N'exposer que le reverse proxy ; conserver PostgreSQL sur le réseau interne.
  - Les sauvegardes sont chiffrées et stockées avec des accès séparés de ceux du serveur, selon la configuration retenue.
  - Mesurer le temps de réponse et les ressources avant de déplacer l'application vers AWS.

## Retour arrière

Revenir à l'image applicative précédente si un déploiement échoue. Pour une migration d'hôte, geler brièvement les écritures, restaurer la sauvegarde vérifiée, contrôler les médias et basculer le DNS après validation. Garder les migrations de schéma rétrocompatibles pendant le déploiement.

## Vérification

- Démarrage local reproductible via Docker Compose.
- HTTPS valide sur le domaine lors de la mise en ligne.
- Une restauration mensuelle de la base et des médias se termine avec succès.
- Les temps de réponse sont mesurés sur les parcours publics et la recherche ; tout dépassement durable de deux secondes déclenche une analyse avant la migration AWS.
- Le site reste fonctionnel lors d'un redémarrage des conteneurs applicatifs sans perte de données.

## Liens

- [Docker Compose — documentation](https://docs.docker.com/compose/)
- [README architecture](../README.md)
