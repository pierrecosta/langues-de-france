from io import StringIO

import pytest
from django.core.checks import run_checks
from django.core.management import call_command
from django.db import connection
from django.db.migrations.executor import MigrationExecutor
from django.urls import resolve, reverse


def test_startup_has_no_url_warnings() -> None:
    assert not [issue for issue in run_checks() if issue.id == "urls.W002"]


@pytest.mark.parametrize(
    ("name", "url", "kwargs"),
    [
        ("word-list", "/api/territories/provencal/words", {"territory_slug": "provencal"}),
        (
            "word-detail",
            "/api/territories/provencal/words/bonjorn",
            {"territory_slug": "provencal", "slug": "bonjorn"},
        ),
        (
            "expression-list",
            "/api/territories/provencal/expressions",
            {"territory_slug": "provencal"},
        ),
        (
            "expression-detail",
            "/api/territories/provencal/expressions/bonjorn",
            {"territory_slug": "provencal", "slug": "bonjorn"},
        ),
    ],
)
def test_public_urls_remain_stable(name: str, url: str, kwargs: dict[str, str]) -> None:
    assert reverse(name, kwargs=kwargs) == url
    assert resolve(url).url_name == name


@pytest.mark.django_db
def test_domain_migrations_are_applied_and_match_models() -> None:
    executor = MigrationExecutor(connection)
    for app in ("territories", "dictionary", "expressions"):
        assert (app, "0001_initial") in executor.loader.applied_migrations
    out = StringIO()
    call_command("makemigrations", check=True, dry_run=True, stdout=out)
    assert "No changes detected" in out.getvalue()
