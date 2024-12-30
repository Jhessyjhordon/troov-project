exports.logoutController = (req, res) => {
    res.clearCookie('authToken'); // Supprime le cookie contenant le token
    res.status(200).json({ message: 'Déconnexion réussie.' });
};