import '../styles/reset.css';
import '../styles/main.css';

import { state } from './model';
import mainView from './views/main-view';
import dinoView from './views/dino-view';
import cactusView from './views/cactus-view';
import groundView from './views/ground-view';
import scoreView from './views/score-view';
import startGameView from './views/start-game-view';
import winGameView from './views/win-game-view';
import secretMode from './secret-mode';

function initGame() {
  winGameView.removeMessage();
  scoreView.resetScore();
  state.gameOver = false;
  cactusView.removeAll();
  startGameView.remove();
  dinoView.stand();
  groundView.move();
  cactusView.addCactus(state);
}

function gameController(e) {
  secretMode.addValue(e.key);

  if (!state.gameRunning) {
    state.gameRunning = true;
    initGame();
  }
  if (e.key === ' ' || e.type === 'click') dinoView.jump(state);
}

mainView.gameHandler(gameController);
