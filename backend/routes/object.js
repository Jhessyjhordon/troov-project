const express = require('express');
const objectController = require('../controllers/objectController');
const authMiddleware = require('../middleware/auth');
const checkRights = require('../middleware/checkRights');
const validateObject = require('../middleware/validateObject');

const router = express.Router();

/**
 * @route POST /api/object
 * @description Crée un nouvel objet
 * @access Protégé
 * @example
 * // Requête
 * POST /api/objects
 * {
 *   "name": "Test Object",
 *   "description": "Ceci est un objet de test",
 *   "userId": "646c5b4b7a0a1e2345678abc"
 * }
 * @example
 * // Réponse
 * 201 Created
 * {
 *   "message": "Objet créé avec succès.",
 *   "object": {
 *     "_id": "123456",
 *     "name": "Test Object",
 *     "description": "Ceci est un objet de test",
 *     "userId": "646c5b4b7a0a1e2345678abc",
 *     "createdAt": "2024-12-27T00:00:00.000Z",
 *     "updatedAt": "2024-12-27T00:00:00.000Z"
 *   }
 * }
 */
router.post('/', authMiddleware, validateObject, objectController.createObject);

/**
 * @route GET /api/object/:id
 * @description Récupère un objet par son ID
 * @access Protégé
 * @example
 * // Requête
 * GET /api/objects/123456
 * @example
 * // Réponse
 * 200 OK
 * {
 *   "_id": "123456",
 *   "name": "Test Object",
 *   "description": "Ceci est un objet de test",
 *   "userId": "646c5b4b7a0a1e2345678abc",
 *   "createdAt": "2024-12-27T00:00:00.000Z",
 *   "updatedAt": "2024-12-27T00:00:00.000Z"
 * }
 */
router.get('/:id', authMiddleware, checkRights, objectController.getObjectById);

/**
 * @route GET /api/object
 * @description Récupère tous les objets
 * @access Protégé
 * @example
 * // Requête
 * GET /api/objects
 * @example
 * // Réponse
 * 200 OK
 * [
 *   {
 *     "_id": "123456",
 *     "name": "Test Object",
 *     "description": "Ceci est un objet de test",
 *     "userId": "646c5b4b7a0a1e2345678abc",
 *     "createdAt": "2024-12-27T00:00:00.000Z",
 *     "updatedAt": "2024-12-27T00:00:00.000Z"
 *   }
 * ]
 */
router.get('/', authMiddleware, objectController.getAllObjects);

/**
 * @route PUT /api/object/:id
 * @description Met à jour un objet par son ID
 * @access Protégé
 * @example
 * // Requête
 * PUT /api/objects/123456
 * {
 *   "name": "Nouveau nom",
 *   "description": "Nouvelle description"
 * }
 * @example
 * // Réponse
 * 200 OK
 * {
 *   "_id": "123456",
 *   "name": "Nouveau nom",
 *   "description": "Nouvelle description",
 *   "userId": "646c5b4b7a0a1e2345678abc",
 *   "createdAt": "2024-12-27T00:00:00.000Z",
 *   "updatedAt": "2024-12-27T01:00:00.000Z"
 * }
 */
router.put('/:id', authMiddleware, validateObject, checkRights, objectController.updateObject);

/**
 * @route DELETE /api/object/:id
 * @description Supprime un objet par son ID
 * @access Protégé
 * @example
 * // Requête
 * DELETE /api/objects/123456
 * @example
 * // Réponse
 * 200 OK
 * {
 *   "message": "Objet supprimé avec succès."
 * }
 */
router.delete('/:id', authMiddleware, checkRights, objectController.deleteObject);

module.exports = router;
