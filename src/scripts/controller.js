import '../styles/reset.css';
import '../styles/main.css';

// selectors
const sendBox = document.querySelector('.sand-box');
const dino = document.querySelector('.dino');
// global variables
let isJumping = false;
let gameOver = false;
let x = 0;
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
    position -= 1;
    obstacle.style.left = `${position}%`;

    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (overlap(dinoRect, obstacleRect)) {
      gameOver = true;
      sendBox.innerHTML = 'GAME OVER';

      return;
    }
    if (position === 0) {
      clearInterval(timerId);
      sendBox.removeChild(obstacle);
    }
  }, 40);
  if (!gameOver) setTimeout(createObstacle, Math.random() * 4000);
};

createObstacle();

window.addEventListener('keydown', e => {
  if (e.key === ' ') {
    if (!isJumping) {
      jump();
      isJumping = true;
    }
  }
});

//
const ground = document.querySelector('.ground-wrapper');
setInterval(() => {
  ground.style.left = `${-x}%`;
  x += 1;
  if (x === 100) x = 0;
}, 25);
