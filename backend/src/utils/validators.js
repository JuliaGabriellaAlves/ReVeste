const validarUsuario = (usuario) => {
    const { nome, email, senha } = usuario;
    if (!nome || !email || !senha) {
      throw new Error('Todos os campos são obrigatórios');
    }
  };
  
  module.exports = { validarUsuario };