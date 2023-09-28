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

// Solo el usuario dueño de la review podrá eliminar o actualizar su review.

// ** 🧨 USER  ROUTE 🧨  ** //
router.route("/").get(reviewController.getAllReviews);

router.route("/:id").get(reviewController.getReviewForId);

router
  .route("/:tourId")
  .post(
    reviewValidate.validateReview,
    authMiddleware.protect,
    reviewController.createReviewForTour
  );

router
  .route("/:tourId/:id")
  .patch(
    reviewValidate.validateReview,
    authMiddleware.protect,
    reviewController.updateReviewTour
  );

router.route("/:tourId/:id").delete(reviewController.deleteReviewTour);

module.exports = router;
