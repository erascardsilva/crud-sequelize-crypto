const jwt = require("jsonwebtoken");
const { SECRET_KEY, EXPIRES_IN } = require("../config/jwtConfig");

function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error("Token Invalido");
  }
};

module.exports = { generateToken, verifyToken };
