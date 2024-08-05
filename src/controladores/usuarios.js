const { PrismaClient } = require('@prisma/client');
const { encryptSenha } = require('../servicos/crypts');
const usuario = require('../validacoes/usuario');
const prisma = new PrismaClient();

const usuarios = async (req, res) => {

    try {
        const usuarios = await prisma.usuario.findMany();
        if (usuarios.length === 0) {
            return res.json({"mensagem": "Não existe usuário cadastrado!"})
        }
        return res.status(200).json(usuarios);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
}

const criarUsuario = async (req, res) => {
    const {nome, email, senha } = req.body

    const { error } = usuario.validate({nome, email, senha});

    if (error) {
        return res.status(400).json({"Erro de validação:": error.details});
    } 

    try {
        const usuario = prisma.usuario.findUnique({
            where:email
        })
        if (usuario.email) {
            return res.status(201).json({ mensagem :"Email já cadastrado!"}); 
        }

         senhaEncriptada =  await encryptSenha(senha)
         const usuarioCadastrado = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha: senhaEncriptada
            } 
        })
        return res.status(201).json({ mensagem :"Usuário cadastrado com sucesso!"});
        
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ mensagem:"Email já cadastrado!: " + error.meta.target.join(', ') });
          }
        res.status(500).json({ mensagem: error.message });
    }
}

const editaUsuario = async (req, res) => {
    const { nome, senha } = req.body
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ mensagem: "ID do usuário invalido" });
    }
    try {
        const idUser = parseInt(id);
        const updateUser = await prisma.usuario.update({
            where: {
              id: idUser
            },
            data: {
                nome,
                senha
            },
          })
        return res.status(201).json({ mensagem:"Usuário atualizado com sucesso!" });
        
    } catch (error) {
        res.status(500).json({ mensagem: error.message });
    }

}

const removeUsuario = async (req, rep) => {
    const { id } = req.params;

    const idUser = parseInt(id);
    if (isNaN(id)) {
        return res.status(400).json({ mensagem: "ID do usuário invalido" });
    }
    try {
        const deleteUser = await prisma.user.delete({
            where: {
                id: idUser
            },
          })
        return res.status(204).json({ mensagem:"Usuário removido com sucesso!" });
        
    } catch (error) {
        res.status(500).json({ mensagem: error.message });
    }
}

module.exports = {
    usuarios,
    criarUsuario,
    editaUsuario,
    removeUsuario
}