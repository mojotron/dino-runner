import dinoView from './dino-view';
import scoreView from './score-view';

function GroundView() {
  const ground = document.querySelector('.ground-wrapper');
  let position = 0;
  let timerId;

  const move = () => {
    timerId = setInterval(() => {
      dinoView.run();
      ground.style.left = `${-position}%`;
      position += 1;
      if (position === 100) position = 0;
      scoreView.incrementScore();
    }, 75);
  };

  const stop = () => clearInterval(timerId);

  return { move, stop };
}

export default GroundView();
