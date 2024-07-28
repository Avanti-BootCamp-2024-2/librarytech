const jwt = require('jsonwebtoken');
const senhaJWT = require("../senhaJWT");

const verificaUsuarioLogado = async (req, resp, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return resp.status(401).json({ mensagem: 'Não autorizado' });

    }

    const token = authorization.replace("Bearer ", '');

    try {
        const tokenUsuario = jwt.verify(token, senhaJWT);
        next();

    } catch (error) {
        return resp.status(401).json({ mensagem: 'Não autorizado' });

    }
}

module.exports = verificaUsuarioLogado;