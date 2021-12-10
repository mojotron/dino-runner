import '../styles/reset.css';
import '../styles/main.css';
// selectors
const sendBox = document.querySelector('.send-box');
const dino = document.querySelector('.dino');
// global variables
let isJumping = false;
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
      }, 25);
    }
    count += 1;
    dino.style.bottom = `${count}rem`;
  }, 25);
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
    if (position === 0) {
      clearInterval(timerId);
      sendBox.removeChild(obstacle);
    }
  }, 20);
  setTimeout(createObstacle, Math.random() * 4000);
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
