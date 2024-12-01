const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/jwtConfig");
const { verifyToken } = require("../services/jwtService"); 

const auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({ message: "Token não enviado" });
    }

    try {
        const user = verifyToken(token); 
        req.user = user; 
        next(); 
    } catch (error) {
        return res.status(403).json({ message: "Token inválido ou expirado" });
    }
};

module.exports = { auth }; 
