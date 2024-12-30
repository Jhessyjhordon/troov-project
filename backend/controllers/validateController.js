const jwt = require('jsonwebtoken');

exports.validateController = (req, res) => {
    const token = req.cookies.authToken; // Vérifie le cookie
    if (!token) {
        return res.status(401).json({ message: 'Non authentifié.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Valide le token
        return res.status(200).json({ userId: decoded.userId }); // Renvoie les infos nécessaires
    } catch (error) {
        return res.status(403).json({ message: 'Token invalide.', error: error.message });
    }
};