document.getElementById('registroForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const tipo = document.getElementById('tipo').value;
    const cep = document.getElementById('cep').value;
  
    try {
      const response = await fetch('http://localhost:5002/api/usuarios/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha, tipo, cep }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Usuário registrado com sucesso!');
        window.location.href = 'login.html'; // Redireciona para a página de login
      } else {
        alert(`Erro: ${data.error}`);
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      alert('Erro ao registrar usuário. Tente novamente.');
    }
  });