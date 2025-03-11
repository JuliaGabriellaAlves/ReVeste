const db = require('../config/db');

const criarUsuario = (usuario, callback) => {
  const { nome, email, senha, tipo, cep } = usuario;
  db.query(
    'INSERT INTO usuarios (nome, email, senha, tipo, cep) VALUES (?, ?, ?, ?, ?)',
    [nome, email, senha, tipo, cep],
    (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, { id: results.insertId, nome, email, tipo, cep });
    }
  );
};

const listarUsuarios = (callback) => {
  db.query('SELECT id, nome, email, tipo, cep FROM usuarios', (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

const obterUsuarioPorId = (id, callback) => {
  db.query('SELECT id, nome, email, tipo, cep FROM usuarios WHERE id = ?', [id], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.length === 0) {
      return callback(null, null); // Usuário não encontrado
    }
    callback(null, results[0]);
  });
};

const atualizarUsuario = (id, usuario, callback) => {
  const { nome, email, tipo, cep } = usuario;
  db.query(
    'UPDATE usuarios SET nome = ?, email = ?, tipo = ?, cep = ? WHERE id = ?',
    [nome, email, tipo, cep, id],
    (err, results) => {
      if (err) {
        return callback(err);
      }
      if (results.affectedRows === 0) {
        return callback(null, false); // Nenhum usuário foi atualizado
      }
      callback(null, true); // Usuário atualizado com sucesso
    }
  );
};

const deletarUsuario = (id, callback) => {
  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.affectedRows === 0) {
      return callback(null, false); // Nenhum usuário foi deletado
    }
    callback(null, true); // Usuário deletado com sucesso
  });
};

module.exports = {
  criarUsuario,
  listarUsuarios,
  obterUsuarioPorId,
  atualizarUsuario,
  deletarUsuario
};