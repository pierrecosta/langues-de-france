
# Découverte des Langues de France
## Cahier des Charges Fonctionnel et Produit V2

Version : 2.0
Statut : Référence Produit

Ce document décrit la vision finale. La livraison suit désormais quatre MVP
distincts et cumulatifs, publiables séparément : dictionnaire de mots, quiz,
carte interactive, puis agenda d'événements. Leur périmètre et leurs critères
sont définis dans le [backlog](docs/product/mvp-backlog.md) et les
[incréments](docs/product/increments-mvp.md) ; les fonctionnalités décrites
ci-dessous ne sont pas toutes nécessaires à la première publication.

# 1. Vision

Découverte des Langues de France est une plateforme web communautaire dédiée à la découverte, la préservation et la transmission des langues régionales françaises.

Objectifs :
- Faire découvrir les langues régionales.
- Préserver le patrimoine linguistique.
- Valoriser les cultures locales.
- Encourager la transmission intergénérationnelle.
- Créer une communauté de contributeurs.

# 2. Personas

## Curieux de sa région (50+)
- Souhaite retrouver des mots oubliés.
- Recherche l'histoire locale.
- Peu familier avec les interfaces complexes.

## Transmetteur culturel
- Membre d'association.
- Souhaite partager son savoir.
- Contribue au contenu.

