# Lorcana Mobile

## Description

Lorcana Mobile est une application développée avec **React Native** et **Expo**, permettant aux utilisateurs de gérer leur collection de cartes du jeu Disney Lorcana. Elle inclut des fonctionnalités d'authentification, de gestion des chapitres et de gestion des cartes avec filtres et wishlist.

## Fonctionnalités

### 1. Authentification

- Inscription avec email et mot de passe
- Connexion
- Déconnexion

### 2. Gestion des cartes

- Affichage des cartes par chapitre
- Filtrage et recherche (par possession, wishlist)
- Ajout d'une carte à la collection
- Mise à jour des quantités (normales et brillantes)

### 3. Gestion des chapitres

- Affichage de la liste des chapitres disponibles

### 4. Wishlist

- Ajout et suppression de cartes dans la wishlist
- Affichage des cartes de la wishlist uniquement

## Écrans de l'application

- **Splash Screen** : Affiche le logo au démarrage.
- **Inscription** : Création de compte.
- **Connexion** : Authentification utilisateur.
- **Mon Compte** : Affiche l'email et le nombre total de cartes possédées avec un bouton de déconnexion.
- **Chapitres** : Liste des chapitres disponibles.
- **Cartes d'un chapitre** : Liste des cartes avec options de tri et de filtre.
- **Détail d'une carte** : Informations détaillées avec gestion des quantités.

## Technologies utilisées

- **React Native** avec Expo
- **Expo Router** pour la navigation
- **Expo Image** pour la gestion des images
- **Context API** pour la gestion de l'état global
- **Fetch API** pour les requêtes HTTP

## Installation et exécution

### 1. Prérequis

Assurez-vous d'avoir **Node.js** et **Expo CLI** installés sur votre machine.

### 2. Cloner le dépôt

```sh
git clone https://github.com/votre-utilisateur/lorcana-mobile.git
cd lorcana-mobile
```

### 3. Installer les dépendances

```sh
npm install
```

### 4. Lancer l'application

```sh
npx expo start
```
