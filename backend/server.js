const express = require ("express");
require('dotenv').config();
const cookieParser= require("cookie-parser")
const userRouter = require("./routes/usersRouter");
const connectDB = require("./utils/connectDB");
const { errorHandler } = require("./middleware/errorMiddleware");
const openAIRouter = require("./routes/openAIRouter");
const stripeRouter = require("./routes/stripeRouter");
const app= express()
const PORT =process.env.PORT || 8000;

//connect DB
connectDB()

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser())

//Routes

app.use('/api/v1/users',userRouter)
app.use('/api/v1/openai',openAIRouter)
app.use("/api/v1/stripe",stripeRouter)
//Error handler middlewate
app.use(errorHandler)

app.listen(PORT,console.log(`server is running on port ${PORT}`))