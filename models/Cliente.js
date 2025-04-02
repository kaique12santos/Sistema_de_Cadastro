// const db = require('../config/db');
// const bcrypt = require('bcrypt');

// class Usuario {
//   constructor(id, nome, email, senha) {
//     this.id = id;
//     this.nome = nome;
//     this.email = email;
//     this.senha = senha; // Será criptografada antes de salvar
//     this.created_at = new Date().toISOString();
//   }
// }
// async function obterProximoId() {
//   return new Promise((resolve, reject) => {
//     db.get("SELECT MAX(id) AS maxId FROM clientes", (err, row) => {
//       if (err) {
//         console.error("Erro ao obter o último ID:", err);
//         return resolve(1); // Se der erro, começa do 1
//       }
//       resolve((row && row.maxId) ? row.maxId + 1 : 1);
//     });
//   });
// }
// // Obter todos os usuários
// function getAll() {
//   return new Promise((resolve, reject) => {
//     const sql = 'SELECT id, nome, email, created_at FROM clientes ORDER BY created_at DESC';
//     db.all(sql, [], (err, rows) => {
//       if (err) return reject(err);
//       resolve(rows);
//     });
//   });
// }

// // Obter usuário por ID
// function getById(id) {
//   return new Promise((resolve, reject) => {
//     const sql = 'SELECT id, nome, email, created_at FROM usuarios WHERE id = ?';
//     db.get(sql, [id], (err, row) => {
//       if (err) return reject(err);
//       resolve(row);
//     });
//   });
// }

// // Adicionar novo usuário
// function add(usuario) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // Criptografar a senha
//       const salt = await bcrypt.genSalt(10);
//       const senhaHash = await bcrypt.hash(usuario.senha, salt);
      
//       const sql = 'INSERT INTO usuarios (nome, email, senha, created_at) VALUES (?, ?, ?, ?)';
//       db.run(sql, [usuario.nome, usuario.email, senhaHash, usuario.created_at], function(err) {
//         if (err) return reject(err);
        
//         // Retornar sem a senha
//         const { senha, ...usuarioSemSenha } = usuario;
//         resolve({ id: this.lastID, ...usuarioSemSenha });
//       });
//     } catch (err) {
//       reject(err);
//     }
//   });
// }

// // Atualizar usuário
// function update(id, usuarioData) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // Verificar se o usuário existe
//       const usuario = await getById(id);
//       if (!usuario) return resolve(null);
      
//       let sql, params;
      
//       // Se a senha foi fornecida, atualizá-la também
//       if (usuarioData.senha) {
//         // Criptografar a nova senha
//         const salt = await bcrypt.genSalt(10);
//         const senhaHash = await bcrypt.hash(usuarioData.senha, salt);
        
//         sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';
//         params = [usuarioData.nome, usuarioData.email, senhaHash, id];
//       } else {
//         sql = 'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?';
//         params = [usuarioData.nome, usuarioData.email, id];
//       }
      
//       db.run(sql, params, function(err) {
//         if (err) return reject(err);
        
//         // Retornar sem a senha
//         const { senha, ...usuarioSemSenha } = usuarioData;
//         resolve({ id, ...usuarioSemSenha });
//       });
//     } catch (err) {
//       reject(err);
//     }
//   });
// }

// // Excluir usuário
// function deleteUsuario(id) {
//   return new Promise((resolve, reject) => {
//     // Verificar se o usuário existe
//     getById(id)
//       .then(usuario => {
//         if (!usuario) return resolve(null);
        
//         const sql = 'DELETE FROM usuarios WHERE id = ?';
//         db.run(sql, [id], function(err) {
//           if (err) return reject(err);
//           resolve({ deleted: true, rows: this.changes });
//         });
//       })
//       .catch(err => reject(err));
//   });
// }

// module.exports = {
//   Usuario,
//   getAll,
//   getById,
//   add,
//   update,
//   delete: deleteUsuario
// };

const { db, run, get, all } = require('../config/db');
const bcrypt = require('bcrypt');

// Classe Usuario
class Cliente {
  constructor(id = null, nome, email, senha) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }
}

// Obter o próximo ID disponível
async function obterProximoId() {
  try {
    const row = await get("SELECT MAX(id) AS maxId FROM cliente");
    return (row && row.maxId) ? row.maxId + 1 : 1;
  } catch (error) {
    console.error("Erro ao obter o último ID:", error);
    return 1;
  }
}


// Obter todos os usuários
async function getAll() {
  try {
    return await all('SELECT id, nome, email, created_at FROM cliente ORDER BY created_at DESC');
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    return [];
  }
}

// Obter usuário por ID
async function getById(id) {
  try {
    const usuario = await get('SELECT id, nome, email, created_at FROM cliente WHERE id = ?', [id]);
    return usuario;
  } catch (error) {
    console.error(`Erro ao buscar cliente com ID ${id}:`, error);
    return null;
  }
}


// Adicionar novo usuário
async function add(usuario) {
  try {
    // Gerar ID
    usuario.id = await obterProximoId();

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(usuario.senha, salt);
    usuario.senha = senhaHash; // Armazena a senha criptografada

    await run(
      'INSERT INTO cliente (id, nome, email, senha, created_at) VALUES (?, ?, ?, ?, ?)',
      [usuario.id, usuario.nome, usuario.email, usuario.senha, new Date().toISOString()]
    );

    // Retorna o usuário sem a senha
    const { senha, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha; 

  } catch (error) {
    console.error('Erro ao adicionar cliente:', error);
    return null;
  }
}

// Atualizar usuário
async function update(id, dadosUsuario) {
    try {
      const usuarioExistente = await getById(id);
      if (!usuarioExistente) {
        return null;
      }

      // Lógica para atualizar a senha, se fornecida
      if (dadosUsuario.senha) {
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(dadosUsuario.senha, salt);
        dadosUsuario.senha = senhaHash;
      }

      const campos = Object.keys(dadosUsuario)
        .filter(key => dadosUsuario[key] !== undefined) // Ignora campos indefinidos
        .map(key => `${key} = ?`);
      const valores = Object.keys(dadosUsuario)
        .filter(key => dadosUsuario[key] !== undefined)
        .map(key => dadosUsuario[key]);
      valores.push(id);


      await run(
        `UPDATE cliente SET ${campos.join(', ')} WHERE id = ?`,
        valores
      );

      // Retorna o usuário atualizado (sem a senha)
      const usuarioAtualizado = await getById(id);
      const { senha, ...usuarioSemSenha } = usuarioAtualizado; // Remove a senha do objeto retornado
      return usuarioSemSenha;


    } catch (error) {
      console.error(`Erro ao atualizar cliente com ID ${id}:`, error);
      return null;
    }
}


// Excluir usuário
async function deleteUsuario(id) {
  try {
    const usuarioExistente = await getById(id);
    if (!usuarioExistente) {
      return null;
    }

    await run('DELETE FROM cliente WHERE id = ?', [id]);
    return usuarioExistente; // Retorna o usuário excluído (sem senha, já que veio do getById)
  } catch (error) {
    console.error(`Erro ao deletar cliente com ID ${id}:`, error);
    return null;
  }
}



module.exports = {
  Cliente,
  obterProximoId,
  getAll,
  getById,
  add,
  update,
  delete: deleteUsuario,
};