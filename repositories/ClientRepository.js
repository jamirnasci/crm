const { db } = require("../config/db");


async function insertClient(client){
    const sql = `INSERT INTO crm.cliente(
        nome,
        sobrenome,
        telefone,
        email,
        cpf,
        status,
        renda,
        criacao,
        prox_interacao,
        descricao,
        produto_idproduto
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?);
    `
    const data = [
        user.nome, 
        user.sobrenome, 
        user.telefone, 
        user.email, 
        user.cpf, 
        user.status, 
        user.renda, 
        new Date(), 
        user.prox_interacao, 
        user.descricao, 
        user.produto_idproduto
    ]
    try {
        const [result] = await db.execute(sql, data)
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    insertClient
}