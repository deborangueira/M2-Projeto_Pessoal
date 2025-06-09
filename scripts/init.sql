-- criação da tabela de  usuário
CREATE TABLE IF NOT EXISTS usuario ( --user
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(200),
  senha VARCHAR(200)
);

-- criação da tabela de atividades
CREATE TABLE IF NOT EXISTS atividades ( --task
  id SERIAL PRIMARY KEY,
  título VARCHAR(50) NOT NULL,
  descricao TEXT,
  prazo TIMESTAMP,
  prioridade VARCHAR(30),
  concluido VARCHAR(30),
  criado_em TIMESTAMP,
  id_usuario INT,
  id_categoria INT,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id),
);
