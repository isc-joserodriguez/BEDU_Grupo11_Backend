const jwt = require('express-jwt');
const secret = require('../config').secret;

// Obtenemos el jwt del header de la petición y verificamos su existencia.
function getTokenFromHeader(req) {
    let token=req.headers.authorization;
    if(token){
        let type=token.split(' ')[0];
        if(type==='Token' || type=== 'Bearer')return token.split(' ')[1];
    }
    return null;
}

const auth = {
    requerido: jwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'usuario',
        getToken: getTokenFromHeader
    }),
    opcional: jwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'usuario',
        credentialsRequired: false,
        getToken: getTokenFromHeader
    })
};

module.exports = auth;
