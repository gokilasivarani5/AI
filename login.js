// ================= SHOW / HIDE PASSWORD =================
function toggleLoginPassword(){
  const field = document.getElementById("loginPassword");
  const eyeOpen = document.getElementById("eyeOpenLogin");
  const eyeClose = document.getElementById("eyeCloseLogin");

  if(field.type === "password"){
    field.type = "text";
    if(eyeOpen) eyeOpen.classList.add("hidden");
    if(eyeClose) eyeClose.classList.remove("hidden");
  } else {
    field.type = "password";
    if(eyeOpen) eyeOpen.classList.remove("hidden");
    if(eyeClose) eyeClose.classList.add("hidden");
  }
}


// ================= ELEMENTS =================
const emailInput = document.getElementById("loginEmail");
const passwordInput = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");
const msg = document.getElementById("loginMsg");

const emailError = document.getElementById("emailError");
const passError = document.getElementById("passError");


// ================= VALIDATION =================
function validateLogin(){
  let valid = true;

  if(emailInput.value.trim() === ""){
    emailError.innerText = "Please enter email";
    valid = false;
  } else {
    emailError.innerText = "";
  }

  if(passwordInput.value.trim() === ""){
    passError.innerText = "Please enter password";
    valid = false;
  } else {
    passError.innerText = "";
  }

  loginBtn.disabled = !valid;
  return valid;
}

emailInput.addEventListener("input", validateLogin);
passwordInput.addEventListener("input", validateLogin);


// ================= LOGIN FUNCTION =================
function loginUser(event){
  event.preventDefault();
  if(!validateLogin()) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let validUser = users.find(u => u.email === email && u.password === password);

  loginBtn.innerText = "Checking...";
  loginBtn.disabled = true;

  setTimeout(() => {

    if(!validUser){
      msg.innerHTML = "❌ Invalid Email or Password";
      msg.style.color = "red";
      loginBtn.innerText = "Login →";
      loginBtn.disabled = false;
      return;
    }

    msg.innerHTML = "✅ Login Successful!";
    msg.style.color = "lightgreen";

    localStorage.setItem("loggedUser", JSON.stringify(validUser));

    setTimeout(()=> window.location.href = "chat.html", 1200);

  }, 600);
}
