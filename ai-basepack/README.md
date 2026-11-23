# Socle IA minimal réutilisable

## Objectif

Réutiliser des instructions Copilot courtes sans emporter le produit Langues de France, ses données ou sa mémoire.

## Périmètre

Ce socle contient seulement les [instructions génériques](.github/copilot-instructions.md). Il ne fournit ni agents spécialisés, ni skills, ni serveur MCP, ni dépendance à Docker. Les éléments du dépôt parent restent disponibles séparément : voir l'[inventaire](../docs/process/ai-audit.md).

## Prérequis

Un projet ouvert dans VS Code avec un client Copilot prenant en charge `.github/copilot-instructions.md`. Vérifier les fonctions et la découverte auprès du client réellement utilisé.

## Étapes

1. Copier `.github/copilot-instructions.md` depuis ce dossier `ai-basepack` vers `.github/copilot-instructions.md` du projet cible. Si ce dernier existe, fusionner son contenu après comparaison au lieu de l'écraser.
2. Ajouter les conventions propres au projet cible, ses commandes de vérification et les limites de ses données ; ne copier ni la mémoire, ni les secrets, ni les données du présent projet.
3. Ajouter séparément un agent, un skill ou un serveur MCP seulement si une tâche récurrente en démontre l'utilité. Adapter ses liens et sa configuration, puis vérifier sa disponibilité dans le client cible.
4. Utiliser le [guide personnel](../docs/guides/ia-efficace.md) comme référence ; si le socle est distribué seul, copier également ce guide et adapter ses liens.

## Vérification et retour arrière

Dans une nouvelle conversation du projet cible, demander un changement limité et vérifier que l'assistant identifie un critère, lit les fichiers pertinents et indique les vérifications effectuées. Contrôler dans l'interface les instructions réellement chargées : leur présence sur disque ne garantit pas leur application.

Pour revenir en arrière, restaurer les instructions précédentes du projet cible depuis son propre historique. Ne pas supprimer ses données ou sa mémoire.
