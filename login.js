// ================= SHOW / HIDE PASSWORD =================
function toggleLoginPassword(){
  const field = document.getElementById("loginPassword");
  const eyeOpen = document.getElementById("eyeOpenLogin");
  const eyeClose = document.getElementById("eyeCloseLogin");

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


// ================= ELEMENTS =================
const emailInput = document.getElementById("loginEmail");
const passwordInput = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");
const rememberMe = document.getElementById("rememberMe");
const msg = document.getElementById("loginMsg");

const emailError = document.getElementById("emailError");
const passError = document.getElementById("passError");


// ================= REMEMBER ME (Auto Fill) =================
window.onload = () => {
  let savedEmail = localStorage.getItem("rememberEmail");
  if(savedEmail){
    emailInput.value = savedEmail;
    rememberMe.checked = true;
  }
};


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

    if(rememberMe.checked){
      localStorage.setItem("rememberEmail", email);
    } else {
      localStorage.removeItem("rememberEmail");
    }

    setTimeout(()=> window.location.href = "chat.html", 1200);

  }, 600);
}



// ================= FORGOT PASSWORD =================
function openForgotPassword(){
  let email = prompt("Enter your registered email:");

  if(!email) return;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userIndex = users.findIndex(u => u.email === email);

  if(userIndex === -1){
    alert("⚠️ Email not registered");
    return;
  }

  let newPass = prompt("Enter your NEW password:");

  if(!newPass || newPass.length < 4){
    alert("Password must be at least 4 characters");
    return;
  }

  users[userIndex].password = newPass;
  localStorage.setItem("users", JSON.stringify(users));

  alert("🎉 Password reset successfully! Login now.");
}
