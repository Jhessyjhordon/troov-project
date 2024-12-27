const express = require('express');
const ObjectModel = require('../models/object');
const verifyToken = require('../middleware/auth');
const checkRights = require('../middleware/checkRights');

const router = express.Router();

// Route pour créer un objet
router.post('/', async (req, res) => {
  try {
    const { name, description, userId } = req.body;

    // Validation simple
    if (!name || !description || !userId) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const newObject = new ObjectModel({ name, description, userId });
    const savedObject = await newObject.save();

    res.status(201).json({ message: 'Objet créé avec succès.', object: savedObject });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'objet.', error: error.message });
  }
});

// Récupérer un object par son ID
router.get('/:id', verifyToken, checkRights, async (req, res) => {
  try {
    const { id } = req.params;

    // Rechercher l'objet en question dans la base de données
    const object = await ObjectModel.findById(id);

    if (!object) {
      return res.status(404).json({ message: 'Objet non trouvé.' });
    }

    res.status(200).json(object);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'objet.', error: error.message });
  }
});

// Récupérer tous les objects
router.get('/', verifyToken, async (req, res) => {
  try {
    // Rechercher tous les objets dans la base de données
    const objects = await ObjectModel.find(); // Récupère tout 

    if (!objects) {
      return res.status(404).json({ message: 'Objets non trouvé.' });
    }

    res.status(200).json(objects);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'objet.', error: error.message });
  }
});

// Mise à jour d’un objet
router.put('/:id', verifyToken, checkRights, async (req, res) => {
  try {
    const updatedObject = await ObjectModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Renvoie l'objet mis à jour
    );

    if (!updatedObject) {
      return res.status(404).json({ message: 'Objet non trouvé.' });
    }

    res.status(200).json(updatedObject);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'objet :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'objet.' });
  }
});

// Suppression d’un objet
router.delete('/:id', verifyToken, checkRights, async (req, res) => {
  try {
      const deletedObject = await ObjectModel.findByIdAndDelete(req.params.id);

      if (!deletedObject) {
          return res.status(404).json({ message: 'Objet non trouvé.' });
      }

      res.status(200).json({ message: 'Objet supprimé avec succès.' });
  } catch (error) {
      console.error('Erreur lors de la suppression de l\'objet :', error);
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'objet.' });
  }
});

module.exports = router;
