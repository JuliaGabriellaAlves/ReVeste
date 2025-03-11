const jwt = require('jsonwebtoken');
require('dotenv').config();

const gerarToken = (usuario) => {
  return jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

const verificarToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { gerarToken, verificarToken };