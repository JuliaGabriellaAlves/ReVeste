// Importando dependências
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db'); // Caminho correto

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Rotas
app.get('/', (req, res) => {
    res.send('API do ReVeste está rodando!');
});

// Criar usuário
app.post('/users', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao criar usuário' });
        }
        res.status(201).json({ message: 'Usuário criado com sucesso', id: result.insertId });
    });
});

// Listar usuários
app.get('/users', (req, res) => {
    db.query('SELECT id, name, email FROM users', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao buscar usuários' });
        }
        res.json(results);
    });
});

// Criar produto
app.post('/products', (req, res) => {
    const { name, description, price, image_url, seller_id } = req.body;
    if (!name || !price || !seller_id) {
        return res.status(400).json({ message: 'Nome, preço e vendedor são obrigatórios' });
    }
    
    const sql = 'INSERT INTO products (name, description, price, image_url, seller_id) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, description, price, image_url, seller_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao criar produto' });
        }
        res.status(201).json({ message: 'Produto criado com sucesso', id: result.insertId });
    });
});

// Listar produtos
app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao buscar produtos' });
        }
        res.json(results);
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
