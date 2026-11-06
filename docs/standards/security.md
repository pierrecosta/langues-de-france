# Standard sécurité

## Objectif

Fixer les exigences de sécurité minimales du MVP. Appliqué par [security](../../.github/agents/security.agent.md) et contrôlé par [reviewer](../../.github/agents/reviewer.agent.md).

## Périmètre

Backend, frontend, déploiement et données personnelles du MVP provençal. Android est post-MVP.

## Prérequis

[ADR-004](../architecture/adr/ADR-004-authentification.md), [ADR-005](../architecture/adr/ADR-005-deploiement.md), [standard backend](./backend.md).

## Exigences

| Exigence | Vérification observable |
|----------|-------------------------|
| Sessions Django et CSRF | Cookies de session et CSRF `Secure`, `HttpOnly`, `SameSite` présents dans les en-têtes ; requête POST sans jeton CSRF rejetée (403). |
| HTTPS et HSTS sur `le-provencal.ovh` | HTTP redirigé vers HTTPS ; en-tête `Strict-Transport-Security` présent. |
| Autorisation côté serveur par rôle et par territoire ; jamais d'identifiant propriétaire fourni par le client | Tests d'accès : un rôle ou territoire non autorisé reçoit 403/404 ; le propriétaire vient de la session, pas de la requête. |
| Validation des entrées, ORM/requêtes paramétrées, échappement | Aucune requête SQL concaténée (revue) ; entrées invalides rejetées par les sérialiseurs ; test d'échappement HTML. |
| Limitation de débit sur connexion, inscription, réinitialisation et recherche | Test : dépassement du seuil renvoie 429 sur chacun des quatre points. |
| Liens à usage unique, expirants (invitation 48 h, réinitialisation 1 h) et révocables | Tests : second usage, lien expiré ou révoqué refusé. |
| Validateurs de mots de passe Django | `AUTH_PASSWORD_VALIDATORS` activés ; mot de passe faible refusé à l'inscription. |
| Aucun secret dans le dépôt, les logs ou les images ; `.env` ignoré ; pas d'identifiants demo en production | Analyse de secrets propre ; `.env` dans `.gitignore` ; comptes demo absents de la base de production. |
| Dépendances épinglées et auditées | `pip-audit` et `npm audit` sans vulnérabilité élevée en intégration continue. |
| Images Docker non-root, versions figées (pas de `:latest`), ports minimaux | `USER` non-root dans les Dockerfile ; aucun `:latest` (recherche dans le dépôt) ; seuls les ports nécessaires sont publiés. |
| Sauvegardes quotidiennes chiffrées hors serveur, restauration testée mensuellement | Dernière sauvegarde datée de moins de 24 h, chiffrée, hors serveur ; compte rendu du test de restauration du mois. |
| RGPD minimal : e-mail et pseudo seulement, mentions légales et confidentialité, suppression/anonymisation du compte, porteur responsable du traitement | Modèle utilisateur sans autre donnée personnelle ; pages légales accessibles ; suppression/anonymisation testée. |
| Contrôle des médias (type et taille) | Test : fichier de type ou de taille non autorisé refusé. |

## Constats connus

À corriger avant la mise en production (lot L4) :

- `docker-compose.mcp.yml` utilise `playwright/mcp:latest` : figer la version.
- Le MCP postgres (`.devcontainer/mcp/postgres/Dockerfile`) se connecte avec le propriétaire de la base, sans lecture seule : créer un rôle `mcp_ro` avec `SELECT` uniquement.

## Vérification

Chaque exigence a une vérification observable et l'audit des dépendances passe en intégration continue.
