const { DataTypes } = require("sequelize");
const { db } = require("../db/config");

const LOCATION = db.define("locations", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  lat: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  long: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Del restaurante la Caveja 200 metros este, casa rana",
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Casa rana, casa color verde",
  },
  status: {
    type: DataTypes.ENUM("available", "inavailable"),
    allowNull: false,
    defaultValue: "active",
  },
});

module.exports = LOCATION;
