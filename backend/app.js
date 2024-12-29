const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api'); // Importation des routes API
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cookieParser = require('cookie-parser'); // Importer cookie-parser
const cors = require('cors');


dotenv.config(); // Charger les variables d'environnement
const app = express(); // Initialiser l'application Express

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

app.use(cookieParser()); // Utiliser cookie-parser comme middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000', // Autorisation de CORS avec une origine spécifique
    credentials: true, // Permet les cookies
})); 
app.use(express.json()); // Middleware pour parser le JSON

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch((err) => console.error('Erreur de connexion à MongoDB:', err.message));

// Définir les routes
app.use('/api', apiRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app; // Export de l'application Express
