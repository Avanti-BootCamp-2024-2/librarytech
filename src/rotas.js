const express = require('express')
const { usuarios, criarUsuario, editaUsuario, removeUsuario } = require('./controladores/usuarios')
const { livros, criarLivro, editaLivro, removeLivro } = require('./controladores/livos')
const router = express.Router()

// define a rota da homepage
router.get('/', (req, res) => {
    res.send('Homepage de pássaros')
})

router.get('/usuarios', usuarios)
router.post('/usuario', criarUsuario);
router.put('/usuario/:id', editaUsuario);
router.delete('/usuario/:id', removeUsuario);

router.get('/livros', livros)
router.post('/livro', criarLivro);
router.put('/livro/:id', editaLivro);
router.delete('/livro/:id', removeLivro);



module.exports = router

