const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');


router.get('/', clienteController.listarClientes);
router.get('/clientes', clienteController.listarClientes);
router.get('/novo', clienteController.formNovoCliente);
router.get('/clientes/novo', clienteController.formNovoCliente);
router.post('/', clienteController.criarCliente);
router.post('/clientes', clienteController.criarCliente);
router.get('/:id/mostrar', clienteController.mostrarCliente);
router.get('/:id/editar', clienteController.formEditarCliente);
router.put('/:id/atualizar', clienteController.atualizarCliente);
router.delete('/:id/deletar', clienteController.excluirCliente);

module.exports = router;
