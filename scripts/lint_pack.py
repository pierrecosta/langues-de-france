"""Contrôle la cohérence du pack : frontmatter, sections, liens relatifs, doublons de noms.

Usage : python scripts/lint_pack.py
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GITHUB = ROOT / ".github"
SECTIONS = [
    "Objectif", "Périmètre", "Entrées", "Procédure",
    "Livrables", "Critères de sortie", "Voir aussi",
]
PROMPT_SECTIONS = ["Objectif", "Entrées", "Consigne", "Voir aussi"]
LINK = re.compile(r"\[[^\]]*\]\(([^)\s]+)\)")
errors: list[str] = []


def rel(p: Path) -> str:
    return p.relative_to(ROOT).as_posix()


def frontmatter(path: Path) -> dict[str, str]:
    text = path.read_text(encoding="utf-8")
    m = re.match(r"---\n(.*?)\n---\n", text, re.S)
    if not m:
        errors.append(f"{rel(path)}: frontmatter absent")
        return {}
    return dict(re.findall(r"^([a-z]+):\s*(.+)$", m.group(1), re.M))


def sections(path: Path, expected: list[str]) -> None:
    found = re.findall(r"^## (.+)$", path.read_text(encoding="utf-8"), re.M)
    if found != expected:
        errors.append(f"{rel(path)}: sections {found} != {expected}")


def names(files: list[Path], suffix: str, fm_expected) -> set[str]:
    seen: set[str] = set()
    for f in files:
        fm = frontmatter(f)
        for key in ("description",) + fm_expected:
            if key not in fm:
                errors.append(f"{rel(f)}: clé '{key}' manquante")
        name = fm.get("name", "")
        if name in seen:
            errors.append(f"{rel(f)}: nom en doublon '{name}'")
        seen.add(name)
    return seen


agents = sorted((GITHUB / "agents").glob("*.agent.md"))
skills = sorted((GITHUB / "skills").glob("*/SKILL.md"))
prompts = sorted((GITHUB / "prompts").glob("*.prompt.md"))

agent_names = names(agents, ".agent.md", ("name",))
names(skills, "", ("name",))
for f in agents:
    fm = frontmatter(f)
    if fm.get("name") != f.name.removesuffix(".agent.md"):
        errors.append(f"{rel(f)}: name différent du fichier")
    sections(f, SECTIONS)
for f in skills:
    if frontmatter(f).get("name") != f.parent.name:
        errors.append(f"{rel(f)}: name différent du dossier")
    sections(f, SECTIONS)
for f in prompts:
    fm = frontmatter(f)
    if fm.get("agent") not in agent_names:
        errors.append(f"{rel(f)}: agent inconnu '{fm.get('agent')}'")
    if "description" not in fm:
        errors.append(f"{rel(f)}: description manquante")
    sections(f, PROMPT_SECTIONS)
for f in agents:
    for target in re.findall(r"^\s+agent:\s*(\S+)", f.read_text(encoding="utf-8"), re.M):
        if target not in agent_names:
            errors.append(f"{rel(f)}: handoff vers agent inconnu '{target}'")

for f in list(ROOT.rglob("*.md")):
    if any(part in {"node_modules", ".git"} for part in f.parts):
        continue
    for target in LINK.findall(f.read_text(encoding="utf-8")):
        if re.match(r"(https?:|mailto:|#)", target):
            continue
        path = (f.parent / target.split("#")[0]).resolve()
        if not path.exists():
            errors.append(f"{rel(f)}: lien cassé {target}")

if errors:
    print("\n".join(errors))
    sys.exit(1)
print(f"OK : {len(agents)} agents, {len(skills)} skills, {len(prompts)} prompts.")
