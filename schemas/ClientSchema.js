const joi = require('joi')

const clientSchema = joi.object({
    nome: joi.string().required(), 
    sobrenome: joi.string().required(), 
    telefone: joi.string().required(), 
    email: joi.string().required(), 
    cpf: joi.string().required(), 
    status: joi.string().required(), 
    renda: joi.number().required(), 
    criacao: joi.date().required(), 
    prox_interacao: joi.date().required(), 
    descricao: joi.string().required(),
    produto_idproduto: joi.number().required()
})

module.exports = {
    clientSchema
}