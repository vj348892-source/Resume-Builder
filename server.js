require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post("/api/improve-resume", async (req, res) => {
  const role = req.body.role;
  const about = req.body.about;
  const experience = req.body.experience;
  const skills = req.body.skills;

  if (!role && !about && !experience && !skills) {
    return res.json({
      error: "Please fill in some details first"
    });
  }

  const userPrompt = `I want to build a resume for the role: ${role || "Any Role"}

My details:
About Me: ${about || "Not provided"}
Experience: ${experience || "Not provided"}
Skills: ${skills || "Not provided"}

Give me 3 tips to improve this resume. Keep it short and practical.`;

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.json({ error: "GEMINI_API_KEY is missing in environment variables." });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userPrompt }] }]
      })
    });

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return res.json({ suggestion: data.candidates[0].content.parts[0].text });
    } else {
      console.log("Gemini API Error:", data);
      return res.json({ error: data.error?.message || "Failed to get suggestions from AI" });
    }
  } catch (error) {
    console.log("Server Error:", error);
    return res.json({ error: "Failed to connect to AI service" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});