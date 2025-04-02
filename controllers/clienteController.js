// const { Cliente, getAll, add, getById, update, delete: deleteCliente,obterProximoId } = require('../models/Cliente');


// // Listar todos os clientes
// exports.listarClientes = (req, res) => {
//   const clientes = getAll();
//   res.render('clientes/index', { 
//     title: 'Lista de Clientes',
//     clientes 
//   });
// };

// // Mostrar formulário para novo cliente
// exports.formNovoCliente = (req, res) => {
//   res.render('clientes/novo', { title: 'Novo Cliente' });
// };

// // Criar um novo cliente
// exports.criarCliente = async (req, res) => {
//   try {
//   const { nome, email, senha } = req.body;
  
//   // Validação básica
//   if (!nome || !email || !senha) {
//     return res.render('clientes/novo', {
//       title: 'Novo Cliente',
//       error: 'Todos os campos são obrigatórios',
//       cliente: { nome, email }
//     });
//   }
  
//   // Validação de email simples
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     return res.render('clientes/novo', {
//       title: 'Novo Cliente',
//       error: 'Por favor, insira um email válido',
//       cliente: { nome, email }
//     });
//   }

//   const novoId = await obterProximoId();
//   const novoCliente = new Cliente(novoId, nome, email, senha);
//   await add(novoCliente);
//   // Flash message (requer middleware express-flash)
//   // req.flash('success', `O cliente ${nome} foi cadastrado com sucesso!`);
  
//   res.redirect('/clientes');
// }catch (error) {
//   console.error('Erro ao criar cliente:', error);
//   res.status(500).render('error', { message: 'Erro ao criar cliente' });
// }
// };

// // Mostrar um cliente específico
// exports.mostrarCliente = async (req, res) => {
//   try {
//     const cliente = getById(req.params.id);
  
//      if (!cliente) {
//     // req.flash('error', 'Cliente não encontrado');
//     return res.redirect('/clientes');
//   }
  
//   res.render('clientes/mostrar', {
//     title: 'Detalhes do Cliente',
//     cliente
//   });
// } catch (error) {
//   console.error('Erro ao mostrar cliente:', error);
//   res.status(500).render('error', { message: 'Erro ao carregar detalhes do cliente' });
// }
// };

// // Mostrar formulário para editar cliente
// exports.formEditarCliente = (req, res) => {
//   const cliente = getById(req.params.id);
  
//   if (!cliente) {
//     // req.flash('error', 'Cliente não encontrado');
//     return res.redirect('/clientes');
//   }
  
//   res.render('clientes/editar', {
//     title: 'Editar Cliente',
//     cliente
//   });
// };

// // Atualizar cliente
// exports.atualizarCliente = (req, res) => {
//   const { nome, email } = req.body;
//   const id = req.params.id;
  
//   // Validações similares às do método criarCliente
  
//   const clienteAtualizado = update(id, { nome, email });
  
//   if (!clienteAtualizado) {
//     // req.flash('error', 'Cliente não encontrado');
//     return res.redirect('/clientes');
//   }
  
//   // req.flash('success', 'Cliente atualizado com sucesso!');
//   res.redirect('/clientes');
// };

// // Excluir cliente
// exports.excluirCliente = (req, res) => {
//   const id = req.params.id;
//   const clienteRemovido = deleteCliente(id);
  
//   if (!clienteRemovido) {
//     // req.flash('error', 'Cliente não encontrado');
//     return res.redirect('/clientes');
//   }
  
//   // req.flash('success', 'Cliente removido com sucesso!');
//   res.redirect('/clientes');
// };

const { Cliente, getAll, add, getById, update, delete: deleteCliente, obterProximoId } = require('../models/Cliente');

// Listar todos os clientes
exports.listarClientes = async (req, res) => {
  try {
    const clientes = await getAll();
    res.render('clientes/index', { 
      title: 'Lista de Clientes',
      clientes 
    });
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    res.status(500).render('error', { message: 'Erro ao carregar clientes' });
  }
};

// Mostrar formulário para novo cliente
exports.formNovoCliente = (req, res) => {
  res.render('clientes/novo', { title: 'Novo Cliente' });
};

// Criar um novo cliente
exports.criarCliente = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    
    if (!nome || !email || !senha) {
      return res.render('clientes/novo', {
        title: 'Novo Cliente',
        error: 'Todos os campos são obrigatórios',
        cliente: { nome, email }
      });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.render('clientes/novo', {
        title: 'Novo Cliente',
        error: 'Por favor, insira um email válido',
        cliente: { nome, email }
      });
    }
    
    const novoId = await obterProximoId();
    const novoCliente = new Cliente(novoId, nome, email, senha);
    await add(novoCliente);
    res.redirect('/clientes');
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).render('error', { message: 'Erro ao criar cliente' });
  }
};

// Mostrar um cliente específico
exports.mostrarCliente = async (req, res) => {
  try {
    const cliente = await getById(req.params.id);
    if (!cliente) {
      return res.redirect('/clientes');
    }
    res.render('clientes/mostrar', {
      title: 'Detalhes do Cliente',
      cliente
    });
  } catch (error) {
    console.error('Erro ao mostrar cliente:', error);
    res.status(500).render('error', { message: 'Erro ao carregar detalhes do cliente' });
  }
};

// Mostrar formulário para editar cliente
exports.formEditarCliente = async (req, res) => {
  try {
    const cliente = await getById(req.params.id);
    if (!cliente) {
      return res.redirect('/clientes');
    }
    res.render('clientes/editar', {
      title: 'Editar Cliente',
      cliente
    });
  } catch (error) {
    console.error('Erro ao carregar formulário de edição:', error);
    res.status(500).render('error', { message: 'Erro ao carregar formulário de edição' });
  }
};

// Atualizar cliente
exports.atualizarCliente = async (req, res) => {
  try {
    const { nome, email } = req.body;
    const id = req.params.id;
    
    if (!nome || !email) {
      return res.render('clientes/editar', {
        title: 'Editar Cliente',
        error: 'Todos os campos são obrigatórios',
        cliente: { id, nome, email }
      });
    }
    
    const clienteAtualizado = await update(id, { nome, email });
    if (!clienteAtualizado) {
      return res.redirect('/clientes');
    }
    res.redirect('/clientes');
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).render('error', { message: 'Erro ao atualizar cliente' });
  }
};

// Excluir cliente
exports.excluirCliente = async (req, res) => {
  try {
    const id = req.params.id;
    const clienteRemovido = await deleteCliente(id);
    if (!clienteRemovido) {
      return res.redirect('/clientes');
    }
    res.redirect('/clientes');
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    res.status(500).render('error', { message: 'Erro ao excluir cliente' });
  }
};
