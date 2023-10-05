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

  // Validar si ya existe un tour con el mismo guidesId
  const existingTour = await TOURS.findOne({
    where: {
      guidesId: guidesId,
    },
  });

  if (existingTour)
    next(new AppError(" 🧍🏾‍♂️ El guía ya tiene asignado un tour. 🧗🏾‍♂️ ", 400));

  // Crear el nuevo tour si no existe conflicto
  const newTour = await TOURS.create({
    name,
    slug,
    duration,
    maxGroupSize,
    difficulty,
    ratingsAverage,
    ratingsQuantity,
    // Se debe crear un precio por defecto para el tour 💰
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
    next(new AppError(" 🧨 Hubo un error al crear el tour deseado. 🧨 ", 404));

  res.status(201).json({
    status: "success",
    message: ` 🧿 Tour creado con el id: ${newTour.id} felicidades 🎈🌞 `,
    data: {
      tour: newTour,
    },
  });
});

exports.updateTourById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
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

  const findOneUser = await TOURS.findOne({
    where: {
      id: id,
    },
  });

  if (!findOneUser)
    next(new AppError(`El id:${id} no existe intente nuevamente  🌞⚔️`, 404));

  const updateInfoTour = await findOneUser.update({
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

  res.status(200).json({
    status: "success",
    message: "Tu informacion del tour se actualizo con exito ✅",
    data: {
      updateInfoTour: updateInfoTour,
    },
  });
});

exports.deleteTourById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const findTourId = await TOURS.findOne({
    where: {
      id: id,
    },
  });

  if (!findTourId)
    next(
      new AppError(
        ` 🧨 El id:${id} buscado no existe intenta nuevamente 🧨 `,
        404
      )
    );

  const deleteTour = await findTourId.update({
    status: "deleted",
  });

  res.status(200).json({
    status: "success",
    message: " ⚔️ Tu tour se elimino con exito, espero vuelvas pronto  ⚔️ ",
    data: {
      deleteTour: deleteTour,
    },
  });
});
