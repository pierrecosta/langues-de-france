import json
from io import StringIO
from pathlib import Path

import pytest
from django.core.management import call_command
from django.core.management.base import CommandError

from apps.dictionary.models import Word
from apps.expressions.models import Expression
from apps.territories.models import Territory

pytestmark = pytest.mark.django_db
REAL_SEEDS = Path(__file__).resolve().parents[2] / "src_init"


def run(*args: str, seeds: Path = REAL_SEEDS) -> str:
    out = StringIO()
    call_command("import_seeds", "--seeds-dir", str(seeds), *args, stdout=out)
    return out.getvalue()


def test_real_seeds_import_as_drafts_and_are_idempotent() -> None:
    assert "200 créées" in run() and Word.objects.count() == 200
    assert Expression.objects.count() == 42
    assert not Word.objects.exclude(status="draft").exists()
    assert Territory.objects.filter(slug="provencal").exists()
    again = run()
    assert "0 créées, 200 ignorées" in again and "0 créées, 42 ignorées" in again
    assert Word.objects.count() == 200


def test_dry_run_writes_nothing() -> None:
    assert "[dry-run] word.json : 200 créées" in run("--dry-run")
    assert Word.objects.count() == 0 and Territory.objects.count() == 0


def test_never_overwrites_existing_entry() -> None:
    run()
    word = Word.objects.get(slug="bonjorn")
    word.french = "Modifié"
    word.status = "published"
    word.save()
    run()
    word.refresh_from_db()
    assert word.french == "Modifié" and word.status == "published"


def test_errors_are_reported_and_valid_entries_imported(tmp_path: Path) -> None:
    folder = tmp_path / "t1"
    folder.mkdir()
    (folder / "word.json").write_text(
        json.dumps([{"local-term": "A", "french-term": "a"}, {"french-term": "sans local"}])
    )
    (folder / "expression.json").write_text("{}")
    with pytest.raises(CommandError):
        call_command("import_seeds", "--seeds-dir", str(tmp_path), "--territory", "t1")
    assert Word.objects.count() == 1
    assert Word.objects.get().variants == {}


def test_missing_file_is_an_error(tmp_path: Path) -> None:
    (tmp_path / "t2").mkdir()
    with pytest.raises(CommandError):
        call_command("import_seeds", "--seeds-dir", str(tmp_path), "--territory", "t2")
