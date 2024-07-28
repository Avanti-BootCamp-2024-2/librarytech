const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const { dencryptSenha } = require('../servicos/crypts');
const senhaJWT = require('../senhaJWT');

const prisma = new PrismaClient();

const login = async (req, resp) => {
    const { email, senha } = req.body;
    try {
        const usuario = await prisma.usuario.findUnique({
            where: {
                email
            },
            select: {
                id: true,
                nome: true,
                email: true,
                senha: true
            }
        })

        if (!usuario) {
            return resp.status(401).json({ mensagem:"Não autorizado!" });
        }
        const isValid = await dencryptSenha(senha, usuario.senha);

        if (!isValid) {
            return resp.status(401).json({ mensagem:"Não autorizado!" });
        }
        const token = jwt.sign({id: usuario.id}, senhaJWT, {expiresIn: '10d'});
        const {senha: _, ...usuarioLogado} = usuario

        return resp.status(200).json({ usuario: usuarioLogado, token });

    } catch (error) {
        return resp.status(500).json(error.message)

    }
}

module.exports = {
    login
}