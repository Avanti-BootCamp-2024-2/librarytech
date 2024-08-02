const joi = require('joi');

const usuario = joi.object({
  nome: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  senha: joi.string().min(4).max(6).required()
});

module.exports = usuario;