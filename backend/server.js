const express = require("express");
require("dotenv").config();
const cron = require("node-cron");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/usersRouter");
const connectDB = require("./utils/connectDB");
const { errorHandler } = require("./middleware/errorMiddleware");
const openAIRouter = require("./routes/openAIRouter");
const stripeRouter = require("./routes/stripeRouter");
const User = require("./models/User");
const app = express();
const PORT = process.env.PORT || 8000;
//1s

// cron for the trial period: every single day
cron.schedule("0 0 * * * *", async () => {
    console.log("This task runs every single day");
    try {
      //get the current date
      const today = new Date();
      const updatedUser = await User.updateMany(
        {
          trialActive: true,
          trialExpires: { $lt: today },
        },
        {
          trialActive: false,
          subscriptionPlan: "Free",
          monthlyRequestCount: 5,
        }
      );
      console.log(updatedUser);
    } catch (error) {
      console.log(error);
    }
});
//cron for the free plan: run at the end of every monnth
cron.schedule("0 0 1 * * *", async () => {
  console.log("This task runs every month");
  const today = new Date();
  try {
    await User.updateMany(
      {
        subscriptionPlan: "Free",
        nextBillingDate: { $lt: today },
      },
      {
        monthlyRequestCount: 0,
      }
    );

   
  } catch (error) {}
});
//cron for the Basic plan: run at the end of every monnth
cron.schedule("0 0 1 * * *", async () => {
  console.log("This task runs every month");
  const today = new Date();
  try {
    await User.updateMany(
      {
        subscriptionPlan: "Basic",
        nextBillingDate: { $lt: today },
      },
      {
        monthlyRequestCount: 0,
      }
    );

   
  } catch (error) {}
});
//cron for the Premium plan: run at the end of every monnth
cron.schedule("0 0 1 * * *", async () => {
    console.log("This task runs every month");
    const today = new Date();
    try {
      await User.updateMany(
        {
          subscriptionPlan: "Premium",
          nextBillingDate: { $lt: today },
        },
        {
          monthlyRequestCount: 0,
        }
      );
  
     
    } catch (error) {}
  });
  

//connect DB
connectDB();

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

//Routes

app.use("/api/v1/users", userRouter);
app.use("/api/v1/openai", openAIRouter);
app.use("/api/v1/stripe", stripeRouter);
//Error handler middlewate
app.use(errorHandler);

app.listen(PORT, console.log(`server is running on port ${PORT}`));
