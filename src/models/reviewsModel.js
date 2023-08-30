const { DataTypes } = require("sequelize");
const { db } = require("../db/config");

const REVIEW = db.define("Reviews", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  review: {
    defaultValue: "No review",
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  tourId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "confirmed", "canceled"),
    allowNull: false,
    defaultValue: "pending",
  },
});

module.exports = REVIEW;
