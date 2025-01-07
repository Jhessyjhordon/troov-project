# Projet TROOV

Ce projet est une application permettant la gestion des utilisateurs et de leurs objets. Elle comprend un backend Node.js et un frontend Nuxt.js, avec plusieurs fonctionnalités pour la création, modification, suppression, et affichage des objets utilisateurs, ainsi qu'un système d'authentification sécurisé.

## Structure du projet

Le projet est divisé en deux parties principales :
- **Frontend** : Développé avec Nuxt.js pour l'interface utilisateur.
- **Backend** : API REST développée avec Node.js/Express et utilisant MongoDB comme base de données.

```
troov-project/
├── backend/        # Code serveur (API)
│   ├── controllers/ # Contient la logique métier
│   ├── middlewares/ # Contient les middlewares (auth, validation, etc.)
│   ├── models/      # Modèles Mongoose
│   ├── routes/      # Routes API
│   ├── tests/       # Test API et models
│   ├── app.js       # Configuration principale d'Express
│   ├── server.js    # Démarrage du serveur
├── frontend/       # Code client (Nuxt.js)
│   ├── components/  # Composants réutilisables
│   ├── pages/       # Pages Nuxt
│   ├── plugins/     # Configuration globale (Axios, etc.)
│   ├── middleware/  # Middleware Nuxt.js
├── shared/         # Documentation commune
├── README.md       # Documentation principale
├── .gitignore      # Liste des fichiers ignorés par Git
```

---

## Fonctionnalités principales

### Backend

1. **Système d'authentification sécurisée** :
   - Connexion et déconnexion avec JWT.
   - Middleware pour protéger les routes sensibles.
   - Gestion des cookies sécurisés (`httpOnly`)

2. **Gestion des objets et utilisateurs** :
   - Routes des objets et des utilisateurs.
   - Gestion des droits d'accès aux objets.

3. **Protection des routes** :
   - Middleware pour protéger les pages réservées aux utilisateurs authentifiés.

4. **Validation des sessions** :
   - Endpoint `/validate/auth` pour vérifier l'authentification utilisateur.

### Frontend

1. **Pages sécurisées** :
   - Protection des routes avec un middleware basé sur une validation côté backend.

2. **Gestion des objets utilisateur** :
   - Liste des objets avec options de modification et suppression.
   - Formulaire pour ajouter ou modifier un objet.

3. **UI intuitive** :
   - Utilisation de Bootstrap pour une interface moderne et responsive.

4. **Système de navigation** :
   - Barre de navigation conditionnelle (boutons visibles selon l'état de connexion).

5. **Retour utilisateur** :
   - Messages d'erreur clairs pour guider l'utilisateur (ex : "Veuillez vous connecter pour accéder à cette page").

---

### Prérequis
- Node.js v20+
- MongoDB Atlas 
  - un base simple qui se nomme : troov-project
  - 2 collections objects et users

### Installation

1. **Cloner le projet** :
   ```bash
   git clone https://github.com/Jhessyjhordon/troov-project.git
   cd troov-project
   ```

2. **Backend** :
   ```bash
   cd backend
   npm install
   npx nodemon server.js
   ```

3. **Frontend** :
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Configuration** :
   - Backend : Créer un fichier `.env` dans `backend/` avec les clés nécessaires :
     ```env
     MONGO_URI=mongodb_uri
     PORT=5000
     JWT_SECRET=jwt_secret
     CLIENT_URL=http://localhost:3000
     ```
   - Frontend : Créer un fichier `.env` dans `frontend/` :
     ```env
     BASE_URL=http://localhost:5000/api
     ```

## Tests

Les tests unitaires sont disponibles dans le dossier `backend/tests`.
- Pour exécuter les tests :
  ```bash
  npm test
  ```

## Documentation des endpoints

### Exemple : Endpoint de validation
- **Route** : `GET /validate/auth`
- **Description** : Vérifie l'authentification d'un utilisateur.
- **Réponse** :
  - 200 OK : `{ "userId": "..." }`
  - 401 Unauthorized : `{ "message": "Non authentifié" }`
  - 403 Forbidden : `{ "message": "Token invalide" }`

#### **Utilisateurs**
- **POST** `/users/register` : Inscription d’un nouvel utilisateur.
- **POST** `/users/login` : Connexion d’un utilisateur existant.
- **POST** `/users/logout` : Déconnexion de l’utilisateur.
- **GET** `/users/:id` : Récupérer un utilisateur par son ID.
- **PUT** `/users/:id` : Mise à jour d'un utilisateur par son ID.
- **DELETE** `/users/:id` : Supprime un utilisateur par son ID.

#### **Objets**
- **GET** `/object` : Récupérer tous les objets de l'utilisateur connecté.
- **GET** `/object/:id` : Récupérer un objet spécifique par son ID.
- **POST** `/object` : Ajouter un nouvel objet.
- **PUT** `/object/:id` : Modifier un objet existant.
- **DELETE** `/object/:id` : Supprimer un objet par son ID.

#### **Validation**
- **GET** `/validate/auth` : vérifier si l'utilisateur est authentifié.

## Licence

Ce projet n'est pas sous licence et est destiné à une démonstration de compétences.

