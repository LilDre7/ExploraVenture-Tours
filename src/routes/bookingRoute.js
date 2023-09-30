const express = require("express");

const router = express.Router();

//                                        //

// ** 🪢 BOOKING MIDDLEWARE 🪢  ** //
const authMiddleware = require("../middleware/authMiddleware");

// ** 🦴 BOOKING CONTROLLER 🦴  ** /
const bookController = require("../controllers/bookingController");

// ** 📨 BOOKING RUTES 📨 ** //

router.use(authMiddleware.protect);

router.use(authMiddleware.restrictTo("admin"));

//                                        //

router.route("/").get(bookController.getAllBookings);

router.route("/:id").get(bookController.getOneBooking);

router.route("/").post(bookController.createBooking);

router.route("/:tourId/:id").patch(bookController.updateBooking);

router.route("/:tourId/:id").delete(bookController.deleteBooking);

//                                        //

module.exports = router;
