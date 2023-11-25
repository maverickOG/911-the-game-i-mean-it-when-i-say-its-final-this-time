document.addEventListener("DOMContentLoaded", function () {
  let plane = document.getElementById("plane");
  const building = document.getElementById("building");
  const scoreSpan = document.getElementById("score-span");
  const startButton = document.getElementById("startButton");

  let isJumping = false;
  let isGameStarted = false;
  let score = 0;

  function saveDetails() {
    var username = document.getElementById("username-input").value;
    localStorage.setItem("usernameStored", username);
  }

  var storedUsername = localStorage.getItem("usernameStored");
  document.getElementById("username-span").textContent = storedUsername;

  document.addEventListener("keydown", jump);
  document.addEventListener("touchstart", jump);

  function jump(event) {
    if (
      (event.type === "keydown" && event.code === "Space") ||
      (event.type === "touchstart" && !isJumping)
    ) {
      isJumping = true;
      plane.style.animation = "jump 0.5s linear";
      setTimeout(() => {
        isJumping = false;
        plane.style.animation = "";
      }, 500);
    }
  }

  function startGame() {
    if (!isGameStarted) {
      isGameStarted = true;
      building.style.animation = "block 2s linear infinite";
      requestAnimationFrame(checkCollision);
    }
  }

  window.startGame = function() {
    console.log("Button Clicked");
    if (!isGameStarted) {
      isGameStarted = true;
      building.style.animation = `block ${getAnimationDuration()}s linear infinite`;
      requestAnimationFrame(checkCollision);
    }
  }
  
  function getAnimationDuration() {
    return window.innerWidth <= 600 ? 1.2 : 2;
  }

  function checkCollision() {
    if (!isGameStarted) {
      requestAnimationFrame(checkCollision);
      return;
    }

    const planeRect = plane.getBoundingClientRect();
    const buildingRect = building.getBoundingClientRect();

    const safeDistance = 25;

    if (
      planeRect.bottom - safeDistance > buildingRect.top &&
      planeRect.top + safeDistance < buildingRect.bottom &&
      planeRect.right - safeDistance > buildingRect.left &&
      planeRect.left + safeDistance < buildingRect.right
    ) {
      gameOver();
    } else {
      score++;
      localStorage.setItem("score", score);
      scoreSpan.textContent = score;
      requestAnimationFrame(checkCollision);
    }
  }

  function gameOver() {
    window.location.href = "gameEnd.html";
  }

  function restartGame() {
    score = 0;
    scoreSpan.textContent = score;
    plane.style.top = "70%";
    building.style.left = "90%";
    isGameStarted = false;
  }

  requestAnimationFrame(checkCollision);
});
