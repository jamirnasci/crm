const { Op } = require('sequelize')
const { db } = require('../config/db')
const Cliente = require('../models/Cliente')
const Interacao = require('../models/Interacao')

const dashboard = (req, res)=>{
    res.render('dashboard')
}

const loadData = async (req, res)=>{
    
    const frios = await Cliente.count({ where:{ status: 'frio' }})
    const mornos = await Cliente.count({ where:{ status: 'morno' }})
    const quentes = await Cliente.count({ where:{ status: 'quente' }})

    let dates = [];
    for (let i = 0; i < 5; i++) {
        const data = new Date();
        data.setDate(data.getDate() - i);
        data.setHours(0, 0, 0, 0); // Zera a hora para comparar apenas a data
    
        const dataFim = new Date(data);
        dataFim.setDate(dataFim.getDate() + 1); // Próximo dia às 00:00
    
        const interacoes = await Interacao.count({
            where: {
                data: {
                    [Op.gte]: data, // Maior ou igual ao início do dia
                    [Op.lt]: dataFim // Menor que o início do próximo dia
                }
            }
        });
    
        dates.push({
            data: data, // Formato DD/MM/YYYY
            count: interacoes
        });
    }

    const [somaFrio] = await db.query("SELECT SUM(p.preco) as soma_frio FROM cliente c inner join produto p on p.idproduto = c.produto_idproduto WHERE c.status = 'frio';")
    const [somaMorno] = await db.query("SELECT SUM(p.preco) as soma_morno FROM cliente c inner join produto p on p.idproduto = c.produto_idproduto WHERE c.status = 'morno';")
    const [somaQuente] = await db.query("SELECT SUM(p.preco) as soma_quente FROM cliente c inner join produto p on p.idproduto = c.produto_idproduto WHERE c.status = 'quente';")
    
    res.json({
        frios: frios,
        mornos: mornos,
        quentes: quentes,
        interacoes: dates,
        somaFrio: somaFrio[0].soma_frio,
        somaMorno: somaMorno[0].soma_morno,
        somaQuente: somaQuente[0].soma_quente
    })
}

module.exports = {
    dashboard,
    loadData
}