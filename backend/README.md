# Backend Django — démarrage L0

Django 5.2 / Python 3.12 et PostgreSQL 16. Les modèles et imports existants suivent les [ADR-001](../docs/architecture/adr/ADR-001-backend-django.md), [ADR-003](../docs/architecture/adr/ADR-003-postgresql-search.md) et [ADR-007](../docs/architecture/adr/ADR-007-identite-et-mapping-des-seeds.md). Aucun mode SQLite.

## Configuration locale sans secret dans les fichiers

Depuis la racine du dépôt, dans un shell :

```bash
cd backend
set -a; . ./.env.example; set +a
export DJANGO_SECRET_KEY="$(python3 -c "import secrets; print(secrets.token_urlsafe(48))")"
export POSTGRES_PASSWORD="$(python3 -c "import secrets; print(secrets.token_urlsafe(24))")"
```

Les valeurs secrètes sont uniquement dans l’environnement de ce shell (et des processus/conteneurs lancés depuis celui-ci) ; ne pas les afficher, les versionner ou les utiliser en production. L’exemple ne contient aucun secret. Garder les mêmes valeurs pour tous les terminaux/commandes visant le même volume ; PostgreSQL n’applique `POSTGRES_PASSWORD` qu’à la première initialisation. Si le mot de passe est perdu, créer une nouvelle base ou, **uniquement si les données locales peuvent être effacées**, `docker compose down -v`, puis réinitialiser. Ne pas faire cela sur une base partagée.

## Chemin Docker recommandé

Prérequis : Docker et Compose v2, Python 3 pour générer les secrets. Depuis `backend/`, après la configuration ci-dessus :

```bash
docker compose config --quiet
docker compose up -d --wait db
docker compose run --rm backend python manage.py migrate --noinput
docker compose up -d --build backend
docker compose run --rm backend python manage.py check --fail-level WARNING
docker compose run --rm backend python manage.py makemigrations --check --dry-run
docker compose run --rm backend python manage.py import_seeds --dry-run
docker compose run --rm test pytest
curl http://127.0.0.1:8000/health
```

`test` construit une image de développement et exécute les tests dans le réseau Compose, avec une base de test PostgreSQL créée puis supprimée par pytest ; le rôle doit pouvoir créer des bases (le rôle initial du conteneur le peut). Le port PostgreSQL est publié sur `127.0.0.1:55432` par défaut, modifiable via `POSTGRES_PORT` ; dans les conteneurs, Django utilise `db:5432`. Le port API est `127.0.0.1:8000`. Si ces ports sont occupés ou réservés, modifier `POSTGRES_PORT` ou la publication API dans Compose. Dans un devcontainer avec démon Docker distant, les ports publiés sont sur l’hôte Docker, pas nécessairement sur le `localhost` du devcontainer ; privilégier les commandes `docker compose run` et accéder à l’API depuis l’hôte.

L’image embarque les deux seeds provençaux nécessaires (`word.json`, `expression.json`) au moment du build ; reconstruire après leur modification. L’import réel, uniquement si souhaité, se lance avec `docker compose run --rm backend python manage.py import_seeds` : il crée des brouillons sans écraser les entrées existantes. `docker compose down` arrête les services mais conserve le volume et les données.

## Python local

Avec Python 3.12, PostgreSQL 16 accessible depuis ce shell, les variables ci-dessus chargées et `POSTGRES_HOST`/`POSTGRES_PORT` adaptés à la base :

```bash
python3.12 -m venv .venv
. .venv/bin/activate
python -m pip install -e ".[dev]"
python manage.py migrate --noinput
python manage.py check --fail-level WARNING
python manage.py makemigrations --check --dry-run
python manage.py import_seeds --dry-run
ruff check . && ruff format --check . && mypy .
pytest
python manage.py runserver
```

Charger les variables **avant** pytest et mypy : Django est initialisé avant `tests/conftest.py`. Les tests exigent PostgreSQL et le droit de créer une base de test distincte. Ne pas lancer ces commandes sur une base tierce ou de production.

## Vérifications et impact

- `/health` vérifie la connexion ; `/api/schema/` sert OpenAPI. Les listes et détails publiés conservent leurs URL existantes `/api/territories/{territory_slug}/words`, `/words/{slug}`, `/expressions` et `/expressions/{slug}`.
- Les trois migrations `0001_initial` créent les tables territoire, mot et expression avec leurs contraintes. Une base vierge est attendue ; si des tables non migrées existent déjà, sauvegarder et étudier leur état avant toute application : ne pas employer `--fake` automatiquement.
- Aucune donnée ni publication n’est créée par `migrate` ; l’import conserve l’identité et les brouillons de l’ADR-007. Pas de changement attendu de performance ou de contrat d’URL. Les secrets ne sont pas fournis par défaut ; le volume PostgreSQL reste persistant et accessible uniquement sur l’hôte local par défaut.
- Les tests existants vérifient notamment import réel, réimport, brouillons et détails ; les tests L0 vérifient les checks de routage, la stabilité des URL et l’application/cohérence des migrations. La configuration pytest impose 80 % de couverture.
