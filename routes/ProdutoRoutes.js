const express = require('express')
const { verifyToken } = require('../middlewares/VerifyToken')
const router = express.Router()
const produtoController = require('../controller/ProdutoController')

router.use(verifyToken)

router.get('/produtos', verifyToken, produtoController.produtos)
router.post('/produtos/insert', verifyToken, produtoController.insertProduct)
router.post('/produtos/procurar', verifyToken, produtoController.procurarProduto)
router.post('/produto/detalhes/:id', verifyToken, produtoController.detalhesProduto)
router.put('/produto/update/:id', verifyToken, produtoController.updateProduct)

module.exports = router