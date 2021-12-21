import overlap from '../overlap';
import dinoView from './dino-view';
import groundView from './ground-view';
import scoreView from './score-view';
import startGameView from './start-game-view';
import winGameView from './win-game-view';

function CactusView() {
  const intervals = [];
  const parentElement = document.querySelector('.sand-box');

  const removeAll = () => {
    const cactusElements = document.querySelectorAll('.cactus');
    cactusElements.forEach(ele => parentElement.removeChild(ele));
  };

  const cleanIntervals = () => {
    intervals.forEach(int => clearInterval(int));
    intervals.splice(0, intervals.length);
  };

  const freezeAll = () => {
    const cactusElements = document.querySelectorAll('.cactus');
    cactusElements.forEach(element => {
      const currentPosition = element.style.left;
      element.style.left = currentPosition;
    });
  };

  const endGame = state => {
    cleanIntervals();
    freezeAll();
    state.gameStop();
    dinoView.loose();
    groundView.stop();
    startGameView.add();
  };

  const addCactus = state => {
    if (state.gameOver) return;
    const randomTime = Math.random() * 6000;
    let position = 99;

    const cactusElement = document.createElement('div');
    cactusElement.className = 'cactus';
    cactusElement.style.left = `${position}%`;
    parentElement.append(cactusElement);

    const timerId = setInterval(() => {
      intervals.push(timerId);
      position -= 1;
      cactusElement.style.left = `${position}%`;

      const dinoRect = dinoView.dino.getBoundingClientRect();
      const cactusRect = cactusElement.getBoundingClientRect();

      if (position === 1) {
        clearInterval(timerId);
        parentElement.removeChild(cactusElement);
      }

      if (overlap(dinoRect, cactusRect)) {
        endGame(state);
      }

      if (scoreView.checkWin()) {
        endGame(state);
        winGameView.addMessage();
      }
    }, 15);
    if (!state.gameOver) setTimeout(() => addCactus(state), randomTime);
  };

  return { addCactus, removeAll };
}

export default CactusView();
