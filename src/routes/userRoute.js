const express = require("express");

const router = express.Router();

// ** 🪢 AUTH MIDDLEWARE 🪢 ** //
const auth = require("../middleware/authMiddleware");

// ** 🦴 AUTH CONTROLLER 🦴 ** //
const authController = require("../controllers/userController");

// ** 🧨 AUTH ROUTE 🧨 ** //
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);

router.use(auth.protect);
router.route("/renew/:id").get(authController.renew);

//                                        //

// ** 🪢 USER MIDDLEWARE 🪢  ** //

// ** 🦴 USER CONTROLLER 🦴  ** //

// ** 🧨 USER  ROUTE 🧨  ** //

module.exports = router;
