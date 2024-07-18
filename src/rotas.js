const express = require('express')
const { usuarios, criarUsuario, editaUsuario, removeUsuario } = require('./controladores/usuarios')
const router = express.Router()

// define a rota da homepage
router.get('/', (req, res) => {
    res.send('Homepage de pássaros')
})

router.get('/usuarios', usuarios)
router.post('/usuario', criarUsuario);
router.put('/usuario/:id', editaUsuario);
router.delete('/usuario/:id', removeUsuario);



module.exports = router

