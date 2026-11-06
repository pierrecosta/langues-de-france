from apps.core.seeds import EXPRESSION_SPEC, WORD_SPEC, assign_slugs
from apps.core.slugs import slugify


def test_slugify_removes_accents_and_symbols() -> None:
    assert slugify("Avé la  testa-dura !") == "ave-la-testa-dura"
    assert slugify("Çà et là") == "ca-et-la"


def test_slugify_truncates_to_80() -> None:
    assert len(slugify("a" * 200)) == 80


def test_word_collisions_use_french_then_counter() -> None:
    entries = [
        {"local-term": "Bon", "french-term": "Bon"},
        {"local-term": "Bon", "french-term": "Bonne"},
        {"local-term": "Bon", "french-term": "Bonne"},
        {"local-term": "", "french-term": "x"},
    ]
    assert assign_slugs(entries, WORD_SPEC) == ["bon", "bon-bonne", "bon-bonne-2", None]


def test_expression_collision_without_fallback_uses_counter() -> None:
    entries = [{"local-expression": "Ei"}, {"local-expression": "Ei"}, {"local-expression": "Ei"}]
    assert assign_slugs(entries, EXPRESSION_SPEC) == ["ei", "ei-2", "ei-3"]
