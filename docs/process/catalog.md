# Catalogue

## Objectif

Inventaire unique des agents, skills, prompts, templates et serveurs MCP, avec la règle de répartition qui évite les doublons.

## Périmètre

Liste des éléments et règle de répartition. Le détail de chaque élément est dans son propre fichier ; l'usage au quotidien est dans le [guide d'utilisation](../guides/utilisation.md).

## Règle de répartition

| Type | Question à laquelle il répond | Emplacement |
|------|-------------------------------|-------------|
| Agent | **Qui** fait (rôle, outils, enchaînements) | `.github/agents/<nom>.agent.md` |
| Skill | **Comment** faire (procédure réutilisable) | `.github/skills/<nom>/SKILL.md` |
| Prompt | **Par où** commencer (point d'entrée) | `.github/prompts/<nom>.prompt.md` |
| Standard | **Quelles règles** respecter | `docs/standards/<nom>.md` |
| Template | **Quel modèle** remplir | `.github/templates/` |

Une règle n'existe que dans un standard ; une procédure que dans un skill ; les autres fichiers y renvoient par lien.

## Inventaire

| Agents | Skills | Prompts |
|--------|--------|---------|
| [po](../../.github/agents/po.agent.md) | [grill-me](../../.github/skills/grill-me/SKILL.md) | [define-project](../../.github/prompts/define-project.prompt.md) |
| [architect](../../.github/agents/architect.agent.md) | [architecture-review](../../.github/skills/architecture-review/SKILL.md) | [design-architecture](../../.github/prompts/design-architecture.prompt.md) |
| [backend-python](../../.github/agents/backend-python.agent.md) | — | [create-python-webapp](../../.github/prompts/create-python-webapp.prompt.md) |
| [frontend-react](../../.github/agents/frontend-react.agent.md) | [next-react-expert](../../.github/skills/next-react-expert/SKILL.md), [design-system-accessibility](../../.github/skills/design-system-accessibility/SKILL.md) | [create-react-feature](../../.github/prompts/create-react-feature.prompt.md) |
| [reviewer](../../.github/agents/reviewer.agent.md) | [documentation-excellence](../../.github/skills/documentation-excellence/SKILL.md) | [review-change](../../.github/prompts/review-change.prompt.md) |
| [documentation](../../.github/agents/documentation.agent.md) | | [document-change](../../.github/prompts/document-change.prompt.md) |
| [grill-me](../../.github/agents/grill-me.agent.md) | | [test-change](../../.github/prompts/test-change.prompt.md) |
| [qa-tests](../../.github/agents/qa-tests.agent.md) | | |
| [security](../../.github/agents/security.agent.md) | | |
| [content-transformer](../../.github/agents/content-transformer.agent.md) | [content-synthesis](../../.github/skills/content-synthesis/SKILL.md) | [transform-content](../../.github/prompts/transform-content.prompt.md) |
| [game-designer](../../.github/agents/game-designer.agent.md) | [minigame-templates](../../.github/skills/minigame-templates/SKILL.md) | [design-minigames](../../.github/prompts/design-minigames.prompt.md) |
| [android-dev — post-MVP](../../.github/agents/android-dev.agent.md) | [android-compose](../../.github/skills/android-compose/SKILL.md) | [create-android-game](../../.github/prompts/create-android-game.prompt.md) |

Templates : [ADR](../../.github/templates/adr-template.md), [documentation](../../.github/templates/documentation-template.md), [user story](../../.github/templates/user-story-template.md), [brief pédagogique](../../.github/templates/learning-brief-template.md), [spécification de jeu multiplateforme](../../.github/templates/game-spec-template.md).

Standards : [backend](../standards/backend.md), [frontend](../standards/frontend.md), [accessibilité](../standards/accessibility.md), [documentation](../standards/documentation.md), [Android](../standards/android.md), [contenus et mini-jeux](../standards/game-content.md).

## Doublons supprimés

- Règles frontend et accessibilité : auparavant répétées dans l'agent frontend, deux skills et les standards → désormais uniquement dans [frontend](../standards/frontend.md) et [accessibilité](../standards/accessibility.md).
- Revue d'architecture et documentation : le rôle reste dans l'agent, la procédure dans le skill.
- Mémoire : `memory/project_knowledge.md` supprimé ; seul le serveur MCP `memory` fait foi (fichier dans [memory/](../../memory/)).
- Anciens chemins `.github/copilot/*` supprimés au profit des chemins officiels.

## Vérification

`python scripts/lint_pack.py` retourne « OK » : noms uniques, sections et frontmatter conformes, liens valides.

## Voir aussi

- [Relations](./relations.md)
- [Workflow](./workflow.md)
