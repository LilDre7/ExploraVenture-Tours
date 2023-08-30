const USER = require("../models/userModel");
const TOUR = require("../models/toursModel");
const REVIEW = require("../models/reviewsModel");

const initModel = () => {
  // Relacion de Usuarios a Tours
  USER.hasMany(TOUR);
  TOUR.belongsTo(USER);

  // Relacion de tours a reviews
  TOUR.hasMany(REVIEW);
  REVIEW.belongsTo(TOUR);

  // Relacion de Usuarios a reviews
};

module.exports = initModel;
