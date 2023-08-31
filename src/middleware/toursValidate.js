const { validationResult, body } = require("express-validator");

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.mapped(),
    });
  }

  next();
};

exports.validatetour = [
  body("name")
    .notEmpty()
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre es obligatorio"),
  body("slug")
    .notEmpty()
    .isLength({ min: 3, max: 20 })
    .withMessage("El slug es obligatorio"),
  body("duration").isNumeric().withMessage("La duración debe ser numérica"),
  body("maxGroupSize")
    .isInt()
    .isLength({ max: 20 })
    .withMessage("El tamaño máximo del grupo debe ser un número entero"),
  body("difficulty")
    .isIn(["easy", "medium", "difficult"])
    .withMessage(
      "La dificultad no es válida (easy, medium, difficult) son tus opciones "
    ),
  body("ratingsAverage")
    .isFloat()
    .withMessage("El promedio de calificaciones debe ser un número decimal"),
  body("ratingsQuantity")
    .isInt()
    .withMessage("La cantidad de calificaciones debe ser un número entero."),
  body("price").isNumeric().withMessage("El precio debe ser numérico"),
  body("priceDiscount")
    .isNumeric()
    .withMessage("El descuento de precio debe ser numérico"),
  body("summary").notEmpty().withMessage("El resumen es obligatorio"),
  body("imageCover")
    .notEmpty()
    .withMessage("La imagen de portada es obligatoria"),
  body("startDates")
    .isString()
    .withMessage("Las fechas de inicio deben tipo fecha"),
  body("startLocationId")
    .isNumeric()
    .withMessage("El ID de la ubicación de inicio es obligatorio"),
  body("locationsId")
    .isNumeric()
    .withMessage("Los IDs de ubicaciones deben ser tipo numero"),
  body("guidesId")
    .isNumeric()
    .withMessage("Los IDs de guías deben ser unico y tipo numero"),
  validateFields,
];
