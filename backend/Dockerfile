FROM python:3.12-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1

WORKDIR /app/backend
RUN useradd --system --uid 10001 --no-create-home app
COPY backend/pyproject.toml ./
COPY --chown=app:app backend/manage.py ./
COPY --chown=app:app backend/config ./config
COPY --chown=app:app backend/apps ./apps
COPY --chown=app:app src_init/provencal/word.json src_init/provencal/expression.json /app/src_init/provencal/
RUN pip install --no-cache-dir .

FROM base AS test
RUN pip install --no-cache-dir ".[dev]" && chown app:app /app/backend
COPY --chown=app:app backend/tests ./tests
USER app

FROM base AS runtime
USER app

EXPOSE 8000
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
