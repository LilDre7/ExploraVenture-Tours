const { DataTypes, Sequelize, DATEONLY } = require("sequelize");
const { db } = require("../db/config");

const TOURS = db.define("Tour", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: false,
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: "Playas del Coco",
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    defaultValue: "Babosa",
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  maxGroupSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  difficulty: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Easy",
  },
  ratingsAverage: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  ratingsQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  priceDiscount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  summary: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "No hay viaje",
  },
  imageCover: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "https://i.imgur.com/1J0X8Xo.png",
  },
  startDates: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "No hay inicio disponible",
  },
  startLocationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  locationsId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  guidesId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    primaryKey: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "confirmed", "deleted"),
    allowNull: false,
    defaultValue: "pending",
  },
});

module.exports = TOURS;
