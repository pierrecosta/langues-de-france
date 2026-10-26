# Guide d'utilisation

## Objectif

Comprendre comment le pack fonctionne et l'utiliser au quotidien dans VS Code avec GitHub Copilot.

## Périmètre

Ce guide explique l'adoption du pack dans un nouveau projet et l'utilisation des agents, skills et prompts. Le démarrage et le dépannage des conteneurs sont décrits dans le [guide MCP](./mcp.md).

## Principe : qui, comment, quoi, règles

| Élément | Rôle | Où | Se déclenche |
|---------|------|----|--------------|
| Agent | **Qui** : un rôle avec ses outils et ses passages de relais | `.github/agents/` | Choix dans la liste du chat |
| Skill | **Comment** : une procédure détaillée réutilisable | `.github/skills/` | Automatiquement, ou en citant son nom |
| Prompt | **Point d'entrée** : pose les questions et lance l'agent | `.github/prompts/` | `/nom` dans le chat |
| Standard | **Règles** : source unique des exigences | `docs/standards/` | Cité par agents et skills |
| Modèle | **Forme** d'un livrable | `.github/templates/` | Rempli par l'agent |
| MCP | **Outils externes** : mémoire, docs à jour, navigateur, base | `.vscode/mcp.json` | Appelés par les agents |

Chaque règle n'existe qu'à un endroit ; les autres fichiers y renvoient par un lien.

## Prérequis

Le nouveau projet est une copie de ce dossier, ouverte à sa racine dans VS Code. Docker, VS Code et les extensions GitHub Copilot et Dev Containers sont nécessaires pour utiliser l'environnement conteneurisé (voir le [guide MCP](./mcp.md)).

## Adopter le pack pour un nouveau projet

À chaque nouveau projet, partir de cette basepack, et non d'une ancienne copie déjà personnalisée.

1. Copier le contenu de ce dossier vers un nouveau dossier de projet, y compris les fichiers cachés comme `.github/`, `.devcontainer/` et `.vscode/`.
2. Ne pas recopier `.git/`, `.env` ni `memory/memory.jsonl` s'ils existent. Garder `memory/README.md` : la mémoire du nouveau projet sera créée lors de sa première écriture.
3. Ouvrir le nouveau dossier à la racine dans VS Code et initialiser son propre dépôt Git, sans reprendre l'historique d'un autre projet.
4. Adapter le nom du conteneur dans `.devcontainer/devcontainer.json`, le nom du projet dans `docker-compose.mcp.yml`, le README, les standards et les réglages MCP au projet cible.
5. Garder les agents, skills, prompts et standards utiles ; retirer ou adapter les parcours spécialisés qui ne correspondent pas au projet. Mettre à jour le [catalogue](../process/catalog.md), les [relations](../process/relations.md) et le [workflow](../process/workflow.md) en conséquence.
6. Ouvrir le projet dans son Dev Container, puis suivre le [guide MCP](./mcp.md) pour configurer et vérifier les serveurs nécessaires.
7. Lancer `python scripts/lint_pack.py`, puis `/define-project` pour cadrer le nouveau projet.

La copie doit conserver ses propres fichiers de mémoire et de configuration : ne pas réutiliser ceux d'un autre projet.

## Choisir son point de départ

| Je veux… | Je lance |
|----------|----------|
| Cadrer un besoin | `/define-project` |
| Choisir une architecture | `/design-architecture` |
| Coder une API Python | `/create-python-webapp` |
| Coder une fonctionnalité web React/Next.js | `/create-react-feature` |
| Tester | `/test-change` |
| Relire | `/review-change` |
| Mettre à jour la doc | `/document-change` |
| Transformer des sources en contenu | `/transform-content` |
| Concevoir des mini-jeux | `/design-minigames` |
| Développer l'app Android | `/create-android-game` |
| Challenger une idée ou un plan | agent `grill-me` |
| Auditer la sécurité | agent `security` |

## Utiliser un prompt

1. Dans le chat Copilot, taper `/` puis le nom, par exemple `/define-project`.
2. Renseigner les champs demandés.
3. L'agent associé s'active, suit sa procédure et produit son livrable.

