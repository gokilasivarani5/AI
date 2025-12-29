const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");
const chatArea = document.getElementById("chatArea");

const input = document.getElementById("messageInput");
const micMain = document.getElementById("micBtnMain");
const micSmall = document.getElementById("micBtnSmall");
const actionGroup = document.getElementById("actionGroup");
const sendBtn = document.getElementById("sendBtn");

const plusBtn = document.getElementById("plusBtn");
const upload = document.getElementById("fileUpload");
const recording = document.getElementById("recordingStatus");

/* Load User */
const user = JSON.parse(localStorage.getItem("loggedUser")) || null;

if (user) {
  document.getElementById("userEmail").innerText = user.email;
  document.getElementById("userName").innerText = user.name || "User";
  profileBtn.innerText = (user.name?.charAt(0) || user.email.charAt(0)).toUpperCase();
}

/* Profile Menu */
profileBtn.addEventListener("click", () => {
  profileMenu.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
    profileMenu.classList.add("hidden");
  }
});

/* Logout */
function logout(){
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
}

/* Toggle Mic + Send based on text */
input.addEventListener("input", () => {
  if(input.value.trim() === ""){
    micMain.classList.remove("hidden");
    actionGroup.classList.add("hidden");
  } else {
    micMain.classList.add("hidden");
    actionGroup.classList.remove("hidden");
  }
});

/* Upload */
plusBtn.addEventListener("click", () => upload.click());

/* Fake Recording Animation */
function fakeRecord(button){
  recording.classList.remove("hidden");
  button.style.opacity = "0.5";

  setTimeout(()=>{
    recording.classList.add("hidden");
    button.style.opacity = "1";
  },3000);
}

micMain.addEventListener("click", ()=> fakeRecord(micMain));
micSmall.addEventListener("click", ()=> fakeRecord(micSmall));

/* Send Message */
function sendMessage(){
  let text = input.value.trim();
  if(!text) return;

  let bubble = document.createElement("p");
  bubble.className = "bg-blue-600 text-white px-4 py-2 rounded-xl w-fit ml-auto";
  bubble.innerText = text;

  chatArea.appendChild(bubble);
  input.value = "";

  micMain.classList.remove("hidden");
  actionGroup.classList.add("hidden");

  chatArea.scrollTop = chatArea.scrollHeight;
}

/* Send Button */
sendBtn.addEventListener("click", sendMessage);

/* Enter Key Send */
input.addEventListener("keydown",(e)=>{
  if(e.key === "Enter"){
    e.preventDefault();
    sendMessage();
  }
});
