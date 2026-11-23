# État de la configuration IA

## Objectif et périmètre

Comprendre les objets IA du dépôt, leur utilité et les écarts entre configuration, documentation et produit. Cet état décrit les fichiers et les vérifications accessibles ; il ne prouve pas qu'un client charge automatiquement chaque objet.

## Prérequis et méthode

Ouvrir le dépôt à sa racine. Lire le [catalogue](./catalog.md), la [mémoire locale](../../memory/README.md) et les fichiers cités ; confronter les affirmations aux fichiers et aux outils réellement disponibles. Relancer le contrôle décrit en fin de page après une modification.

## Objets et inventaire

Une **instruction** guide les conversations ; un **agent** définit un rôle et des outils ; un **skill** fournit une procédure chargée à la demande ; un **point d'entrée** est ici un skill invocable explicitement ; un **template** donne la forme d'un livrable ; un serveur **MCP** expose des outils ou des données à un client ; la **mémoire** conserve des informations, sans garantir qu'elles sont encore exactes. Un modèle de langage n'est aucun de ces objets.

Le dépôt contient 12 agents, 18 skills dont 10 points d'entrée, cinq templates et quatre serveurs MCP déclarés. Aucun fichier `.prompt.md` n'est présent. Les objets intégrés au client ou fournis par des plugins sont distincts et ne sont pas inclus dans ces comptes.

### Agents

| Agent | Utilité | Portée |
|---|---|---|
| [po](../../.github/agents/po.agent.md) | Cadrer la valeur, le backlog et les critères. | Générique, avec contexte produit. |
| [architect](../../.github/agents/architect.agent.md) | Comparer les options et documenter les décisions. | Générique, avec contraintes du projet. |
| [backend-python](../../.github/agents/backend-python.agent.md) | Implémenter et tester le backend Python. | Spécifique à la pile. |
| [frontend-react](../../.github/agents/frontend-react.agent.md) | Implémenter le frontend React accessible. | Spécifique à la pile et au produit. |
| [qa-tests](../../.github/agents/qa-tests.agent.md) | Vérifier les critères et les parcours. | Générique, avec outillage du projet. |
| [reviewer](../../.github/agents/reviewer.agent.md) | Relire les changements et leurs impacts. | Générique, avec standards du projet. |
| [security](../../.github/agents/security.agent.md) | Examiner sécurité et exposition. | Générique, avec contraintes du projet. |
| [documentation](../../.github/agents/documentation.agent.md) | Maintenir une documentation vérifiable. | Générique, avec standard du projet. |
| [grill-me](../../.github/agents/grill-me.agent.md) | Challenger une décision par questions successives. | Générique. |
| [content-transformer](../../.github/agents/content-transformer.agent.md) | Transformer des sources en contenu pédagogique. | Métier. |
| [game-designer](../../.github/agents/game-designer.agent.md) | Définir les règles des mini-jeux. | Métier. |
| [android-dev](../../.github/agents/android-dev.agent.md) | Porter les jeux vers Android après le MVP web. | Métier et pile, post-MVP. |

### Skills de procédure

| Skill | Utilité |
|---|---|
| [grill-me](../../.github/skills/grill-me/SKILL.md) | Challenger hypothèses, risques et critères. |
| [architecture-review](../../.github/skills/architecture-review/SKILL.md) | Comparer les choix d'architecture et rédiger un ADR. |
| [next-react-expert](../../.github/skills/next-react-expert/SKILL.md) | Appliquer une procédure Next.js et React. |
| [design-system-accessibility](../../.github/skills/design-system-accessibility/SKILL.md) | Vérifier design system et accessibilité. |
| [documentation-excellence](../../.github/skills/documentation-excellence/SKILL.md) | Contrôler une page documentaire. |
| [content-synthesis](../../.github/skills/content-synthesis/SKILL.md) | Structurer des sources en données pédagogiques. |
| [minigame-templates](../../.github/skills/minigame-templates/SKILL.md) | Décrire les types de mini-jeux et leurs règles. |
| [android-compose](../../.github/skills/android-compose/SKILL.md) | Préparer le portage Android post-MVP. |

### Skills servant de points d'entrée

