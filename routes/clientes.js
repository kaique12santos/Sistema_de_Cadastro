// const express = require('express');
// const router = express.Router();
// const clienteController = require('../controllers/clienteController');

// // Listar todos os clientes
// router.get('/', clienteController.listarClientes);

// // Formulário para novo cliente
// router.get('/novo', clienteController.formNovoCliente);

// // Criar um novo cliente
// router.post('/', clienteController.criarCliente);

// // Exibir um cliente específico
// router.get('/:id', clienteController.mostrarCliente);

// // Formulário para editar cliente
// router.get('/:id/editar', clienteController.formEditarCliente);

// // Atualizar cliente
// router.put('/:id', clienteController.atualizarCliente);

// // Excluir cliente
// router.delete('/:id', clienteController.excluirCliente);



// module.exports = router;

const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Listar todos os clientes
router.get('/', clienteController.listarClientes);
router.get('/clientes', clienteController.listarClientes);

// Formulário para novo cliente
router.get('/novo', clienteController.formNovoCliente);
router.get('/clientes/novo', clienteController.formNovoCliente);

// Criar um novo cliente
router.post('/', clienteController.criarCliente);
router.post('/clientes', clienteController.criarCliente);

// Exibir um cliente específico
router.get('/:id/mostrar', clienteController.mostrarCliente);

// Formulário para editar cliente
router.get('/:id/editar', clienteController.formEditarCliente);

// Atualizar cliente
router.put('/:id/atualizar', clienteController.atualizarCliente);

// Excluir cliente
router.delete('/:id/deletar', clienteController.excluirCliente);

module.exports = router;
