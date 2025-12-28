// ================= PASSWORD SHOW / HIDE ================= 
function togglePassword(){
  const field = document.getElementById("password");
  const eyeOpen = document.getElementById("eyeOpen");
  const eyeClose = document.getElementById("eyeClose");

  if(field.type === "password"){
    field.type = "text";
    eyeOpen.classList.add("hidden");
    eyeClose.classList.remove("hidden");
  } else {
    field.type = "password";
    eyeOpen.classList.remove("hidden");
    eyeClose.classList.add("hidden");
  }
}


// ================= ELEMENTS ========================
const emailInput = document.getElementById("email");
const passInput  = document.getElementById("password");
const confirmInput = document.getElementById("confirm");
const nameInput = document.getElementById("name");
const btn = document.getElementById("registerBtn");

const passwordTick = document.getElementById("passwordTick");
const passwordHint = document.getElementById("passwordHint");


// ================= TOUCH TRACKER =================
let touched = { name:false, email:false, password:false, confirm:false };

if(nameInput){
  nameInput.addEventListener("blur", ()=>{touched.name=true; validateForm();});
  emailInput.addEventListener("blur", ()=>{touched.email=true; validateForm();});
  passInput.addEventListener("blur", ()=>{touched.password=true; validateForm();});
  confirmInput.addEventListener("blur", ()=>{touched.confirm=true; validateForm();});

  nameInput.addEventListener("input", ()=>{ if(touched.name) validateForm(); });
  emailInput.addEventListener("input", ()=>{ if(touched.email) validateForm(); });
  confirmInput.addEventListener("input", ()=>{ if(touched.confirm) validateForm(); });
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


// ================= SHOW DOT + HINT ON FOCUS =================
passInput?.addEventListener("focus", ()=>{
  passwordTick.style.display = "flex";
  passwordTick.innerText = "•";
  passwordTick.style.color = "gray";

  passwordHint.classList.remove("hidden");
});

passInput?.addEventListener("blur", ()=>{
  if(passInput.value === ""){
    passwordTick.style.display = "none";
    passwordHint.classList.add("hidden");
  }
});


// ================= LIVE PASSWORD VALIDATION =================
passInput?.addEventListener("input", ()=>{
  validateForm();
  passwordHint.classList.remove("hidden");
});


// ================= VALIDATION ========================
function validateForm(showAll = false){
  let valid = true;
  if(showAll) touched = {name:true,email:true,password:true,confirm:true};


  // NAME
  if(touched.name){
    if(nameInput.value.trim() === ""){
      document.getElementById("nameError").innerText = "Please enter your name";
      valid = false;
    } else document.getElementById("nameError").innerText = "";
  }


  // EMAIL
  if(touched.email){
    let value = emailInput.value.trim();
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if(value === ""){
      document.getElementById("emailError").innerText = "Please enter your email";
      valid = false;
    }
    else if(!emailPattern.test(value)){
      document.getElementById("emailError").innerText = "Enter a valid email";
      valid = false;
    }
    else document.getElementById("emailError").innerText = "";
  }



  // PASSWORD
  const p = passInput.value;
  const rules = checkPasswordRules(p);

  document.getElementById("r1").style.color = rules.length ? "lightgreen" : "#ff6b6b";
  document.getElementById("r2").style.color = rules.upperLower ? "lightgreen" : "#ff6b6b";
  document.getElementById("r3").style.color = rules.number ? "lightgreen" : "#ff6b6b";
  document.getElementById("r4").style.color = rules.special ? "lightgreen" : "#ff6b6b";

  let score = 0;
  if(rules.length) score++;
  if(rules.upperLower) score++;
  if(rules.number) score++;
  if(rules.special) score++;

  if(p === ""){
    passwordTick.innerText = "•";
    passwordTick.style.color = "gray";
  }
  else if(score <= 1){
    passwordTick.innerText = "•";
    passwordTick.style.color = "red";
  }
  else if(score === 2){
    passwordTick.innerText = "•";
    passwordTick.style.color = "orange";
  }
  else if(score === 3){
    passwordTick.innerText = "•";
    passwordTick.style.color = "yellow";
  }
  else{
    // GREEN CENTERED PROFESSIONAL TICK
    passwordTick.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        style="display:block"
        xmlns="http://www.w3.org/2000/svg">
        <polyline points="20 6 9 17 4 12"
          stroke="#22c55e"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"/>
      </svg>`;
    passwordHint.classList.add("hidden");
  }

  const passwordValid = score === 4;

  if(touched.password){
    if(!passwordValid){
      document.getElementById("passwordError").innerText =
        "Password does not meet requirements";
      valid = false;
    } else {
      document.getElementById("passwordError").innerText = "";
    }
  }


  // CONFIRM PASSWORD (NO TICK)
  if(touched.confirm){
    if(confirmInput.value !== p || p === ""){
      document.getElementById("confirmError").innerText = "Passwords do not match";
      valid = false;
    } 
    else {
      document.getElementById("confirmError").innerText = "";
    }
  }

  if(btn) btn.disabled = !valid;
  return valid;
}



// ================= REGISTER ================================
function registerUser(event){
  event.preventDefault();
  if(!validateForm(true)) return;

  let name = nameInput.value;
  let email = emailInput.value;
  let password = passInput.value;
  let msg = document.getElementById("msg");

  btn.innerText = "Creating account…";
  btn.disabled = true;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let exists = users.some(u => u.email === email);

  if(exists){
    msg.innerHTML = "⚠️ User already registered. Please login.";
    msg.style.color = "orange";
    btn.innerText = "Register Account →";
    btn.disabled = false;
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  msg.innerHTML = "🎉 Account created successfully! Redirecting…";
  msg.style.color = "lightgreen";

  setTimeout(()=> window.location.href="login.html", 1200);
}
