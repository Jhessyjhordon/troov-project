const ObjectModel = require('../models/object');

/**
 * Crée un nouvel objet dans la base de données.
 * @async
 * @function createObject
 * @param {Object} req - La requête HTTP.
 * @param {Object} req.body - Les données envoyées pour créer l'objet.
 * @param {string} req.body.name - Le nom de l'objet (requis).
 * @param {string} req.body.description - La description de l'objet (requis).
 * @param {string} req.body.userId - L'identifiant de l'utilisateur (requis).
 * @param {Object} res - La réponse HTTP.
 * @returns {Object} 201 - Objet créé avec succès.
 * @returns {Object} 400 - Requête invalide (champs manquants).
 * @returns {Object} 500 - Erreur interne du serveur.
 * @example
 * // Exemple de requête
 * POST /api/objects
 * {
 *   "name": "Test Object",
 *   "description": "Ceci est un objet de test",
 *   "userId": "123456"
 * }
 * @example
 * // Exemple de réponse
 * HTTP/1.1 201 Created
 * {
 *   "message": "Objet créé avec succès.",
 *   "object": {
 *     "_id": "123456",
 *     "name": "Test Object",
 *     "description": "Ceci est un objet de test",
 *     "userId": "123456",
 *     "createdAt": "2024-12-27T00:00:00.000Z",
 *     "updatedAt": "2024-12-27T00:00:00.000Z"
 *   }
 * }
 */
exports.createObject = async (req, res) => {
  try {
    const { name, description, userId } = req.body;

    const newObject = new ObjectModel({ name, description, userId });
    const savedObject = await newObject.save();

    res.status(201).json({ message: 'Objet créé avec succès.', object: savedObject });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'objet.', error: error.message });
  }
};

/**
 * Récupère un objet par son ID.
 * @async
 * @function getObjectById
 * @param {Object} req - La requête HTTP.
 * @param {string} req.params.id - L'ID de l'objet à récupérer.
 * @param {Object} res - La réponse HTTP.
 * @returns {Object} 200 - Objet récupéré avec succès.
 * @returns {Object} 404 - Objet non trouvé.
 * @returns {Object} 500 - Erreur interne du serveur.
 * @example
 * // Exemple de requête
 * GET /api/objects/123456
 * @example
 * // Exemple de réponse
 * HTTP/1.1 200 OK
 * {
 *   "_id": "123456",
 *   "name": "Test Object",
 *   "description": "Ceci est un objet de test",
 *   "userId": "123456",
 *   "createdAt": "2024-12-27T00:00:00.000Z",
 *   "updatedAt": "2024-12-27T00:00:00.000Z"
 * }
 */
exports.getObjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const object = await ObjectModel.findById(id);

    if (!object) {
      return res.status(404).json({ message: 'Objet non trouvé.' });
    }

    res.status(200).json(object);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'objet.', error: error.message });
  }
};

/**
 * Récupère tous les objets de la base de données spécifique à un utilisateur.
 * @async
 * @function getAllObjects
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {string} userId - L'identifiant de l'utilisateur dont on souhaite récupérer les objets.
 * @returns {Array<Object>} 200 - Liste d'objets liés à l'utilisateur.
 * @returns {Object} 404 - Aucun objet trouvé.
 * @returns {Object} 500 - Erreur interne du serveur.
 * @example
 * // Exemple de requête
 * GET /api/object
 * @example
 * // Exemple de réponse
 * HTTP/1.1 200 OK
 * [
 *   {
 *     "_id": "1",
 *     "name": "Test Object",
 *     "description": "Ceci est un objet de test",
 *     "userId": "612546",
 *     "createdAt": "2024-12-27T00:00:00.000Z",
 *     "updatedAt": "2024-12-27T00:00:00.000Z"
 *   },
 *   {
 *     "_id": "2",
 *     "name": "Test Object 2",
 *     "description": "Ceci est un objet de test 2",
 *     "userId": "612546",
 *     "createdAt": "2024-12-27T00:00:00.000Z",
 *     "updatedAt": "2024-12-27T00:00:00.000Z"
 *   }
 * ]
 */
exports.getAllObjects = async (req, res) => {
  try {
    const objects = await ObjectModel.find({ userId: req.userId });

    if (!objects.length) {
      return res.status(404).json({ message: 'Aucun objet trouvé.' });
    }

    res.status(200).json(objects);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des objets.', error: error.message });
  }
};

/**
 * Met à jour un objet par son ID.
 * @async
 * @function updateObject
 * @param {Object} req - La requête HTTP.
 * @param {string} req.params.id - L'ID de l'objet à mettre à jour.
 * @param {Object} req.body - Les nouvelles données pour l'objet.
 * @param {Object} res - La réponse HTTP.
 * @returns {Object} 200 - Objet mis à jour avec succès.
 * @returns {Object} 404 - Objet non trouvé.
 * @returns {Object} 400 - Données invalides envoyées pour la mise à jour.
 * @returns {Object} 500 - Erreur interne du serveur.
 * @example
 * // Exemple de requête
 * PUT /api/objects/123456
 * {
 *   "name": "Nouveau nom",
 *   "description": "Nouvelle description"
 * }
 * @example
 * // Exemple de réponse
 * HTTP/1.1 200 OK
 * {
 *   "_id": "123456",
 *   "name": "Nouveau nom",
 *   "description": "Nouvelle description",
 *   "userId": "123456",
 *   "createdAt": "2024-12-27T00:00:00.000Z",
 *   "updatedAt": "2024-12-27T01:00:00.000Z"
 * }
 */
exports.updateObject = async (req, res) => {
  try {
    const updatedObject = await ObjectModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedObject) {
      return res.status(404).json({ message: 'Objet non trouvé.' });
    }

    res.status(200).json(updatedObject);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'objet.', error: error.message });
  }
};

/**
 * Supprime un objet par son ID.
 * @async
 * @function deleteObject
 * @param {Object} req - La requête HTTP.
 * @param {string} req.params.id - L'ID de l'objet à supprimer.
 * @param {Object} res - La réponse HTTP.
 * @returns {Object} 200 - Message indiquant que l'objet a été supprimé avec succès.
 * @returns {Object} 404 - Objet non trouvé.
 * @returns {Object} 500 - Erreur interne du serveur.
 * @example
 * // Exemple de requête
 * DELETE /api/objects/123456
 * @example
 * // Exemple de réponse
 * HTTP/1.1 200 OK
 * {
 *   "message": "Objet supprimé avec succès."
 * }
 */
exports.deleteObject = async (req, res) => {
  try {
    const deletedObject = await ObjectModel.findByIdAndDelete(req.params.id);

    if (!deletedObject) {
      return res.status(404).json({ message: 'Objet non trouvé.' });
    }

    res.status(200).json({ message: 'Objet supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'objet.', error: error.message });
  }
};
