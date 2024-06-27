const express = require("express");

const isAuth = require("../middleware/isAuthenticated");
const openAIController = require("../controllers/openAIController");


const openAIRouter = express.Router();

openAIRouter.post(
  "/generate-content",
  isAuth,
  openAIController
);

module.exports = openAIRouter;
