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
        
        // Validação de email
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
});
  

  