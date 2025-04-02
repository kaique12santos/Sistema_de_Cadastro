
# 🛒 Sistema de Gerenciamento de Produtos e Clientes

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.17+-blue.svg)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-v3-orange.svg)](https://www.sqlite.org/)

## 📋 Índice
- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Instalação e Execução](#-instalação-e-execução)
- [API Endpoints](#-api-endpoints)
- [Sistema de Validação](#-sistema-de-validação)
- [Desafios e Soluções](#-desafios-e-soluções)
- [Contribuição](#-contribuição)
- [Referências](#-referências)
- [Licença](#-licença)
- [Autor](#-autor)

## 🚀 Sobre o Projeto

Este sistema completo de gerenciamento de produtos e clientes foi desenvolvido com Node.js, Express e EJS, implementando o padrão MVC (Model-View-Controller). O projeto oferece uma solução robusta para operações CRUD (Create, Read, Update, Delete) tanto para produtos quanto para clientes, com persistência de dados em SQLite.

![Screenshot do Projeto]<a href="https://ibb.co/nqtG3HjP"><img src="https://i.ibb.co/Y4wCDzh0/Captura-de-Tela-do-projeto.png" alt="Captura-de-Tela-do-projeto" border="0"></a>

## Demo do Sistema Online para Teste 

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://sistema-de-cadastro-g6hf.onrender.com/)

## 💻 Tecnologias Utilizadas

- **Backend**:
  - Node.js
  - Express.js
  - SQLite3
  - express-validator

- **Frontend**:
  - EJS (Templates)
  - CSS (Estilização)
  - JavaScript (Validação client-side)

- **Ferramentas**:
  - Nodemon (Desenvolvimento)
  - Postman (Testes de API)

## ✨ Funcionalidades

### Gerenciamento de Produtos
- Listar todos os produtos com opções de filtro e ordenação
- Visualizar detalhes de um produto específico
- Adicionar novos produtos ao catálogo
- Atualizar informações de produtos existentes
- Remover produtos do sistema
- Controle de estoque

### Gerenciamento de Clientes
- Cadastro de novos clientes
- Autenticação de usuários
- Visualização de perfis de clientes
- Atualização de dados cadastrais
- Exclusão de contas

## 🏗️ Arquitetura

O projeto segue o padrão arquitetural MVC (Model-View-Controller), organizando o código de forma clara e modular:

### 📁 Estrutura de Diretórios

```
sistema-gerenciamento/
├── config/
│   ├── bancoSQlite.js           # Configuração do banco de dados
│   └── db.js
├── controllers/
│   ├── clienteController.js # Controlador de clientes
│   └── produtosController.js  # Controlador de produtos
├── models/
│   ├── Cliente.js           # Modelo de clientes
│   └── Produtos.js            # Modelo de produtos
├── public/
│   ├── css/                  # Estilos
│   ├── js/                   # Scripts client-side
│       └── main.js
├── routes/
│   ├── index.js                # Rotas da API
│   ├── clientes.js          # Rotas de clientes
│   └── produtos.js           # Rotas de produtos
├── views/
│   ├── layouts/              # Templates base
│   ├── clientes/            # Views de clientes
│   └── produtos/             # Views de produtos
├── utils/                    # Funções utilitárias
├── server.js                    # Ponto de entrada da aplicação
├── package.json              # Dependências
└── README.md                 # Este arquivo
```

### 🔄 Fluxo MVC

1. **Models (Modelos)**:
   - Definem a estrutura dos dados
   - Encapsulam a lógica de negócio
   - Interagem com o banco de dados

2. **Views (Visões)**:
   - Apresentam os dados ao usuário
   - Implementadas em EJS
   - Responsive 

3. **Controllers (Controladores)**:
   - Processam as requisições HTTP
   - Coordenam a interação entre Models e Views
   - Implementam a lógica de aplicação

### 🔄 Implementações MVC

O projeto demonstra duas abordagens de implementação MVC:

1. **MVC Tradicional**: Renderização de views no servidor
2. **MVC com API REST**: Comunicação via JSON para integração com frontends modernos

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js (v16 ou superior)
- npm ou yarn

### Passos para Instalação

```bash
# Clone o repositório
git clone https://github.com/kaique12santos/Sistema_de_Cadastro.git

# Entre na pasta do projeto
cd sistema-gerenciamento

# Instale as dependências
npm install
# ou
yarn install

# Configure o ambiente (opcional)
cp .env.example .env
# Edite o arquivo .env conforme necessário

# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

O aplicativo estará disponível em `http://127.0.0.1:3000/`

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor com Nodemon (recarrega ao salvar alterações)
- `npm start`: Inicia o servidor em modo produção
- `npm test`: Executa os testes automatizados

## 📡 API Endpoints

### Produtos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/produtos` | Lista todos os produtos |
| GET | `produtos/:id` | Obtém um produto específico |
| POST | `/produtos/novo` | Cria um novo produto |
| PUT | `/produtos/:id/editar` | Atualiza um produto |
| DELETE | `/products/:id/deletar` | Remove um produto |

### Clientes

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/clientes` | Lista todos os clientes |
| GET | `/clientes/:id` | Obtém um cliente específico |
| POST | `/clientes/novo` | Cria um novo cliente |
| PUT | `/clientes/:id/editar` | Atualiza um cliente |
| DELETE | `/clientes/:id/deletar` | Remove um cliente |

[Documentação completa da API no Postman](https://documenter.getpostman.com/view/43581186/2sB2cSgiMe)

## 🗃️ Esquema do Banco de Dados

### Tabela: produtos

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT | Chave primária |
| name | TEXT | Nome do produto |
| price | REAL | Preço do produto |
| stock | INTEGER | Quantidade em estoque |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data da última atualização |

### Tabela: clientes

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT | Chave primária |
| name | TEXT | Nome do cliente |
| email | TEXT | Email do cliente (único) |
| password | TEXT | Senha criptografada |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data da última atualização |

## 🛡️ Sistema de Validação

A validação acontece em múltiplas camadas:

### Validação Frontend
- Validação de formulários em tempo real
- Feedback visual imediato ao usuário
- Prevenção de submissão de dados inválidos

### Validação Backend
- **express-validator**: Middleware para validação de requisições
  ```javascript
  // Exemplo de validação
  [
    body('name').notEmpty().withMessage('Nome é obrigatório'),
    body('price').isNumeric().withMessage('Preço deve ser um número')
  ]
  ```
- Validações de regras de negócio
- Tratamento de erros centralizado


## 🧩 Desafios e Soluções

### 1. Persistência de Dados
**Desafio**: Armazenamento em memória causava perda de dados.

**Solução**: Implementação de banco de dados SQLite com a biblioteca `sqlite3`, garantindo persistência mesmo após reinicializações.

### 2. Organização de Rotas
**Desafio**: Crescimento do projeto tornava a gestão de rotas confusa.

**Solução**: Estrutura modular de rotas separadas por domínio e uso eficiente do sistema de roteamento do Express.

### 3. Validação Consistente
**Desafio**: Manter consistência entre validações client-side e server-side.

**Solução**: Implementação de `express-validator` no backend e scripts JavaScript no frontend, seguindo as mesmas regras.

### 4. Performance em Listas Grandes
**Desafio**: Lentidão ao carregar listas com muitos itens.

**Solução**: Implementação de paginação e filtros para otimizar o carregamento de dados.


### Guia de Estilo de Código
- Use 2 espaços para indentação
- Siga as convenções do ESLint configurado no projeto
- Escreva testes para novas funcionalidades

## 📚 Referências

### Documentação Oficial
- [Node.js](https://nodejs.org/docs/latest/api/)
- [Express](https://expressjs.com/en/4x/api.html)
- [EJS](https://ejs.co/#docs)
- [SQLite](https://www.sqlite.org/docs.html)
- [express-validator](https://express-validator.github.io/docs/)

### Tutoriais e Artigos
- MDN Web Docs: [Express Web Framework](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)
- FreeCodeCamp: [Build a Node.js API with Express](https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/)
- Digital Ocean: [MVC Application in Node.js](https://www.digitalocean.com/community/tutorials/nodejs-mvc-application)

### Livros
- "Node.js Design Patterns" por Mario Casciaro e Luciano Mammino
- "Express in Action" por Evan Hahn
- "Learning Node.js Development" por Andrew Mead

## 📜 Licença

Este projeto está licenciado sob a [licença MIT](LICENSE) - veja o arquivo LICENSE para detalhes.

## 👨‍💻 Autores

**Kaique Caitano dos Santos**

* GitHub: [@kaique12santos](https://github.com/kaique12santos)
* LinkedIn: [Kaique Caitano](https://www.linkedin.com/in/kaique-caitano-b68b902ba/)

**Luiz Carlos Gimenes Fernandes de Sousa**

---

*Este projeto foi desenvolvido como parte de um trabalho acadêmico.*

*Última atualização: Abril de 2025*