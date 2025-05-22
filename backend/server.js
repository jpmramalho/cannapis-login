const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

// Importar rotas e modelos
const apiRoutes = require('./routes/api');
const db = require('./models');

// Inicializar Express
const app = express();

// Configurar middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota básica
app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API do Cannapis Login!' });
});

// Usar rotas da API
app.use('/api', apiRoutes);

// Sincronizar banco de dados
db.sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado.');
  })
  .catch((err) => {
    console.error('Falha ao sincronizar banco de dados:', err);
  });

// Definir porta
const PORT = process.env.PORT || 3001;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