## Utiliser un agent directement

1. Ouvrir le chat, choisir le mode agent, sélectionner l'agent (ex. `architect`).
2. Décrire la tâche. L'agent applique ses skills et standards.
3. En fin de réponse, les boutons de **handoff** proposent l'agent suivant : le contexte est transmis, vous validez avant de continuer.

## Utiliser un skill

Les skills se chargent quand la demande correspond à leur description. Pour en forcer un, le citer : « applique grill-me ». Les procédures sont dans [catalogue](../process/catalog.md).

## Ce que produit chaque étape

| Étape | Livrable | Lu par |
|-------|----------|--------|
| `/define-project` | Backlog (user stories, critères) | architect, dev, qa |
| `/design-architecture` | Schéma et ADR | dev, reviewer |
| `/create-*` | Code, tests, note d'impact | qa-tests, reviewer |
| `/test-change` | Tests et rapport | reviewer |
| `/review-change` | Remarques classées, décision | documentation |
| `/document-change` | Docs et mémoire à jour | tout le monde |
| `/transform-content` | Brief et pack candidat à importer dans Django | backend-python, équipe éditoriale |
| `/design-minigames` | Spécification de jeu multiplateforme | frontend-react, android-dev |
| `/create-android-game` | Application Android | qa-tests, reviewer |

## Rôle de la mémoire et de grill-me

- **Mémoire** : les agents la lisent en début de tâche et y enregistrent décisions et connaissances (`memory/memory.jsonl`, serveur Memory MCP).
- **grill-me** : questions une à une sur hypothèses, risques et retour arrière. À utiliser avant une décision importante.

## Parcours type

1. `/define-project` → backlog.
2. `/design-architecture` → ADR.
3. `/create-python-webapp` et/ou `/create-react-feature`.
4. `/test-change`, puis `/review-change`.
5. `/document-change`.

## Parcours jeu pédagogique web et Android

1. `/transform-content` → brief et pack candidat destiné à l'import en brouillon.
2. `backend-python` et l'équipe éditoriale importent les données dans Django, les enrichissent et valident les entrées à publier.
3. `/design-minigames` → spécification des règles communes et des parcours propres aux plateformes.
4. `/create-react-feature` et `/create-android-game` → jeux web et Android ; Android reste jouable hors ligne et synchronise les scores lorsqu'il est connecté.
5. `/test-change`, `/review-change`, `/document-change`.

Les développeurs partent de la spécification multiplateforme et des contenus validés dans Django ; Android consomme un export versionné. Règles : [contenus](../standards/game-content.md), [frontend](../standards/frontend.md) et [Android](../standards/android.md).

## Règle d'or : la documentation suit chaque itération

Chaque changement (agent, skill, prompt, standard, MCP, parcours) met à jour la documentation dans la même itération ; sans cela, il n'est pas terminé. Liste des pages à tenir à jour : [standard documentaire](../standards/documentation.md).

## Vérification

- `python scripts/lint_pack.py` affiche `OK` avec les nombres d'agents, skills et prompts.
- Après `/define-project`, la réponse contient des user stories avec critères d'acceptation.
- `memory/memory.jsonl` apparaît après une première écriture réussie dans la mémoire ; son absence avant cela est normale.

## Dépannage

| Symptôme | Cause probable | Solution |
|----------|----------------|----------|
| `/nom` absent | Dossier non ouvert à la racine | Ouvrir le dossier du pack |
| Agent absent de la liste | Frontmatter invalide | Lancer le lint |
| Dev Container en échec | Configuration ou moteur Docker indisponible | Signaler immédiatement le blocage ; voir le [guide MCP](./mcp.md) |
| Outil MCP en échec | Serveur indisponible ou erreur d'exécution | Afficher l'avertissement et l'impact ; suivre le [guide MCP](./mcp.md) |

## Voir aussi

- [Catalogue](../process/catalog.md) · [Relations](../process/relations.md) · [Workflow](../process/workflow.md) · [Contribuer](./contribuer.md)
