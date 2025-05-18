const { DataTypes } = require("sequelize");
const { db } = require("../config/db");

const Produto = db.define('Produto', {
    idproduto: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(100), allowNull: false },
    preco: { type: DataTypes.DECIMAL(19, 4), allowNull: false },
    marca: { type: DataTypes.STRING(45), allowNull: false },
    quantidade: { type: DataTypes.INTEGER, allowNull: false },
    descricao: { type: DataTypes.TEXT },
    img_url: { type: DataTypes.STRING(250) },
}, {
    tableName: 'produto',
    timestamps: false
});

module.exports = Produto