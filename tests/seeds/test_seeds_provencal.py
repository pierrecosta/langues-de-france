"""Tests déterministes des seeds src_init/provencal/*.json.

Contrat : src_init/readme.md (« Format cible »). Les seeds sont des brouillons :
une valeur vide n'est pas une erreur ici, sauf pour les champs d'identité.
"""
import json
import re
from collections import Counter
from datetime import date
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[2]
SEED_DIR = ROOT / "src_init" / "provencal"
KEBAB = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")

# champ requis -> type (les champs facultatifs ne sont pas listés)
SCHEMAS = {
    "activity": {"id": str, "title": str, "description": str, "image-url": str},
    "expression": {
        "local-expression": str, "pronunciation": str, "literal-translation": str,
        "meaning": str, "french-equivalent": str, "origin": str,
        "sensitivity-level": str, "usage-type": str,
    },
    "food": {"id": str, "title": str, "image-url": str, "history": str},
    "lieux": {"id": str, "title": str},
    "recipe": {
        "id": str, "title": str, "image-url": str, "history": str,
        "ingredients": list, "description": str,
    },
    "word": {
        "french-term": str, "local-term": str, "pronunciation": str, "category": str,
        "subcategory": str, "variants": dict, "origin": str, "example": str,
        "example-translation": str, "cultural-notes": str, "false-friend": str,
        "sensitivity-level": str, "historical-status": str,
    },
}
# champs dont la valeur ne doit jamais être vide (identité de l'entrée)
IDENTITY = {
    "activity": ["id", "title"], "food": ["id", "title"], "lieux": ["id", "title"],
    "recipe": ["id", "title"], "expression": ["local-expression"],
    "word": ["french-term", "local-term"],
}
# clé naturelle d'unicité pour les catégories sans id
NATURAL_KEY = {
    "expression": ("local-expression",),
    "word": ("french-term", "local-term"),
}


def load(name):
    return json.loads((SEED_DIR / f"{name}.json").read_text(encoding="utf-8"))


@pytest.fixture(params=sorted(SCHEMAS))
def category(request):
    return request.param, load(request.param)


def test_file_is_non_empty_list_of_objects(category):
    name, data = category
    assert isinstance(data, list) and data, f"{name}.json doit être un tableau non vide"
    assert all(isinstance(e, dict) for e in data)


def test_required_keys_and_types(category):
    name, data = category
    errors = []
    for i, entry in enumerate(data):
        for key, typ in SCHEMAS[name].items():
            if key not in entry:
                errors.append(f"[{i}] clé manquante : {key}")
            elif not isinstance(entry[key], typ):
                errors.append(f"[{i}] {key} : {type(entry[key]).__name__} au lieu de {typ.__name__}")
    assert not errors, "\n".join(errors[:20])


def test_keys_are_kebab_case(category):
    _, data = category
    bad = {k for e in data for k in e if not KEBAB.match(k)}
    assert not bad, f"clés non kebab-case : {sorted(bad)}"


def test_identity_fields_not_empty(category):
    name, data = category
    bad = [(i, k) for i, e in enumerate(data) for k in IDENTITY[name] if not str(e.get(k, "")).strip()]
    assert not bad, f"champs d'identité vides : {bad[:10]}"


def test_ids_unique_and_kebab(category):
    name, data = category
    if "id" not in SCHEMAS[name]:
        pytest.skip("catégorie sans id : unicité couverte par test_natural_key_unique")
    ids = [e["id"] for e in data]
    assert not [i for i, c in Counter(ids).items() if c > 1], "ids dupliqués"
    assert all(KEBAB.match(i) for i in ids), [i for i in ids if not KEBAB.match(i)]


def test_natural_key_unique(category):
    name, data = category
    if name not in NATURAL_KEY:
        pytest.skip("catégorie avec id : unicité couverte par test_ids_unique_and_kebab")
    keys = [tuple(e[k].strip().lower() for k in NATURAL_KEY[name]) for e in data]
    dups = [k for k, c in Counter(keys).items() if c > 1]
    assert not dups, f"doublons : {dups[:10]}"


def test_urls_are_http(category):
    _, data = category
    bad = []
    for i, e in enumerate(data):
        urls = [e.get("image-url"), e.get("source-url")] + list(e.get("image-urls") or [])
        bad += [(i, u) for u in urls if u and not str(u).startswith(("http://", "https://"))]
    assert not bad, bad[:10]


def test_lieux_at_most_three_images():
    assert all(len(e.get("image-urls", [])) <= 3 for e in load("lieux"))


def test_recipe_ingredients_are_non_empty_strings():
    for e in load("recipe"):
        assert e["ingredients"] and all(isinstance(x, str) and x.strip() for x in e["ingredients"]), e["id"]


def test_activity_dates_valid_and_ordered():
    for e in load("activity"):
        if "start-date" in e or "end-date" in e:
            assert "start-date" in e and "end-date" in e, f"{e['id']} : les deux dates sont requises"
            start, end = date.fromisoformat(e["start-date"]), date.fromisoformat(e["end-date"])
            assert start <= end, f"{e['id']} : début après fin"
