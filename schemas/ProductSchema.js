const joi = require('joi')

const productSchema = joi.object({
    idproduto: joi.number(), 
    nome: joi.string().required(), 
    preco: joi.number().required(), 
    marca: joi.string().required(),
    quantidade: joi.number().required(), 
    descricao: joi.number(), 
    img_url: joi.string(),
})

module.exports = {
    productSchema
}