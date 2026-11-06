from typing import Any

import structlog
from rest_framework.response import Response
from rest_framework.views import exception_handler

logger = structlog.get_logger("api")


def normalized_exception_handler(exc: Exception, context: dict[str, Any]) -> Response | None:
    """Format d'erreur unique : {"error": {"code", "message", "details", "correlation_id"}}."""
    response = exception_handler(exc, context)
    if response is None:
        logger.exception("unhandled_error")
        return None
    details = response.data
    message = details.get("detail") if isinstance(details, dict) else None
    code = getattr(message, "code", getattr(exc, "default_code", "error"))
    response.data = {
        "error": {
            "code": code,
            "message": str(message) if message else "Requête invalide.",
            "details": details if not message else None,
            "correlation_id": structlog.contextvars.get_contextvars().get("correlation_id"),
        }
    }
    return response
