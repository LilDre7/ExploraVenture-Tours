const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

exports.getAllUsers = catchAsync(async (req, res, next) => {});
exports.updatePassword = catchAsync(async (req, res, next) => {});
exports.getUser = catchAsync(async (req, res, next) => {});
exports.updateUser = catchAsync(async (req, res, next) => {});
exports.getAllUsersForRol = catchAsync(async (req, res, next) => {});
exports.getAllUsersForTour = catchAsync(async (req, res, next) => {});
exports.deleteUser = catchAsync(async (req, res, next) => {});
exports.getAllBookings = catchAsync(async (req, res, next) => {});
exports.getAllBookingsForUser = catchAsync(async (req, res, next) => {});
