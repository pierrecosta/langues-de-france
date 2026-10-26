# Standard d'accessibilité

Source unique des règles d'accessibilité : **RGAA 4** et **WCAG 2.1 niveau AA**.

## Règles

- Contraste texte ≥ 4,5:1 (3:1 pour le grand texte et les composants d'interface), dans les thèmes Light et Dark.
- Navigation complète au clavier, focus visible, ordre de tabulation logique.
- HTML sémantique d'abord ; ARIA seulement si nécessaire.
- Alternative textuelle pour toute image porteuse d'information ; libellé pour tout champ de formulaire.
- Messages d'erreur explicites et associés aux champs ; l'information ne repose jamais sur la couleur seule.
- Respect de `prefers-reduced-motion` ; zoom jusqu'à 200 % sans perte de contenu.

## Critère de conformité

Audit automatisé (axe) sans violation, parcours clavier validé, vérification en Light et Dark.
