const USER = require("../models/userModel");
const TOUR = require("../models/tourModel");
const REVIEW = require("../models/reviewsModel");
const BOOKING = require("../models/bookingModel");

const initModel = () => {
  // Relacion de Usuarios a Tours
  USER.hasMany(TOUR);
  TOUR.belongsTo(USER);

  // Relacion de tours a reviews
  TOUR.hasMany(REVIEW);
  REVIEW.belongsTo(TOUR);

  // Relacion de Usuarios a reviews
  USER.hasMany(REVIEW);
  REVIEW.belongsTo(USER);

  // Relacion entre BOOKING Y RESERVAS
  BOOKING.hasMany(REVIEW);
  REVIEW.belongsTo(BOOKING);

  // Relacion de Usuarios a Tours
  USER.hasMany(BOOKING); // Un usuario puede hacer varias reservas
  BOOKING.belongsTo(USER); // Cada reserva pertenece a un usuario

  // Relacion de Tours a Bookings
  TOUR.hasMany(BOOKING); // Un tour puede tener varias reservas
  BOOKING.belongsTo(TOUR); // Cada reserva pertenece a un tour
};

module.exports = initModel;
