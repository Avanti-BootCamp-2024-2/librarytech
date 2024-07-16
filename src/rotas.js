const express = require('express');
const { home } = require('./controladores/home');
const { usuarios, criarUsuario, editaUsuario, removeUsuario } = require('./controladores/usuarios');

const rotas = express();

rotas.get('/', home);
rotas.get('/usuarios', usuarios);
rotas.post('/usuario', criarUsuario);
rotas.put('/usuario/:id', editaUsuario);
rotas.delete('/usuario/:id', removeUsuario);

module.exports = rotas;