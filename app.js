const express = require('express')
const app = express()
const ejs = require('ejs')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')
const { db } = require('./config/db')
const Usuario = require('./models/Usuario')
const bcrypt = require('bcrypt')
const dashboardController = require('./controller/DashboardController')
const produtoController = require('./controller/ProdutoController')
const loginController = require('./controller/LoginController')
const clienteController = require('./controller/ClienteController')
const {verifyToken} = require('./middlewares/VerifyToken')
require('dotenv').config()

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

db.authenticate()
    .then((res)=>{
        console.log('Database connection has been established successfully.')
    })
    .catch((err)=>{
        console.log(err)
    })
db.sync()
    .then((res)=>{
        console.log('Database synchronized.')
    })
    .catch((err)=>{
        console.log(err)
    })

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/user/create', async (req, res) => {
    try {
        await Usuario.create({
            nome: 'Pastel',
            sobrenome: 'Amarelo',
            email: 'pastel@gmail.com',
            cpf: '11122233311',
            telefone: '3213131332112',
            senha: await bcrypt.hash('111', 10)
        })
        res.status(200).send('User created successfully')
    } catch(error) {
        console.log(error)
        res.status(500).send('Error creating user')
    }
})

app.post('/login', loginController.login)
app.get('/logout', loginController.logout)
app.get('/clientes', verifyToken, clienteController.clientes)
app.get('/produtos', verifyToken, produtoController.produtos)
app.post('/cliente/create', verifyToken, clienteController.createCliente)
app.post('/cliente/procurar', verifyToken, clienteController.procurarClientes)
app.delete('/cliente/delete/:id', verifyToken, clienteController.deleteCliente)
app.post('/cliente/detalhes/:id', verifyToken, clienteController.detalhesClientes)
app.post('/cliente/update/:id', verifyToken, clienteController.updateCliente)
app.get('/cliente/interacao/:id', verifyToken, clienteController.interacoesCliente)
app.post('/produtos/insert', verifyToken, produtoController.insertProduct)
app.post('/produtos/procurar', verifyToken, produtoController.procurarProduto)
app.post('/produto/detalhes/:id', verifyToken, produtoController.detalhesProduto)
app.put('/produto/update/:id', verifyToken, produtoController.updateProduct)
app.get('/dashboard', verifyToken, dashboardController.dashboard)
app.post('/dashboard', verifyToken, dashboardController.loadData)
app.post('/cliente/interacao/:id', verifyToken, clienteController.insertInteracao)

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))