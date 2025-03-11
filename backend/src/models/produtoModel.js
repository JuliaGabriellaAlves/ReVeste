const db = require('../config/db');

const Produto = {
  listar: (callback) => {
    db.query('SELECT * FROM produtos', callback);
  },
  criar: (produto, callback) => {
    const { nome, descricao, preco } = produto;
    db.query(
      'INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)',
      [nome, descricao, preco],
      callback
    );
  },
  obter: (id, callback) => {
    db.query('SELECT * FROM produtos WHERE id = ?', [id], callback);
  },
  atualizar: (id, produto, callback) => {
    const { nome, descricao, preco } = produto;
    db.query(
      'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?',
      [nome, descricao, preco, id],
      callback
    );
  },
  deletar: (id, callback) => {
    db.query('DELETE FROM produtos WHERE id = ?', [id], callback);
  }
};

module.exports = Produto;