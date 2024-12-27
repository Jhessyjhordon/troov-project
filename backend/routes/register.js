const express = require('express');
const validateUser = require('../middleware/validateUser');
const { registerController } = require('../controllers/registerController');

const router = express.Router();

/**
 * @route POST /api/users/register
 * @description Inscription d'un nouvel utilisateur
 * @access Public
 * @example
 * // Requête
 * POST /api/users/register
 * {
 *   "email": "test@example.com",
 *   "password": "Password123"
 * }
 * // Réponse
 * 201 Created
 * {
 *   "message": "Utilisateur créé avec succès.",
 *   "userId": "646c5b4b7a0a1e2345678abc"
 * }
 */
router.post('/register', validateUser, registerController);

module.exports = router;
