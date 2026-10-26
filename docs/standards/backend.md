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

## Critère de conformité

Lint, typage et tests passent ; chaque endpoint a un test et une entrée documentée.
