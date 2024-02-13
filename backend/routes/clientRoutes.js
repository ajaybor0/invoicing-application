const express = require('express');
const protect = require('../middleware/authMiddleware');

const { createClient, getClients } = require('../controllers/clientController');

const router = express.Router();

router.post('/', protect, createClient);
router.get('/', protect, getClients);

module.exports = router;
