const { Produto, getAll, add, getById, update, delete: deleteProduto } = require('../models/Produto');

exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await getAll();
    res.render('produtos/index', { 
      title: 'Lista de Produtos',
      produtos
    });
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).render('error', { message: 'Erro ao carregar produtos' });
  }
};

exports.formNovoProduto = (req, res) => {
  res.render('produtos/novo', { title: 'Novo Produto' });
};

exports.criarProduto = async (req, res) => {
  try {
    const { nome, preco, estoque } = req.body;
    
    // Validação
    if (!nome || !preco || !estoque) {
      return res.render('produtos/novo', {
        title: 'Novo Produto',
        error: 'Todos os campos são obrigatórios',
        produto: { nome, preco, estoque }
      });
    }
    
    // Validação de preço e estoque
    if (isNaN(preco) || Number(preco) <= 0) {
      return res.render('produtos/novo', {
        title: 'Novo Produto',
        error: 'Por favor, insira um preço válido',
        produto: { nome, preco, estoque }
      });
    }
    
    if (isNaN(estoque) || Number(estoque) < 0) {
      return res.render('produtos/novo', {
        title: 'Novo Produto',
        error: 'Por favor, insira uma quantidade de estoque válida',
        produto: { nome, preco, estoque }
      });
    }
    
    const novoProduto = new Produto(null, nome, Number(preco), Number(estoque));
    await add(novoProduto);
    
    res.redirect('/produtos');
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).render('error', { message: 'Erro ao criar produto' });
  }
};

// Mostrar um produto específico
exports.mostrarProduto = async (req, res) => {
  try {
    const produto = await getById(req.params.id);
    
    if (!produto) {
      return res.redirect('/produtos');
    }
    
    res.render('produtos/mostrar', {
      title: 'Detalhes do Produto',
      produto
    });
  } catch (error) {
    console.error('Erro ao mostrar produto:', error);
    res.status(500).render('error', { message: 'Erro ao carregar detalhes do produto' });
  }
};

// Mostrar formulário para editar produto
exports.formEditarProduto = async (req, res) => {
  try {
    const produto = await getById(req.params.id);
    
    if (!produto) {
      return res.redirect('/produtos');
    }
    
    res.render('produtos/editar', {
      title: 'Editar Produto',
      produto
    });
  } catch (error) {
    console.error('Erro ao carregar formulário de edição:', error);
    res.status(500).render('error', { message: 'Erro ao carregar formulário de edição' });
  }
};

// Atualizar produto
exports.atualizarProduto = async (req, res) => {
  try {
    const { nome, preco, estoque } = req.body;
    const id = req.params.id;
    
    // Validação
    if (!nome || !preco || !estoque) {
      return res.render('produtos/editar', {
        title: 'Editar Produto',
        error: 'Todos os campos são obrigatórios',
        produto: { id, nome, preco, estoque }
      });
    }
    
    // Validação de preço e estoque
    if (isNaN(preco) || Number(preco) <= 0) {
      return res.render('produtos/editar', {
        title: 'Editar Produto',
        error: 'Por favor, insira um preço válido',
        produto: { id, nome, preco, estoque }
      });
    }
    
    if (isNaN(estoque) || Number(estoque) < 0) {
      return res.render('produtos/editar', {
        title: 'Editar Produto',
        error: 'Por favor, insira uma quantidade de estoque válida',
        produto: { id, nome, preco, estoque }
      });
    }
    
    const produtoAtualizado = await update(id, { 
      nome, 
      preco: Number(preco), 
      estoque: Number(estoque) 
    });
    
    if (!produtoAtualizado) {
      return res.redirect('/produtos');
    }
    
    res.redirect('/produtos');
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).render('error', { message: 'Erro ao atualizar produto' });
  }
};

// Excluir produto
exports.excluirProduto = async (req, res) => {
  try {
    const id = req.params.id;
    const produtoRemovido = await deleteProduto(id);
    
    if (!produtoRemovido) {
      return res.redirect('/produtos');
    }
    
    res.redirect('/produtos');
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    res.status(500).render('error', { message: 'Erro ao excluir produto' });
  }
};