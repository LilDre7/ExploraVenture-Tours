const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const REVIEW = require("../models/reviewsModel");
const TOURS = require("../models/tourModel");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const allReviews = await REVIEW.findAll();

  if (allReviews <= 0)
    next(new AppError(" 🧨 No hay reviews realizadas 🧨 ", 404));

  res.status(200).json({
    status: "success",
    message: "Aqui todas las reviews creada por tu perfil 🧍🏾‍♂️🔍 ",
    reviews: {
      allReviews: allReviews,
    },
  });
});

exports.getReviewForId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const findReview = await REVIEW.findOne({ where: { id: id } });

  if (findReview <= 0)
    next(new AppError(`🧨 La review con el id:${id} no existe 🧨 `, 404));

  res.status(200).json({
    status: "success",
    message: `Aqui tu review solicitada con el id:${id} 🌞🔍 `,
    review: {
      findReview: findReview,
    },
  });
});

exports.createReviewForTour = catchAsync(async (req, res, next) => {
  // Debo obtener el userId que es el id del usuario
  const userId = req.sessionUser.id;
  // Debo obtener el tourId que es el id del tour
  const { tourId } = req.params;
  console.log(tourId);
  // Obtener del req.body -> review, rating
  const { review, rating } = req.body;

  // Verificar que el tour que vaya hacer el review exista
  const findTour = await TOURS.findOne({ where: { id: tourId } });

  // Verificar que el tour exista
  if (!findTour)
    next(new AppError(`El tour con el id:${tourId} no existe 🤬 `, 404));

  // Crear la review para el tour deseado
  const createReview = await REVIEW.create({
    review,
    rating,
    tourId,
    userId, // Agregar userId aquí
  });

  // Enviar la review creada
  res.status(201).json({
    status: "success",
    message: "Aqui tu review fue creada con éxito, gracias por tu mensaje 🙀",
    review: {
      createReview: createReview,
    },
  });
});

// ** Antes de actualizar o eliminar cualquier review verificar que el tour exista y que la review exista  ** //

exports.updateReviewTour = catchAsync(async (req, res, next) => {
  // Debo obtener el userId que es el id del usuario
  const { id } = req.params;
  const { review, rating } = req.body;
  const { tourId } = req.params;

  // Verificar el userId si exista
  const findTour = await TOURS.findOne({ where: { id: tourId } });

  // Verificar que el tour exista
  if (!findTour)
    next(new AppError(`El tour con el id:${tourId} no existe 🤬 `, 404));

  const updateReview = await REVIEW.update(
    {
      review,
      rating,
    },
    { where: { id: id } }
  );

  if (updateReview <= 0)
    next(
      new AppError(
        `La review con el id:${id} no existe intenta nuevamente 😬🌞 `,
        404
      )
    );

  res.status(200).json({
    status: "success",
    message: `Tu review con el id:${id} fue actualizada con éxito🏆 `,
    review: {
      updateReview: updateReview,
    },
  });
});

exports.deleteReviewTour = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { tourId } = req.params;

  const findTour = await TOURS.findOne({ where: { id: tourId } });

  // Verificar que el tour exista
  if (!findTour)
    next(new AppError(`El tour con el id:${tourId} no existe 🤬 `, 404));

  // Verificar que la review exista
  const findReview = await REVIEW.findOne({ where: { id: id } });
  if (!findReview)
    next(
      new AppError(
        `La review con el id:${id} no existe, intentanuevamente 😬⚔️`,
        404
      )
    );

  if (REVIEW.status === "canceled")
    next(
      new AppError(
        `La review con el id:${id} ya fue cancelada su review 🤬 `,
        404
      )
    );

  await REVIEW.update(
    {
      status: "canceled",
    },
    { where: { id: id } }
  );

  res.status(200).json({
    status: "success",
    message: `Tu review con el id:${id} fue eliminada con éxito  🏆 `,
  });
});
