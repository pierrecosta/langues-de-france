# Guide des serveurs MCP

## Objectif

Installer, lancer et vérifier les quatre serveurs MCP, chacun dans son propre conteneur.

## Périmètre

| Serveur | Rôle | Conteneur |
|---------|------|-----------|
| `memory` | Mémoire persistante du projet | `mcp-memory` (dossier [memory/](../../memory/) monté, hors conteneur) |
| `context7` | Documentation officielle à jour | `mcp-context7` |
| `playwright` | Navigateur (headless) pour tests et vérification | `mcp-playwright` |
| `postgres` | Lecture seule d'une base PostgreSQL de démonstration | `mcp-postgres` + `postgres-db` |

Définition : [docker-compose.mcp.yml](../../docker-compose.mcp.yml). Déclaration côté VS Code : [.vscode/mcp.json](../../.vscode/mcp.json). Agents autorisés à utiliser chaque serveur : colonne MCP de la page [relations](../process/relations.md).

## Prérequis

- Docker et VS Code avec l'extension Dev Containers.
- Optionnel : copier [.env.example](../../.env.example) en `.env` pour changer les identifiants Postgres ou ajouter `CONTEXT7_API_KEY`.

## Fonctionnement

- **Dev Containers** pilote le compose défini dans [docker-compose.mcp.yml](../../docker-compose.mcp.yml) : il démarre le service `devcontainer` à l'ouverture du workspace, puis arrête le compose à la fermeture.
- Les serveurs MCP restent des services isolés. VS Code lance `docker compose run --rm -T <service>` à la demande via [.vscode/mcp.json](../../.vscode/mcp.json) ; leurs conteneurs éphémères disparaissent après l'arrêt du serveur.
- Le Dev Container fournit le client Docker grâce à la fonctionnalité `docker-outside-of-docker` ; celui-ci pilote le même compose sur l'hôte. `HOST_WORKSPACE` permet au serveur `memory` de monter le dossier du projet.
- `postgres-db` est démarré comme dépendance du serveur `mcp-postgres`, et ses données sont conservées dans un volume Compose entre les sessions.

## Étapes

1. Ouvrir le dépôt dans VS Code, puis exécuter **Dev Containers: Reopen in Container**. Cela démarre `devcontainer`.
2. Ouvrir **MCP: List Servers** et démarrer chaque serveur MCP requis (confirmer la confiance).
3. Lancer le contrôle : `python scripts/check_mcp.py` (premier lancement long : build et téléchargement des images).

## Vérification

Le script affiche `OK` pour chaque serveur testé et termine sans erreur. Une ligne `ECHEC` ou un délai dépassé signifie que le contrôle n'est pas réussi. Fermer le Dev Container arrête le compose ; le volume de la base est conservé. Pour supprimer aussi ses données, exécuter `docker compose -f docker-compose.mcp.yml down -v` depuis un terminal de l'hôte, après avoir fermé le Dev Container.

Chaque modification de serveur MCP met aussi à jour la colonne MCP des [relations](../process/relations.md) et les `tools` des agents (règle : [standard documentaire](../standards/documentation.md)).

## Signalement des incidents

- Si une commande ou un outil MCP échoue, afficher immédiatement un avertissement indiquant le serveur, l'opération, l'erreur observée et son impact. Ne pas prétendre que la mémoire a été lue ou mise à jour, ni qu'une vérification a réussi, si le serveur correspondant a échoué.
- Une tâche peut continuer sans le MCP uniquement si cela reste possible ; signaler alors les vérifications ou écritures qui n'ont pas pu être faites. Si l'étape est indispensable, marquer la tâche comme bloquée ou incomplète.
- Si le Dev Container ne peut pas être créé, démarré ou joint, signaler immédiatement le blocage et arrêter les opérations qui en dépendent. Ne pas basculer silencieusement vers l'hôte.

## Dépannage

- Échec de montage de `memory/` : vérifier que `HOST_WORKSPACE` est défini (`echo $HOST_WORKSPACE`) ; reconstruire le devcontainer.
- `docker: not found` : reconstruire le devcontainer (fonctionnalité docker-outside-of-docker).
- Le moteur Docker est injoignable : démarrer Docker Desktop, puis reconstruire ou rouvrir le Dev Container.
- Un serveur MCP répond `ECHEC` : consulter les journaux du serveur dans **MCP: List Servers**, corriger l'erreur et relancer `python scripts/check_mcp.py <service>`.
- Playwright : mode headless uniquement, pas de fenêtre visible.
