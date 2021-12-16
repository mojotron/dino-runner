const ScoreView = () => {
  const scoreElement = document.querySelector('.score');

  const resetScore = () => {
    scoreElement.textContent = '0000';
  };

  const readScore = () => parseInt(scoreElement.textContent, 10);

  const incrementScore = () => {
    scoreElement.textContent = `${readScore() + 10}`.padStart(4, '0');
  };
  return { incrementScore, resetScore };
};

export default ScoreView();
