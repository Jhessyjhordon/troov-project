const ObjectModel = require('../models/object');

exports.createObject = async (req, res) => {
  try {
    const { name, description, userId } = req.body;

    const newObject = new ObjectModel({ name, description, userId });
    const savedObject = await newObject.save();

    res.status(201).json({ message: 'Objet créé avec succès.', object: savedObject });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'objet.', error: error.message });
  }
};

exports.getObjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const object = await ObjectModel.findById(id);

    if (!object) {
      return res.status(404).json({ message: 'Objet non trouvé.' });
    }

    res.status(200).json(object);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'objet.', error: error.message });
  }
};

exports.getAllObjects = async (req, res) => {
  try {
    const objects = await ObjectModel.find();

    if (!objects.length) {
      return res.status(404).json({ message: 'Aucun objet trouvé.' });
    }

    res.status(200).json(objects);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des objets.', error: error.message });
  }
};

exports.updateObject = async (req, res) => {
  try {
    const updatedObject = await ObjectModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedObject) {
      return res.status(404).json({ message: 'Objet non trouvé.' });
    }

    res.status(200).json(updatedObject);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'objet.', error: error.message });
  }
};

exports.deleteObject = async (req, res) => {
  try {
    const deletedObject = await ObjectModel.findByIdAndDelete(req.params.id);

    if (!deletedObject) {
      return res.status(404).json({ message: 'Objet non trouvé.' });
    }

    res.status(200).json({ message: 'Objet supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'objet.', error: error.message });
  }
};
