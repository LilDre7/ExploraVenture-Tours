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
  const { id } = req.params;
  const { review, rating } = req.body;
  const { tourId } = req.session.user;

  const findTour = await Review.findOne({ where: { tourId: id } });

  const newReview = await findTour.create({
    review,
    rating,
    tourId: id,
  });

  res.status(201).json({
    status: "success",
    message: ` ⚔️ Tu review fue creada con exito, felicidades 🎈 `,
    review: {
      newReview: newReview,
    },
  });
});

exports.updateReviewTour = catchAsync(async (req, res, next) => {});

exports.deleteReviewTour = catchAsync(async (req, res, next) => {});
