const mongoose = require('mongoose');

// Définition du schéma Objet
const objectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Référence au modèle Utilisateur
      required: true,
    },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  }
);

const Object = mongoose.model('Object', objectSchema);

module.exports = Object;
