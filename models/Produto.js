// const db = require('../config/db');
// class Produto {
//   constructor(id, nome, preco, estoque) {
//     this.id = id;
//     this.nome = nome;
//     this.preco = preco;
//     this.estoque = estoque;
//     this.created_at = new Date().toISOString();
//   }
// }

// // Obter todos os produtos
// function getAll() {
//   return new Promise((resolve, reject) => {
//     const sql = 'SELECT * FROM produtos ORDER BY created_at DESC';
//     db.all(sql, [], (err, rows) => {
//       if (err) return reject(err);
//       resolve(rows);
//     });
//   });
// }

// // Obter produto por ID
// function getById(id) {
//   return new Promise((resolve, reject) => {
//     const sql = 'SELECT * FROM produtos WHERE id = ?';
//     db.get(sql, [id], (err, row) => {
//       if (err) return reject(err);
//       resolve(row);
//     });
//   });
// }

// // Adicionar novo produto
// function add(produto) {
//   return new Promise((resolve, reject) => {
//     const sql = 'INSERT INTO produtos (nome, preco, estoque, created_at) VALUES (?, ?, ?, ?)';
//     db.run(sql, [produto.nome, produto.preco, produto.estoque, produto.created_at], function(err) {
//       if (err) return reject(err);
//       resolve({ id: this.lastID, ...produto });
//     });
//   });
// }

// // Atualizar produto
// function update(id, produtoData) {
//   return new Promise((resolve, reject) => {
//     // Verificar se o produto existe
//     getById(id)
//       .then(produto => {
//         if (!produto) return resolve(null);
        
//         const sql = 'UPDATE produtos SET nome = ?, preco = ?, estoque = ? WHERE id = ?';
//         db.run(sql, [produtoData.nome, produtoData.preco, produtoData.estoque, id], function(err) {
//           if (err) return reject(err);
//           resolve({ id, ...produtoData });
//         });
//       })
//       .catch(err => reject(err));
//   });
// }

// // Excluir produto
// function deleteProduto(id) {
//   return new Promise((resolve, reject) => {
//     // Verificar se o produto existe
//     getById(id)
//       .then(produto => {
//         if (!produto) return resolve(null);
        
//         const sql = 'DELETE FROM produtos WHERE id = ?';
//         db.run(sql, [id], function(err) {
//           if (err) return reject(err);
//           resolve({ deleted: true, rows: this.changes });
//         });
//       })
//       .catch(err => reject(err));
//   });
// }

// module.exports = {
//   Produto,
//   getAll,
//   getById,
//   add,
//   update,
//   delete: deleteProduto
// };

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
        return resolve(1); // Se der erro, começa do 1
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
    // Verifica se o produto já tem um ID, se não tiver, gera um novo
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