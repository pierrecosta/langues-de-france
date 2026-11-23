# Standard backend (Python)

Source unique des règles backend. Appliqué par l'agent [backend-python](../../.github/agents/backend-python.agent.md) et contrôlé par [reviewer](../../.github/agents/reviewer.agent.md).

## Règles

- Python 3.12, typage statique complet (`mypy` ou `pyright` sans erreur).
- API documentée (OpenAPI) ; validation systématique des entrées ; erreurs normalisées.
- Sécurité : aucun secret en dur, requêtes paramétrées, principe du moindre privilège, dépendances auditées.
- Observabilité : logs structurés, identifiant de corrélation, métriques de base, endpoint de santé.
- Qualité : formatage et lint automatiques (`ruff`), fonctions courtes, pas de code mort.
- Tests : unitaires et d'intégration (`pytest`), couverture ≥ 80 % sur le code métier.
- Base de données : migrations versionnées, jamais de modification manuelle de schéma.

## Pile et outils

- **Django 5.2 LTS** et **Django REST Framework** ; apps par domaine sous `backend/apps/` ; configuration lue uniquement depuis l'environnement (`.env.example` liste les variables).
- **PostgreSQL** via `psycopg` 3 ; les tests tournent sur PostgreSQL, pas sur SQLite.
- **drf-spectacular** : schéma OpenAPI servi sur `/api/schema/`, à jour avec chaque endpoint.
- **ruff** (lint + format) et **mypy** en mode `strict` avec `django-stubs` ; configuration dans `backend/pyproject.toml`.
- **structlog** pour les logs JSON ; l'en-tête `X-Request-ID` porte l'identifiant de corrélation.
- Erreurs d'API au format `{"error": {"code", "message", "details", "correlation_id"}}`.
- Contenu importé : brouillon par défaut, jamais de publication ni d'écrasement à l'import (ADR-007). Guide d'usage : [backend/README.md](../../backend/README.md).

## Critère de conformité

Lint, typage et tests passent ; chaque endpoint a un test et une entrée documentée.
