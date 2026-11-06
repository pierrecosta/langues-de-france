import pytest
from django.db import DatabaseError
from rest_framework.test import APIClient

pytestmark = pytest.mark.django_db


def test_health_ok_and_correlation_header() -> None:
    response = APIClient().get("/health", HTTP_X_REQUEST_ID="abc-12345678")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "database": "up"}
    assert response["X-Request-ID"] == "abc-12345678"


def test_invalid_correlation_id_is_replaced() -> None:
    response = APIClient().get("/health", HTTP_X_REQUEST_ID="bad id <script>")
    assert len(response["X-Request-ID"]) == 32


def test_health_down(monkeypatch: pytest.MonkeyPatch) -> None:
    def boom(*args: object, **kwargs: object) -> None:
        raise DatabaseError("down")

    monkeypatch.setattr("apps.core.views.connection.cursor", boom)
    response = APIClient().get("/health")
    assert response.status_code == 503
    assert response.json()["database"] == "down"


def test_normalized_error_format() -> None:
    response = APIClient().get("/api/territories/inconnu/words", HTTP_X_REQUEST_ID="corr-12345678")
    assert response.status_code == 404
    error = response.json()["error"]
    assert error["code"] == "not_found"
    assert error["correlation_id"] == "corr-12345678"


def test_method_not_allowed_is_normalized() -> None:
    response = APIClient().post("/api/territories/provencal/words", {}, format="json")
    assert response.status_code == 405
    assert response.json()["error"]["code"] == "method_not_allowed"


def test_openapi_schema() -> None:
    response = APIClient().get("/api/schema/")
    assert response.status_code == 200
    assert b"/api/territories/{territory_slug}/words" in response.content
