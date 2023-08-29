const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const AppError = require("./utils/appError");

// ** 🦴 Configuraciones para usar expressJS y nodeJS ** 🦴 //
const app = express();

app.use(express.json());

app.use(cors());

// Morgan sirve para ver las peticiones en consola
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware de errores
const globalErrorHandler = require("./controllers/errorController");

// ==🧨 Rutas de los controllers para indentificar el crud 🧨 == //

const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoute");
const reviewsRoute = require("./routes/reviewsRoute");
const toursRoute = require("./routes/tourRoute");
const toursImgsRoute = require("./routes/toursImgsRoute");
const locationsRoute = require("./routes/locationRoute");

// !! 🦴 Rutas para identificar el crud de la aplicacion !! 🦴 //

app.use("/api/v1/auth", authRoute);

// app.use("/api/v1/user", usersRoute);

// app.use("/api/v1/booking", bookingRoute);

// app.use("/api/v1/reviews", reviewsRoute);

// app.use("/api/v1/tours", toursRoute);

// app.use("/api/v1/toursImgs", toursImgsRoute);

// app.use("/api/v1/locations", locationsRoute);

//** 🪢 Funcion para detectar rutas invalidas y enviar un mensaje de error 🪢 **//

app.use(`*`, (req, res, next) => {
  return next(
    new AppError(
      `La ruta es incorrecta o no existe ${req.originalUrl} 🧨🧨 `,
      404,
      fail
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
