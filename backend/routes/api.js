const express = require('express');
const ObjectModel = require('../models/object');
const registerRoute = require('./register'); 
const loginRoute = require('./login'); 
const userRoute = require('./user'); 
const objectRoute = require('./object'); 

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
 * @route GET /api/objects/:userId
 * @description Récupérer tous les objets d'un utilisateur spécifique.
 * @param {string} userId - L'identifiant de l'utilisateur dont on souhaite récupérer les objets.
 * @returns {Array<Object>} 200 - Une liste d'objets liés à l'utilisateur.
 * @returns {Object} 500 - Un message d'erreur si la récupération échoue.
 * @example
 * // Requête
 * GET /api/objects/123456
 * // Réponse
 * 200 OK
 * [
 *   {
 *     "_id": "1",
 *     "name": "Objet 1",
 *     "description": "Description 1",
 *     "userId": "123456",
 *     "createdAt": "2024-12-27T00:00:00.000Z",
 *     "updatedAt": "2024-12-27T00:00:00.000Z"
 *   },
 *   {
 *     "_id": "2",
 *     "name": "Objet 2",
 *     "description": "Description 2",
 *     "userId": "123456",
 *     "createdAt": "2024-12-27T00:00:00.000Z",
 *     "updatedAt": "2024-12-27T00:00:00.000Z"
 *   }
 * ]
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

// Inclure les routes spécifiques
router.use('/users', registerRoute);
router.use('/users', loginRoute);
router.use('/users', userRoute);
router.use('/object', objectRoute);

module.exports = router;
