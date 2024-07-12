const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  wallet: { type: DataTypes.STRING, allowNull: true },
  password: { type: DataTypes.STRING, allowNull: false },
  refreshToken: { type: DataTypes.STRING, allowNull: false },
  accessToken: { type: DataTypes.STRING, allowNull: false },
});

module.exports = {
  User,
};
