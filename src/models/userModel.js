const { DataTypes } = require("sequelize");
const { db } = require("../db/config");

const USER = db.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "https://i.imgur.com/1J0X8Xo.png",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordChangeAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM("user", "admin", "superadmin"),
    allowNull: false,
    defaultValue: "user",
  },
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    allowNull: false,
    defaultValue: "active",
  },
});

module.exports = USER;
