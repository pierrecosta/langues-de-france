# Copilot AI BasePack

## Objectif

Cadre de travail avec GitHub Copilot : agents spécialisés, skills, prompts, standards et quatre serveurs MCP (context7, playwright, postgres, memory), chacun dans son conteneur. Il inclut une chaîne de jeux pédagogiques multiplateforme : sources → contenus Django → mini-jeux web et Android.

## Principe

Un **agent** dit qui, un **skill** dit comment, un **prompt** est le point d'entrée (`/nom`), un **standard** porte les règles, un **modèle** donne la forme du livrable. Aucune règle n'est écrite deux fois. **La documentation est mise à jour à chaque itération**, dans la même livraison que le changement ([règle](docs/standards/documentation.md)). Détail : [guide d'utilisation](docs/guides/utilisation.md).

## Prérequis

Docker, VS Code, extensions GitHub Copilot et Dev Containers.

## Démarrage

1. Ouvrir le dépôt dans VS Code, puis **Reopen in Container**.
2. Démarrer les serveurs MCP et les vérifier : [guide MCP](docs/guides/mcp.md).
3. Lancer le prompt `/define-project` : [guide d'utilisation](docs/guides/utilisation.md).

## Nouveau projet

Créer chaque nouveau projet à partir d'une copie propre de ce dossier, puis adapter l'identité, les composants et les réglages au projet cible. Suivre le [parcours d'adoption](docs/guides/utilisation.md#adopter-le-pack-pour-un-nouveau-projet).

## Organisation

| Élément | Emplacement |
|---------|-------------|
| Instructions globales | [.github/copilot-instructions.md](.github/copilot-instructions.md) |
| Agents, skills, prompts, templates | [.github/](.github/) |
| Standards (règles : backend, frontend, accessibilité, documentation, Android, contenus) | [docs/standards/](docs/standards/) |
| Catalogue, relations, workflow | [docs/process/](docs/process/) |
| Guides | [docs/guides/](docs/guides/) |
| Mémoire du projet (montée dans le MCP) | [memory/](memory/) |
| Environnement de dev et conteneurs MCP | [.devcontainer/](.devcontainer/), [docker-compose.mcp.yml](docker-compose.mcp.yml) |
| Scripts de contrôle | [scripts/](scripts/) |

## Vérification

- `python scripts/check_mcp.py` : les quatre serveurs répondent.
- `python scripts/lint_pack.py` : le pack est cohérent.

## Pour aller plus loin

[Catalogue](docs/process/catalog.md) · [Relations](docs/process/relations.md) · [Workflow](docs/process/workflow.md) · [Contribuer](docs/guides/contribuer.md)
