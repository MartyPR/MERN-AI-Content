const express =require("express");
const { register, login, logout, userProfile, checkAuth } = require("../controllers/UserController");
const isAuth = require("../middleware/isAuthenticated");
const userRouter= express.Router();


userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.post('/logout',logout);
userRouter.get('/profile',isAuth,userProfile);
userRouter.get('/auth/check',isAuth,checkAuth);



module.exports=userRouter
