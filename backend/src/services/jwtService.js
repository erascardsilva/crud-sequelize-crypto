const jwt = require('jsonwebtoken');
const { SECRET_KEY, EXPIRES_IN } = require('../config/jwtConfig');
const bcrypt = require('bcryptjs');



function generateToken(payload){
    return jwt.sign(payload, SECRET_KEY, {expiresIn: EXPIRES_IN});
};

const verifyToken = (token) => {
  try {
      return jwt.verify(token, SECRET_KEY);
  } catch (error) {
      throw new Error('Token Invalido')
  }

};
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
module.exports = { generateToken, verifyToken, BscryptGenerate, BscryptCompare };
                  