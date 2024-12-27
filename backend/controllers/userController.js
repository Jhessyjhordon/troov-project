const UserModel = require('../models/user');

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

        const updatedUser = await user.save();
        res.status(200).json({ message: 'Utilisateur mis à jour.', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    }
};

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