const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Sistema de Cadastro' });
});

module.exports = router;