## Transmetteur provençal du Var (60 ans)
- Homme du Var, il parle couramment le provençal et connaît particulièrement la région et la culture varoises.
- Il connaît les ressources des [Archives départementales du Var](https://archives.var.fr/) et de [Mémoire orale du Var](https://memoire-orale.var.fr/).
- Son objectif de vie est de transmettre la langue et la culture provençales.
- Dans le projet, il vérifie la cohérence globale comme utilisateur du site public et comme administrateur des contenus.
- Il évalue la facilité d'utilisation, la clarté, l'accessibilité et la cohérence de l'expérience.
- Il n'est pas technicien, mais sait lire la documentation Markdown et les fichiers JSON. Il peut corriger les données métier ; il ne développe pas et ne modifie pas le code ou la configuration technique.
- Il est particulièrement attentif à la lisibilité, à la clarté des parcours et à la simplicité de l'interface d'administration.

## Voyageur culturel
- Découvre une région.
- Cherche vocabulaire et expressions.

# 3. Territoires linguistiques

## Territoire du MVP
- Provençal, avec une attention particulière aux formes et à la culture du Var.

## Cible à terme : six territoires
- Provençal
- Ch'ti / Picard
- Breton
- Basque
- Corse
- Créole Réunionnais

Les quatre premiers MVP ouvrent uniquement le provençal. Les cinq autres territoires restent prévus ultérieurement ; leur ordre et leurs dates d'ouverture restent à définir.

## Territoires référencés
- Alsacien
- Francique mosellan
- Catalan
- Gallo
- Savoyard
- Arpitan
- Bourguignon-Morvandiau
- Normand
- Poitevin-Saintongeais
- Occitan
- Créole guadeloupéen
- Créole martiniquais
- Créole guyanais
- Tahitien
- Kanak
- Wallisien
- Futunien

# 4. Architecture fonctionnelle

## Portail principal
URL :
/ 

Fonctions :
- Carte de France métropole + DROM.
- Sélection d'un territoire linguistique.
- Mot du jour.
- Expression du jour.
- Statistiques globales.

## Sites territoriaux
Structure :
/territoires/{slug}

Chaque territoire possède :
- Son thème graphique.
- Son dictionnaire.
- Ses expressions.
- Son contenu culturel.
- Son tourisme.
- Sa gastronomie.

# 5. Modules fonctionnels

## Culture
- Présentation.
- Histoire.
- Aire géographique.
- Variantes linguistiques.
- Origine de la langue.
- Cartographie.

## Tourisme
- Top 5 lieux.
- Top 5 activités.
- Galerie de 3 photos.
- Lien externe.

Les lieux sont des destinations de visite patrimoniales ou culturelles : sites historiques, villages typiques, musées et lieux comparables. Les activités sont des expériences comme les foires, expositions, marchés, randonnées et parcours. Les événements à durée déterminée portent une date de début et une date de fin ; ces dates ne sont pas exigées pour les parcours pérennes. Le contrat détaillé des seeds est décrit dans [src_init/readme.md](src_init/readme.md).

## Gastronomie
- Produits locaux.
- Recettes emblématiques.
- Histoire du plat.
- Lien externe.

Une fiche de produit local comprend un identifiant, un titre, un lien d'image, son histoire et, si elle est disponible, une référence ; sa description est facultative. Une fiche de recette comprend un identifiant, un titre, un lien d'image, son histoire, une liste d'ingrédients, une description complète et, si elle est disponible, une référence.

## Dictionnaire
Objectif long terme : 5000 mots par territoire.

Champs :
- Français.
- Traduction.
- Prononciation.
- Catégorie.
- Sous-catégorie.
- Variantes.
- Origine.
- Exemple.
- Traduction exemple.
- Notes culturelles.
- Faux ami.
- Niveau de sensibilité.
- Statut historique.

## Expressions
Objectif long terme : 500 expressions par territoire.

Champs :
- Expression locale.
- Prononciation.
- Traduction littérale.
- Signification réelle.
- Équivalent français.
- Origine.
- Sensibilité.
- Type d'usage.

# 6. Gestion des variantes

Affichage par défaut :
- Forme principale.
- Indicateur du nombre de variantes.

Options utilisateur :
- Masquer variantes.
- Afficher les variantes automatiquement.

# 7. Recherche

Fonctions :
- Français vers langue locale.
- Langue locale vers français.
- Tolérance aux fautes.
- Pagination 25 résultats.

Filtres :
- Catégorie.
- Sous-catégorie.
- Historique.
- Sensibilité.
- Variantes.
- Faux amis.

# 8. Utilisateurs et rôles

## Visiteur
- Consultation libre.

## Utilisateur connecté
- Profil.
- Historique.
- Progression.
- Quiz.
- Contributions.

## Administrateur territoire
- Maximum 2 administrateurs.
- Gestion du contenu du territoire.
- Validation des propositions.

## Super Administrateur
- Gestion globale.
- Création des territoires.
- Gestion des administrateurs.

# 9. Contributions communautaires

Actions possibles :
- Ajouter un mot.
- Corriger un mot.
- Ajouter une expression.
- Ajouter une variante.

Workflow :
Proposition -> Validation -> Publication.

Un contributeur peut proposer une forme apprise ou connue de mémoire ; l'absence de source externe ne suffit pas à écarter sa contribution. Lorsqu'une source est connue ou accessible, elle doit être renseignée ou mise à jour. Ne jamais inventer une référence.

# 10. Gamification

Le premier quiz web responsive arrive au MVP 2, après le dictionnaire : un QCM anonyme fondé sur les mots publiés, sans compte ni sauvegarde du score. Les autres jeux et la progression restent dans la vision finale, mais ne sont pas exigés au MVP 2. Jouer dans un navigateur mobile ne constitue pas une application mobile native.

## Progression
- XP.
- Niveaux.
- Statistiques personnelles.

## Badges
- Découvreur.
- Ambassadeur.
- Collectionneur de mots historiques.
- Contributeur.

## Futur
- Défis.
- Parcours d'apprentissage.
- Application mobile native après le MVP.

# 11. Accessibilité

Public cible : 50 ans et plus.

Exigences :
- Contraste élevé.
- Taille de police ajustable.
- Navigation simplifiée.
- Responsive.
- Boutons larges.

# 12. Partage et URL

Une URL dédiée par contenu, de forme `/{territoire}/{type}/{slug}`. Les pages sont partageables avec aperçu social, mais marquées `noindex` : aucune indexation par les moteurs de recherche au MVP ([ADR-002](docs/architecture/adr/ADR-002-frontend-react-ssr.md)).

Exemple MVP :
- /provencal/dictionnaire/exemple

# 13. Modèle de données simplifié

Entités :
- Utilisateur
- Territoire
- Mot
- Variante
- Expression
- ProduitLocal
- Recette
- LieuTouristique
- Activite
- Contribution
- Badge

# 14. Back Office

Modules :
- Tableau de bord.
- Dictionnaire.
- Expressions.
- Culture.
- Tourisme.
- Gastronomie.
- Utilisateurs.
- Modération.
- Statistiques.

# 15. Roadmap

## Quatre MVP cumulatifs

Chaque étape conserve les précédentes et peut être publiée séparément après
validation de ses critères :

1. **Dictionnaire** : consulter et rechercher des mots provençaux publiés ; les expressions sont ultérieures.
2. **Quiz** : jouer anonymement à un QCM fondé sur les mots publiés, sans sauvegarde du score.
3. **Carte interactive** : carte de France avec le territoire provençal comme seule sélection interactive initiale.
4. **Événements** : consulter un agenda public administré, sans inscription ni paiement.

Le corpus cible de 200 mots et 50 expressions demeure un objectif, pas un seuil
bloquant à lui seul. Les comptes, autres jeux, progression, contributions et
autres contenus restent dans la vision finale, sans être requis pour ces
premiers périmètres. Les exigences de sécurité, d'accessibilité et
d'exploitation applicables restent à satisfaire avant chaque publication.

## V2
- Parcours d'apprentissage.
- Ouverture progressive des cinq autres territoires, jusqu'à six au total.

## V3
- Audio natif.
- Application mobile native, après le MVP web.
- Enrichissement des événements régionaux au-delà de l'agenda du MVP 4.
- Partenariats culturels.

# 16. Critères de réussite

- Consultation libre sans compte.
- Temps de réponse inférieur à 2 secondes.
- Administration territoriale indépendante.
- Recherche rapide et tolérante.
- Interface adaptée aux plus de 50 ans.
- Forte valorisation du patrimoine régional.
