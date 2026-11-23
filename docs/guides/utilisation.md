# Guide d'utilisation

## Objectif

Comprendre comment le pack fonctionne et l'utiliser au quotidien dans VS Code avec GitHub Copilot.

## Périmètre

Ce guide explique l'adoption du pack dans un nouveau projet et l'utilisation des agents, skills et prompts. Le démarrage et le dépannage des conteneurs sont décrits dans le [guide MCP](./mcp.md).

## Principe : qui, comment, quoi, règles

| Élément | Rôle | Où | Se déclenche |
|---------|------|----|--------------|
| Agent | **Qui** : un rôle avec ses outils et ses passages de relais | `.github/agents/` | Choix dans la liste du chat |
| Skill | **Comment** : une procédure détaillée réutilisable | `.github/skills/` | Selon sa description et les capacités du client |
| Skill d'entrée | **Point d'entrée** : propose une consigne ciblée | `.github/skills/<nom>/SKILL.md` | Invocation explicite `/nom`, si prise en charge par le client |
| Standard | **Règles** : source unique des exigences | `docs/standards/` | Cité par agents et skills |
| Modèle | **Forme** d'un livrable | `.github/templates/` | Rempli par l'agent |
| MCP | **Outils externes** : mémoire, docs à jour, navigateur, base | `.mcp.json` | Si le serveur est chargé et les outils exposés au client |

Chaque règle n'existe qu'à un endroit ; les autres fichiers y renvoient par un lien.

## Prérequis

Le nouveau projet est ouvert à sa racine dans VS Code avec Copilot. Docker et Dev Containers ne sont nécessaires que pour les outils ou l'environnement qui en dépendent ; voir le [guide MCP](./mcp.md).

## Adopter le pack pour un nouveau projet

Partir du [socle IA minimal](../../ai-basepack/README.md), puis ajouter et adapter les seuls agents, skills ou MCP nécessaires. Ne pas copier les données, secrets ou mémoire du présent projet. Les spécialisations du dépôt et leurs dépendances sont décrites dans l'[audit](../process/ai-audit.md).

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
| Préparer l'application Android après le MVP | `/create-android-game` |
| Challenger une idée ou un plan | agent `grill-me` |
| Auditer la sécurité | agent `security` |

## Utiliser un skill d'entrée

1. Dans le chat Copilot, taper `/` puis le nom, par exemple `/define-project`.
2. Fournir les informations nécessaires à la consigne.
3. Vérifier le résultat et les outils réellement utilisés. Le skill peut citer un agent pertinent, mais ce lien ne garantit pas sa sélection automatique.

## Utiliser un agent directement

1. Ouvrir le chat, choisir le mode agent, sélectionner l'agent (ex. `architect`).
2. Décrire la tâche. L'agent applique ses skills et standards.
3. En fin de réponse, les boutons de **handoff** proposent l'agent suivant : le contexte est transmis, vous validez avant de continuer.

## Utiliser un skill

Les skills de procédure peuvent être chargés quand la demande correspond à leur description, selon le client. Les points d'entrée marqués `disable-model-invocation: true` sont destinés à une invocation explicite. Vérifier le chargement effectif dans le client ; les procédures sont dans le [catalogue](../process/catalog.md).

## Ce que produit chaque étape

| Étape | Livrable | Lu par |
|-------|----------|--------|
| `/define-project` | Incrément testable et suite ; backlog complet si nécessaire | porteur, puis rôles concernés |
| `/design-architecture` | Schéma et ADR | dev, reviewer |
| `/create-*` | Code, tests, note d'impact | qa-tests, reviewer |
| `/test-change` | Tests et rapport | reviewer |
| `/review-change` | Remarques classées, décision | documentation |
| `/document-change` | Docs et mémoire à jour | tout le monde |
| `/transform-content` | Brief et pack candidat à importer dans Django | backend-python, équipe éditoriale |
| `/design-minigames` | Spécification des jeux web du MVP, portable ensuite | frontend-react ; android-dev après le MVP |
| `/create-android-game` | Application Android post-MVP | qa-tests, reviewer |

## Rôle de la mémoire et de grill-me

- **Mémoire** : consulter les décisions pertinentes pour la tâche et les confronter aux sources actuelles ; enregistrer les connaissances durables si le serveur est disponible (`memory/memory.jsonl`, serveur Memory MCP).
- **grill-me** : questions une à une sur hypothèses, risques et retour arrière. À utiliser avant une décision importante.

## Parcours type

Selon la tâche, choisir seulement les étapes utiles :

1. `/define-project` → incrément testable, si un cadrage est nécessaire.
2. `/design-architecture` → ADR.
3. `/create-python-webapp` et/ou `/create-react-feature`.
4. `/test-change`, puis `/review-change`.
5. `/document-change`.

## Parcours des jeux web à partir du MVP 2

Le premier incrément est limité à un QCM anonyme sur les mots publiés, sans
compte ni score sauvegardé. Le parcours ci-dessous décrit les rôles
disponibles pour préparer des contenus et jeux plus élaborés ; ils ne sont
pas tous des prérequis du MVP 2. Voir le [backlog](../product/mvp-backlog.md).

1. `/transform-content` → brief et pack candidat destiné à l'import en brouillon ; les connaissances d'un contributeur sont acceptées sans référence externe, et les références disponibles sont ajoutées.
2. `backend-python` et l'équipe éditoriale importent les données dans Django, puis valident les entrées selon le [standard des contenus](../standards/game-content.md).
3. `/design-minigames` → spécification des règles et parcours des mini-jeux web du MVP.
4. `/create-react-feature` → mini-jeux dans le site web responsive, jouables aussi depuis le navigateur mobile.
5. `/test-change`, `/review-change`, `/document-change`.

L'application mobile native n'est pas nécessaire au MVP. Après le MVP : PWA d'abord, puis Android natif (post-MVP, [trajectoire](../standards/android.md)). `/create-android-game` pourra alors porter les règles vers Android et consommer un export versionné. Règles : [contenus](../standards/game-content.md), [frontend](../standards/frontend.md) et [Android](../standards/android.md).

## Règle d'or : la documentation suit chaque itération

Chaque changement (agent, skill, prompt, standard, MCP, parcours) met à jour la documentation dans la même itération ; sans cela, il n'est pas terminé. Liste des pages à tenir à jour : [standard documentaire](../standards/documentation.md).

## Vérification

- `python scripts/lint_pack.py` affiche `OK` avec les nombres d'agents, skills et prompts.
- Après `/define-project`, la réponse décrit un incrément et ses critères observables ; un backlog complet n'est produit que s'il est demandé ou nécessaire.
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
