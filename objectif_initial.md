
# Découverte des Langues de France
## Cahier des Charges Fonctionnel et Produit V2

Version : 2.0
Statut : Référence Produit

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

Le MVP ouvre d'abord le provençal. Les cinq autres territoires sont prévus après le MVP ; leur ordre et leurs dates d'ouverture restent à définir.

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

Les mini-jeux pédagogiques sont inclus dans le MVP sur le site web responsive. Jouer dans un navigateur mobile fait partie de cette expérience web et ne constitue pas une application mobile native.

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

## MVP
- 1 territoire : le provençal.
- Corpus cible initial : 200 mots et 50 expressions ; ces volumes sont des objectifs, pas des seuils bloquant l'ouverture.
- Mini-jeux pédagogiques dans le site web responsive.
- Comptes utilisateurs.
- Administration.

## V2
- Parcours d'apprentissage.
- Ouverture progressive des cinq autres territoires, jusqu'à six au total.

## V3
- Audio natif.
- Application mobile native, après le MVP web.
- Événements régionaux.
- Partenariats culturels.

# 16. Critères de réussite

- Consultation libre sans compte.
- Temps de réponse inférieur à 2 secondes.
- Administration territoriale indépendante.
- Recherche rapide et tolérante.
- Interface adaptée aux plus de 50 ans.
- Forte valorisation du patrimoine régional.
