const { PrismaClient } = require('@prisma/client');
const historicoTroca = require('../servicos/historicoTroca');
const prisma = new PrismaClient();

const trocas = async (req, resp) => {
    const trocas = await prisma.troca.findMany();
    return resp.status(200).json(trocas);
}

const criarTroca = async (req, resp) => {
    //TODO: Verificar se o livro pertence aos usuarios envolvido na troca
    const {
        solicitanteId,
        receptorId,
        livroSolicitadoId,
        livroOferecidoId,
        status } = req.body
    const solicitante = parseInt(solicitanteId);
    const receptor = parseInt(receptorId);
    const livroSolicitado = parseInt(livroSolicitadoId);
    const livroOferecido = parseInt(livroOferecidoId);
    const data_solicitacao = new Date();

    try {
        const troca = await prisma.troca.create({
            data: {
                solicitante_id: solicitante,
                receptor_id: receptor,
                livro_solicitado_id: livroSolicitado,
                livro_oferecido_id: livroOferecido,
                data_solicitacao,
                status
            },
            where: {
                solicitante_id: true,
                receptor_id: true,
                livro_solicitado_id: true,
                livro_oferecido_id: true,
                data_solicitacao: true,
                status: true
            }
        })

        historicoTroca(troca)

        return resp.status(201).json(troca)

    } catch (error) {
        console.log(error.message);
        return resp.status(500).json(error.message)
    }
}

const editaTroca = async (req, resp) => {
    const { titulo, autor, descricao } = req.body;
    const { id } = req.params;
    const idTroca = parseInt(id)
    try {
        const updateUser = await prisma.troca.update({
            where: {
                id: idTroca
            },
            data: {
                titulo,
                autor,
                descricao
            },
        })

        return resp.status(201).json({ mensagem: "Troca atualizado com sucesso!" });

    } catch (error) {

        return resp.status(400).json(error.message);
    }
}

const removeTroca = async (req, resp) => {
    const { id } = req.params;

    const idTroca = parseInt(id);
    if (isNaN(id)) {
        return resp.status(400).json({ mensagem: "Troca nao localizado" });
    }

    const deleteUser = await prisma.troca.delete({
        where: {
            id: idTroca
        },
    })
    return resp.status(204).json({ mensagem: "Troca removido com sucesso!" });
}


module.exports = {
    trocas,
    criarTroca,
    editaTroca,
    removeTroca
}