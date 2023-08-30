const TOUR = require("../models/toursModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const REVIEW = require("../models/reviewsModel");

exports.getAllTours = catchAsync(async (req, res, next) => {
  const tours = await TOUR.findAll({
    status: "active",
  });

  if (tours >= 0)
    next(new AppError(" 🧨 No hay ningun tour en la base de datos 🧨 ", 404));

  res.status(200).json({
    status: "success",
    data: {
      tours,
    },
  });
});

exports.getTourById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const findTour = await TOUR.findOne({
    where: {
      id: id,
    },
    include: {
      model: REVIEW,
      attributes: ["review", "rating"],
    },
  });

  if (!findTour)
    next(new AppError(` 🧨 El id: ${id} no existe intente nuevamente 🧨 `));

  res.status(200).json({
    status: "success",
    message: `Aqui el tour buscando con el id:${id} 🌞🪴 `,
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const {
    name,
    slug,
    duration,
    maxGroupSize,
    difficulty,
    ratingsAverage,
    ratingsQuantity,
    price,
    priceDiscount,
    summary,
    imageCover,
    startDates,
    startLocationId,
    locationsId,
    guidesId,
  } = req.body;

  const newTour = await TOUR.create({
    name,
    slug,
    duration,
    maxGroupSize,
    difficulty,
    ratingsAverage,
    ratingsQuantity,
    price,
    priceDiscount,
    summary,
    imageCover,
    startDates,
    startLocationId,
    locationsId,
    guidesId,
  });

  if (!newTour)
    next(new AppError(" 🧨 Hubo un error al crear el tour deseado 🧨", 404));

  res.status(201).json({
    status: "success",
    message: ` 🌚🌞 Aqui el tour creado con el id:${newTour.id} felicidades por tu tour 🌞🌚 `,
    data: {
      tour: newTour,
    },
  });
});

exports.updateTourById = catchAsync(async (req, res, next) => {});

exports.deleteTourById = catchAsync(async (req, res, next) => {});
