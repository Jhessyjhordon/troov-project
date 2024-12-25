const express = require('express');
const ObjectModel = require('../models/object');

const router = express.Router();

/**
 * Test route to verify API functionality.
 * @route GET /api/test
 * @returns {Object} 200 - A JSON object with a message.
 */
router.get('/test', (req, res) => {
    res.json({ message: 'API fonctionne bien !' });
});

/**
 * @route GET /objects/:userId
 * @description Récupérer tous les objets d'un utilisateur spécifique
 * @param {string} userId - L'identifiant de l'utilisateur dont on souhaite récupérer les objets
 * @returns {Array} 200 - Une liste d'objets liés à l'utilisateur
 * @returns {Object} 500 - Un message d'erreur si la récupération échoue
 */
router.get('/objects/:userId', async (req, res) => {
    try {
        const objects = await ObjectModel.find({ userId: req.params.userId });
        res.status(200).json(objects);
    } catch (error) {
        console.error('Erreur lors de la récupération des objets :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des objets.' });
    }
});

module.exports = router;
