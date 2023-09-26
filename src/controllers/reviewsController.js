const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Review = require("../models/reviewsModel");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const allReviews = await Review.findAll();

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

  const findReview = await Review.findOne({ where: { id: id } });

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

const REVIEW = require("../models/reviewsModel"); // Asegúrate de importar tu modelo de revisión aquí

exports.createReviewForTour = async (req, res, next) => {
  try {
    const { tourId } = req.params; // Obtener el tourId de los parámetros de la URL
    const { review, rating } = req.body; // Obtener la revisión y la calificación del cuerpo de la solicitud
    const { id } = req.sessionUser;

    // Validar que el tourId exista en la base de datos
    const findTour = await REVIEW.findOne({ where: { tourId: tourId } });

    // Crear una nueva revisión en la base de datos
    const newReview = await findTour.create({
      userId: id,
      tourId,
      review,
      rating,
    });

    res.status(201).json({
      status: "success",
      message: "Tu revisión ha sido creada con éxito ✅",
      review: newReview,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateReviewTour = catchAsync(async (req, res, next) => {});

exports.deleteReviewTour = catchAsync(async (req, res, next) => {});
