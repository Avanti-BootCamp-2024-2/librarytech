const express = require('express')
const { usuarios, criarUsuario, editaUsuario, removeUsuario } = require('./controladores/usuarios')
const { livros, criarLivro, editaLivro, removeLivro, concluirTrocaUsuarioLivro } = require('./controladores/livos')
const { trocas, criarTroca } = require('./controladores/trocas')
const { mensagens, criarMensagem, mensagemDestinatario } = require('./controladores/mensagem')
const { listaPost, criaPost } = require('./controladores/post')
const { login } = require('./controladores/login')
const verificaUsuarioLogado = require('./intermediarios/autenticacao')

const router = express.Router()

// define a rota da homepage
router.get('/', (req, res) => {
    res.send('Homepage de pássaros')
})
router.post('/login', login)

router.get('/usuarios', verificaUsuarioLogado, usuarios)
router.post('/usuario', criarUsuario);
router.put('/usuario/:id', editaUsuario);
router.delete('/usuario/:id', removeUsuario);

router.get('/livros', livros)
router.post('/livro', criarLivro);
router.put('/livro/:id', editaLivro);
router.delete('/livro/:id', removeLivro);

router.get('/trocas', trocas)
router.post('/troca', criarTroca);
router.put('/troca', concluirTrocaUsuarioLivro);
// router.delete('/troca/:id', removeTroca);

router.get('/mensagem', mensagens)
router.get('/mensagem/:id', mensagemDestinatario)
router.post('/mensagem', criarMensagem);

router.get('/posts/:id', listaPost)
router.post('/post', criaPost);

module.exports = router

