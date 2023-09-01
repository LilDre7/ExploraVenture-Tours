const express = require("express");

const router = express.Router();

//                                        //

// ** 🪢 USER MIDDLEWARE 🪢  ** //
// const authMiddleware = require("../middleware/authMiddleware");
// const tourValidate = require("../middleware/toursValidate");

// ** 🦴 USER CONTROLLER 🦴  ** //
// const tourController = require("../controllers/tourController");

// 🎈 ----------------------- 🎈 //
// router.use(authMiddleware.protect);
// 🎈 ----------------------- 🎈 //

// ** 🧨 USER  ROUTE 🧨  ** //

router.route("/").get();

router.route("/:id").get();

router.route("/:tourId").post();

router.route("/:tourId/:id").patch();

router.route("/:tourId/:id").delete();

module.exports = router;
