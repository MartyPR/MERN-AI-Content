const express = require("express");

const isAuth = require("../middleware/isAuthenticated");
const {
  handlestripPayment,
  handleFreeSubscription,
  verifyPayment,
} = require("../controllers/handleStripePayment");

const stripeRouter = express.Router();

stripeRouter.post("/checkout", isAuth, handlestripPayment);
stripeRouter.post("/free-plan", isAuth, handleFreeSubscription);
stripeRouter.post("/verify-payment/:paymentId", isAuth, verifyPayment);

module.exports = stripeRouter;
  