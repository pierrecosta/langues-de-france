import pytest
from django.db import IntegrityError, transaction
from rest_framework.test import APIClient

from apps.dictionary.models import Word
from apps.expressions.models import Expression
from apps.territories.models import Territory

pytestmark = pytest.mark.django_db


@pytest.fixture
def territory() -> Territory:
    return Territory.objects.create(slug="provencal", name="Provençal")


def test_identity_is_unique_per_territory(territory: Territory) -> None:
    Word.objects.create(territory=territory, slug="bonjorn")
    with pytest.raises(IntegrityError), transaction.atomic():
        Word.objects.create(territory=territory, slug="bonjorn")
    Expression.objects.create(territory=territory, slug="bonjorn")


def test_publish_and_unpublish_requires_reason(territory: Territory) -> None:
    word = Word.objects.create(territory=territory, slug="a")
    assert word.status == "draft"
    word.publish()
    assert word.status == "published" and word.published_at is not None
    with pytest.raises(ValueError):
        word.unpublish("  ")
    word.unpublish("erreur")
    word.refresh_from_db()
    assert word.status == "draft" and word.unpublish_reason == "erreur"


def test_api_lists_only_published(territory: Territory) -> None:
    Word.objects.create(territory=territory, slug="pub", local="Pub", status="published")
    Word.objects.create(territory=territory, slug="brouillon", local="Brouillon")
    response = APIClient().get("/api/territories/provencal/words")
    data = response.json()
    assert response.status_code == 200
    assert data["count"] == 1
    assert data["results"][0]["slug"] == "pub"


def test_api_detail_404_for_draft(territory: Territory) -> None:
    Word.objects.create(territory=territory, slug="pub", status="published")
    Word.objects.create(territory=territory, slug="brouillon")
    client = APIClient()
    assert client.get("/api/territories/provencal/words/pub").status_code == 200
    assert client.get("/api/territories/provencal/words/brouillon").status_code == 404


def test_expressions_api(territory: Territory) -> None:
    Expression.objects.create(
        territory=territory, slug="e", local_expression="E", status="published"
    )
    Expression.objects.create(territory=territory, slug="d")
    client = APIClient()
    assert client.get("/api/territories/provencal/expressions").json()["count"] == 1
    assert client.get("/api/territories/provencal/expressions/e").status_code == 200
    assert client.get("/api/territories/provencal/expressions/d").status_code == 404


def test_pagination(territory: Territory) -> None:
    for i in range(3):
        Word.objects.create(territory=territory, slug=f"w{i}", status="published")
    data = APIClient().get("/api/territories/provencal/words?page_size=2").json()
    assert len(data["results"]) == 2 and data["next"] is not None
