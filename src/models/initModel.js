const USER = require("../models/userModel");
const TOUR = require("../models/toursModel");

const initModel = () => {
  // Relacion de Usuarios a Tours
  USER.hasMany(TOUR);
  TOUR.belongsTo(USER);
};

module.exports = initModel;
