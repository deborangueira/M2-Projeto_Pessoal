# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução

Esse projeto tem como objetivo o desenvolvimento de uma **aplicação web para gerenciamento de atividades** para que os usuários tenham um maior controle de sua agenda, desde a organização ao acompanhamento do progresso dessas atividades diariamente, tendo como foco as ferramentas mais essenciais para tal. 

Para isso, a aplicação permite que os usuários criem uma conta, façam login e adicionem atividades com informações detalhadas, como título, descrição, e prazo de conclusão. Isto proporciona uma visão clara e estruturada das responsabilidades.que o usuário tem.

Por fim, é possível realizar a edição e exclusão de atividades, garantindo flexibilidade e controle para que os usuários mantenham seu planejamento sempre atualizado.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Persona

![Image](/assets/persona.png)

### 2.2. User Stories


US01 | **Como** universitário, **quero** adicionar informações essenciais das minhas atividades **para que** eu não perca de vista prazos e detalhes importantes sobre elas

US02 | **Como** estagiário no banco, **quero** editar minhas informações pessoais **para que** eu possa atualiza-las com facilidade caso sinta a necessidade

US03 | **Como** estudante, **quero** gerenciar minhas atividades com rapidez **para que** minha transição para o digital seja fluida e fácil.

## Análise INVEST da User Story US01

**User Story analisada:**  
US01 | **Como** universitário, **quero** adicionar informações essenciais das minhas atividades **para que** eu não perca de vista prazos e detalhes importantes sobre elas

- **I – Independente:** Pode ser desenvolvida e testada separadamente.

- **N – Negociável:** Todos os campos que contém os detalhes das atividades podem ser editados conforme a necessidade do usuário (ex.: mudar a tag de categoria e aumentar a descrição).

- **V – Valiosa:** Essa é a função mais básica e fundamental do sistema, sendo a base para o funcionamento de todas as outras funções (como criar projetos).

- **E – Estimável:** O esforço e tempo que precisam ser investidos no desenvolvimento dessa função são facilmente estimáveis.

- **S – Pequena:** Por consistir na determinação dos atributos da base de dados e em sua configuração, é uma funcionalidade viável de ser desenvolvida em pouco tempo.

- **T – Testável:** Sua validação é feita ao adicionar novas atividades na base de dados, podendo ser feita de forma rápida e simples.

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados

**1. Introdução**

A plataforma foi desenvolvida utilizando dois bancos de dados principais que armazenam as informações sobre os usuários e as atividades. 

**2. Diagrama Lógico do Banco de Dados**

![Diagrama Lógico do Banco de Dados](../assets/modelo-banco.png)

**3. Tabelas e Atributos**

**Usuário**
- `id`: Identificador único do usuário (PK)
- `nome`: Nome do usuário 
- `email`: email do usuário (único)
- `senha`: para autenticação do usuário

**Atividades**
- `id`: Identificador único (PK)
- `título`: nome da atividade
- `descricao`: detalhamento sobre a atividade
- `prazo`: data em que deve ser concluída
- `prioridade`: nível de importância em escala numérico
- `concluído`: Icheck-box que indica quando foi concluída
- `criado_em`: data de criação
- `usuario_id`: FK para usuarios
- `categoria_id`: FK para categoria` 



**4. Cardinalidade das Relações**
 
- **Usuário → Atividades**: Um usuário pode ter várias atividades **1:N**. 

**5. Modelo Físico – Schema do Banco de Dados**

Abaixo está todas as instruções SQL utilizadas para a criação do banco de dados:

📄 **Arquivo .SQL com o schema:**  
```
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
  prioridade INTEGER,
  concluido BOOLEAN,
  criado_em TIMESTAMP,
  id_usuario INT,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);



