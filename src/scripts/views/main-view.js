function MainView() {
  const gameHandler = handler => {
    console.log(
      'Process of change in the characteristics of a species over several generations?'
    );
    window.addEventListener('keydown', handler);
  };

  return { gameHandler };
}

export default MainView();
