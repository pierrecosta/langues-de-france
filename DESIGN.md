# Design — Langues de France

## Direction

Un atlas de lecture : des repères cartographiques et des textes culturels clairs, sans donner aux points de la carte la valeur de frontières linguistiques. Les accès restent conventionnels et les liens textuels complètent la carte. La direction est limitée par les contenus et fonctionnalités existants ; les démonstrations restent explicitement identifiées.

## Typographie et mise en page

- Titres en Literata ; texte courant en Atkinson Hyperlegible, choisi pour la lisibilité et servi localement ; les deux polices sont sous licence SIL OFL. Corps de texte à 18 px.
- Titres dimensionnés de façon fluide, paragraphes limités à 70 caractères environ, espacements généreux et filets entre sections éditoriales.
- En-tête et pied de page partagés ; navigation visible et retour à la ligne sur petits écrans. La page provençale rassemble les accès existants dans une introduction.

## Couleurs et états

Les couleurs sémantiques sont définies dans `frontend/src/app/globals.css` pour les deux thèmes : fonds et surfaces végétales, texte sombre ou clair, action orangette, avis pêche et repère olive. Les couleurs servent aussi les bordures, le focus et la sélection. Les avertissements de démonstration restent explicites dans le texte, sans dépendre de leur couleur.

## Accessibilité et vérifications

- Cible : RGAA 4 et WCAG 2.1 AA, focus visible, clavier, mouvement réduit et mise en page responsive. Les calculs des combinaisons principales de tokens dépassent 4,5:1 pour les textes et 3:1 pour les bordures contrôlées ; ils ne remplacent pas un audit complet des pages.
- Les fichiers de police et leurs licences sont dans `frontend/public/fonts/`.
- Le système doit être revu sur toutes les routes, les états interactifs et aux zooms élevés ; les tests automatisés ne constituent pas une certification RGAA.
