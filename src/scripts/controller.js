import '../styles/reset.css';
import '../styles/main.css';

import { state } from './model';
import scoreView from './views/score-view';
import dinoView from './views/dino-view';
import startGameView from './views/start-game-view';
import groundView from './views/ground-view';
import cactusView from './views/cactus-view';
import mainView from './views/main-view';

function initGame() {
  scoreView.resetScore();
  state.gameOver = false;
  cactusView.removeAll();
  startGameView.remove();
  dinoView.stand();
  groundView.move();
  cactusView.addCactus(state);
}

function gameController(e) {
  if (!state.gameRunning) {
    state.gameRunning = true;
    initGame();
  }
  if (e.key === ' ') dinoView.jump(state);
}

mainView.gameHandler(gameController);
