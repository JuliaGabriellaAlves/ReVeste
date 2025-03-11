const express = require('express');
const router = express.Router();
const authController = require('../controllers/usuarioController');

router.post('/login', authController.loginUsuario);

module.exports = router;