Ces dix fichiers ont `disable-model-invocation: true` : ils sont destinés à une invocation explicite. Leur présence et leur comportement effectif dépendent du client ; ils ne sont pas des fichiers `.prompt.md` et ne sélectionnent pas nécessairement un agent.

| Point d'entrée | Utilité |
|---|---|
| [define-project](../../.github/skills/define-project/SKILL.md) | Cadrer un besoin et son backlog. |
| [design-architecture](../../.github/skills/design-architecture/SKILL.md) | Étudier une architecture et ses ADR. |
| [create-python-webapp](../../.github/skills/create-python-webapp/SKILL.md) | Réaliser une tâche backend Python. |
| [create-react-feature](../../.github/skills/create-react-feature/SKILL.md) | Réaliser une fonctionnalité React. |
| [test-change](../../.github/skills/test-change/SKILL.md) | Définir et exécuter les tests adaptés. |
| [review-change](../../.github/skills/review-change/SKILL.md) | Relire qualité et impacts. |
| [document-change](../../.github/skills/document-change/SKILL.md) | Mettre à jour la documentation. |
| [transform-content](../../.github/skills/transform-content/SKILL.md) | Préparer un pack pédagogique candidat. |
| [design-minigames](../../.github/skills/design-minigames/SKILL.md) | Concevoir les jeux web. |
| [create-android-game](../../.github/skills/create-android-game/SKILL.md) | Porter les jeux vers Android après le MVP. |

### Templates

| Template | Description |
|---|---|
| [ADR](../../.github/templates/adr-template.md) | Contexte, options, décision et retour arrière d'un choix d'architecture. |
| [Documentation](../../.github/templates/documentation-template.md) | Structure d'une page utilisable et vérifiable. |
| [User story](../../.github/templates/user-story-template.md) | Besoin utilisateur et critères d'acceptation. |
| [Brief pédagogique](../../.github/templates/learning-brief-template.md) | Objectifs, sources et contenu à transmettre. |
| [Spécification de jeu](../../.github/templates/game-spec-template.md) | Règles, parcours et critères des mini-jeux. |

### Serveurs MCP

| Serveur déclaré | Utilité | Limite |
|---|---|---|
| `memory` | Lire et enregistrer un graphe de connaissances. | Une réponse du serveur ne garantit pas que son contenu est à jour ; vérifier aussi sa disponibilité dans le client. |
| `context7` | Rechercher de la documentation technique. | À solliciter selon la tâche et les outils disponibles. |
| `playwright` | Interagir avec un navigateur pour vérifier une interface. | Utile pour les parcours concernés, pas systématiquement. |
| `postgres` | Interroger une base de démonstration. | Vérifier les permissions effectives avant usage ; ne pas présumer un accès en lecture seule. |

La déclaration portable est [`.mcp.json`](../../.mcp.json) ; [`.vscode/mcp.json`](../../.vscode/mcp.json) est vide. Leur prise en charge dépend du client et de ses réglages : voir le [guide MCP](../guides/mcp.md). D'autres outils, par exemple GitHub ou le navigateur intégré, peuvent être fournis par l'environnement sans appartenir à ces quatre serveurs.

## Utiliser la mémoire sans reproduire ses erreurs

L'instantané local contient notamment les éléments suivants ; les sources actuelles restent prioritaires lorsqu'une note ancienne les contredit.

| Contenu mémorisé | Utilisation et vérification |
|---|---|
| Vision provençale, publics, consultation et contribution ; six territoires à terme. | Reprendre le besoin et vérifier les limites dans le [backlog](../product/mvp-backlog.md), sans redemander les décisions déjà confirmées. |
| Jeux web au MVP, PWA puis Android après le MVP. | Maintenir cette frontière dans le [standard Android](../standards/android.md) et les incréments. |
| Contenus importés en brouillon, validation humaine, connaissances sans référence externe acceptées. | Vérifier le [standard des contenus](../standards/game-content.md) et les droits des médias séparément. |
| Décisions techniques et ADR, certaines notes encore formulées comme propositions. | Consulter les statuts actuels dans l'[architecture](../architecture/README.md) et les ADR, plutôt que réutiliser une observation ancienne isolée. |
| Quiz à cinq questions et réussite à quatre ; valeurs d'XP et certains badges provisoires. | Le [backlog](../product/mvp-backlog.md) précise désormais un QCM anonyme sans score sauvegardé au MVP 2 ; ne pas en déduire qu'un parcours, une XP ou un badge sont requis à cette étape. |
| Signalement d'un accès MCP PostgreSQL non limité à la lecture. | Le [Dockerfile](../../.devcontainer/mcp/postgres/Dockerfile) utilise `POSTGRES_USER` pour la connexion ; les permissions effectives dépendent du rôle et doivent être vérifiées avant usage. |
| Notes d'anomalies documentaires et d'outillage. | Vérifier les fichiers actuels : une ancienne note indiquant qu'ADR-007 manque est désormais périmée ; les autres restent à examiner individuellement. |

