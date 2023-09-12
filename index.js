const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// Define your endpoint for generating Shayari
app.post("/generate-shayari", async (req, res) => {
  const { keyword } = req.body;

  try {
    // Call the ChatGPT API to generate Shayari
    const shayari = await generateShayari(keyword);

    res.json({ shayari });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate Shayari" });
  }
});

// Function to call the ChatGPT API
async function generateShayari(keyword) {
  const apiKey = process.env.OPENAI_API_KEY;
  const url = "https://api.openai.com/v1/engines/text-davinci-002/completions";

  const response = await axios.post(
    url,
    {
      prompt: `Generate a Shayari about ${keyword}`,
      max_tokens: 50, // Adjust as needed
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  return response.data.choices[0].text;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
