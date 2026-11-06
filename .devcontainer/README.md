# Dev Container

## Objectif

Fournir l'environnement de développement dans le service `devcontainer` du compose. VS Code démarre et arrête ce service ; les serveurs MCP et leur base de démonstration restent isolés et sont lancés à la demande.

## Contenu

- [devcontainer.json](./devcontainer.json) : sélectionne le service, le dossier de travail, les services démarrés et les fonctionnalités Node et Docker.
- [docker-compose.mcp.yml](../docker-compose.mcp.yml) : services du Dev Container, de la base de démonstration et des serveurs MCP.
- `mcp/<service>/Dockerfile` : image minimale de chaque serveur MCP (Playwright utilise l'image officielle).

## Étapes

1. Ouvrir le dossier du projet dans VS Code.
2. Exécuter **Dev Containers: Reopen in Container**. VS Code construit et démarre le service `devcontainer`.
3. Suivre le [guide MCP](../docs/guides/mcp.md) pour démarrer et vérifier les serveurs à la demande.

## Vérification

Dans le terminal intégré au Dev Container, `python --version`, `node --version` et `docker version` répondent ; `echo $HOST_WORKSPACE` affiche le chemin du projet côté hôte.
