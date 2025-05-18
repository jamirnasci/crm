const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const Usuario = db.define('usuario', {
  idusuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(45), allowNull: false },
  sobrenome: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  cpf: { type: DataTypes.STRING(11), allowNull: false, unique: true },
  telefone: { type: DataTypes.STRING(45), allowNull: false },
  senha: { type: DataTypes.STRING(45), allowNull: false }
}, {
  tableName: 'usuario',
  timestamps: false
});

module.exports = Usuario;