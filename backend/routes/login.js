const express = require('express');
const { loginController } = require('../controllers/loginController');

const router = express.Router();

/**
 * @route POST /api/users/login
 * @description Connexion d'un utilisateur
 * @access Public
 * @example
 * // Requête
 * POST /api/users/login
 * {
 *   "email": "test@example.com",
 *   "password": "Password123"
 * }
 * // Réponse
 * 200 OK
 * {
 *   "message": "Connexion réussie.",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 * }
 */
router.post('/login', loginController);

module.exports = router;
