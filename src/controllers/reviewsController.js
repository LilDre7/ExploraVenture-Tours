const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const allReviews = await Review.findAll();

  res.status(200).json({});
});

exports.getReviewForId = catchAsync(async (req, res, next) => {});

exports.createReviewForTour = catchAsync(async (req, res, next) => {});

exports.updateReviewTour = catchAsync(async (req, res, next) => {});

exports.deleteReviewTour = catchAsync(async (req, res, next) => {});
