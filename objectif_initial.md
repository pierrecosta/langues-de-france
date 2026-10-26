
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

## Voyageur culturel
- Découvre une région.
- Cherche vocabulaire et expressions.

# 3. Territoires linguistiques

## Territoires actifs V1
- Ch'ti / Picard
- Breton
- Basque
- Provençal
- Corse
- Créole Réunionnais

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

## Gastronomie
- Produits locaux.
- Recettes emblématiques.
- Histoire du plat.
- Lien externe.

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

# 10. Gamification

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
- Quiz.
- Défis.
- Parcours d'apprentissage.

# 11. Accessibilité

Public cible : 50 ans et plus.

Exigences :
- Contraste élevé.
- Taille de police ajustable.
- Navigation simplifiée.
- Responsive.
- Boutons larges.

# 12. SEO

Une URL dédiée par contenu.

Exemples :
- /territoires/breton/dictionnaire/demat
- /territoires/corse/expressions/xxx
- /territoires/reunion/recettes/cari-poulet

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
- 6 territoires.
- 200 mots.
- 50 expressions.
- Comptes utilisateurs.
- Administration.

## V2
- Quiz.
- Parcours d'apprentissage.
- Plus de territoires.

## V3
- Audio natif.
- Applications mobiles dédiées.
- Événements régionaux.
- Partenariats culturels.

# 16. Critères de réussite

- Consultation libre sans compte.
- Temps de réponse inférieur à 2 secondes.
- Administration territoriale indépendante.
- Recherche rapide et tolérante.
- Interface adaptée aux plus de 50 ans.
- Forte valorisation du patrimoine régional.
