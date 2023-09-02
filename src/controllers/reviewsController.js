const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Review = require("../models/reviewsModel");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const allReviews = await Review.findAll();

  if (allReviews > 0) next(new AppError(" 🧨 No hay reviews realizadas 🧨 "));

  res.status(200).json({
    status: "success",
    message: "Aqui todas las reviews creada por tu perfil 🧍🏾‍♂️🔍 ",
    reviews: {
      allReviews: allReviews,
    },
  });
});

exports.getReviewForId = catchAsync(async (req, res, next) => {});

exports.createReviewForTour = catchAsync(async (req, res, next) => {});

exports.updateReviewTour = catchAsync(async (req, res, next) => {});

exports.deleteReviewTour = catchAsync(async (req, res, next) => {});
