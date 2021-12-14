import '../styles/reset.css';
import '../styles/main.css';

// selectors
const sendBox = document.querySelector('.sand-box');
const dino = document.querySelector('.dino');
// global variables
let isJumping = false;
let gameOver = false;
let groundIndex = 0;
let groundTimer;
const intervals = [];

const ground = document.querySelector('.ground-wrapper');

const groundMovement = () => {
  groundTimer = setInterval(() => {
    ground.style.left = `${-groundIndex}%`;
    groundIndex += 1;
    if (groundIndex === 100) groundIndex = 0;
  }, 25);
};

// dino jump
const jump = () => {
  let count = 0;
  // going up
  const goingUp = setInterval(() => {
    if (count === 15) {
      clearInterval(goingUp);
      // going down
      const goingDown = setInterval(() => {
        if (count === 2) {
          clearInterval(goingDown);
          isJumping = false;
        }
        count -= 1;
        dino.style.bottom = `${count}rem`;
      }, 20);
    }
    count += 1;
    dino.style.bottom = `${count}rem`;
  }, 20);
};

const overlap = (a, b) => {
  if (
    a.top > b.bottom ||
    a.right < b.left ||
    a.bottom < b.top ||
    a.left > b.right
  ) {
    return false;
  }
  return true;
};

const createObstacle = () => {
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
      isJumping = false;
      gameOver = true;
      position = null;
      clearInterval(groundTimer);
      intervals.forEach(int => clearInterval(int));
      const temp = document.querySelectorAll('.cactus');
      temp.forEach(element => {
        const x = element.style.left;
        element.style.left = x;
      });
    }
  }, 40);
  if (!gameOver) setTimeout(createObstacle, Math.random() * 4000);
};

createObstacle();
groundMovement();

window.addEventListener('keydown', e => {
  if (e.key === ' ') {
    if (!isJumping) {
      jump();
      isJumping = true;
    }
  }
});

//
