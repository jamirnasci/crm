const { DataTypes } = require("sequelize");
const { db } = require("../config/db");

const Interacao = db.define('Interacao', {
    idinteracao: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cliente_idcliente: {type: DataTypes.INTEGER, allowNull: false},
    data: { type: DataTypes.DATEONLY, allowNull: false },
    usuario_idusuario: {type: DataTypes.INTEGER, allowNull: false},
    descricao: { type: DataTypes.TEXT, allowNull: false },
}, {
    tableName: 'interacao',
    timestamps: false
});

Interacao.associate = models => {
    Interacao.belongsTo(models.Cliente, {
        foreignKey: 'cliente_idcliente'
    });
    Interacao.belongsTo(models.Usuario, {
        foreignKey: 'usuario_idusuario'
    });
};

module.exports = Interacao