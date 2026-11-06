"""Import unique et idempotent des seeds en brouillon (ADR-007)."""

import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from django.db import transaction

from apps.core.models import PublicationStatus
from apps.core.slugs import slugify
from apps.dictionary.models import Word
from apps.expressions.models import Expression
from apps.territories.models import Territory


@dataclass
class Report:
    created: int = 0
    skipped: int = 0
    errors: list[str] = field(default_factory=list)


@dataclass(frozen=True)
class Spec:
    filename: str
    model: Any
    primary_key: str
    fallback_key: str
    fields: dict[str, str]  # clé JSON -> champ du modèle


WORD_SPEC = Spec(
    "word.json", Word, "local-term", "french-term",
    {
        "french-term": "french", "local-term": "local", "pronunciation": "pronunciation",
        "category": "category", "subcategory": "subcategory", "variants": "variants",
        "origin": "origin", "example": "example", "example-translation": "example_translation",
        "cultural-notes": "cultural_notes", "false-friend": "false_friend",
        "sensitivity-level": "sensitivity_level", "historical-status": "historical_status",
        "source-url": "source_url",
    },
)  # fmt: skip
EXPRESSION_SPEC = Spec(
    "expression.json", Expression, "local-expression", "french-equivalent",
    {
        "local-expression": "local_expression", "pronunciation": "pronunciation",
        "literal-translation": "literal_translation", "meaning": "meaning",
        "french-equivalent": "french_equivalent", "origin": "origin",
        "sensitivity-level": "sensitivity_level", "usage-type": "usage_type",
        "source-url": "source_url",
    },
)  # fmt: skip


class DryRunRollback(Exception):  # noqa: N818
    pass


def assign_slugs(entries: list[dict[str, Any]], spec: Spec) -> list[str | None]:
    """Slugs déterministes dans l'ordre du fichier ; None si l'entrée n'a pas de clé."""
    used: set[str] = set()
    slugs: list[str | None] = []
    for entry in entries:
        base = slugify(str(entry.get(spec.primary_key) or "")) if isinstance(entry, dict) else ""
        if not base:
            slugs.append(None)
            continue
        candidate = base
        if candidate in used:
            extra = slugify(str(entry.get(spec.fallback_key) or ""))
            candidate = f"{base}-{extra}" if extra else base
        n = 2
        while candidate in used:
            candidate = f"{base}-{extra}-{n}" if extra else f"{base}-{n}"
            n += 1
        used.add(candidate)
        slugs.append(candidate)
    return slugs


def _import_file(territory: Territory, path: Path, spec: Spec) -> Report:
    report = Report()
    entries = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(entries, list):
        report.errors.append(f"{path.name} : un tableau JSON est attendu")
        return report
    for index, (entry, slug) in enumerate(zip(entries, assign_slugs(entries, spec), strict=True)):
        if slug is None:
            report.errors.append(f"{path.name}[{index}] : « {spec.primary_key} » manquant")
        elif spec.model.objects.filter(territory=territory, slug=slug).exists():
            report.skipped += 1
        else:
            values = {
                attr: entry.get(key) or ({} if key == "variants" else "")
                for key, attr in spec.fields.items()
            }
            spec.model.objects.create(
                territory=territory, slug=slug, status=PublicationStatus.DRAFT, **values
            )
            report.created += 1
    return report


def import_seeds(
    seeds_dir: Path, territory_slug: str, *, dry_run: bool = False
) -> dict[str, Report]:
    base = seeds_dir / territory_slug
    reports: dict[str, Report] = {}
    try:
        with transaction.atomic():
            territory, _ = Territory.objects.get_or_create(
                slug=territory_slug, defaults={"name": territory_slug.capitalize()}
            )
            for spec in (WORD_SPEC, EXPRESSION_SPEC):
                path = base / spec.filename
                if not path.is_file():
                    reports[spec.filename] = Report(errors=[f"{path} introuvable"])
                    continue
                reports[spec.filename] = _import_file(territory, path, spec)
            if dry_run:
                raise DryRunRollback
    except DryRunRollback:
        pass
    return reports
