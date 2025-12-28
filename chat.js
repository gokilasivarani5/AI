const profileMenu = document.getElementById("profileMenu");
const accountMenu = document.getElementById("accountMenu");
const chatBox = document.getElementById("chatBox");
const msgInput = document.getElementById("messageInput");
const badge = document.getElementById("profileBadge");

// Load logged user
let user = JSON.parse(localStorage.getItem("loggedUser")) || {};

document.getElementById("profileInfo").innerText =
  `${user.name || "User"}\n${user.email || ""}`;


// ================= PROFILE LETTER BADGE =================
function setProfileBadge(){
  let letter = "U";

  if(user?.name && user.name.trim() !== "")
    letter = user.name.trim()[0];
  else if(user?.email && user.email.trim() !== "")
    letter = user.email.trim()[0];

  badge.innerText = letter.toUpperCase();
}
setProfileBadge();


// ================= PROFILE DROPDOWN =================
function toggleProfileMenu(){
  profileMenu.classList.toggle("hidden");
  accountMenu.classList.add("hidden");
}


// ================= ACCOUNT SUBMENU =================
function openAccountMenu(){
  accountMenu.classList.toggle("hidden");
}


// ================= CLICK OUTSIDE TO CLOSE =================
document.addEventListener("click", (e)=>{

  if(!profileMenu.contains(e.target) && 
     !badge.contains(e.target)){
      profileMenu.classList.add("hidden");
  }

  if(!accountMenu.contains(e.target)){
      accountMenu.classList.add("hidden");
  }
});


// ================= LOGOUT =================
function logout(){
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
}


// ================= DELETE ACCOUNT =================
function deleteAccount(){
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.filter(u => u.email !== user.email);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account Deleted");
  window.location.href = "register.html";
}


// ================= SEND MESSAGE =================
function sendMessage(){
  let text = msgInput.value.trim();
  if(text === "") return;

  let p = document.createElement("p");
  p.className = "bg-blue-600 px-4 py-2 rounded-xl w-fit ml-auto";
  p.innerText = text;
  chatBox.appendChild(p);

  msgInput.value = "";
  msgInput.style.height = "auto";

  chatBox.scrollTop = chatBox.scrollHeight;
}


// ================= AUTO EXPAND TEXTAREA =================
msgInput.addEventListener("input", ()=>{
  msgInput.style.height = "auto";
  msgInput.style.height = msgInput.scrollHeight + "px";
});


// ================= VOICE INPUT =================
function startVoice(){
  if(!('webkitSpeechRecognition' in window)){
    alert("Voice not supported in this browser");
    return;
  }

  const rec = new webkitSpeechRecognition();
  rec.lang = "en-US";
  rec.start();

  rec.onresult = (e)=>{
    msgInput.value = e.results[0][0].transcript;
  };
}
