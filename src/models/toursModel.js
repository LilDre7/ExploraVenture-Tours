const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const ModelName = db.define("modelName", {
  field1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ModelName;
