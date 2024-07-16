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

const criarUsuario = async (req, res) => {
    const {nome, email, senha } = req.body

    try {
        const usuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha
            } 
        })
        return res.status(201).json({"mensagem":"Usuário cadastrado com sucesso!"});
        
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ mensagem:"Email já cadastrado!: " + error.meta.target.join(', ') });
          }
        res.status(400).json({ mensagem: error.message });
    }
}

const editaUsuario = async (req, res) => {
    const { nome, senha } = req.body

    const { id } = req.params;

    const idUser = parseInt(id);
    if (isNaN(id)) {
        return res.status(400).json({ mensagem: "ID do usuário invalido" });
    }

    const updateUser = await prisma.usuario.update({
        where: {
          id: idUser
        },
        data: {
            nome,
            senha
        },
      })
      console.log(updateUser);
    return res.status(201).json({ mensagem:"Usuário cadastrado com sucesso!" });

}

const removeUsuario = async (req, rep) => {
    const { id } = req.params;

    const idUser = parseInt(id);
    if (isNaN(id)) {
        return res.status(400).json({ mensagem: "ID do usuário invalido" });
    }

    const deleteUser = await prisma.user.delete({
        where: {
            id: idUser
        },
      })
    return res.status(204).json({ mensagem:"Usuário removido com sucesso!" });
}

module.exports = {
    usuarios,
    criarUsuario,
    editaUsuario,
    removeUsuario
}


