import '../styles/reset.css';
import '../styles/main.css';

import * as model from './model';
import scoreView from './views/score-view';
import dinoView from './views/dino-view';
import startGameView from './views/start-game-view';
import overlap from './overlap';
// selectors
const sendBox = document.querySelector('.sand-box');
const dino = document.querySelector('.dino');
const ground = document.querySelector('.ground-wrapper');
// global variables
let isJumping = false;
let gameOver = false;
let gameRunning = false;
let groundIndex = 0;
let groundTimer;
const intervals = [];

// moving ground
const groundMovement = () => {
  groundTimer = setInterval(() => {
    dinoView.run();
    ground.style.left = `${-groundIndex}%`;
    groundIndex += 1;
    if (groundIndex === 100) groundIndex = 0;
    scoreView.incrementScore();
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
      intervals.splice();
      dino.className = 'dino dino-lose';
      isJumping = false;
      gameOver = true;
      position = null;
      gameRunning = false;
      groundIndex = 0;

      clearInterval(groundTimer);
      const temp = document.querySelectorAll('.cactus');
      temp.forEach(element => {
        const x = element.style.left;
        element.style.left = x;
      });
      startGameView.add();
    }
  }, 15);
  if (!gameOver) setTimeout(createObstacle, randomTime);
};

function runGame() {
  scoreView.resetScore();
  gameOver = false;
  startGameView.remove();
  document.querySelectorAll('.cactus').forEach(ele => ele.remove());
  dino.className = 'dino dino-stationary';
  createObstacle();
  groundMovement();
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
