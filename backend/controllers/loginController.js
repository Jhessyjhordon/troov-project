const jwt = require('jsonwebtoken'); // Optionnel, à installer si besoin
const bcrypt = require('bcrypt');
const User = require('../models/user');

require('dotenv').config();

/**
 * Connexion d'un utilisateur.
 * @async
 * @function
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @description Authentifie un utilisateur en comparant son mot de passe et génère un token JWT.
 * @returns {Object} 200 - Connexion réussie avec un token JWT.
 * @returns {Object} 400 - Mot de passe incorrect.
 * @returns {Object} 404 - Utilisateur non trouvé.
 * @returns {Object} 500 - Erreur interne du serveur.
 * @example
 * // Entrée (JSON Body)
 * {
 *   "email": "test@example.com",
 *   "password": "Password123"
 * }
 * @example
 * // Sortie (200 OK)
 * {
 *   "message": "Connexion réussie.",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 */
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérification de l'utilisateur
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);


        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect.' });
        }

        // On s'assure que JWT_SECRET est chargé
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in the environment variables');
        }

        // Génération du token (si nécessaire)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Définition du cookie HTTP-Only
        res.cookie('authToken', token, {
            httpOnly: true, // Empêche les scripts d'accéder au cookie
            secure: process.env.NODE_ENV === 'production', // HTTPS uniquement en production et false en localhost
            sameSite: 'Strict', // Empêche les attaques CSRF basées sur les navigateurs
            maxAge: 24 * 60 * 60 * 1000, // Expiration (1 jour ici)
            path: '/',
        });

        res.status(200).json({ message: 'Connexion réussie.', token });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion.', error: error.message });
    }
};