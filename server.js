require('dotenv').config(); // importando o módulo dotenv chamando a função config para carregar as variáveis de ambiente do arquivo .env
const express = require('express');
const session = require('express-session');
const app = express();
const db = require('./config/db'); // chama a minha database
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuração de sessão
app.use(session({
  secret: 'oooooo-debora',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // em produção, definir como true com HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  }
}));

db.connect()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');

    app.use(express.json());

    const frontendRoutes = require('./routes/frontRoutes');
    app.use('/', frontendRoutes);

    const userRoutes = require('./routes/userRoutes');
    app.use('/users', userRoutes);

    const taskRoutes = require('./routes/taskRoutes');
    app.use('/task', taskRoutes);

    app.use((req, res, next) => {
      res.status(404).send('Página não encontrada');
    });

    app.use((err, req, res, next) => {
      console.error('Erro no servidor:', err.stack);
      if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
        res.status(500).send('Erro de conexão com o banco de dados');
      } else {
        res.status(500).send('Erro interno do servidor');
      }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
    console.log('Verifique se o PostgreSQL está executando e as configurações estão corretas.');
  });

process.on('uncaughtException', (err) => {
  console.error('Erro não capturado:', err);
  if (err.code === 'ECONNRESET' || err.message.includes('Connection terminated')) {
    console.log('Erro de conexão com o banco detectado. Servidor continua rodando...');
  } else {
    console.log('Erro crítico detectado. Encerrando aplicação...');
    process.exit(1);
  }
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Promise rejeitada não tratada:', reason);
  if (reason && (reason.code === 'ECONNRESET' || reason.message?.includes('Connection terminated'))) {
    console.log('Erro de conexão com o banco detectado em promise. Servidor continua rodando...');
  }
});

process.on('SIGTERM', () => {
  console.log('SIGTERM recebido. Encerrando aplicação graciosamente...');
  const { pool } = require('./config/db');
  pool.end(() => {
    console.log('Pool de conexões encerrado.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT recebido. Encerrando aplicação graciosamente...');
  const { pool } = require('./config/db');
  pool.end(() => {
    console.log('Pool de conexões encerrado.');
    process.exit(0);
  });
});

//Semana 5
const bodyParser = require('body-parser');
const cors = require('cors');

// Middlewares
app.use(cors());
app.use(bodyParser.json()); // LÊ JSON
app.use(express.urlencoded({ extended: true })); // LÊ FORMS
app.use(express.static("./public/"));