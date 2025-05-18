const joi = require('joi')

const userSchema = joi.object({ 
    nome: joi.string().required(), 
    sobrenome: joi.string().required(), 
    email: joi.string().required(), 
    cpf: joi.string().required(), 
    telefone: joi.string().required(),
    senha: joi.string().required()
})

module.exports = {
    userSchema
}