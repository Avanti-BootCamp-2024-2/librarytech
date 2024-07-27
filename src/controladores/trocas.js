const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const trocas = async (req, resp) => {
    const trocas = await prisma.troca.findMany();
    return resp.status(200).json(trocas);
}

const criarTroca = async (req, resp) => {
    const {
        solicitanteId,
        receptorId,
        livroSolicitadoId,
        livroOferecidoId,
        dataSolicitacao,
        dataConclusao,
        status } = req.body
    const solicitante = parseInt(solicitanteId);
    const receptor = parseInt(receptorId);
    const livroSolicitado = parseInt(livroSolicitadoId);
    const livroOferecido = parseInt(livroOferecidoId);
    const data_solicitacao = new Date(dataSolicitacao);
    const data_conclusao = new Date(dataConclusao);


    try {
        const troca = await prisma.troca.create({
            data: {
                solicitante_id: solicitante,
                receptor_id: receptor,
                livro_solicitado_id: livroSolicitado,
                livro_oferecido_id: livroOferecido,
                data_solicitacao,
                data_conclusao,
                status
            }
        })
        // TODO - Criar uma função para os historicos e troca os proprietarios dos livros na tabela livros
        const historicoTrocaSolicitante = await prisma.historicoTroca.create({
            data: {
                usuario_id: troca.solicitante_id,
                troca_id: troca.id,
            }
        })
        const historicoTrocaReceptor = await prisma.historicoTroca.create({
            data: {
                usuario_id: troca.receptor_id,
                troca_id: troca.id,
            }
        })

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