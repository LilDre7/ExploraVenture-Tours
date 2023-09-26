const express = require("express");

const router = express.Router();

//                                        //

// ** 🪢 USER MIDDLEWARE 🪢  ** //
const authMiddleware = require("../middleware/authMiddleware");
const reviewValidate = require("../middleware/reviewValidate");

// ** 🦴 USER CONTROLLER 🦴  ** //
const reviewController = require("../controllers/reviewsController");

// 🎈 ----------------------- 🎈 //
router.use(authMiddleware.protect);
// 🎈 ----------------------- 🎈 //

// 🪐 Usuario en session 🪐 //
// router.use(authMiddleware.validateUserId);
// ----------- 🪐 ------------- //

// ** 🧨 USER  ROUTE 🧨  ** //
router.route("/").get(reviewController.getAllReviews);

router.route("/:id").get(reviewController.getReviewForId);

router
  .route("/:tourId")
  .post(authMiddleware.protect, reviewController.createReviewForTour);

router.route("/:tourId/:id").patch(reviewController.updateReviewTour);

router.route("/:tourId/:id").delete(reviewController.deleteReviewTour);

module.exports = router;
