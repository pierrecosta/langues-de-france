# Copilot AI BasePack

## Objectif

Projet de découverte des langues régionales et cadre de travail Copilot. Quatre MVP web cumulatifs sont prévus : dictionnaire provençal, quiz, carte de France interactive limitée au provençal, puis agenda d'événements. Chaque étape pourra être publiée séparément ; six territoires sont visés à terme et le mobile natif reste ultérieur ([trajectoire](docs/standards/android.md)).

## Principe

Un **agent** définit un rôle, un **skill** une procédure, un **standard** les règles et un **template** la forme d'un livrable. Certains skills servent de points d'entrée explicites. Leur disponibilité dépend du client. L'[audit](docs/process/ai-audit.md) explique leur utilisation et les écarts constatés ; le [guide personnel](docs/guides/ia-efficace.md) aide à limiter le contexte.

## Prérequis

Docker, VS Code, extensions GitHub Copilot et Dev Containers.

## Démarrage

1. Ouvrir le dépôt dans VS Code, puis **Reopen in Container**.
2. Démarrer les serveurs MCP et les vérifier : [guide MCP](docs/guides/mcp.md).
3. Lancer le prompt `/define-project` : [guide d'utilisation](docs/guides/utilisation.md).

## Nouveau projet

Partir du [socle IA minimal](ai-basepack/README.md), puis ajouter uniquement les spécialisations utiles au projet cible. Ne pas recopier le produit, ses données ou sa mémoire par défaut.

## Organisation

| Élément | Emplacement |
|---------|-------------|
| Instructions globales | [.github/copilot-instructions.md](.github/copilot-instructions.md) |
| Socle IA réutilisable | [ai-basepack/](ai-basepack/) |
| Agents, skills, prompts, templates | [.github/](.github/) |
| Standards (règles : backend, frontend, accessibilité, documentation, Android, contenus) | [docs/standards/](docs/standards/) |
| Catalogue, relations, workflow | [docs/process/](docs/process/) |
| Backlog et incréments produit | [backlog](docs/product/mvp-backlog.md), [incréments proposés](docs/product/increments-mvp.md) |
| Standard de tests | [docs/standards/testing.md](docs/standards/testing.md) |
| Guides | [docs/guides/](docs/guides/) |
| Mémoire du projet (montée dans le MCP) | [memory/](memory/) |
| Seeds initiaux par territoire | [src_init/readme.md](src_init/readme.md) |
| Environnement de dev et conteneurs MCP | [.devcontainer/](.devcontainer/), [docker-compose.mcp.yml](docker-compose.mcp.yml) |
| Scripts de contrôle | [scripts/](scripts/) |

## Vérification

- `python scripts/check_mcp.py` : les quatre serveurs répondent.
- `python scripts/lint_pack.py` : le pack est cohérent.

## Pour aller plus loin

[Audit IA](docs/process/ai-audit.md) · [Guide personnel](docs/guides/ia-efficace.md) · [Catalogue](docs/process/catalog.md) · [Relations](docs/process/relations.md) · [Workflow](docs/process/workflow.md) · [Contribuer](docs/guides/contribuer.md)
