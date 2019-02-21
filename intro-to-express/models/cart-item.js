const Sequelize = require('sequelize');

const sequelize = require('../utility/database');

const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    qty: Sequelize.INTEGER
});

module.exports = CartItem;