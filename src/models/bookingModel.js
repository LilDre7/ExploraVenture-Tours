const { DataTypes } = require("sequelize");
const { db } = require("../db/config");

const BOOKING = db.define("bookings", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  tourId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "confirmed", "canceled"),
    allowNull: false,
    defaultValue: "pending",
  },
});

module.exports = BOOKING;
