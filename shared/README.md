# Troov Project

Ce projet est une application Full Stack développée avec Nuxt.js (frontend) et Node.js/Express (backend). Elle utilise MongoDB pour la gestion des données et suit une architecture MVC.

## Structure du projet

Le projet est divisé en deux parties principales :
- **Frontend** : Géré par Nuxt.js.
- **Backend** : Géré par Node.js/Express.

```
troov-project/
├── backend/        # Code serveur (API)
├── frontend/       # Code client (Interface utilisateur)
├── shared/         # Documentation commune et fichiers partagés
└── .gitignore      # Liste des fichiers ignorés par Git
```

## Prérequis

Avant de commencer, assurez-vous d’avoir installé :
- **Node.js** : [Télécharger ici](https://nodejs.org/)
- **npm** ou **yarn** : Inclus avec Node.js
- **MongoDB Atlas** : Pour la base de données.

## Installation

### Backend
1. Naviguez dans le dossier backend :
   ```bash
   cd backend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Configurez l'environnement en créant un fichier `.env` :
   ```plaintext
   MONGO_URI=Votre_URI_de_MongoDB
   PORT=5000
   ```
4. Démarrez le serveur backend :
   ```bash
   npm run dev
   ```

### Frontend
1. Naviguez dans le dossier frontend :
   ```bash
   cd ../frontend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le projet en mode développement :
   ```bash
   npm run dev
   ```

## Fonctionnalités principales

1. **Gestion des objets** :
   - Ajouter, modifier, ou supprimer des objets.
2. **Authentification** :
   - Connexion et inscription via le backend sécurisé.
3. **API REST** :
   - API pour gérer les données entre le frontend et le backend.

## Technologies utilisées

- **Frontend** :
  - Nuxt.js (avec Bootstrap Vue pour le style)
- **Backend** :
  - Node.js / Express
  - MongoDB avec Mongoose
- **Langage** :
  - TypeScript

## Contribution

1. Clonez le projet :
   ```bash
   git clone https://github.com/username/troov-project.git
   ```
2. Créez une branche pour vos modifications :
   ```bash
   git checkout -b feature-nouvelle-fonctionnalité
   ```
3. Ouvrez une pull request une fois votre travail terminé.

## Auteur

Développé par **Jhessyjhordon** dans le cadre du projet Troov.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](./LICENSE) pour plus d'informations.

