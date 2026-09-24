improveBtn.addEventListener("click", async function() {
  suggestionBox.classList.remove("hidden");
  suggestionText.textContent = "Getting suggestions...";
  
  let role = roleInput.value;
  let about = aboutInput.value;
  let exp = expInput.value;
  let skills = skillsInput.value;
  
  try {
    let response = await fetch("/api/improve-resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        role: role,
        about: about,
        experience: exp,
        skills: skills
      })
    });
    
    let data = await response.json();
    
    if (response.ok && data.suggestion) {
      suggestionText.textContent = data.suggestion;
    } else {
      suggestionText.textContent = data.error || "Server error occurred. Please check console.";
    }
  } catch (error) {
    suggestionText.textContent = "Network/CORS error connecting to server.";
    console.error("Fetch error:", error);
  }
});