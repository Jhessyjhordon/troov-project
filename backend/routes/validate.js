const express = require('express');
const { validateController } = require('../controllers/validateController');

const router = express.Router();

/**
 * @route POST /api/validate/auth
 * @description vérifier si l'utilisateur est authentifié
 * @access Public
 * @example
 * // Requête
 * POST /api/validate/auth
 * // Réponse
 * 200 OK
 * {
 *   "message": "Utilisateur inconnus."
 * }
 */

router.get('/auth', validateController);
  


module.exports = router;
