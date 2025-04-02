const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

const app = express();

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuração do express-ejs-layouts
app.use(ejsLayouts);
app.set('layout', 'layouts/main');

// Middleware para processar JSON e dados de formulário
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Method Override para permitir PUT e DELETE
app.use(methodOverride('_method'));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.get('/', (req, res) => {
  res.render('index', { title: 'Início' });
});

// Importar outras rotas
const produtosRoutes = require('./routes/produtos');
const clientesRoutes = require('./routes/clientes');

app.use('/produtos', produtosRoutes);
app.use('/clientes', clientesRoutes);

// Tratamento de erro 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Página não encontrada' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';
app.listen(PORT, () => {
    console.log(`Servidor http://${HOST}:${PORT}`);
  });