const asyncHandler = require("express-async-handler");
const {
  calculateNextBillingDate,
} = require("../utils/calculateNextBillingDate");
const {
  shouldRenewSubcriptionPlan,
} = require("../utils/shouldRenewSubcriptionPlan");
const Payment = require("../models/Payment");
const User = require("../models/User");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//strip payment
const handlestripPayment = asyncHandler(async (req, res) => {
  const { amount, subscriptionPlan } = req.body;
  //get the user
  const user = req?.user;
  //   console.log(user);
  try {
    //Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "usd",
      //add some data the meta object
      metadata: {
        userId: user?._id?.toString(),
        userEmail: user?.email,
        subscriptionPlan,
      },
    });
    console.log(paymentIntent);
    //send the response
    res.json({
      clientSecret: paymentIntent?.client_secret,
      paymentId: paymentIntent?.id,
      metadata: paymentIntent?.metadata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

//----verify payment-----
const verifyPayment = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    console.log(paymentIntent);
    if (paymentIntent.status !== "succeeded") {
       //get the info metada
       const metadata = paymentIntent?.metadata;
       const subscriptionPlan = metadata?.subscriptionPlan;
       const userEmail = metadata?.userEmail;
       const userId = metadata?.userId;
 
      //finde the user
      const userFound = await User.findById(userId);
      if (!userFound) {
        return res.status(404).json({
          status: "false",
          message: "User not found",
        });
    }
        //get the payment details
        const amount = paymentIntent?.amount / 100;
        const currency = paymentIntent?.currency;
        const paymentId = paymentIntent?.id;

        //create the payment hisotry
       const newPayment = await Payment.create({
          user: userId,
          email: userEmail,
          subscriptionPlan,
          amount,
          currency,
          status:'success',
          reference:paymentId
        });

        //check for the subcription plan
        if (subscriptionPlan==='Basic') {
            //update the user
            const updateUser= await User.findByIdAndUpdate(userId,{
                subscriptionPlan,
                trialPeriod:0,
                nextBillingDate:calculateNextBillingDate(),
                apiRequestCount:0,
                monthlyRequestCount:50,
                subscriptionPlan:'Basic',
                $addToSet:{payments:newPayment?._id}

            })

            res.json({
                status:'true',
                message:"Payment verified user updated",
                updateUser,
            })
        }
        if (subscriptionPlan==='Premium') {
            //update the user
            const updateUser= await User.findByIdAndUpdate(userId,{
                subscriptionPlan,
                trialPeriod:0,
                nextBillingDate:calculateNextBillingDate(),
                apiRequestCount:0,
                monthlyRequestCount:100,
                subscriptionPlan:'Premium',
                $addToSet:{payments:newPayment?._id}

            })

            res.json({
                status:'true',
                message:"Payment verified user updated",
                updateUser,
            })
        }
    
     
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

//handle free subscription
const handleFreeSubscription = asyncHandler(async (req, res) => {
  //Get the login user
  const user = req?.user;
  console.log("free plan", user);

  //Check if user account should be renew or not
  try {
    if (shouldRenewSubcriptionPlan(user)) {
      //Update the user account
      user.subscriptionPlan = "Free";
      user.monthlyRequestCount = 5;
      user.apiRequestCount = 0;
      user.nextBillingDate = calculateNextBillingDate();

      //Create new payment and save into DB
      const newPayment = await Payment.create({
        user: user?._id,
        subscriptionPlan: "Free",
        amount: 0,
        status: "success",
        reference: Math.random().toString(36).substring(7),
        monthlyRequestCount: 5,
        currency: "usd",
      });
      user.payments.push(newPayment?._id);
      //save the user
      await user.save();
      //send the response
      res.json({
        status: "success",
        message: "Subscription plan updated successfully",
        user,
      });
    } else {
      return res.status(403).json({ error: "Subcription renewal not due yet" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = { handlestripPayment, handleFreeSubscription, verifyPayment };
