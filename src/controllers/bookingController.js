const catchAsync = require("../utils/catchAsync");
const BOOKING = require("../models/bookingModel");
const AppError = require("../utils/appError");
const USER = require("../models/userModel");
const TOUR = require("../models/tourModel");

exports.getAllBookings = catchAsync(async (req, res, next) => {
  const findAllBookings = await BOOKING.findAll({
    include: [
      {
        model: USER,
        attributes: ["name", "email"],
      },
      {
        model: TOUR,
        attributes: ["name", "price"],
      },
    ],
  });

  if (findAllBookings.length < 0) next(new AppError(404, "No bookings found"));

  res.status(200).json({
    status: "success",
    message: "All bookings",
    findAllBookings,
  });
});

exports.getOneBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const findBookingId = await BOOKING.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: USER,
        attributes: ["name", "email"],
      },
      {
        model: TOUR,
        attributes: ["name", "price"],
      },
    ],
  });

  if (!findBookingId)
    next(new AppError(404, " 🧑🏾‍🚀 No hay resevaciones con este id 🤬 "));

  res.status(200).json({
    status: "success",
    message: "One booking",
    findBookingId,
  });
});

// Se debe crear una reserva, enviar userId, tourId, y price por la req.body
exports.createBooking = catchAsync(async (req, res, next) => {
  const { userId, tourId, price } = req.body;

  console.log(userId, tourId, price);

  // Verificar que el tour exista
  const findTour = await BOOKING.findOne({
    where: {
      id: tourId,
      price: price,
      userId: userId, // Asegúrate de que sea "userId", no "UserId"
    },
  });

  if (!findTour)
    next(new AppError(404, "El tour con el id:${tourId} no existe 🧑🏾‍🚀 "));

  const createBooking = await BOOKING.create({
    tourId,
    price,
    userId, // Agrega userId aquí
  });

  res.status(201).json({
    status: "success",
    message: "Booking created",
    createBooking,
  });
});

exports.updateBooking = catchAsync(async (req, res, next) => {});

exports.deleteBooking = catchAsync(async (req, res, next) => {});
