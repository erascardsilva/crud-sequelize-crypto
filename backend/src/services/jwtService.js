const jwt = require('jsonwebtoken');
const { SECRET_KEY, EXPIRES_IN } = require('../config/jwtConfig');
const crypto = require('crypto');

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
   // Gera hash da senha
function BscryptGenerate(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
  };


module.exports = { generateToken, verifyToken, BscryptGenerate };
                  