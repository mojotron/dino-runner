import overlap from '../overlap';
import groundView from './ground-view';
import startGameView from './start-game-view';

function CactusView() {
  const intervals = [];
  const parentElement = document.querySelector('.sand-box');

  const removeAll = () => {
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

  const addCactus = state => {
    if (state.gameOver) return;
    const randomTime = Math.random() * 5000;
    let position = 99;
    const cactusElement = document.createElement('div');
    cactusElement.className = 'cactus';
    cactusElement.style.left = `${position}%`;
    parentElement.append(cactusElement);
    const timerId = setInterval(() => {
      intervals.push(timerId);
      position -= 1;
      cactusElement.style.left = `${position}%`;

      const dinoRect = document.querySelector('.dino').getBoundingClientRect();
      const cactusRect = cactusElement.getBoundingClientRect();

      if (position === 1) {
        clearInterval(timerId);
        parentElement.removeChild(cactusElement);
      }

      if (overlap(dinoRect, cactusRect)) {
        intervals.forEach(int => clearInterval(int));
        intervals.splice(0, intervals.length);
        // TODO
        document.querySelector('.dino').className = 'dino dino-lose';
        state.isJumping = false;
        state.gameOver = true;
        state.position = null;
        state.gameRunning = false;
        groundView.stop();
        freezeAll();
        startGameView.add();
      }
    }, 15);
    if (!state.gameOver) setTimeout(() => addCactus(state), randomTime);
  };

  return { addCactus, removeAll };
}

export default CactusView();
