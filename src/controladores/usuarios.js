const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const usuarios = async (req, res) => {

    try {
        const usuarios = await prisma.usuario.findMany();
        if (usuarios.length === 0) {
            return res.json({"mensagem":"Não existe usuário cadastrado!"})
        }
        return res.status(200).json(usuarios); // Envia a lista de usuários como resposta JSON
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar usuários' }); // Envia uma resposta de erro ao cliente
    }
}

const criarUsuario= async (req, res) => {
    const {nome, email, senha } = req.body

    try {
        const emailCadstrado = await prisma.usuario.findFirst({where: {email}});
        if (emailCadstrado) {
            return res.status(200).json({"mensagem":"Email já cadastrado!"});
        }
        const usuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha
            } 
        })
        console.log(usuario);
        return res.status(200).json({"mensagem":"Usuário cadastrado com sucesso!"});
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    usuarios,
    criarUsuario
}


