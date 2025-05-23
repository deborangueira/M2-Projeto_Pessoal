require('dotenv').config(); // importando o módulo dotenv chamando a função config para carregar as variáveis de ambiente do arquivo .env
const express = require('express');
const app = express();
const db = require('./config/db'); // chama a minha database
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

db.connect() // Conexão com o banco de dados
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');

    app.use(express.json());

    const userRoutes = require('./routes/userRoutes');
    app.use('/users', userRoutes); 
/**
    const tarefasRoutes = require('./routes/tarefasRoutes');
    app.use('/tarefas', tarefasRoutes);
 */
    const frontendRoutes = require('./routes/frontRoutes');
    app.use('/', frontendRoutes);

    // Middleware para lidar com erros de rota não encontrada
    app.use((req, res, next) => {
      res.status(404).send('Página não encontrada');
    });

    // Middleware para lidar com erros internos do servidor
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Erro no servidor');
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

//Semana 5
const bodyParser = require('body-parser');
const cors = require('cors');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
