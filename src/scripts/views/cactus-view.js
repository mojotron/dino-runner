import overlap from '../overlap';
import dinoView from './dino-view';
import groundView from './ground-view';
import scoreView from './score-view';
import startGameView from './start-game-view';
import winGameView from './win-game-view';

function CactusView() {
  const intervals = [];
  const parentElement = document.querySelector('.sand-box');
  let timeOutId;

  const cleanIntervals = () => {
    intervals.forEach(int => clearInterval(int));
    intervals.splice(0, intervals.length);
  };

  const removeAll = () => {
    cleanIntervals();
    const cactusElements = document.querySelectorAll('.cactus');
    cactusElements.forEach(ele => parentElement.removeChild(ele));
  };

  const freezeAll = () => {
    const cactusElements = document.querySelectorAll('.cactus');
    cactusElements.forEach(element => {
      const currentPosition = element.style.left;
      element.style.left = currentPosition;
    });
  };

  const endGame = state => {
    clearTimeout(timeOutId);
    cleanIntervals();
    freezeAll();
    state.gameStop();
    dinoView.loose();
    groundView.stop();
    startGameView.add();
  };

  const randTime = () => Math.random() * 3500 + 250;

  const addCactus = state => {
    if (state.gameOver) return;
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
        dinoView.stand();
      }
    }, 15);
    if (!state.gameOver)
      timeOutId = setTimeout(() => addCactus(state), randTime());
  };

  return { addCactus, removeAll };
}

export default CactusView();
