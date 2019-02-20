const Sequelize = require('sequelize');

const config = require('./config');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    dialect: config.DIALECT,
    host: config.HOST,
    operatorsAliases: false
});

module.exports = sequelize;