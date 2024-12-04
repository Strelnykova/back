const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const UsedResources = sequelize.define("UsedResources", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantityUsed: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT, 
    allowNull: true,
  },
  resourceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Resources',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  unitId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Units', 
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', 
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
});

module.exports = UsedResources;
