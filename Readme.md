# Sistema de Gerenciamento de Produtos e Clientes

## Sobre o Projeto

Este projeto é um sistema de gerenciamento de produtos e clientes desenvolvido com Node.js, Express, e EJS. O sistema implementa um padrão MVC (Model-View-Controller) completo para gerenciar as operações CRUD (Create, Read, Update, Delete) para produtos e clientes.

## Como Rodar o Projeto

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/sistema-gerenciamento.git

# Entre na pasta do projeto
cd sistema-gerenciamento

# Instale as dependências
npm install

# Inicie o servidor
npm run dev
```

O aplicativo estará disponível em `http://127.0.0.1:3000/`

## Relatório de Desenvolvimento

### Arquitetura MVC

O projeto foi construído seguindo o padrão de arquitetura MVC (Model-View-Controller), que separa a aplicação em três componentes principais:

#### Models (Modelos)

Os modelos representam a estrutura de dados da aplicação. Neste projeto, temos dois modelos principais:

- **Product**: Gerencia os dados relacionados aos produtos (nome, preço, estoque).
- **Customer**: Gerencia os dados relacionados aos clientes (nome, email, senha).

Os modelos são responsáveis por:
- Definir a estrutura dos dados
- Validar os dados antes de persistir
- Interagir com o banco de dados (SQLite neste caso)

#### Views (Visões)

As visões são responsáveis pela interface do usuário. Utilizamos EJS (Embedded JavaScript) como engine de template. As principais visões incluem:

- **Layouts**: Template base que contém a estrutura comum a todas as páginas.
- **Produtos**: Views para listar, criar, editar e visualizar produtos.
- **Clientes**: Views para listar, criar, editar e visualizar clientes.

#### Controllers (Controladores)

Os controladores atuam como intermediários entre os modelos e as visões. Eles:
- Recebem requisições do usuário
- Processam os dados usando os modelos
- Enviam os dados processados para as visões

Os principais controladores são:
- **ProductController**: Gerencia as operações relacionadas aos produtos.
- **CustomerController**: Gerencia as operações relacionadas aos clientes.

### Múltiplas Implementações MVC

Este projeto demonstra diferentes abordagens de implementação do padrão MVC:

1. **MVC Clássico**: Utilizado na estrutura principal da aplicação, onde cada componente (modelo, visão, controlador) é claramente separado em arquivos e diretórios distintos.

2. **MVC com Renderização no Cliente**: Em algumas partes da aplicação, o servidor envia apenas os dados (geralmente em formato JSON) e o cliente (navegador) se encarrega de renderizar a interface usando JavaScript.

### Sistema de Validação

A validação de dados é implementada em múltiplos níveis:

#### Validação no Cliente (Frontend)

- **JavaScript**: Validação básica nos formulários para garantir que campos obrigatórios sejam preenchidos e que os dados estejam no formato correto.

#### Validação no Servidor (Backend)

- **express-validator**: Middleware utilizado para validar os dados recebidos nas requisições antes de processá-los:
  - Validação de presença (campos obrigatórios)
  - Validação de tipo (número, string, etc.)
  - Validação de formato (email, etc.)
  - Validação de regras de negócio (estoque não pode ser negativo, etc.)

- **SQLite Constraints**: O banco de dados também impõe restrições, como a unicidade de emails de usuários.

### Documentação de Testes de Rotas no Postman
- [Documentação](https://documenter.getpostman.com/view/43581186/2sB2cSgiMe)

### Principais Dificuldades e Soluções


#### 1. Persistência de Dados

**Dificuldade**: Inicialmente, os dados eram armazenados apenas em memória, o que causava perda de dados quando o servidor era reiniciado.

**Solução**: Implementamos um banco de dados SQLite com a biblioteca `sqlite3`, garantindo a persistência dos dados mesmo após reinicializações do servidor.

#### 2. Organização de Rotas

**Dificuldade**: À medida que o projeto crescia, a organização das rotas se tornava confusa.

**Solução**: Adotamos uma estrutura modular de rotas, separando-as por domínio (produtos, clientes, API) e utilizando o sistema de roteamento do Express.

#### 3. Validação Consistente

**Dificuldade**: Manter a validação consistente entre cliente e servidor.

**Solução**: Implementamos o `express-validator` no backend e scripts de validação no frontend, garantindo que as mesmas regras fossem aplicadas em ambos os lados.

## Referências Utilizadas

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

### Cursos Online
- Udemy: NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)
- Coursera: Server-side Development with NodeJS, Express and MongoDB

## Licença
Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Autor
Desenvolvido por Kaique Caitano dos Santos

---
*Este projeto foi desenvolvido como parte de um trabalho acadêmico.*
