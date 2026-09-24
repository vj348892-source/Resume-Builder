require("dotenv").config();

const express = require("express");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = process.env.PORT || 3000;

const genai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.use(express.json());
app.use(express.static(path.join(__dirname)));

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
    const response = await genai.models.generateContent({
      model: "gemini-flash-latest",
      contents: userPrompt
    });
    
    const suggestion = response.text;
    
    return res.json({
      suggestion: suggestion
    });
  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({
      error: error.message || "Failed to get suggestions from AI"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});