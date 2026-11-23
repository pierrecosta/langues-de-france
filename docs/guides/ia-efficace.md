# Utiliser l'IA efficacement

## Objectif

Obtenir un résultat utile avec le moins de contexte et de travail superflu possible, sans sacrifier les vérifications.

## Périmètre et prérequis

Ce guide s'adresse au porteur du projet et reste adaptable à un autre dépôt. Il suppose un client Copilot ouvert sur le projet ; l'[inventaire](../process/ai-audit.md) explique les objets disponibles et le [socle](../../ai-basepack/README.md) indique ce qui est réutilisable.

## Diagnostic personnalisé : ce qui est observé

- Tu souhaites conserver une vision finale tout en obtenant des MVP successifs sur chaque sujet : demande un résultat observable à chaque étape plutôt qu'une conception globale à refaire.
- Tu constates une consommation de tokens trop rapide et un contexte trop chargé. Les fichiers montrent beaucoup de rôles, de procédures et de renvois ; cela justifie de mieux cibler leur utilisation, mais ne prouve pas à lui seul combien de tokens ils consomment.
- Tu relèves des répétitions et un manque de clarté. Des divergences documentaires et des notes mémoire devenues périmées sont effectivement visibles dans l'[audit](../process/ai-audit.md).
- Aucun historique de conversation de ce projet n'a été retrouvé dans les sessions accessibles pendant ce diagnostic. Il serait injustifié d'attribuer ces problèmes à tes habitudes personnelles ou d'annoncer un gain chiffré sans mesure.

## Étapes pour chaque demande

1. **Nommer le résultat** : « Je veux [livrable] pour [utilisateur ou usage]. »
2. **Délimiter l'incrément** : « Inclus : … ; hors périmètre pour cette étape : … ; conserver l'objectif final. »
3. **Donner une preuve de réussite** : « C'est terminé quand [résultat observable ou test]. »
4. **Indiquer le contexte utile** : un fichier ou une décision connue, pas la totalité du projet. Demander à l'IA de rechercher le reste de façon ciblée.
5. **Choisir les outils au besoin** : commencer avec l'agent courant ; ajouter un skill, un agent ou un MCP seulement si sa valeur pour cette tâche est claire. Une petite correction ne demande pas automatiquement une chaîne complète de rôles.
6. **Faire contrôler le résultat** : demander les changements, tests, limites et décisions restant à prendre. Si l'IA répète le cadrage sans livrer, rappeler l'incrément et demander la prochaine action concrète.

Exemple :

> Objectif final : consultation du dictionnaire provençal. Pour cette étape seulement, afficher une fiche de mot publié depuis l'API existante. Ne pas ajouter de compte ni de jeu. Terminé quand une fiche publiée s'affiche et qu'un brouillon retourne 404 ; teste les deux cas et signale les limites.

## Mémoire, contexte et coût

- Réutiliser une décision pertinente plutôt que redemander tout le cadrage ; demander sa source et vérifier qu'elle n'a pas été remplacée.
- Ne pas demander le graphe complet à chaque étape. Un résumé ciblé doit distinguer décisions confirmées, propositions et informations anciennes.
- Pour un nouveau sujet indépendant, ouvrir une nouvelle conversation et ne transmettre qu'un bref état : objectif, contraintes, livrable précédent et prochaine action. Garder la conversation existante si son contexte reste nécessaire.
- Éviter les documents complets, multiples agents et recherches externes sans lien avec le livrable. Un sous-agent isole du contexte mais n'est pas gratuit : il peut consommer ses propres tokens.
- Ne pas confondre taille de contexte affichée, tokens en entrée, tokens en sortie, cache et coût. Les mesures et leur disponibilité varient selon le client et le modèle.

## Établir une référence de consommation

1. Choisir trois tâches répétables : une question sur un fichier, une petite modification avec test, et un cadrage d'incrément produit.
2. Pour chacune, noter le client, le modèle, les instructions actives, les fichiers joints, les outils réellement appelés, les tokens d'entrée et de sortie et le coût si le client les affiche ; sinon écrire « non disponible ».
3. Répéter une tâche comparable avec le contexte ciblé décrit ci-dessus, dans les mêmes conditions autant que possible. Noter aussi les tokens mis en cache et ceux des sous-agents si le client les fournit.
4. Comparer les chiffres disponibles **et** vérifier que le résultat et les tests restent équivalents. Ne pas additionner des mesures de périmètres différents ni conclure à une économie lorsque les données manquent.

Aucune référence chiffrée ni réduction n'a été établie lors de l'audit initial.

## Jev : rôle possible, pas intégration

[Jev](https://jevai.net/) se présente comme un service de décisions structurées : classification, routage, extraction ou scoring avec des sorties définies et des scores de confiance. Il complète un modèle génératif plutôt qu'il ne le remplace ; une sortie structurée ou un score ne garantit pas une décision correcte.

Une piste serait de classer des demandes répétitives selon des critères explicites, avec validation humaine des cas incertains. Ce n'est pas nécessaire pour utiliser le pack : aucune intégration n'est configurée ici. Avant tout essai, vérifier documentation, coût réel, confidentialité, conditions de traitement des données et qualité sur des exemples ; ne pas envoyer de secrets ni de contenu sensible à un service externe.

## Vérification

Après une demande, vérifier qu'il existe un livrable concret, un critère observé, les tests adaptés, les limites et une prochaine étape. Si le client expose la consommation, conserver les mesures de référence avec leurs conditions ; sinon ne pas inventer de chiffres.
