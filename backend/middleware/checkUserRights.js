const UserModel = require('../models/user');

const checkUserRights = async (req, res, next) => {
    try {
        const userId = req.params.id; // ID de l'utilisateur cible
        const authUserId = req.userId; // ID de l'utilisateur authentifié (via le token)

        // Vérifier si l'utilisateur cible existe
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Vérifier si l'utilisateur authentifié a les droits d'accès
        if (userId !== authUserId) {
            return res.status(403).json({ message: 'Accès interdit. Vous ne pouvez pas accéder à cet utilisateur.' });
        }

        // Passer au contrôleur suivant
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur interne du serveur.', error: error.message });
    }
};

module.exports = checkUserRights;
