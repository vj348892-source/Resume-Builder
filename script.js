let nameInput = document.getElementById("fullName");
let roleInput = document.getElementById("jobRole");
let emailInput = document.getElementById("emailField");
let phoneInput = document.getElementById("phoneField");
let aboutInput = document.getElementById("aboutMe");
let skillsInput = document.getElementById("skillsList");
let expInput = document.getElementById("expField");
let projectInput = document.getElementById("projectField");
let eduInput = document.getElementById("eduField");
let linkedinInput = document.getElementById("linkedinLink");
let portfolioInput = document.getElementById("portfolioLink");

let resumeName = document.getElementById("rName");
let resumeRole = document.getElementById("rRole");
let resumeEmail = document.getElementById("rEmail");
let resumePhone = document.getElementById("rPhone");
let resumeAbout = document.getElementById("rAbout");
let resumeSkills = document.getElementById("rSkills");
let resumeExp = document.getElementById("rExp");
let resumeProjects = document.getElementById("rProjects");
let resumeEducation = document.getElementById("rEducation");
let resumeLinkedin = document.getElementById("rLinkedin");
let resumePortfolio = document.getElementById("rPortfolio");

function updateResume() {
  resumeName.textContent = nameInput.value || "Your Name";
  resumeRole.textContent = roleInput.value || "Your Job Role";
  resumeEmail.textContent = emailInput.value || "email@example.com";
  resumePhone.textContent = phoneInput.value || "+91 98765 43210";
  resumeAbout.textContent = aboutInput.value || "Write about yourself here";
  resumeExp.textContent = expInput.value || "Your experience goes here";
  resumeProjects.textContent = projectInput.value || "Your projects go here";
  resumeEducation.textContent = eduInput.value || "Your education goes here";
  resumeLinkedin.textContent = linkedinInput.value || "linkedin.com/in/name";
  resumePortfolio.textContent = portfolioInput.value || "portfolio.com";
  
  showSkills();
}

function showSkills() {
  resumeSkills.innerHTML = "";
  
  let skillsText = skillsInput.value;
  
  if (skillsText.trim() === "") {
    resumeSkills.innerHTML = '<span class="skill-tag">HTML</span><span class="skill-tag">CSS</span><span class="skill-tag">JavaScript</span>';
    return;
  }
  
  let skillsArray = skillsText.split(",");
  
  for (let i = 0; i < skillsArray.length; i++) {
    let skill = skillsArray[i].trim();
    if (skill !== "") {
      let tag = document.createElement("span");
      tag.className = "skill-tag";
      tag.textContent = skill;
      resumeSkills.appendChild(tag);
    }
  }
}

nameInput.addEventListener("input", updateResume);
roleInput.addEventListener("input", updateResume);
emailInput.addEventListener("input", updateResume);
phoneInput.addEventListener("input", updateResume);
aboutInput.addEventListener("input", updateResume);
skillsInput.addEventListener("input", updateResume);
expInput.addEventListener("input", updateResume);
projectInput.addEventListener("input", updateResume);
eduInput.addEventListener("input", updateResume);
linkedinInput.addEventListener("input", updateResume);
portfolioInput.addEventListener("input", updateResume);

document.getElementById("pdfBtn").addEventListener("click", function() {
  window.print();
});

let improveBtn = document.getElementById("improveBtn");
let suggestionBox = document.getElementById("suggestions");
let suggestionText = document.getElementById("suggestText");

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
    
    if (data.suggestion) {
      suggestionText.textContent = data.suggestion;
    } else {
      suggestionText.textContent = "Could not get suggestions. Please try again.";
    }
  } catch (error) {
    suggestionText.textContent = "Error connecting to server.";
    console.log(error);
  }
});

updateResume();