const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const listaPost = async ( req, resp ) => {
    const id = parseInt(req.params.id);
    try {
        const posts = await prisma.avaliacao.findMany({ where: {avaliado_id: id} })
        return resp.status(200).json(posts)
        
    } catch (error) {
        return resp.status(500).json(error.message)
    }

}

const criaPost = async ( req, resp ) => {
    const { troca_id, avaliador_id, avaliado_id, nota, comentario } = req.body
    const trocaId = parseInt(troca_id);
    const avaliadorId = parseInt(avaliador_id);
    const avaliadoId = parseInt(avaliado_id);
    const notaAvaliador = parseInt(nota);
    const data_avaliacao = new Date()
    try {
      const avaliacao = await prisma.avaliacao.create({
            data: {
                troca_id: trocaId,
                avaliador_id: avaliadorId,
                avaliado_id: avaliadoId,
                nota: notaAvaliador,
                comentario,
                data_avaliacao
            }
        })
        return resp.status(201).json(avaliacao)
    } catch (error) {
        return resp.status(500).json(error.message)

    }
}

module.exports = {
    listaPost,
    criaPost
}