```

### ✅ Instruções básicas para execução:

1. Abra o seu SGBD (ex: MySQL Workbench, pgAdmin, DBeaver).
2. Crie um banco de dados novo.
3. Execute o conteúdo do arquivo `.sql` para criar todas as tabelas com as relações corretamente definidas.

---

### 3.1.1 BD e Models
Foi implementado 2 models (services) conforme a estrutura definida no banco de dados PostgreSQL.São eles:

1. **User Service**
   - Responsável pelo gerenciamento de usuários.
   - Atributos: id, name, email e senha.
   - Métodos principais:
     - `getAllUsers`: Busca todos os usuários
     - `getUserById`: busca usuário por ID
     - `createUser`: Cria novo usuário
     - `updateUser`: Atualiza dados do usuário
     - `deleteUser`: Remove usuário do sistema
     - `authenticateUser`: autenticação do usuário no site
     - `getUserByEmail`: identificar se o email está cadastrado no sistema

2. **Task Service**
   - Responsável pelo gerenciamento de atividades
   - Atributos: id, título, descrição, prazo, prioridade, concluido, criado_em, id_usuário.
   - Métodos principais:
     - `getAllTask`: Busca todas as atividades
     - `getTaskById`: busca atividade por ID
     - `createTask`: Cria nova atividade
     - `updateTask`: Atualiza dados da atividade
     - `deleteTask`: Remove atividade do sistema


### 3.2. Arquitetura

Para essa aplicação, a arquitetura MVC foi implementada da seguinte maneira:

![Arquitetura MVC do Banco de Dados](../assets/diagrama%20de%20arquitetura.png)

**Fluxo de dados**

 O **model** é responsável pela lógica de negócios e interação com o banco de dados via Supabase. Ao se comunicar com o servidor do banco de dados (PostgreeSQL), o model é capaz de realizar as operações solicitadas pelo controller. No que se refere ao **controller**, ele é a camada intermediária entre model e view, sendo responsável por receber as requisições HTTP, processa-las de acordo com as funções disponíveis e chamar o model correspondente para acessar os dados no banco. Com isso, é possível que haja atualizações tanto no model quanto nos controllers. Além disso, é essencial para configuração das rotas. Já a **view** estabelece a interface do usuário na aplicação e é responsável por enviar as requisições HTTP para o controller como por exemplo: "`GET/users`" e "`PUT/users/:id`"

### 3.3. Wireframes 

![Wireframe-tela login e inicial](../assets/Wireframe_1.jpg)
![Wireframe-tela configurações e projetos](../assets/Wireframe_2.jpg)


*[`Clique aqui`](https://drive.google.com/drive/folders/1j3kOzpE68LY-0CXom_HhnzpNouGrxQz3?usp=sharing)  para acessar as imagens no drive*

Para o wireframe, foi esboçado as telas e funcionalidades que compõem a base principal da aplicação junto com algumas anotações.

Nesse sentido, estão representadas (da esquerda para a direita e de cima para baixo) as telas de: (1) Log-in; (2) Cadastro; (3) Tela de atividades; (4) Tela de menu expandida; (5) Configuração-perfil; e, por fim, (5) Configuração-categorias. 

As telas de Log-in e cadastro são simples e contam com campos para serem preenchidos com as informações de login do usuário. Elas também possuem atalhos umas para as outras, encontrado na frase que se encontra abaixo dos botões.

A terceira tela contém uma lista de todas as atividades cadastradas pelo usuário e o detalhamento de cada uma, sendo elas: título, descrição, prazo, prioridade, status e categoria. Somado a isso, as opções de excluir e adicionar estão indicadas por ícones e, para editar, basta clicar no campo referente. A quarta tela por sua vez, conta com atalhos para outras telas e um resumo geral acerca do status das atividades. Ambas as telas se relacionam, portanto, com a primeira user story pois garantem uma visualização eficiente das informações e manipulação simples delas.

Por outro lado, enquanto a tela de configurações-perfil permite a edição de informações pessoais de Log-in, a de configurações-Categorias permite que sejam criadas e editadas tags que servem como organizadores das atividades, podendo ser definidas de forma individual pelo usuário. Por conta disso, esta tela em específico se relaciona com a segunda user story.

### 3.4. Guia de estilos

*Em breve, estarão aqui orientações gerais para sobre como utilizar os componentes do guia de estilos*


### 3.5. Protótipo de alta fidelidade

*Em breve estarão aqui algumas imagens demonstrativas do protótipo de alta fidelidade e o link para acesso ao protótipo completo.*

### 3.6. WebAPI e endpoints

 #### Usuario

| Método | Endpoint        | Descrição                  | Parâmetros / Corpo                                                                                                             |
| ------ | --------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| POST   | `/user`     | Criar um novo usuário      | Corpo JSON: `{ id, nome, email, senha }`                                                  |
| GET    | `/user`     | Listar todos os usuários   | -                                                                                                                              |
| GET    | `/user/:id` | Buscar usuário pelo ID     | Parâmetro URL: `id` (ID do usuário)                                                                                            |
| PUT    | `/user/:id` | Atualizar dados do usuário identificando-o pelo ID | Parâmetro URL: `id` <br> Corpo JSON: campos a atualizar, ex: `{ nome, email, senha }` |
| DELETE | `/user/:id` | Deletar usuário pelo ID    | Parâmetro URL: `id`                                                                                                            |

 #### Atividades

| Método | Endpoint        | Descrição                  | Parâmetros / Corpo                                                                                                             |
| ------ | --------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| POST   | `/task`     | Criar uma nova atividade      | Corpo JSON: `{ título, descricao, prazo, prioridade, concluido, criado_em, id_usuario }`                                                  |
| GET    | `/task`     | Listar todas as atividades   | -                                                                                                                              |
| GET    | `/task/:id` | Buscar atividade pelo ID     | Parâmetro URL: `id` (ID da atividade)                                                                                            |
| PUT    | `/task/:id` | Atualizar dados das atividades | Parâmetro URL: `id` <br> Corpo JSON: campos a atualizar, ex: `{ título, descricao, prazo, prioridade, concluido }` |
| DELETE | `/task/:id` | Deletar atividade pelo ID    | Parâmetro URL: `id`  


## <a name="c4"></a>4. Desenvolvimento da Aplicação Web

### 4.1 Demonstração do Sistema Web


### 4.2 Conclusões e Trabalhos Futuros




## <a name="c5"></a>5. Referências

**Express.js Documentation**  
_Express - Fast, unopinionated, minimalist web framework for Node.js_  
Disponível em: https://expressjs.com/  
Acesso em: 19 jun. 2025.

**PostgreSQL Documentation**  
_PostgreSQL: The World's Most Advanced Open Source Database_  
Disponível em: https://www.postgresql.org/docs/  
Acesso em: 19 jun. 2025.

**EJS Template Engine**  
_EJS -- Embedded JavaScript templating_  
Disponível em: https://ejs.co/  
Acesso em: 19 jun. 2025.

---
---
