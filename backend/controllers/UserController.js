const User = require("../models/User");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

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
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("please all fields are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, user?.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  //generate token jwt
  const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  //set the token into cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "Production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  //send the response

  res.json({
    status: "success",
    _id: user?._id,
    message: "Login",
    username: user?.username,
    email: user?.email,
  });
});
//* Logout
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.status(200).json({ message: "Logged out successfully" });
});
//* Prfile
const userProfile = asyncHandler(async (req, res) => {
    
  const user = await User.findById(req.user).select('-password').populate('payments');
  if (user) {
    res.status(200).json({
      status: "success",
      user,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});
//*Check user auth status

const checkAuth = asyncHandler(async(req,res)=>{
  const decoded = jwt.verify(req.cookies.token,process.env.JWT_SECRET);
  if (decoded) {
    res.json({
      isAuthenticated:true,
    })
  }else{
    res.json({
      isAuthenticated:false,
    })
  }
})
module.exports = {
  register,
  login,
  logout,
  userProfile,
  checkAuth
};
