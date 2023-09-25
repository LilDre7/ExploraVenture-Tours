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

exports.createReviewForTour = catchAsync(async (req, res, next) => {
  // El tourId es el id del tour al cual se le creara la review.
  const { tourId } = req.params;
  const { review, rating } = req.body;
  // EL userId se debe obtener del usuario en sesion
  const { userId } = req.session.user;

  const findTourdId = await Review.findOne({ where: { tourId: tourId } });

  const newReview = await findTourdId.create({
    where: {
      review: review,
      rating: rating,
    },
  });

  res.status(201).json({
    status: "success",
    message: "Tu review fue creada con exito ✅",
    review: {
      newReview: newReview,
    },
  });
});

exports.updateReviewTour = catchAsync(async (req, res, next) => {});

exports.deleteReviewTour = catchAsync(async (req, res, next) => {});
