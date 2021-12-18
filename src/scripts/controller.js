import '../styles/reset.css';
import '../styles/main.css';

import * as model from './model';
import scoreView from './views/score-view';
import dinoView from './views/dino-view';
import startGameView from './views/start-game-view';
import groundView from './views/ground-view';
import cactusView from './views/cactus-view';
// selectors
const dino = document.querySelector('.dino');
// global variables
const state = {
  isJumping: false,
  gameOver: false,
  gameRunning: false,
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
          state.isJumping = false;
        }
        count -= 1;
        dino.style.bottom = `${count}rem`;
        if (state.gameOver) clearInterval(goingDown);
      }, 30);
    }
    count += 1;
    dino.style.bottom = `${count}rem`;
    if (state.gameOver) clearInterval(goingUp);
  }, 30);
};

function runGame() {
  scoreView.resetScore();
  state.gameOver = false;
  cactusView.removeAll();
  startGameView.remove();
  dino.className = 'dino dino-stationary';
  groundView.move();
  cactusView.addCactus(state);
}

window.addEventListener('keydown', e => {
  if (!state.gameRunning) {
    state.gameRunning = true;
    runGame();
  }
  if (e.key === ' ') {
    if (!state.isJumping) {
      jump();
      state.isJumping = true;
    }
  }
});
