import Ball from "./Ball.js";
import Brick from "./Brick.js";

// Ball element
const ball = new Ball(document.getElementById("ball"));

// Brick elements
const playerBrick = new Brick(document.getElementById("player-brick"));
const computerBrick = new Brick(document.getElementById("computer-brick"));

// Score elements
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");

let lastTime;
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime; // To get time difference

    //Update code
    // Passed both brick rect into ball
    ball.update(delta, [playerBrick.rect(), computerBrick.rect()]);

    // For computer paddle
    // to follow ball
    computerBrick.update(delta, ball.y);

    // Background color updation
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );
    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

    if (isLose()) handleLose();
  }

  lastTime = time;
  window.requestAnimationFrame(update); // Requesting animation frame every sec
}

// When a player is lost
function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

//
function handleLose() {
  // To increment scores
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1; // player score get increment
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1; // computer score get increment
  }
  // Reset ball and computer brick
  ball.reset();
  computerBrick.reset();
}

// Player brick moves as mouse
document.addEventListener("mousemove", (e) => {
  playerBrick.position = (e.y / window.innerHeight) * 100;
});

// To get animation frames from the window
window.requestAnimationFrame(update);
