const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api'); // Importation des routes API
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Charger les variables d'environnement
dotenv.config();

// Initialiser l'application Express
const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Troov Project API',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], // Spécifie où se trouvent tes commentaires JSDoc
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Middleware pour parser le JSON
app.use(express.json());

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch((err) => console.error('Erreur de connexion à MongoDB:', err.message));

// Définir les routes
app.use('/api', apiRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
