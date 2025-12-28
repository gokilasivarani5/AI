// ================= ELEMENTS =================
const emailInput = document.getElementById("fpEmail");
const emailMsg = document.getElementById("emailMsg");

const emailSection = document.getElementById("emailSection");
const resetSection = document.getElementById("resetSection");

let foundUserIndex = -1;


// ================= CHECK EMAIL =================
function checkEmail(event){
 event?.preventDefault();

  let email = emailInput.value.trim();
  let users = JSON.parse(localStorage.getItem("users")) || [];

  foundUserIndex = users.findIndex(u => u.email === email);

  if(email === ""){
    emailMsg.innerText = "Please enter your email";
    emailMsg.style.color = "orange";
    return;
  }

  if(foundUserIndex === -1){
    emailMsg.innerText = "❌ Email not registered";
    emailMsg.style.color = "red";
    return;
  }

  emailMsg.innerText = "✅ Email verified. You can reset password now.";
  emailMsg.style.color = "lightgreen";

  emailSection.classList.add("hidden");
  resetSection.classList.remove("hidden");
}



// ================= PASSWORD RULE CHECK =================
function checkPasswordRules(password){
  return {
    length: password.length >= 8,
    upperLower: /[A-Z]/.test(password) && /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
}



// ================= BUBBLE / DOT / TICK =================
const newPass = document.getElementById("newPass");
const confirmPass = document.getElementById("confirmPass");
const resetMsg = document.getElementById("resetMsg");

const fr1 = document.getElementById("fr1");
const fr2 = document.getElementById("fr2");
const fr3 = document.getElementById("fr3");
const fr4 = document.getElementById("fr4");

const forgotHint = document.getElementById("forgotHint");
const fpTick = document.getElementById("fpTick");   // dot / tick span



// Show bubble + dot when focus
newPass?.addEventListener("focus", ()=>{
  forgotHint.classList.remove("hidden");
  fpTick.style.display = "block";
  fpTick.innerText = "•";
  fpTick.style.color = "gray";
});

// Hide when empty
newPass?.addEventListener("blur", ()=>{
  if(newPass.value === ""){
    forgotHint.classList.add("hidden");
    fpTick.style.display = "none";
  }
});


// LIVE Password validation
newPass?.addEventListener("input", ()=> updateStrength());

function updateStrength(){
  const p = newPass.value;
  const rules = checkPasswordRules(p);

  fr1.style.color = rules.length ? "lightgreen" : "red";
  fr2.style.color = rules.upperLower ? "lightgreen" : "red";
  fr3.style.color = rules.number ? "lightgreen" : "red";
  fr4.style.color = rules.special ? "lightgreen" : "red";

  let score = 0;
  if(rules.length) score++;
  if(rules.upperLower) score++;
  if(rules.number) score++;
  if(rules.special) score++;

  if(p === ""){
    fpTick.innerText = "•";
    fpTick.style.color = "gray";
  }
  else if(score <= 1){
    fpTick.innerText = "•";
    fpTick.style.color = "red";
  }
  else if(score === 2){
    fpTick.innerText = "•";
    fpTick.style.color = "orange";
  }
  else if(score === 3){
    fpTick.innerText = "•";
    fpTick.style.color = "yellow";
  }
 else{
    fpTick.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="#22c55e" stroke-width="3" stroke-linecap="round"
        stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>`;

    // 🎯 Hide bubble when password is valid
    forgotHint.classList.add("hidden");
}

}



// ================= RESET PASSWORD =================
function resetPassword(event){
 event?.preventDefault();

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let oldPassword = users[foundUserIndex].password;

  let p1 = newPass.value.trim();
  let p2 = confirmPass.value.trim();

  if(p1 === "" || p2 === ""){
    resetMsg.innerText = "Please fill all fields";
    resetMsg.style.color = "orange";
    return;
  }

  const rules = checkPasswordRules(p1);
  if(!(rules.length && rules.upperLower && rules.number && rules.special)){
    resetMsg.innerText = "Password does not meet requirements";
    resetMsg.style.color = "red";
    return;
  }

  // 🚫 Prevent same old password
  if(p1 === oldPassword){
    resetMsg.innerText = "⚠️ New password cannot be the same as old password";
    resetMsg.style.color = "red";
    return;
  }

  if(p1 !== p2){
    resetMsg.innerText = "Passwords do not match";
    resetMsg.style.color = "red";
    return;
  }

  // ✅ UPDATE
  users[foundUserIndex].password = p1;
  localStorage.setItem("users", JSON.stringify(users));

  resetMsg.innerText = "🎉 Password Updated! Redirecting to Login...";
  resetMsg.style.color = "lightgreen";

  setTimeout(()=> window.location.href = "login.html", 1200);
}
