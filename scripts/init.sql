-- criação da tabela de  usuário
CREATE TABLE IF NOT EXISTS usuário (
  user_id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(200),
  senha VARCHAR(200)
);

-- criação da tabela de atividades
CREATE TABLE IF NOT EXISTS atividades (
  task_id SERIAL PRIMARY KEY,
  usuario VARCHAR(50),
  categoria VARCHAR(50),
  título VARCHAR(50),
  descrissão TEXT,
  prazo TIMESTAMP,
  prioridade INTEGER,
  concluido BOOLEAN,
  criado_em TIMESTAMP
);

-- ciaração da tabela de categorias
CREATE TABLE IF NOT EXISTS categorias (
  category_id SERIAL PRIMARY KEY,
  título_categoria VARCHAR(100),
  descrissão TEXT
);