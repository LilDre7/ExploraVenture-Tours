const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const USER = require("../models/userModel");
const bcrypt = require("bcryptjs");
const TOURS = require("../models/tourModel");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await USER.findAll({
    attributes: ["id", "name", "email", "role"],
  });

  res.status(200).json({
    status: "success",
    message: "All users",
    AllUsers: users.length,
    data: {
      users,
    },
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // ** Actualizar la contraseña del usuario ** //
  const { user } = req;

  const { currentPassword, newPassword } = req.body;

  if (currentPassword === newPassword) {
    return next(
      new AppError(
        ` 🧨 La nueva contraseña no puede ser igual a la actual 🧨 `,
        401
      )
    );
  }

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError(`La contraseña actual no es correcta 🦊`, 401));
  }

  const salt = await bcrypt.genSalt(10);
  const encrytedPassword = await bcrypt.hash(newPassword, salt);

  await user.update({
    password: encrytedPassword,
    passwordChangedAt: new Date(),
  });

  return res.status(200).json({
    status: "success",
    message: `La contraseña del usuario ${user.name} ha sido actualizada correctamente 🥷🏾⚔️`,
    data: {
      user,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const findUserId = await USER.findOne({
    where: {
      id: id,
    },
    attributes: ["id", "name", "email", "role"],
  });

  res.status(200).json({
    status: "sucess",
    message: `Usuario ${findUserId.name} encontrado 🌚 `,
    YourUser: {
      findUserId,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  // Actualizar el name y email info por req.body
  const { id } = req.params;

  const { name, email } = req.body;

  const findUserUpdate = await USER.findOne({
    where: {
      id: id,
    },
  });

  const updateInfo = await findUserUpdate.update({
    name,
    email,
  });

  res.status(200).json({
    status: "sucess",
    message: `Usuario ${name} actualizado correctamente  `,
    YourUser: {
      updateInfo,
    },
  });
});

exports.getAllUsersForRol = catchAsync(async (req, res, next) => {});

exports.getAllUsersForTour = catchAsync(async (req, res, next) => {});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const findDeleteUser = await USER.findOne({
    where: {
      id: id,
    },
  });

  if (findDeleteUser.status === "inactive")
    next(
      new AppError(
        ` 🧨 El usuario ${findDeleteUser.name} ya esta eliminado 🧨 `,
        400
      )
    );

  const deleteUser = await findDeleteUser.update({
    status: "inactive",
  });

  res.status(200).json({
    status: "sucess",
    message: ` 🧨 Usuario ${findDeleteUser.name} eliminado correctamente 🧨 `,
    dataUser: {
      deleteUser,
    },
  });
});

exports.getAllBookings = catchAsync(async (req, res, next) => {});

exports.getAllBookingsForUser = catchAsync(async (req, res, next) => {});
