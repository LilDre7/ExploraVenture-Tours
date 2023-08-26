const express = require("express");

const router = express.Router();

// ** 🪢 AUTH MIDDLEWARE 🪢 ** //  ㅤ

// ** 🦴 AUTH CONTROLLER 🦴 ** //
const authController = require("../controllers/userController");

// ** 🧨 AUTH ROUTE 🧨 ** //
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/renew").get(authController.renew);

//                                        //

// ** 🪢 USER MIDDLEWARE 🪢  ** //

// ** 🦴 USER CONTROLLER 🦴  ** //

// ** 🧨 USER  ROUTE 🧨  ** //

module.exports = router;
