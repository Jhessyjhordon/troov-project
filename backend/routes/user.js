const express = require('express');
const {
    getUserById,
    updateUser,
    deleteUser,
  } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth'); // Middleware JWT
const checkUserRights = require('../middleware/checkUserRights');

const router = express.Router();

// Récupérer un utilisateur par son ID
router.get('/:id', authMiddleware, checkUserRights, getUserById);

// Modifier un utilisateur
router.put('/:id', authMiddleware, checkUserRights, updateUser);

// Supprimer un utilisateur
router.delete('/:id', authMiddleware, checkUserRights, deleteUser);



module.exports = router;
