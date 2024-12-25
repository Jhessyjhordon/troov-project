const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Définition du schéma Utilisateur
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v) => /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
        message: (props) => `${props.value} n'est pas une adresse email valide.`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  }
);

// Middleware pour hasher le mot de passe avant sauvegarde
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Méthode pour vérifier le mot de passe
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
