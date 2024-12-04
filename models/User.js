const { DataTypes } = require("sequelize");
const sequelize = require("./index.js");
const Unit = require("./Unit");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("admin", "contractor"),
    allowNull: false,
  },
});

User.belongsTo(Unit, { foreignKey: "unitId", onDelete: "CASCADE" });

module.exports = User;
