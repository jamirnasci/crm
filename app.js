const express = require('express')
const app = express()
const ejs = require('ejs')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')
const { db } = require('./config/db')
const Usuario = require('./models/Usuario')
const bcrypt = require('bcrypt')
const clienteRoutes = require('./routes/ClientRoutes')
const produtoRoutes = require('./routes/ProdutoRoutes')
const loginRoutes = require('./routes/LoginRoutes')
const dashboardRoutes = require('./routes/DashboardRouter')
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

app.use(loginRoutes)
app.use(clienteRoutes)
app.use(dashboardRoutes)
app.use(produtoRoutes)

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))