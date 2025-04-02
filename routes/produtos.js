const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController.js');

router.get('/', produtoController.listarProdutos);
router.get('/novo', produtoController.formNovoProduto);
router.post('/', produtoController.criarProduto);
router.get('/produtos', produtoController.listarProdutos);
router.get('/produtos/novo', produtoController.formNovoProduto);
router.post('/produtos', produtoController.criarProduto);
router.get('/:id/mostrar', produtoController.mostrarProduto);
router.get('/:id/editar', produtoController.formEditarProduto);
router.put('/:id/atualizar', produtoController.atualizarProduto);
router.delete('/:id/deletar', produtoController.excluirProduto);

module.exports = router;
