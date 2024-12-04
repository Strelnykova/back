const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Resource = sequelize.define("Resource", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  unit: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: "Units", 
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Resource;
