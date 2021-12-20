import { START_SCORE, ZERO } from '../config';

const ScoreView = () => {
  const scoreElement = document.querySelector('.score');

  const resetScore = () => {
    scoreElement.textContent = START_SCORE;
  };

  const readScore = () => parseInt(scoreElement.textContent, 10);

  const incrementScore = () => {
    scoreElement.textContent = `${readScore() + 1}`.padStart(
      START_SCORE.length,
      ZERO
    );
  };
  return { incrementScore, resetScore };
};

export default ScoreView();
