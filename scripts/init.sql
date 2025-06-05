-- criação da tabela de  usuário
CREATE TABLE IF NOT EXISTS usuario ( --user
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(200),
  senha VARCHAR(200)
);

-- ciaração da tabela de categorias
CREATE TABLE IF NOT EXISTS categoria ( --category
  id SERIAL PRIMARY KEY,
  titulo_categoria VARCHAR(100) NOT NULL,
  descricao TEXT
);

-- criação da tabela de atividades
CREATE TABLE IF NOT EXISTS atividades ( --task
  id SERIAL PRIMARY KEY,
  título VARCHAR(50) NOT NULL,
  descricao TEXT,
  prazo TIMESTAMP,
  prioridade INTEGER,
  concluido BOOLEAN,
  criado_em TIMESTAMP,
  id_usuario INT,
  id_categoria INT,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id),
  FOREIGN KEY (id_categoria) REFERENCES categoria(id)
);
