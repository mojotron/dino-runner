import '../styles/reset.css';
import '../styles/main.css';

// selectors
const sendBox = document.querySelector('.sand-box');
const dino = document.querySelector('.dino');
const score = document.querySelector('.score');
const startGame = document.querySelector('.start-game');
// global variables
let isJumping = false;
let gameOver = false;
let gameRunning = false;
let groundIndex = 0;
let groundTimer;
const intervals = [];

const ground = document.querySelector('.ground-wrapper');
function dinoRun() {
  if (dino.classList.contains('dino-stationary')) {
    dino.classList.remove('dino-stationary');
    dino.classList.add('dino-run-0');
  } else if (dino.classList.contains('dino-run-0')) {
    dino.classList.remove('dino-run-0');
    dino.classList.add('dino-run-1');
  } else {
    dino.classList.remove('dino-run-1');
    dino.classList.add('dino-run-0');
  }
}
const groundMovement = () => {
  groundTimer = setInterval(() => {
    dinoRun();
    ground.style.left = `${-groundIndex}%`;
    groundIndex += 1;
    if (groundIndex === 100) groundIndex = 0;
    const old = +score.textContent;
    score.textContent = `${old + 1}`.padStart(5, '0');
  }, 75);
};

// dino jump
const jump = () => {
  let count = 0;
  // going up
  const goingUp = setInterval(() => {
    if (count === 10) {
      clearInterval(goingUp);
      // going down
      const goingDown = setInterval(() => {
        if (count === 2) {
          clearInterval(goingDown);
          isJumping = false;
        }
        count -= 1;
        dino.style.bottom = `${count}rem`;
        if (gameOver) clearInterval(goingDown);
      }, 30);
    }
    count += 1;
    dino.style.bottom = `${count}rem`;
    if (gameOver) clearInterval(goingUp);
  }, 30);
};

const overlap = (a, b) => {
  if (
    a.top - 15 > b.bottom ||
    a.right - 15 < b.left ||
    a.bottom - 15 < b.top ||
    a.left - 15 > b.right
  ) {
    return false;
  }
  return true;
};

const createObstacle = () => {
  if (gameOver) return;
  const randomTime = Math.random() * 5000;
  const obstacle = document.createElement('div');

  obstacle.className = 'cactus';
  sendBox.append(obstacle);

  let position = 99;
  obstacle.style.left = `${position}%`;
  const timerId = setInterval(() => {
    intervals.push(timerId);
    position -= 1;
    obstacle.style.left = `${position}%`;

    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (position === 0) {
      clearInterval(timerId);
      sendBox.removeChild(obstacle);
    }
    if (overlap(dinoRect, obstacleRect)) {
      intervals.forEach(int => clearInterval(int));
      dino.className = 'dino dino-lose';
      isJumping = false;
      gameOver = true;
      position = null;
      clearInterval(groundTimer);
      const temp = document.querySelectorAll('.cactus');
      temp.forEach(element => {
        const x = element.style.left;
        element.style.left = x;
      });
      startGame.classList.remove('hidden');
      gameRunning = false;
    }
  }, 15);
  if (!gameOver) setTimeout(createObstacle, randomTime);
};
function runGame() {
  document.querySelectorAll('.cactus').forEach(ele => ele.remove());
  createObstacle();
  groundMovement();
  startGame.classList.add('hidden');
}

window.addEventListener('keydown', e => {
  if (!gameRunning) {
    gameRunning = true;
    runGame();
  }
  if (e.key === ' ') {
    if (!isJumping) {
      jump();
      isJumping = true;
    }
  }
});

//
