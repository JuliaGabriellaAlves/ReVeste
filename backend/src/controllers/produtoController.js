const db = require('../config/db');

const listarProdutos = (req, res) => {
  db.query('SELECT * FROM produtos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

const criarProduto = (req, res) => {
  const { nome, descricao, preco } = req.body;
  db.query(
    'INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)',
    [nome, descricao, preco],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId, nome, descricao, preco });
    }
  );
};

const obterProduto = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM produtos WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(results[0]);
  });
};

const atualizarProduto = (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco } = req.body;
  db.query(
    'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?',
    [nome, descricao, preco, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json({ id, nome, descricao, preco });
    }
  );
};

const deletarProduto = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM produtos WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(204).send();
  });
};

module.exports = {
  listarProdutos,
  criarProduto,
  obterProduto,
  atualizarProduto,
  deletarProduto
};