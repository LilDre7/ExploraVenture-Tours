const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const USER = require("../models/userModel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError(
        "You are not logged in! Please log in to get access 🧨 ",
        401
      )
    );
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  const user = await USER.findOne({
    where: {
      id: decoded.id,
    },
  });

  if (!user) {
    return next(
      new AppError("The owner of this token it not longer available", 401)
    );
  }

  //only if you have the functionality to change password
  /*
  if (user.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      const changedTimeStamp = parseInt(
      10
    );

    if (decoded.iat < changedTimeStamp) {
      return next(
        new AppError(
          'User recently changed password!, please login again.',
          401
        )
      );
    }
  }
  */

  req.sessionUser = user;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError("You do not have permission to perfom this action.!", 403)
      );
    }

    next();
  };
};

exports.protectOrderOwner = catchAsync(async (req, res, next) => {
  const { user, sessionUser } = req;

  if (user.id !== sessionUser.id) {
    return next(new AppError("You do not own this account.", 401));
  }

  next();
});

// Function que me valida que el id del usuario exista de lo contrario enviar un error
exports.validateUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await USER.findOne({ where: { id } });

  // Este if para para verificar el user fue encontrado con el where
  if (!user)
    next(new AppError(` 🧨 El usuario con el id:${id} no existe 🧨 `, 404));

  req.user = user;

  next();
});
