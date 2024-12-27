const User = require('../models/user');

/**
 * Inscription d'un nouvel utilisateur.
 * @async
 * @function
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @description Crée un nouvel utilisateur en hachant son mot de passe avant de le sauvegarder.
 * @returns {Object} 201 - Utilisateur créé avec succès.
 * @returns {Object} 400 - Erreur de validation ou email déjà utilisé.
 * @returns {Object} 500 - Erreur interne du serveur.
 * @example
 * // Entrée (JSON Body)
 * {
 *   "email": "test@example.com",
 *   "password": "Password123"
 * }
 * @example
 * // Sortie (201 Created)
 * {
 *   "message": "Utilisateur créé avec succès.",
 *   "userId": "646c5b4b7a0a1e2345678abc"
 * }
 */
exports.registerController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérification si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email déjà utilisé.' });
        }

        // Création de l'utilisateur
        const newUser = new User({ email, password });
        const savedUser = await newUser.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès.', userId: savedUser._id });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'inscription.', error: error.message });
    }
};
