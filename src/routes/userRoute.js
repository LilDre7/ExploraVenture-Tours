const express = require("express");

const router = express.Router();

// ** 🪢 AUTH MIDDLEWARE 🪢 ** //
const auth = require("../middleware/authMiddleware");
const authValidate = require("../middleware/authValidate");

// ** 🦴 AUTH CONTROLLER 🦴 ** //
const authController = require("../controllers/userController");

// ** 🧨 AUTH ROUTE 🧨 ** //
router.route("/signup").post(authValidate.authValidate, authController.signup);
router.route("/login").post(authController.login);

router.use(auth.protect);
router.route("/renew/:id").get(authController.renew);

//                                        //

// ** 🪢 USER MIDDLEWARE 🪢  ** //

// ** 🦴 USER CONTROLLER 🦴  ** //

// ** 🧨 USER  ROUTE 🧨  ** //

module.exports = router;
