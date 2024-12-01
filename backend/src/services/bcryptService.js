const bcrypt = require('bcryptjs');

// Gera senha hash  Bcrypt 
const BscryptGenerate = async (password) => {
    try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
    } catch (error) {

      throw new Error('Erro ao gerar hash');
    }
  };
  
  // Compara senha hash
  const BscryptCompare = async (password, hash) => {
    try {
      return await bcrypt.compare(password, hash);
  }catch(error){

    throw new Error('Senha incorreta erro');
  }
  }


  module.exports = {BscryptGenerate, BscryptCompare };
