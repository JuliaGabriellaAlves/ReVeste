const express = require('express');
const router = express.Router();

// Importe as rotas corretamente
const produtoRoutes = require('./produtoRoutes');
const usuarioRoutes = require('./usuarioRoutes');
const pedidoRoutes = require('./pedidoRoutes');
const categoriaRoutes = require('./categoriaRoutes');
const authRoutes = require('./authRoutes');

console.log('Rotas carregadas:');
console.log('Produtos:', produtoRoutes);
console.log('Usuários:', usuarioRoutes);
console.log('Pedidos:', pedidoRoutes);
console.log('Categorias:', categoriaRoutes);
console.log('Autenticação:', authRoutes);

// Use as rotas
router.use('/produtos', produtoRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/pedidos', pedidoRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/auth', authRoutes);

module.exports = router;