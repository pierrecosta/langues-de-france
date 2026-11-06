import pytest
from django.contrib.auth import get_user_model
from django.test import Client

from apps.dictionary.models import Word
from apps.territories.models import Territory

pytestmark = pytest.mark.django_db


@pytest.fixture
def admin_client() -> Client:
    user = get_user_model().objects.create_superuser("root", password="pw-test-1234")
    client = Client()
    client.force_login(user)
    return client


def post_action(client: Client, action: str, ids: list[int], **extra: str):  # type: ignore[no-untyped-def]
    data = {"action": action, "_selected_action": ids, **extra}
    return client.post("/admin/dictionary/word/", data)


def test_publish_then_unpublish_with_reason(admin_client: Client) -> None:
    territory = Territory.objects.create(slug="provencal", name="Provençal")
    word = Word.objects.create(territory=territory, slug="a")
    post_action(admin_client, "publish_selected", [word.pk])
    word.refresh_from_db()
    assert word.status == "published"

    form = post_action(admin_client, "unpublish_selected", [word.pk])
    assert form.status_code == 200 and "Motif" in form.content.decode()
    word.refresh_from_db()
    assert word.status == "published"

    empty = post_action(admin_client, "unpublish_selected", [word.pk], apply="1", reason="")
    assert empty.status_code == 200
    word.refresh_from_db()
    assert word.status == "published"

    post_action(admin_client, "unpublish_selected", [word.pk], apply="1", reason="Source douteuse")
    word.refresh_from_db()
    assert word.status == "draft" and word.unpublish_reason == "Source douteuse"
