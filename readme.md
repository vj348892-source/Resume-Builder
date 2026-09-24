# Resume Builder with Live Preview & AI Tips

A simple, lightweight full-stack web app built to make resume creation quick and easy. It updates the preview in real-time as you type your information into the editor on the left and lets you export the resume as a clean PDF using native browser printing. It also connects to the Google Gemini API to give quick feedback on your content.

---

## What It Does

- **Real-Time Live Preview**: Input fields immediately sync with the resume sheet on the right using vanilla JavaScript DOM manipulation.
- **Skill Tags**: Dynamically splits comma-separated skill inputs into visual skill badges.
- **AI Improvement Suggestions**: Sends current role, about, experience, and skills to Express backend endpoint `/api/improve-resume`, which queries Google Gemini (`gemini-3.6-flash`) for 3 actionable tips.
- **PDF Exporting**: Uses `@media print` CSS rules to isolate the resume paper div (`#resumeView`) and hide the editor UI during browser print dialogs.

---

## Tech Stack

- **Frontend**: HTML5, CSS3 (Flexbox/Grid), JavaScript (DOM Event Listeners)
- **Backend**: Node.js, Express.js
- **AI Integration**: `@google/genai` (Google Gemini API)
- **Environment Management**: `dotenv`

---

## Project Structure

```text
resume-builder/
├── index_2.html      # Main dual-pane interface (Editor + Resume Sheet)
├── style.css         # Page styles, layout grid, and @media print rules
├── script.js         # Event listeners, live DOM updates, and API fetch call
├── server.js         # Express server & Gemini API integration
├── package.json      # Node.js dependencies and run scripts
└── .gitignore        # Excludes node_modules and .env