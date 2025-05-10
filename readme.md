# Boilerplate MVC em Node.js com PostgreSQL

Este projeto é um boilerplate básico para uma aplicação Node.js seguindo o padrão MVC (Model-View-Controller), utilizando PostgreSQL como banco de dados.

# Descrição do projeto
 O SmartTasks é um sistema web desenvolvido para gerenciar atividades com o intuito de que esse processo seja feito de forma prática e organizada. Após o login, o usuário é direcionado para a tela principal e poderá ver sua lista completa de afazeres bem como adicionar novas atividades, edita-las ou remove-las. Ao criar atividades é possível adicionar informações detalhadas, incluindo título, descrição e data de conclusão esperada.

As atividades podem ser categorizadas por diferentes áreas como: vida pessoal,  acadêmica e saúde  facilitando a organização e visualização. 

## Estrutura de Pastas (MVC)
```
projeto-eventos/
│
├── config/ # Configuração do banco de dados
│ └── database.js
├── controllers/ # Lógica de controle de dados
│ └── eventoController.js
├── models/ # Modelos do banco (query builders)
│ └── Evento.js
├── routes/ # Rotas da aplicação
│ └── index.js
├── views/ # Páginas renderizadas com EJS
│ └── pages/
│ ├── home.ejs
│ └── eventos.ejs
├── public/ # Arquivos estáticos (CSS, JS, imagens)
│ ├── css/
│ │ └── style.css
│ └── js/
│ └── script.js
├── .env.example # Variáveis de ambiente de exemplo
├── .gitignore
├── package.json
├── server.js # Ponto de entrada da aplicação
└── README.md
```

---

## Para executar o projeto localmente

### 1. Escolha uma IDE (ex.:VS Code)

### 2. Clone o repositório para a sua máquina

```bash
git clone https://github.com/deborangueira/M2-Projeto_Pessoal
cd M2-Projeto_Pessoal
```

### 3. No terminal, instale as dependências:
```bash
npm init -y
npm install 
npm install express
```

### 4. Ainda no terminal, inicie o servidor com:
```bash
npm start ou node server.js
```





