const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const produtoRoutes = require('./routes/produtoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
const PORT = process.env.PORT || 5002;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas básicas
app.use('/api/produtos', produtoRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});