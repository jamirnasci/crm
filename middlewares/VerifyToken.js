const jwt = require('jsonwebtoken')

function verifyToken(req, res, next){
    const token = req.cookies['token']
    if(!token){
        res.redirect('/')
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.userId = decoded.id
        next()
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

module.exports = {
    verifyToken
}