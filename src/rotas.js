const express = require('express')
const { usuarios, criarUsuario, editaUsuario, removeUsuario } = require('./controladores/usuarios')
const { livros, criarLivro, editaLivro, removeLivro, concluirTrocaUsuarioLivro } = require('./controladores/livos')
const { trocas, criarTroca } = require('./controladores/trocas')
const { mensagens, criarMensagem, mensagemDestinatario } = require('./controladores/mensagem')
const { listaPost, criaPost } = require('./controladores/post')
const { login } = require('./controladores/login')
const verificaUsuarioLogado = require('./intermediarios/autenticacao')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Troca de Livros')
})
router.post('/login', login)

router.get('/usuarios', verificaUsuarioLogado, usuarios)
router.post('/usuario', criarUsuario);
router.put('/usuario/:id', verificaUsuarioLogado, editaUsuario);
router.delete('/usuario/:id',verificaUsuarioLogado, removeUsuario);

router.get('/livros', livros)
router.post('/livro', verificaUsuarioLogado, criarLivro);
router.put('/livro/:id', verificaUsuarioLogado, editaLivro);
router.delete('/livro/:id', verificaUsuarioLogado, removeLivro);

router.get('/trocas', verificaUsuarioLogado, trocas)
router.post('/troca', verificaUsuarioLogado, criarTroca);
router.put('/troca', verificaUsuarioLogado, concluirTrocaUsuarioLivro);

router.get('/mensagem', verificaUsuarioLogado, mensagens)
router.get('/mensagem/:id', verificaUsuarioLogado, mensagemDestinatario)
router.post('/mensagem', verificaUsuarioLogado, criarMensagem);

router.get('/posts/:id', verificaUsuarioLogado, listaPost)
router.post('/post', verificaUsuarioLogado, criaPost);

module.exports = router

