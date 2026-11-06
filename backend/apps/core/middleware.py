import re
import uuid
from collections.abc import Callable

import structlog
from django.http import HttpRequest, HttpResponse

HEADER = "X-Request-ID"
META_KEY = "HTTP_X_REQUEST_ID"
VALID_ID = re.compile(r"^[A-Za-z0-9._-]{8,64}$")

logger = structlog.get_logger("request")


class CorrelationIdMiddleware:
    """Associe un identifiant de corrélation à chaque requête et à ses logs."""

    def __init__(self, get_response: Callable[[HttpRequest], HttpResponse]) -> None:
        self.get_response = get_response

    def __call__(self, request: HttpRequest) -> HttpResponse:
        incoming = request.META.get(META_KEY, "")
        correlation_id = incoming if VALID_ID.match(incoming) else uuid.uuid4().hex
        structlog.contextvars.clear_contextvars()
        structlog.contextvars.bind_contextvars(correlation_id=correlation_id)
        request.correlation_id = correlation_id  # type: ignore[attr-defined]
        response = self.get_response(request)
        response[HEADER] = correlation_id
        logger.info(
            "request", method=request.method, path=request.path, status=response.status_code
        )
        return response
