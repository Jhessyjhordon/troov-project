const jwt = require('jsonwebtoken');

// Middleware d'authentification basé sur les cookies
const authMiddleware = (req, res, next) => {
    const token = req.cookies.authToken; // Récupérer le token depuis les cookies

    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé, token manquant.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifie et décode le token
        req.userId = decoded.userId; // Ajoute les données décodées au request object
        next(); // Passe au middleware suivant ou au contrôleur
    } catch (error) {
        return res.status(403).json({ message: 'Token invalide ou expiré.', error: error.message });
    }
};

module.exports = authMiddleware;
