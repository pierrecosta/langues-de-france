# Instructions Copilot du dépôt

Appliquer le [socle IA réutilisable](../ai-basepack/.github/copilot-instructions.md), puis les règles propres à ce projet ci-dessous.

## Langue

- Contenu, commentaires et documentation en **français**.
- Identifiants, noms de fichiers, clés de frontmatter et termes techniques en **anglais**.

## Contexte du projet

- Les règles sont dans les [standards](../docs/standards/), les rôles et procédures dans le [catalogue](../docs/process/catalog.md).
- Consulter les décisions pertinentes dans la mémoire `memory` et les confronter aux fichiers actuels ; ne pas recopier le graphe complet par défaut.
- Pour une décision structurante, appliquer le skill [grill-me](./skills/grill-me/SKILL.md).
- Si le Dev Container requis échoue à être créé, démarré ou joint, signaler le blocage et arrêter les opérations qui en dépendent ; ne pas poursuivre silencieusement sur l'hôte.

## Réalisation

- Adapter les vérifications et les outils à la tâche : pas de code sans tests, documentation et analyse d'impact. La [documentation](../docs/standards/documentation.md) est mise à jour dans la même livraison.
- Utiliser `.env` pour les secrets ; ne jamais les écrire dans un fichier versionné.
- Conserver dans `memory` les décisions, conventions et bugs durables utiles aux sessions futures, si le serveur est disponible ; sinon indiquer que la synchronisation n'a pas eu lieu.
- En cas d'échec ou d'indisponibilité d'un MCP, nommer le serveur, l'opération, l'erreur et l'impact ; continuer seulement si la tâche reste réalisable. Voir le [guide MCP](../docs/guides/mcp.md).

## Voir aussi

- [Guide personnel d'utilisation de l'IA](../docs/guides/ia-efficace.md)
- [Relations entre agents, skills et points d'entrée](../docs/process/relations.md)
- [Guide d'utilisation](../docs/guides/utilisation.md)
