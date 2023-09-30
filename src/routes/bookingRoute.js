const express = require("express");

const router = express.Router();

//                                        //

// ** 🪢 BOOKING MIDDLEWARE 🪢  ** //
const authMiddleware = require("../middleware/authMiddleware");

// ** 🦴 BOOKING CONTROLLER 🦴  ** /
const bookController = require("../controllers/bookingController");

const validateBook = require("../middleware/bookingValidate");

// ** 📨 BOOKING RUTES 📨 ** //

router.use(authMiddleware.protect);

router.use(authMiddleware.restrictTo("admin"));

//                                        //

router.route("/").get(bookController.getAllBookings);

router.route("/:id").get(bookController.getOneBooking);

router
  .route("/")
  .post(validateBook.validateBooking, bookController.createBooking);

router
  .route("/:id")
  .patch(validateBook.validateBooking, bookController.updateBooking);

router.route("/:id").delete(bookController.deleteBooking);

//                                        //

module.exports = router;
