const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth'); // Middleware JWT
const checkUserRights = require('../middleware/checkUserRights');

const router = express.Router();

/**
 * @route GET /api/users/:id
 * @description Récupérer un utilisateur par son ID
 * @access Protégé
 * @example
 * // Requête
 * GET /api/users/646c5b4b7a0a1e2345678abc
 * @example
 * // Réponse
 * 200 OK
 * {
 *   "_id": "646c5b4b7a0a1e2345678abc",
 *   "email": "test@example.com",
 *   "createdAt": "2024-12-26T10:00:00.000Z",
 *   "updatedAt": "2024-12-26T10:00:00.000Z"
 * }
 */
router.get('/:id', authMiddleware, checkUserRights, userController.getUserById);

/**
 * @route PUT /api/users/:id
 * @description Mise à jour d'un utilisateur par son ID
 * @access Protégé
 * @example
 * // Requête
 * PUT /api/users/646c5b4b7a0a1e2345678abc
 * {
 *   "email": "newemail@example.com"
 * }
 * @example
 * // Réponse
 * 200 OK
 * {
 *   "_id": "646c5b4b7a0a1e2345678abc",
 *   "email": "newemail@example.com",
 *   "createdAt": "2024-12-26T10:00:00.000Z",
 *   "updatedAt": "2024-12-26T10:10:00.000Z"
 * }
 */
router.put('/:id', authMiddleware, checkUserRights, userController.updateUser);

/**
 * @route DELETE /api/users/:id
 * @description Supprime un utilisateur par son ID
 * @access Protégé
 * @example
 * // Requête
 * DELETE /api/users/646c5b4b7a0a1e2345678abc
 * // Réponse
 * 200 OK
 * {
 *   "message": "Utilisateur supprimé avec succès."
 * }
 */
router.delete('/:id', authMiddleware, checkUserRights, userController.deleteUser);



module.exports = router;
