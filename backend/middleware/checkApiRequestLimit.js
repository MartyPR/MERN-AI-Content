const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const checkApiRequestLimit = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "not authorized" });
  }
  //finde the user
  const user = await User.findById(req?.user?.id);
  if (!user) {
    return res.status(404).json({ message: "user not foud" });
  }
  let requestLimit = 0;
  if (user?.isTrialActive) {
    requestLimit = user?.monthlyRequestCount;
  }
//   console.log(requestLimit);
//check if th euser has exceeded his/her monthly request or not
if (user?.apiRequestCount>=requestLimit) {
    throw new Error("API request limit reached subsccribe to plan")
}
  next();
});

module.exports = checkApiRequestLimit;
