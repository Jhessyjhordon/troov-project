const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Route d'inscription
router.post('/register', async (req, res) => {
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
});

module.exports = router;
