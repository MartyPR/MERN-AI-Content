const User = require("../models/User");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

//* Registration
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("please all fields are required");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //hash the user password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //create the user
  const newUser = new User({
    username,
    password: hashPassword,
    email,
  });
  //Add the date the trial will end
  newUser.trialExpires = new Date(
    new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000
  );

  //save the user
  await newUser.save();

  res.json({
    status: true,
    message: "register was successfull",
    user: {
      username,
      email,
    },
  });
});
//*Login
const login =asyncHandler( async (req, res) => {
    const {email,password}= req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("please all fields are required");
    }
    const user= await User.findOne({email});
    if (!user) {
        res.status(401);
        throw new Error('Invalid email or password')
    }
    const isMatch= await bcrypt.compare(password,user?.password);
    if (!isMatch) {
        res.status(401);
        throw new Error('Invalid email or password')
    }
    //generate token jwt

     //set the token into cookie
     //send the response
     res.json({
        status:'success',
        message:'Login',
        username:user?.username,
        email:user?.email
     })
});
//* Logout

//* Prfile

//*Check user auth status

module.exports = {
  register,
  login,
};
