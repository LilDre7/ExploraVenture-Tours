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

exports.validateReview = [
  body("review").review().isEmpty().withMessage("El comentario es requerido"),
  body("rating").rating().isEmpty().withMessage("El rating es requerido"),
  validateFields,
];
