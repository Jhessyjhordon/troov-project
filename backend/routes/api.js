const express = require('express');
const router = express.Router();

/**
 * Test route to verify API functionality.
 * @route GET /api/test
 * @returns {Object} 200 - A JSON object with a message.
 */
router.get('/test', (req, res) => {
    res.json({ message: 'API fonctionne bien !' });
});

module.exports = router;
