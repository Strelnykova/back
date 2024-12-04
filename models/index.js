const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('inventory_management', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});

  module.exports = sequelize;