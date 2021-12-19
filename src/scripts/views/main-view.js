function MainView() {
  const gameHandler = handler => {
    window.addEventListener('keydown', handler);
  };

  return { gameHandler };
}

export default MainView();
