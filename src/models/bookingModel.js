const { DataTypes } = require("sequelize");
const { db } = require("../db/config");

const BOOKING = db.define("bookings", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  tourId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
