const express = require('express');
const {
  createObject,
  getObjectById,
  getAllObjects,
  updateObject,
  deleteObject,
} = require('../controllers/objectController');
const verifyToken = require('../middleware/auth');
const checkRights = require('../middleware/checkRights');
const validateObject = require('../middleware/validateObject');

const router = express.Router();

// Routes pour les objets
router.post('/', validateObject, createObject);
router.get('/:id', verifyToken, checkRights, getObjectById);
router.get('/', verifyToken, getAllObjects);
router.put('/:id', validateObject, verifyToken, checkRights, updateObject);
router.delete('/:id', verifyToken, checkRights, deleteObject);

module.exports = router;
