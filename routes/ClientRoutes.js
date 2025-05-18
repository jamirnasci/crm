const express = require('express')
const { verifyToken } = require('../middlewares/VerifyToken')
const clienteController = require('../controller/ClienteController')
const router = express.Router()

router.use(verifyToken)

router.get('/clientes', verifyToken, clienteController.clientes)
router.post('/cliente/create', verifyToken, clienteController.createCliente)
router.post('/cliente/procurar', verifyToken, clienteController.procurarClientes)
router.delete('/cliente/delete/:id', verifyToken, clienteController.deleteCliente)
router.post('/cliente/detalhes/:id', verifyToken, clienteController.detalhesClientes)
router.post('/cliente/update/:id', verifyToken, clienteController.updateCliente)
router.get('/cliente/interacao/:id', verifyToken, clienteController.interacoesCliente)
router.post('/cliente/interacao/:id', verifyToken, clienteController.insertInteracao)

module.exports = router