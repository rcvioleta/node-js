const Sequelize = require('sequelize');

const sequelize = require('../utility/database');

const CartItem = sequelize.define('cart-item', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    qty: Sequelize.INTEGER
});

module.exports = CartItem;