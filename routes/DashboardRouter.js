const express = require('express')
const { verifyToken } = require('../middlewares/VerifyToken')
const router = express.Router()
const dashboardController = require('../controller/DashboardController')

router.use(verifyToken)

router.get('/dashboard', verifyToken, dashboardController.dashboard)
router.post('/dashboard', verifyToken, dashboardController.loadData)

module.exports = router