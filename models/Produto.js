const { db, run, get, all } = require('../config/db');

// Classe Produto
class Produto {
  constructor(id = null, nome, preco, estoque) {
    this.id = id ;
    this.nome = nome;
    this.preco = preco;
    this.estoque = estoque;
  }
}

async function obterProximoId() {
  return new Promise((resolve, reject) => {
    db.get("SELECT MAX(id) AS maxId FROM produtos", (err, row) => {
      if (err) {
        console.error("Erro ao obter o último ID:", err);
        return resolve(1); 
      }
      resolve((row && row.maxId) ? row.maxId + 1 : 1);
    });
  });
}
// Obter todos os produtos
async function getAll() {
  try {
    return await all('SELECT * FROM produtos ORDER BY nome');
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
}

// Adicionar um novo produto
async function add(produto) {
  try {
    
    produto.id = await obterProximoId();
    
    const result = await run(
      'INSERT INTO produtos (id, nome, preco, estoque) VALUES (?, ?, ?, ?)',
      [produto.id, produto.nome, produto.preco, produto.estoque]
    );
    
    console.log('Produto adicionado com ID:', produto.id);
    return produto;
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
    return null;
  }

}

// Buscar produto por ID
async function getById(id) {
  try {
    const produto = await get('SELECT * FROM produtos WHERE id = ?', [id]);
    return produto;
  } catch (error) {
    console.error(`Erro ao buscar produto com ID ${id}:`, error);
    return null;
  }
}

// Atualizar produto
async function update(id, dadosProduto) {
  try {
    // Primeiro verifica se o produto existe
    const produtoExistente = await getById(id);
    if (!produtoExistente) {
      return null;
    }

    // Prepara os dados para atualização
    const campos = Object.keys(dadosProduto)
      .filter(key => dadosProduto[key] !== undefined)
      .map(key => `${key} = ?`);
    
    const valores = Object.keys(dadosProduto)
      .filter(key => dadosProduto[key] !== undefined)
      .map(key => dadosProduto[key]);
    
    // Adiciona o ID ao final dos valores
    valores.push(id);

    // Executa a atualização
    await run(
      `UPDATE produtos SET ${campos.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      valores
    );

    // Retorna o produto atualizado
    return await getById(id);
  } catch (error) {
    console.error(`Erro ao atualizar produto com ID ${id}:`, error);
    return null;
  }
}

// Deletar produto
async function deleteProduto(id) {
  try {
    // Primeiro verifica se o produto existe
    const produtoExistente = await getById(id);
    if (!produtoExistente) {
      return null;
    }

    // Executa a exclusão
    await run('DELETE FROM produtos WHERE id = ?', [id]);
    return produtoExistente;
  } catch (error) {
    console.error(`Erro ao deletar produto com ID ${id}:`, error);
    return null;
  }
}

module.exports = {
  Produto,
  getAll,
  add,
  getById,
  update,
  delete: deleteProduto
};