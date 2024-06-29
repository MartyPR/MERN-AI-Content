const asyncHandler = require("express-async-handler");
const axios = require("axios");
const ContentHistory = require("../models/ContentHistory");
const User = require("../models/User");

//----OpenAI Controller----

const openAIController = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt);
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo-instruct",
        prompt: "say test",
        max_tokens: 30,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);

    //send the response
    const content = response?.data?.choices[0].text?.trim();
    //create the history
    const newContent = await ContentHistory.create({
      user: req?.user?._id,
      content,
    })
    //pushthe content into user
    const userFound=await User.findById(req?.user?.id)
    userFound.history.push(content?._id);
    //update the  api reques count
    userFound.apiRequestCount +=1;
    await userFound.save();
    res.status(200).json(content);
    res.json(response.data);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = openAIController;
