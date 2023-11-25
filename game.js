var btn = document.getElementById("start");
btn.onclick = () => {
  var username = document.getElementById("username-input").value;
  var name = document.getElementById("name-input").value;

  if (username.length > 0 && name.length > 0) {
    localStorage.setItem("usernameStored", username);
    localStorage.setItem("nameStored", name);
    window.location.href = "gamestart.html";
  } else {
    if (username.length === 0) {
      alert("Enter your username!");
    } else {
      alert("Enter your name!");
    }
  }
};
