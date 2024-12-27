const express = require('express');
const validateUser = require('../middleware/validateUser');
const { registerController } = require('../controllers/registerController');

const router = express.Router();

// Route d'inscription
router.post('/register', validateUser, registerController);

module.exports = router;
