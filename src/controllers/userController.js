const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const USER = require("../models/userModel");
const generateJWT = require("../utils/jwt");
const bcrypt = require("bcryptjs");
const { getStorage, ref, uploadBytes } = require("firebase/storage");
const { storage } = require("../utils/firabase");

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, photo, password } = req.body;

  const imgRef = ref(storage, `usersImagesProfile/${req.file.originalname}`);

  const userExisten = await USER.findOne({
    where: {
      email: email,
    },
  });

  if (userExisten)
    next(
      new AppError(
        `El email deber unico este ya existe: ${email} 🌞 Intenta con otro email 🌱 `,
        400
      )
    );

  // ** Encriptar la contreña del usuario ** //
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await USER.create({
    name: name,
    email: email,
    photo: photo,
    password: hashPassword,
  });

  res.status(201).json({
    status: "success",
    message: "User created successfully",
    data: {
      newUser,
    },
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const findLogin = await USER.findOne({
    where: {
      email: email,
    },
  });

  if (!findLogin)
    next(
      new AppError("La contraseña es incorrecta intente nuevamente 🌚 ", 404)
    );

  // Validar si la contraseña es correcta de bcrypt
  if (!(await bcrypt.compare(password, findLogin.password)))
    next(new AppError("La contraseña es incorrecta intente nuevamente", 404));

  // Generar el token
  const token = await generateJWT(findLogin.id);

  res.status(200).json({
    status: "success",
    message: "User created successfully",
    token,
    user: {
      id: findLogin.id,
      name: findLogin.name,
      email: findLogin.email,
      photo: findLogin.photo,
    },
  });
});

exports.renew = catchAsync(async (req, res, next) => {
  // Renovar el token del usuario
  const { id } = req.params;

  const findLogin = await USER.findOne({
    where: {
      id: id,
    },
  });

  if (!findLogin) next(new AppError("El usuario no existe", 404));

  const token = await generateJWT(findLogin.id);

  res.status(200).json({
    status: "success",
    message: "Token renewed successfully",
    token,
    user: {
      id: findLogin.id,
      name: findLogin.name,
      email: findLogin.email,
      photo: findLogin.photo,
    },
  });
});
