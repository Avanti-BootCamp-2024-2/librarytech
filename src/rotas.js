const express = require('express');
const { home } = require('./controladores/home');
const { usuarios, criarUsuario } = require('./controladores/usuarios');

const rotas = express();

rotas.get('/', home);
rotas.get('/usuarios', usuarios);
rotas.post('/usuarios', criarUsuario);



module.exports = rotas;