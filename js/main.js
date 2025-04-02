// Função para confirmar exclusão
function confirmarExclusao(event, tipo) {
    if (!confirm(`Tem certeza que deseja excluir este ${tipo}?`)) {
      event.preventDefault();
    }
  }
  
  // Funções para validação de formulários
  document.addEventListener('DOMContentLoaded', function() {
    // Validação do formulário de produtos
    const formProduto = document.getElementById('form-produto');
    if (formProduto) {
      formProduto.addEventListener('submit', function(event) {
        const nome = document.getElementById('nome').value;
        const preco = document.getElementById('preco').value;
        const estoque = document.getElementById('estoque').value;
        
        if (!nome || !preco || !estoque) {
          event.preventDefault();
          alert('Todos os campos são obrigatórios!');
        }
      });
    }
    
    // Validação do formulário de clientes
    const formCliente = document.getElementById('form-cliente');
    if (formCliente) {
      formCliente.addEventListener('submit', function(event) {
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        
        if (!nome || !email || !senha) {
          event.preventDefault();
          alert('Todos os campos são obrigatórios!');
        }
        
        // Validação simples de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          event.preventDefault();
          alert('Por favor, insira um email válido!');
        }
      });
    }
    
    // Formatação de valores monetários
    const camposPreco = document.querySelectorAll('.campo-preco');
    camposPreco.forEach(function(campo) {
      campo.addEventListener('blur', function() {
        const valor = parseFloat(this.value.replace(/[^\d]/g, '')) / 100;
        if (!isNaN(valor)) {
          this.value = valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          });
        }
      });
      
      campo.addEventListener('focus', function() {
        this.value = this.value.replace(/[^\d]/g, '');
      });
    });
    
    // Destacar linha da tabela ao passar o mouse
    const linhasTabela = document.querySelectorAll('table tbody tr');
    linhasTabela.forEach(function(linha) {
      linha.addEventListener('mouseenter', function() {
        this.classList.add('linha-hover');
      });
      
      linha.addEventListener('mouseleave', function() {
        this.classList.remove('linha-hover');
      });
    });
  });
  
  // Mostrar/esconder mensagens de alerta após alguns segundos
  const alertas = document.querySelectorAll('.alerta');
  if (alertas.length > 0) {
    setTimeout(function() {
      alertas.forEach(function(alerta) {
        alerta.style.opacity = '0';
        setTimeout(function() {
          alerta.style.display = 'none';
        }, 500);
      });
    }, 3000);
  }
  