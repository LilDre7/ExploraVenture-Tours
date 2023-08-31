const express = require("express");

const router = express.Router();

//                                        //

// ** 🪢 USER MIDDLEWARE 🪢  ** //
const authMiddleware = require("../middleware/authMiddleware");
const tourValidate = require("../middleware/toursValidate");

// ** 🦴 USER CONTROLLER 🦴  ** //
const tourController = require("../controllers/tourController");

// 🎈 ----------------------- 🎈 //
router.use(authMiddleware.protect);
// 🎈 ----------------------- 🎈 //

// ** 🧨 USER  ROUTE 🧨  ** //
router.route("/").get(tourController.getAllTours);

router.route("/:id").get(tourController.getTourById);

// router.use(authMiddleware.protectOrderOwner);
router.use(authMiddleware.restrictTo("admin"));

router.route("/").post(tourValidate.validatetour, tourController.createTour);

router
  .route("/:id")
  .patch(tourValidate.validatetour, tourController.updateTourById);

router.route("/:id").delete(tourController.deleteTourById);

module.exports = router;
