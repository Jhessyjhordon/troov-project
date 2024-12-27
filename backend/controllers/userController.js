const UserModel = require('../models/user');

/**
 * Récupérer les informations d'un utilisateur par son ID.
 * @async
 * @function
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @description Récupère les détails d'un utilisateur via son ID.
 * @returns {Object} 200 - Détails de l'utilisateur.
 * @returns {Object} 404 - Utilisateur non trouvé.
 * @returns {Object} 500 - Erreur interne du serveur.
 * @example
 * // URL
 * GET /api/users/646c5b4b7a0a1e2345678abc
 * @example
 * // Sortie (200 OK)
 * {
 *   "_id": "646c5b4b7a0a1e2345678abc",
 *   "email": "test@example.com",
 *   "createdAt": "2024-12-26T10:00:00.000Z",
 *   "updatedAt": "2024-12-26T10:00:00.000Z"
 * }
 */
exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        // Vérifier si l'utilisateur existe et récupère ces informations
        const user = await UserModel.findById(userId).select('-password'); // Récupère tout sauf le mot de passe
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    }
};

/**
 * Mise à jour d'un utilisateur par son ID.
 * @async
 * @function
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @description Met à jour les informations d'un utilisateur.
 * @returns {Object} 200 - Utilisateur mis à jour avec succès.
 * @returns {Object} 404 - Utilisateur non trouvé.
 * @returns {Object} 500 - Erreur interne du serveur.
 * @example
 * // URL
 * PUT /api/users/646c5b4b7a0a1e2345678abc
 * // Entrée (JSON Body)
 * {
 *   "email": "newemail@example.com"
 * }
 * @example
 * // Sortie (200 OK)
 * {
 *   "_id": "646c5b4b7a0a1e2345678abc",
 *   "email": "newemail@example.com",
 *   "createdAt": "2024-12-26T10:00:00.000Z",
 *   "updatedAt": "2024-12-26T10:10:00.000Z"
 * }
 */
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Vérifier si l'utilisateur existe
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Mettre à jour les informations
        const { email, password } = req.body;
        if (email) user.email = email;
        if (password) user.password = password; // Le hash sera fait automatiquement via le middleware Mongoose
        if (password) user.password = password;

        const updatedUser = await user.save();
        res.status(200).json({ message: 'Utilisateur mis à jour.', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    }
};

/**
 * Suppression d'un utilisateur par son ID.
 * @async
 * @function
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @description Supprime un utilisateur par son ID.
 * @returns {Object} 200 - Utilisateur supprimé avec succès.
 * @returns {Object} 404 - Utilisateur non trouvé.
 * @returns {Object} 500 - Erreur interne du serveur.
 * @example
 * // URL
 * DELETE /api/users/646c5b4b7a0a1e2345678abc
 * @example
 * // Sortie (200 OK)
 * {
 *   "message": "Utilisateur supprimé avec succès."
 * }
 */
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Supprimer l'utilisateur
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    }
};
