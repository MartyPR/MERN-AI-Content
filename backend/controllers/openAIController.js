const asyncHandler = require("express-async-handler");
const axios = require("axios");

//----OpenAI Controller----

const openAIController = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt);
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo-instruct",
        prompt:"say test",
        max_tokens: 600,
      },
      {
        headers: {
            Authorization: `Bearer ${process.env.OPEN_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = openAIController;
