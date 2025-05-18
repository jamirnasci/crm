const { DataTypes } = require("sequelize");
const { db } = require("../config/db");

const Cliente = db.define('Cliente', {
    idcliente: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(45), allowNull: false },
    sobrenome: { type: DataTypes.STRING(100), allowNull: false },
    telefone: { type: DataTypes.STRING(45), allowNull: false },
    email: { type: DataTypes.STRING(45), allowNull: false, unique: true },
    cpf: { type: DataTypes.STRING(11), allowNull: false, unique: true },
    renda: { type: DataTypes.DECIMAL(19, 4), allowNull: false },
    status: { type: DataTypes.STRING(45), allowNull: false },
    criacao: { type: DataTypes.DATEONLY, allowNull: false },
    prox_interacao: { type: DataTypes.DATEONLY },
    descricao: { type: DataTypes.TEXT },
    produto_idproduto: {type: DataTypes.INTEGER, allowNull: false}
}, {
    tableName: 'cliente',
    timestamps: false
});

module.exports = Cliente;