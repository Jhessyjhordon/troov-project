const express = require('express');
const { logoutController } = require('../controllers/logoutController');

const router = express.Router();

/**
 * @route POST /api/users/logout
 * @description Deconnexion d'un utilisateur
 * @access Public
 * @example
 * // Requête
 * POST /api/users/logout
 * // Réponse
 * 200 OK
 * {
 *   "message": "Deonnexion réussie."
 * }
 */
router.post('/logout', logoutController);


module.exports = router;
