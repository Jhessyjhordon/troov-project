const express = require('express');
const { validateController } = require('../controllers/validateController');

const router = express.Router();

/**
 * @route POST /api/validate/auth
 * @description Deconnexion d'un utilisateur
 * @access Public
 * @example
 * // Requête
 * POST /api/validate/auth
 * // Réponse
 * 200 OK
 * {
 *   "message": "Deonnexion réussie."
 * }
 */

router.get('/auth', validateController);
  


module.exports = router;
