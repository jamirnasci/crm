const {Sequelize} = require('sequelize');
require('dotenv').config()

const db = new Sequelize(process.env.database, process.env.userdb, process.env.passworddb, {
    host: process.env.hostdb,
    dialect: 'mysql'
})

module.exports = {
  db,
};