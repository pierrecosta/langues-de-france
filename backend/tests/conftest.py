import os

os.environ.setdefault("DJANGO_SECRET_KEY", "test-only-key")
os.environ.setdefault("POSTGRES_DB", "demo")
os.environ.setdefault("POSTGRES_USER", "demo")
os.environ.setdefault("POSTGRES_PASSWORD", "demo")
