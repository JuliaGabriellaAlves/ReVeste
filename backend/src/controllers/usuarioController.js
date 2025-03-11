const db = require('../config/db');
const bcrypt = require('bcrypt');
const { gerarToken } = require('../utils/token');
const usuarioModel = require('../models/usuarioModel');

const criarUsuario = async (req, res) => {
  const { nome, email, senha, tipo, cep } = req.body;

  // Verifique se todos os campos obrigatórios foram fornecidos
  if (!nome || !email || !senha || !tipo || !cep) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  // Criptografe a senha
  const senhaHash = await bcrypt.hash(senha, 10);

  // Insira o usuário no banco de dados
  usuarioModel.criarUsuario({ nome, email, senha: senhaHash, tipo, cep }, (err, usuario) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(usuario);
  });
};

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const usuario = results[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = gerarToken(usuario);
    res.json({ token });
  });
};

const listarUsuarios = (req, res) => {
  usuarioModel.listarUsuarios((err, usuarios) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(usuarios);
  });
};

const obterUsuarioPorId = (req, res) => {
  const { id } = req.params;
  usuarioModel.obterUsuarioPorId(id, (err, usuario) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(usuario);
  });
};

const atualizarUsuario = (req, res) => {
  const { id } = req.params;
  const { nome, email, tipo, cep } = req.body;

  usuarioModel.atualizarUsuario(id, { nome, email, tipo, cep }, (err, success) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!success) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json({ message: 'Usuário atualizado com sucesso' });
  });
};

const deletarUsuario = (req, res) => {
  const { id } = req.params;
  usuarioModel.deletarUsuario(id, (err, success) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!success) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(204).send(); // Resposta sem conteúdo
  });
};

module.exports = {
  criarUsuario,
  loginUsuario,
  listarUsuarios,
  obterUsuarioPorId,
  atualizarUsuario,
  deletarUsuario
};