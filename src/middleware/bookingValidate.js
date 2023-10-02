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

exports.validatePost = [
  body("tourId")
    .isNumeric()
    .withMessage("Tour id is required and has to numeric ❌ "),
  body("userId")
    .isNumeric()
    .withMessage("User id is required and has to numeric ⚔️ "),
  body("price")
    .isNumeric()
    .withMessage("Price is required and has to numeric ❌ "),
  validateFields,
];

exports.validateUpdate = [
  body("price")
    .isNumeric()
    .withMessage("Solo se permite digitos, menos de 10,000 ❌ "),
];
