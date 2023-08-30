const TOURS = require("../models/tourModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const REVIEW = require("../models/reviewsModel");

exports.getAllTours = catchAsync(async (req, res, next) => {
  const tours = await TOURS.findAll();

  if (tours >= 0)
    next(new AppError(" 🧨 No hay ningun tour en la base de datos 🧨 ", 404));

  res.status(200).json({
    status: "success",
    message: "Aqui todos los tours de la base de datos 🌞🦧 ",
    length: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTourById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const findTour = await TOURS.findOne({
    where: {
      id: id,
    },
    attributes: ["summary", "startLocationId", "startDates", "imageCover"],
    include: {
      model: REVIEW,
    },
  });

  if (!findTour)
    next(new AppError(` 🧨 El id: ${id} no existe intente nuevamente 🧨 `));

  res.status(200).json({
    status: "success",
    message: `Aqui el tour buscando con el id:${id} 🌞🪴 `,
    dataTour: {
      findTour: findTour,
    },
    dataReviews: {
      reviews: findTour.reviews,
    },
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

  const newTour = await TOURS.create({
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

  const tourFilter = await TOURS.findOne({
    where: {
      newTour: newTour.guidesId,
      guidesId: newTour.guidesId,
    },
  });

  if (tourFilter && tourFilter.id !== newTour.guidesId) {
    // El id del guía es diferente al que se envía por Postman, procede con la consulta
  } else {
    // El id del guía es igual al que se envía por Postman, devuelve un error o realiza alguna acción necesaria
  }

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
