function MainView() {
  const gameHandler = handler => {
    console.log(
      'Process of change in the characteristics of a species over several generations?'
    );

    window.addEventListener('keydown', handler);
    document.body.addEventListener('click', handler);
  };

  return { gameHandler };
}

export default MainView();
