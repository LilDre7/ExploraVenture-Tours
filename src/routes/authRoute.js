const express = require("express");

const router = express.Router();

//                                        //

// ** 🪢 AUTH MIDDLEWARES 🪢 ** //
const auth = require("../middleware/authMiddleware");
const authValidate = require("../middleware/authValidate");

// ** 🎈 AUTH UTILS 🎈 ** //
const { upload } = require("../utils/multer");

// ** 🦴 AUTH CONTROLLERS 🦴 ** //
const authController = require("../controllers/authController");

// ** 🧨 AUTH ROUTES 🧨 ** //
router
  .route("/signup")
  .post(
    upload.single("profileImgUrl"),
    authValidate.authValidate,
    authController.signup
  );

router.route("/login").post(authController.login);

router.use(auth.protect);
router.route("/renew/:id").get(authController.renew);

module.exports = router;
