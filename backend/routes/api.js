const express = require('express');
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

// Inclure les routes spécifiques
router.use('/users', registerRoute);
router.use('/users', loginRoute);
router.use('/users', userRoute);
router.use('/object', objectRoute);

module.exports = router;
