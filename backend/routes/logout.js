const express = require('express');
const { loginController } = require('../controllers/loginController');
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
router.post('/login', loginController);

router.post('/logout', logoutController);


module.exports = router;
