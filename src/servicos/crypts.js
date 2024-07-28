const bcrypt = require('bcryptjs');

const encryptSenha = async (senha) => await bcrypt.hash(senha, 8);
const dencryptSenha = async (senha, senhaEncriptada) => await bcrypt.compare(senha, senhaEncriptada);



module.exports = {
    encryptSenha,
    dencryptSenha
}

// encriptar

// descript