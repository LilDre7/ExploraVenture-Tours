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

  // Verificar que el tour exista
  const findTour = await BOOKING.findOne({
    where: {
      id: tourId,
      price: price,
      userId: userId, // Asegúrate de que sea "userId", no "UserId"
    },
  });

  console.log(findTour);

  if (!findTour)
    next(new AppError(`El tour con el id:${tourId} no existe 🧑🏾‍🚀 `, 404));

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

/* Se debe poder actualizar una reserva, solo se podrá actualizar el precio,
enviarlo por la req.body, solo el usuario que hizo la reserva puede
modificarla.
*/

exports.updateBooking = catchAsync(async (req, res, next) => {
  const { price } = req.body;
  const { id } = req.params;

  const findPrice = await BOOKING.findOne({
    where: {
      status: "pending",
      id: id,
    },
  });

  if (!findPrice)
    next(
      new AppError(`El id: ${id} no existe en nuestras reservacion ❌🤬 `, 404)
    );

  if (price <= 50)
    next(
      new AppError(
        "¡La reserva tiene un valor minimo de 50$, pura vida! 😀✌🏾 ",
        404
      )
    );

  const updateBooking = await BOOKING.update(
    {
      price: price,
    },
    {
      where: {
        id,
      },
    }
  );

  res.status(200).json({
    status: "success",
    message: "El precio de la reserva se actualizo correctamente 🏆🚀 ",
    NuevoPrecio: updateBooking.price,
  });
});

// Se debe poder cancelar una reserva, modificar el status a cancelled, solo el
// usuario que hizo la reserva puede eliminarla.
exports.deleteBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const findBookingId = await BOOKING.findOne({
    where: {
      status: "pending",
      id: id,
    },
  });

  if (!findBookingId)
    next(
      new AppError(`El id: ${id} no existe en nuestras reservacion ❌🤬 `, 404)
    );

  const updateBooking = await findBookingId.update({
    status: "cancelled",
  });

  res.status(200).json({
    status: "success",
    message: "Booking deleted",
    updateBooking,
  });
});
