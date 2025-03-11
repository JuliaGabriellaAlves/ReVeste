document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert('Você precisa estar logado para acessar esta página.');
      window.location.href = 'login.html';
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5002/api/produtos', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const produtosList = document.getElementById('produtosList');
        produtosList.innerHTML = data.map(produto => `
          <div>
            <h2>${produto.nome}</h2>
            <p>${produto.descricao}</p>
            <p>Preço: R$ ${produto.preco}</p>
          </div>
        `).join('');
      } else {
        alert(`Erro: ${data.error}`);
      }
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      alert('Erro ao listar produtos. Tente novamente.');
    }
  });