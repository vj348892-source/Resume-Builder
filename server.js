require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const genai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function generateWithRetry(prompt, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await genai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
      });
      return response.text;
    } catch (error) {
      if (error.status === 503 && i < retries - 1) {
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2;
      } else {
        throw error;
      }
    }
  }
}

app.post("/api/improve-resume", async (req, res) => {
  const role = req.body.role;
  const about = req.body.about;
  const experience = req.body.experience;
  const skills = req.body.skills;
  
  if (!role && !about && !experience && !skills) {
    return res.status(400).json({
      error: "Please fill in some details first"
    });
  }
  
  const userPrompt = `I want to build a resume for the role: ${role || "Any Role"}
  
My details:
About Me: ${about || "Not provided"}
Experience: ${experience || "Not provided"}
Skills: ${skills || "Not provided"}

Give me 3 tips to improve this resume. Keep it short and practical.`;
  
  try {
    const suggestion = await generateWithRetry(userPrompt);
    
    return res.json({
      suggestion: suggestion
    });
  } catch (error) {
    console.error("AI Error:", error);
    return res.status(503).json({
      error: "The AI service is experiencing high demand right now. Please try again in a few seconds."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});