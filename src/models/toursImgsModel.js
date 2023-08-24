const { DataTypes } = require("sequelize");
const { db } = require("../db/config");

const tourImg = db.define("toursImgs", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  url: {
    type: DataTypes.STRING,
    autoIncrement: true,
    allowNull: false,
  },
  toursId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
});

module.exports = tourImg;
