const express = require("express");

const router = express.Router();

//                                        //

// ** 🪢 USER MIDDLEWARE 🪢  ** //
const userValidate = require("../middleware/userValidate");
const authMiddleware = require("../middleware/authMiddleware");

// ** 🦴 USER CONTROLLER 🦴  ** //
const userController = require("../controllers/userController");

// ** 🧨 USER  ROUTE 🧨  ** //

// 🎈 ----------------------- 🎈 //
router.use(authMiddleware.protect);
// 🎈 ----------------------- 🎈 //

router.route("/").get(userController.getAllUsers); // ✅

router
  .route("/password/:id")
  .patch(
    userValidate.validateNewPassword,
    authMiddleware.protectOrderOwner,
    authMiddleware.validateUserId,
    authMiddleware.protect,
    userController.updatePassword
  ); // ✅

router.route("/:id").get(authMiddleware.validateUserId, userController.getUser); // ✅

router
  .route("/:id")
  .patch(authMiddleware.validateUserId, userController.updateUser); // ✅

router.route("/tours/:id").delete(userController.getAllUsersForRol);

router.route("/:userId/tours/:id").get(userController.getAllUsersForTour);

router
  .route("/:id")
  .delete(authMiddleware.validateUserId, userController.deleteUser); // ✅

router.route("/bookings").get(userController.getAllBookings);

router.route("/bookings/:id").get(userController.getAllBookingsForUser);

module.exports = router;
