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


// Obter todos os clientes
async function getAll() {
  try {
    return await all('SELECT id, nome, email, created_at FROM cliente ORDER BY created_at DESC');
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    return [];
  }
}

// Obter cliente por ID
async function getById(id) {
  try {
    const usuario = await get('SELECT id, nome, email, created_at FROM cliente WHERE id = ?', [id]);
    return usuario;
  } catch (error) {
    console.error(`Erro ao buscar cliente com ID ${id}:`, error);
    return null;
  }
}


// Adicionar novo cliente
async function add(usuario) {
  try {

    usuario.id = await obterProximoId();
    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(usuario.senha, salt);
    usuario.senha = senhaHash; 

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

// Atualizar cliente
async function update(id, dadosUsuario) {
    try {
      const usuarioExistente = await getById(id);
      if (!usuarioExistente) {
        return null;
      }

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
    return usuarioExistente;
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