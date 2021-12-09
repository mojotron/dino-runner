import '../styles/reset.css';
import '../styles/main.css';
// selectors
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

window.addEventListener('keydown', e => {
  if (e.key === ' ') {
    if (!isJumping) {
      jump();
      isJumping = true;
    }
  }
});
