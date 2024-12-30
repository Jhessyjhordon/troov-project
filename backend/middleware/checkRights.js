const ObjectModel = require('../models/object');

const checkRights = async (req, res, next) => {
  try {
    const objectId = req.params.id;
    const userId = req.userId; // On utilise req.userId défini dans le middleware d'authentification    

    const object = await ObjectModel.findById(objectId);

    if (!object) {
      return res.status(404).json({ message: 'Objet non trouvé.' });
    }

    if (object.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Accès interdit. Vous ne pouvez pas modifier cet objet.' });
    }

    next(); // L'utilisateur a les droits, on passe au contrôleur suivant.
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

module.exports = checkRights;
