const express = require('express');
const { registerCOntroller, loginController } = require('../controllers/authController');

const router = express.Router();

// routes
router.post('/register', registerCOntroller);
router.post('/login', loginController);




module.exports = router;