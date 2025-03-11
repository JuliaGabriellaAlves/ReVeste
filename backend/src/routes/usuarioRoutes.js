const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rotas de usuário
router.post('/registrar', usuarioController.criarUsuario);
router.post('/login', usuarioController.loginUsuario);
router.get('/', usuarioController.listarUsuarios);
router.get('/:id', usuarioController.obterUsuarioPorId);
router.put('/:id', usuarioController.atualizarUsuario);
router.delete('/:id', usuarioController.deletarUsuario);

module.exports = router;