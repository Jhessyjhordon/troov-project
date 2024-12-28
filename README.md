# Troov Project

Ce projet est une application Full Stack développée avec Nuxt.js (frontend) et Node.js/Express (backend). Elle utilise MongoDB pour la gestion des données et suit une architecture MVC. Ce projet a été réalisé dans le cadre d'un test technique.

## Structure du projet

Le projet est divisé en deux parties principales :
- **Frontend** : Développé avec Nuxt.js pour l'interface utilisateur.
- **Backend** : API REST développée avec Node.js/Express et utilisant MongoDB comme base de données.

```
troov-project/
├── backend/        # Code serveur (API)
├── frontend/       # Code client (Interface utilisateur)
├── shared/         # Documentation commune et fichiers partagés
└── .gitignore      # Liste des fichiers ignorés par Git
```

---

## Prérequis

Avant de commencer, assurez-vous d’avoir :
- **Node.js** (v14 ou plus) : [Télécharger ici](https://nodejs.org/)
- **npm** ou **yarn** : Inclus avec Node.js
- **MongoDB Atlas** : Pour la base de données (ou une instance locale de MongoDB).

---

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
3. Configurez les variables d'environnement en créant un fichier `.env` :
   ```plaintext
   MONGO_URI=Votre_URI_de_MongoDB
   PORT=5000
   JWT_SECRET=VotreCléJWT
   ```
4. Démarrez le serveur backend en mode développement :
   ```bash
   npm run dev
   ```
5. L'API sera disponible sur `http://localhost:5000/api`.

### Frontend
1. Naviguez dans le dossier frontend :
   ```bash
   cd ../frontend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Configurez le fichier `.env` (si nécessaire) pour pointer vers l'API backend.
4. Lancez le projet en mode développement :
   ```bash
   npm run dev
   ```
5. L'application frontend sera disponible sur `http://localhost:3000`.

---

## Fonctionnalités principales

1. **Authentification sécurisée :**
   - Inscription et connexion des utilisateurs avec JWT.
2. **Gestion des objets :**
   - CRUD complet pour gérer des objets liés aux utilisateurs.
3. **API REST robuste :**
   - Gestion des données via des endpoints bien documentés.
4. **Architecture modulaire :**
   - Routes, contrôleurs, et middlewares séparés pour une meilleure maintenabilité.

---

## API Documentation

### **Endpoints principaux :**
1. **Utilisateur :**
   - `POST /api/users/register` : Inscription d'un nouvel utilisateur.
   - `POST /api/users/login` : Connexion utilisateur.
   - `GET /api/users/:id` : Récupérer un utilisateur par son ID.
   - `PUT /api/users/:id` : Mettre à jour un utilisateur.
   - `DELETE /api/users/:id` : Supprimer un utilisateur.

2. **Objets :**
   - `POST /api/objects` : Créer un objet.
   - `GET /api/objects/:id` : Récupérer un objet par son ID.
   - `GET /api/objects` : Récupérer tous les objets.
   - `PUT /api/objects/:id` : Mettre à jour un objet.
   - `DELETE /api/objects/:id` : Supprimer un objet.

3. **Route de test :**
   - `GET /api/test` : Vérifie le bon fonctionnement de l'API.

---

## Technologies utilisées

- **Frontend :**
  - Nuxt.js (avec Bootstrap Vue pour le style)
- **Backend :**
  - Node.js / Express
  - MongoDB avec Mongoose
- **Langages :**
  - JavaScript (ou TypeScript si utilisé)

---

## Contribution

1. Clonez le projet :
   ```bash
   git clone https://github.com/username/troov-project.git
   ```
2. Créez une branche pour vos modifications :
   ```bash
   git checkout -b feature/nouvelle-fonctionnalité
   ```
3. Une fois terminé, ouvrez une pull request.

---

## Auteur

Développé par **Jhessyjhordon** dans le cadre du projet Troov.

