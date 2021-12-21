import { START_SCORE, ZERO, END_SCORE } from '../config';

const ScoreView = () => {
  const scoreElement = document.querySelector('.score');

  const resetScore = () => {
    scoreElement.textContent = `${START_SCORE}`.padStart(3, ZERO);
  };

  const readScore = () => parseInt(scoreElement.textContent, 10);

  const incrementScore = () => {
    scoreElement.textContent = `${readScore() + 1}`.padStart(3, ZERO);
  };

  const checkWin = () => readScore() === END_SCORE;

  return { incrementScore, resetScore, checkWin };
};

export default ScoreView();
