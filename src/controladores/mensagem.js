const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mensagens = async (req, resp) => {
    try {
        const mensagem = await prisma.mensagem.findMany();
        return resp.status(200).json(mensagem);
        
    } catch (error) {
        console.log(error.message);
        return resp.status(500).json(error.message)
    }
}

const mensagemDestinatario = async (req, resp) =>{
    const id = parseInt(req.params.id)
    const mensagensDestinatario = await prisma.mensagem.findMany({
        where: {
            destinatario_id: id
        },
      })
      return resp.status(200).json(mensagensDestinatario);
}

const criarMensagem = async (req, resp) => {
    const {
        troca_id,
        remetente_id,
        destinatario_id,
        conteudo,
        data_envio } = req.body
    const trocaId = parseInt(troca_id)
    const remetenteId =parseInt(remetente_id)
    const destinatarioId =parseInt(destinatario_id)

    try {    
        const mensagem = await prisma.mensagem.create( {
            data: {
                troca_id: trocaId,
                remetente_id: remetenteId,
                destinatario_id: destinatarioId,
                conteudo: conteudo,
                data_envio: data_envio
            }
        } )
        return resp.status(201).json(mensagem)
        
    } catch (error) {
        console.log(error.message);
        return resp.status(500).json(error.message)
    }

}

module.exports = {
    mensagens,
    mensagemDestinatario,
    criarMensagem
}
