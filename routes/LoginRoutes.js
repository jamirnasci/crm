const express = require('express')
const router = express.Router()
const loginController = require('../controller/LoginController')
const { verifyToken } = require('../middlewares/VerifyToken')

router.post('/login', loginController.login)
router.get('/logout', loginController.logout)

module.exports = router