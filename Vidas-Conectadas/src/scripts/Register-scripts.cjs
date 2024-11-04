const express = require('express');

const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./historico.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado ao banco de dados SQLite.');
});

// Criar a tabela, se não existir
db.run(`CREATE TABLE IF NOT EXISTS historico (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT NOT NULL,
    local TEXT NOT NULL
)`);

// Rota para adicionar um histórico
app.post('/historico', (req, res) => {
    const { data, local } = req.body;
    db.run(`INSERT INTO historico (data, local) VALUES (?, ?)`, [data, local], function (err) {
        if (err) {
            return res.status(400).send(err.message);
        }
        res.status(201).json({ id: this.lastID, data, local });
    });
});

// Rota para obter o histórico com paginação
app.get('/historico', (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    db.all(`SELECT * FROM historico LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        db.all(`SELECT COUNT(*) AS count FROM historico`, (err, countRow) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            const count = countRow[0].count;
            res.json({
                historicos: rows,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
            });
        });
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});