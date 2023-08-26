const catchAsync = require("../utils/catchAsync");
const USER = require("../models/userModel");

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, photo, password } = req.body;

  const newUser = await USER.create({
    name,
    email,
    photo,
    password,
  });

  res.status(201).json({
    status: "success",
    message: "User created successfully",
    data: {
      newUser,
    },
  });
});
exports.login = catchAsync(async (req, res, next) => {});
exports.renew = catchAsync(async (req, res, next) => {});
