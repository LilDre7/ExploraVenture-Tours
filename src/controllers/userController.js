const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const USER = require("../models/userModel");

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, photo, password } = req.body;

  const userExisten = await USER.findOne({
    where: {
      password: password,
      email: email,
    },
  });

  if (userExisten)
    next(
      new AppError(
        `El email y el password deben ser unicos: estos ya existen ${password} : ${email} 🌞 Intenta con otro email 🌱 `,
        400
      )
    );

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
