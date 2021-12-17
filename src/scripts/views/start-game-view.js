function StartGameView() {
  const startGame = document.querySelector('.start-game');

  const add = () => startGame.classList.remove('hidden');

  const remove = () => startGame.classList.add('hidden');

  return { add, remove };
}

export default StartGameView();
