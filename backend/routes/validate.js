const express = require('express');
const { validateController } = require('../controllers/validateController');

const router = express.Router();

/**
 * @route GET /api/validate/auth
 * @description vérifier si l'utilisateur est authentifié
 * @access Public
 * @example
 * // Requête
 * GET /api/validate/auth
 * // Réponse
 * 200 OK
 * {
 *   "userId": "<id>"
 * }
 * @example
 * // Réponse
 * 401 Unauthorized
 * {
 *   "message": "Non authentifié"
 * }
 * @example
 * // Réponse
 * 403 Forbidden
 * {
 *   "message": "Token invalide"
 * }
 */

router.get('/auth', validateController);
  


module.exports = router;
