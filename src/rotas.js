const express = require('express');
const { home } = require('./controladores/home');
const { usuarios } = require('./controladores/usuarios');

const rotas = express();

rotas.get('/', home);
rotas.get('/usuarios', usuarios);


module.exports = rotas;