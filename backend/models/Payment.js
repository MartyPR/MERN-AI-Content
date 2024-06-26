const mongoose = require("mongoose");

//schema
const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reference: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: "pending",
      required: true,
    },
    subscriptionPlan: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      amount: 0,
    },
    monthlyRequestCount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("User", paymentSchema);
module.exports = Payment;
