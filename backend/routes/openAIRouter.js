const express = require("express");

const isAuth = require("../middleware/isAuthenticated");
const openAIController = require("../controllers/openAIController");
const checkApiRequestLimit = require("../middleware/checkApiRequestLimit");


const openAIRouter = express.Router();

openAIRouter.post(
  "/generate-content",
  isAuth,
  checkApiRequestLimit,
  openAIController
);

module.exports = openAIRouter;
