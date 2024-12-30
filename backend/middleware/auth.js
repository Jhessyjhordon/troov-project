const jwt = require('jsonwebtoken');

// Middleware d'authentification basé sur les cookies
const authMiddleware = (req, res, next) => {
    // Récupérer le token depuis les cookies ou l'en-tête Authorization
    const token = req.cookies.authToken || req.headers.authorization?.split(' ')[1];

    //console.log(token);
    

    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé, token manquant.' });
    }

    try {
        //console.log(process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifie et décode le token
        req.userId = decoded.userId; // Ajoute les données décodées au request object
        next(); // Passe au middleware suivant ou au contrôleur
    } catch (error) {
        // console.error('Erreur lors de la vérification du token :', error);
        return res.status(403).json({ message: 'Token invalide ou expiré ----> ici.', error: error.message });
    }
};

module.exports = authMiddleware;
