import re
import unicodedata

MAX_SLUG_LENGTH = 80


def slugify(value: str) -> str:
    """Minuscules, sans accents, hors [a-z0-9] -> tiret, 80 caractères max (ADR-007)."""
    decomposed = unicodedata.normalize("NFKD", value)
    ascii_text = "".join(c for c in decomposed if not unicodedata.combining(c)).lower()
    return re.sub(r"[^a-z0-9]+", "-", ascii_text).strip("-")[:MAX_SLUG_LENGTH].strip("-")
