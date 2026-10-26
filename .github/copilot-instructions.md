# Instructions Copilot du dépôt

Ces instructions s'appliquent à toutes les conversations. Elles ne recopient aucune règle : les normes sont dans [docs/standards/](../docs/standards/), les procédures dans [.github/skills/](./skills/), les rôles dans [.github/agents/](./agents/).

## Langue

- Contenu, commentaires et documentation en **français**.
- Identifiants, noms de fichiers, clés de frontmatter et termes techniques en **anglais**.

## Avant toute tâche

1. Lire la mémoire du projet (serveur MCP `memory`).
2. Consulter la documentation officielle à jour (serveur MCP `context7`) avant d'utiliser une bibliothèque ou un framework.
3. Évaluer les impacts (code, données, sécurité, accessibilité, documentation).
4. Pour toute décision structurante, appliquer le skill [grill-me](./skills/grill-me/SKILL.md).
5. Si le Dev Container requis par la tâche échoue à être créé, démarré ou joint, signaler immédiatement le blocage et arrêter les opérations qui en dépendent. Ne pas poursuivre silencieusement sur l'hôte.

## Disponibilité des outils

- En cas d'erreur, de délai dépassé ou d'indisponibilité d'un MCP, afficher immédiatement un avertissement avec le serveur concerné, l'opération, l'erreur et son impact.
- Ne jamais présenter comme lue, enregistrée ou vérifiée une information dont l'opération MCP a échoué. Continuer seulement si la tâche reste réalisable sans cette opération, en indiquant clairement les limites ; sinon, la marquer comme bloquée ou incomplète.
- Pour le dépannage des services et du Dev Container, suivre le [guide MCP](../docs/guides/mcp.md).

## Pendant la tâche

- Aucun code sans tests, documentation et analyse d'impact.
- Respecter les standards du dossier [docs/standards/](../docs/standards/) (liste dans le [catalogue](../docs/process/catalog.md)).
- Utiliser l'agent adapté au rôle (voir [catalogue](../docs/process/catalog.md)) et suivre le [workflow](../docs/process/workflow.md).
- Ne jamais écrire de secret dans un fichier versionné ; utiliser `.env` (voir [.env.example](../.env.example)).

## Après la tâche

- Enregistrer dans la mémoire (`memory`) les décisions, conventions et bugs connus utiles aux sessions futures.
- **Mettre à jour la documentation à chaque itération**, dans la même livraison que le changement : règle et liste des pages dans le [standard documentaire](../docs/standards/documentation.md).

## Voir aussi

- [Relations entre agents, skills et prompts](../docs/process/relations.md)
- [Guide d'utilisation](../docs/guides/utilisation.md)
