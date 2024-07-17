const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  refreshToken: { type: DataTypes.STRING, allowNull: false },
});

const Profile = sequelize.define("profile", {
  userId: { type:DataTypes.INTEGER, unique:true, allowNull:false },
  lastTimeSynchronization: { type: DataTypes.INTEGER, allowNull: false },
  coinCount: {type: DataTypes.DOUBLE, allowNull:false},
  wordCount: {type: DataTypes.INTEGER, allowNull:false},
  upgrades: {type:DataTypes.JSON}
});

User.belongsTo(Profile);


module.exports = {
  User,
  Profile
};
