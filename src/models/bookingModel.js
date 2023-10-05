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
    // Pending: hizo una reserva pero el monto con el que aparto la reserva, no es el monto de lo que vale el tour, si no una parte. (este monto es el Price que esta en la tabla booking)

    // Completed: Cuando se hace la reserva y se cancela o paga todo el monto de lo que vale el tour el status es completed

    // Cancelled: cuando se cancela una reserva

    type: DataTypes.ENUM("pending", "completed", "cancelled"),
    allowNull: false,
    defaultValue: "pending",
  },
});

module.exports = BOOKING;
