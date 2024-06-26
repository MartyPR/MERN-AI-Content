const express =require("express");
const { register, login } = require("../controllers/UserController");
const userRouter= express.Router();


userRouter.post('/register',register);
userRouter.post('/login',login);
// userRouter.post('/register',register);
// userRouter.post('/register',register);




module.exports=userRouter
