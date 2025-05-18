const { DataTypes } = require("sequelize");
const { db } = require("../config/db");

const Fornecedor = db.define('Fornecedor', {
    idfornecedor: { type: DataTypes.INTEGER, primaryKey: true },
    nome: { type: DataTypes.STRING(45), allowNull: false },
    cep: { type: DataTypes.STRING(45), allowNull: false },
    telefone: { type: DataTypes.STRING(45), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false }
}, {
    tableName: 'fornecedor',
    timestamps: false
});

module.exports = Fornecedor;