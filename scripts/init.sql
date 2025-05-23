-- criação da tabela de  usuário
CREATE TABLE IF NOT EXISTS usuario (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(200),
  senha VARCHAR(200)
);

-- ciaração da tabela de categorias
CREATE TABLE IF NOT EXISTS categorias (
  id SERIAL PRIMARY KEY,
  título_categoria VARCHAR(100) NOT NULL,
  descrissão TEXT
);

-- ciaração da tabela de categorias
CREATE TABLE IF NOT EXISTS projetos (
  id SERIAL PRIMARY KEY,
  título_projeto VARCHAR(100) NOT NULL,
  descrissão TEXT
);

-- criação da tabela de atividades
CREATE TABLE IF NOT EXISTS subAtividades (
  id SERIAL PRIMARY KEY,
  título VARCHAR(50) NOT NULL,
  descrissão TEXT,
  prazo TIMESTAMP,
  prioridade INTEGER,
  concluido BOOLEAN,
  criado_em TIMESTAMP
);

-- criação da tabela de atividades
CREATE TABLE IF NOT EXISTS atividades (
  id SERIAL PRIMARY KEY,
  título VARCHAR(50) NOT NULL,
  descrissão TEXT,
  prazo TIMESTAMP,
  prioridade INTEGER,
  concluido BOOLEAN,
  criado_em TIMESTAMP,
  id_usuario INT,
  id_categoria INT,
  id_projeto INT,
  id_subAtividade INT,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id),
  FOREIGN KEY (id_categoria) REFERENCES categorias(id),
  FOREIGN KEY (id_projeto) REFERENCES projetos(id),
  FOREIGN KEY (id_subAtividade) REFERENCES subAtividades(id)
);