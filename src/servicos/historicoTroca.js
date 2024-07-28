const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const historicoTroca = (troca) =>{
    const data =
    [
        {data: {
            usuario_id: troca.solicitante_id,
            troca_id: troca.id
        }},
        {data: {
            usuario_id: troca.receptor_id,
            troca_id: troca.id,
        }}
    ];
    
    data.forEach( async (htroca) => {
        await prisma.historicoTroca.create(htroca)
    });
}
module.exports = historicoTroca;
