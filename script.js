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
  if (resumeName && nameInput) resumeName.textContent = nameInput.value || "Your Name";
  if (resumeRole && roleInput) resumeRole.textContent = roleInput.value || "Your Job Role";
  if (resumeEmail && emailInput) resumeEmail.textContent = emailInput.value || "email@example.com";
  if (resumePhone && phoneInput) resumePhone.textContent = phoneInput.value || "+91 98765 43210";
  if (resumeAbout && aboutInput) resumeAbout.textContent = aboutInput.value || "Write about yourself here";
  if (resumeExp && expInput) resumeExp.textContent = expInput.value || "Your experience goes here";
  if (resumeProjects && projectInput) resumeProjects.textContent = projectInput.value || "Your projects go here";
  if (resumeEducation && eduInput) resumeEducation.textContent = eduInput.value || "Your education goes here";
  if (resumeLinkedin && linkedinInput) resumeLinkedin.textContent = linkedinInput.value || "linkedin.com/in/name";
  if (resumePortfolio && portfolioInput) resumePortfolio.textContent = portfolioInput.value || "portfolio.com";
  
  showSkills();
}

function showSkills() {
  if (!resumeSkills) return;
  resumeSkills.innerHTML = "";
  
  let skillsText = skillsInput ? skillsInput.value : "";
  
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

const inputs = [
  nameInput, roleInput, emailInput, phoneInput, aboutInput,
  skillsInput, expInput, projectInput, eduInput, linkedinInput, portfolioInput
];

inputs.forEach(input => {
  if (input) {
    input.addEventListener("input", updateResume);
  }
});

let pdfBtn = document.getElementById("pdfBtn");
if (pdfBtn) {
  pdfBtn.addEventListener("click", function() {
    window.print();
  });
}

let improveBtn = document.getElementById("improveBtn");
let suggestionBox = document.getElementById("suggestions");
let suggestionText = document.getElementById("suggestText");

if (improveBtn) {
  improveBtn.addEventListener("click", async function() {
    if (suggestionBox) suggestionBox.classList.remove("hidden");
    if (suggestionText) suggestionText.textContent = "Getting suggestions...";
    
    let role = roleInput ? roleInput.value : "";
    let about = aboutInput ? aboutInput.value : "";
    let exp = expInput ? expInput.value : "";
    let skills = skillsInput ? skillsInput.value : "";
    
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
        suggestionText.textContent = data.error || "Could not get suggestions. Please check server logs.";
      }
    } catch (error) {
      if (suggestionText) suggestionText.textContent = "Error connecting to server.";
      console.log(error);
    }
  });
}

updateResume();