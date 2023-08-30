const express = require("express");

const router = express.Router();

//                                        //

// ** 🪢 USER MIDDLEWARE 🪢  ** //
const authMiddleware = require("../middleware/authMiddleware");

// ** 🦴 USER CONTROLLER 🦴  ** //
const tourController = require("../controllers/tourController");

// ** 🧨 USER  ROUTE 🧨  ** //
router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router.route("/:id").get(tourController.getTourById);

router.route("/:id").patch(tourController.updateTourById);

router.route("/:id").delete(tourController.deleteTourById);

// 🎈 ----------------------- 🎈 //
// router.use(authMiddleware.protect);
// 🎈 ----------------------- 🎈 //

module.exports = router;