Ne pas transformer tout l'historique en instructions permanentes : sélectionner les faits nécessaires à la tâche, citer leur origine, puis mettre à jour le serveur seulement lorsqu'il est effectivement accessible.

## Confrontation à la réalité

| Constat | Preuve et conséquence |
|---|---|
| Le pack et le produit sont mêlés. | Le [README](../../README.md), les agents métier et le [backlog](../product/mvp-backlog.md) portent le provençal. Le [socle minimal](../../ai-basepack/README.md) est désormais séparé ; les spécialisations restent dans le dépôt et ne doivent pas être copiées par défaut. |
| Le workflow documenté décrivait une chaîne complète et des « prompts » activant des agents. | Les points d'entrée sont des skills sans champ `agent` ; les handoffs sont définis sur les agents. Une tâche courte n'exige pas tous les rôles. |
| Des procédures spécialisées demandent encore systématiquement la mémoire et des contrôles larges. | Par exemple, [frontend-react](../../.github/agents/frontend-react.agent.md) demande mémoire, navigateur et plusieurs contrôles ; le ciblage dépend du client et de l'agent choisi. Les points d'entrée de cadrage et de test ont été allégés, sans prétendre avoir simplifié tous les agents. |
| L'ancien MVP regroupait de nombreux sujets. | Le [backlog](../product/mvp-backlog.md) distingue désormais quatre MVP publiables : dictionnaire, QCM anonyme, carte de France limitée à la Provence, puis agenda. Comptes, autres jeux, badges et autres contenus restent dans la vision ultérieure. |
| Des éléments du produit existent sans constituer une preuve de livraison complète. | Le [backend](../../backend/README.md) décrit modèles et import ; le [frontend](../../frontend/src/lib/api.ts) comprend un repli sur des données locales. La présence de code ou de tests ne prouve ni validation éditoriale ni parcours complet en production. |
| La mémoire comporte de l'historique et des contradictions. | L'instantané [memory.jsonl](../../memory/memory.jsonl) indique qu'ADR-007 manque, alors que [l'ADR](../architecture/adr/ADR-007-identite-et-mapping-des-seeds.md) existe ; il mentionne aussi des volumes de seed contradictoires. Ne pas en déduire que toutes les autres notes sont périmées. |
| Le diagnostic de consommation n'a pas de chiffres comparables. | Aucun historique de sessions du projet n'a été retrouvé par les recherches accessibles ; les tokens réellement chargés ne sont pas mesurés ici. La [méthode de référence](../guides/ia-efficace.md) évite d'affirmer un gain. |

Lors de cette analyse, le contrôle du pack a réussi dans le Dev Container. Une initialisation isolée du serveur `memory` a répondu, mais ses outils n'étaient pas exposés à la conversation ; l'instantané versionné a donc été lu directement, sans synchronisation MCP. Une recherche de sessions accessibles n'a renvoyé aucun résultat. Ces constats sont datés de l'analyse et doivent être revérifiés dans une autre session.

## Étapes et vérification

1. Choisir le plus petit incrément dans le [découpage produit](../product/increments-mvp.md).
2. Choisir seulement les outils utiles selon le [guide personnel](../guides/ia-efficace.md).
3. Depuis le Dev Container, exécuter `python scripts/lint_pack.py` : la sortie attendue commence par `OK`.
4. Après un changement de configuration, vérifier aussi dans le client la découverte et l'exécution effectives ; le lint ne les prouve pas.

Sources officielles : [skills VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills), [agents VS Code](https://code.visualstudio.com/docs/agent-customization/custom-agents), [configuration MCP Copilot](https://code.visualstudio.com/docs/agents/reference/mcp-configuration).
