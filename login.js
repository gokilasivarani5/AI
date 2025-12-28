function loginUser(event){
  event.preventDefault();

  let email = document.getElementById("loginEmail")?.value;
  let password = document.getElementById("loginPassword")?.value;
  let msg = document.getElementById("loginMsg");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let validUser = users.find(
    u => u.email === email && u.password === password
  );

  if(!validUser){
    msg.innerHTML = "❌ Invalid Email or Password";
    msg.style.color = "red";
    return;
  }

  msg.innerHTML = "✅ Login Successful!";
  msg.style.color = "lightgreen";

  localStorage.setItem("loggedUser", JSON.stringify(validUser));

  setTimeout(()=> window.location.href = "chat.html", 1000);
}
