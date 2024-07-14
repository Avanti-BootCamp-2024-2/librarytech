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

module.exports = {
    usuarios
}


