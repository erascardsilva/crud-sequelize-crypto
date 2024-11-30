const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/jwtConfig");
const { verifiyToken } = require("../services/jwtService");

const auth = (res, req, next ) =>{
    const authHearder = req.headers["authorization"];
    const token = authHearder && authHearder.split(" ")[1];

    if(!token) return res.status(401).json({message: "Token nao enviado"});

    verifyToken(token);
        req.user = user;
        next();
    };


module. exports = { auth };    