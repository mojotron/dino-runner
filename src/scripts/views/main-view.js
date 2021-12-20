function MainView() {
  const gameHandler = handler => {
    window.addEventListener('keyup', handler);
  };

  return { gameHandler };
}

export default MainView();
