const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const livros = async (req, resp) => {
    const livros = await prisma.livro.findMany();
    return resp.status(200).json(livros);
}

const criarLivro = async (req, resp) => {
    const { titulo, autor, descricao, usuarioId } = req.body
    const id = parseInt(usuarioId)

    try {
        
        const livro = await prisma.livro.create({
            data:{
                titulo,
                autor,
                descricao,
                usuario: {
                    connect: { id }
                  }
            }
        })
        return resp.status(201).json(livro)

    } catch (error) {
        console.log(error.message);
        return resp.status(500).json(error.message)
    }
}

const editaLivro = async (req, resp) => {
    const {titulo, autor, descricao} = req.body;
    const { id } = req.params;
    const idLivro = parseInt(id)
    try {
        const updateUser = await prisma.livro.update({
            where: {
                id: idLivro
            },
            data: {
                titulo,
                autor,
                descricao
            },
          })
    
        return resp.status(201).json({ mensagem:"Livro atualizado com sucesso!" });
        
    } catch (error) {
        
        return resp.status(400).json(error.message);  
    }
}

const removeLivro = async (req, resp) => {
    const { id } = req.params;

    const idLivro = parseInt(id);
    if (isNaN(id)) {
        return resp.status(400).json({ mensagem: "Livro nao localizado" });
    }

    const deleteUser = await prisma.livro.delete({
        where: {
            id: idLivro
        },
      })
    return resp.status(204).json({ mensagem:"Livro removido com sucesso!" });
}

const concluirTrocaUsuarioLivro = async (req, resp) => {
    const {
        trocaId,
        solicitanteId,
        receptorId,
        livroSolicitadoId,
        livroOferecidoId,
        dataConclusao,
        status } = req.body

    const solicitante = parseInt(solicitanteId);
    const receptor = parseInt(receptorId);
    const livroSolicitado = parseInt(livroSolicitadoId);
    const livroOferecido = parseInt(livroOferecidoId);
    const data_conclusao = new Date(dataConclusao);

    try {
       const livroUsuarioSolicitante = await prisma.livro.update({
                where: { id: livroSolicitado }
            },
            { 
                data: { usuario_id: solicitante } 
            })
    
        const livroUsuarioReceptor = await prisma.livro.update(
            {
                where: { id: livroOferecido }
            },
            { data: { usuario_id: receptor } }
        )
    
        const statusTroca = await prisma.troca.update({
            where: {
                id: trocaId
            },
            data: {
                status,
                data_conclusao
    
            }
        })

        
    } catch (error) {
        console.log(error.message);
    }
    return resp.status(201).json({ mensagem:"Troca concluída com sucesso!" });


}

module.exports = {
    livros,
    criarLivro,
    editaLivro,
    removeLivro,
    concluirTrocaUsuarioLivro
}