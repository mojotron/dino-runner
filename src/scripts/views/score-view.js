import { START_SCORE, ZERO, END_SCORE, ZERO_NUM } from '../config';

const ScoreView = () => {
  const scoreElement = document.querySelector('.score');

  const resetScore = () => {
    scoreElement.textContent = `${START_SCORE}`.padStart(ZERO_NUM, ZERO);
  };

  const readScore = () => parseInt(scoreElement.textContent, 10);

  const incrementScore = () => {
    if (readScore() >= END_SCORE) return;
    scoreElement.textContent = `${readScore() + 1}`.padStart(ZERO_NUM, ZERO);
  };

  const checkWin = () => readScore() >= END_SCORE;

  return { incrementScore, resetScore, checkWin };
};

export default ScoreView();
