const DinoView = () => {
  const dino = document.querySelector('.dino');
  const stand = () => {};
  const run = () => {
    if (dino.classList.contains('dino-stationary')) {
      dino.classList.remove('dino-stationary');
      dino.classList.add('dino-run-0');
    } else if (dino.classList.contains('dino-run-0')) {
      dino.classList.remove('dino-run-0');
      dino.classList.add('dino-run-1');
    } else {
      dino.classList.remove('dino-run-1');
      dino.classList.add('dino-run-0');
    }
  };
  const lost = () => {};
  const jump = () => {};

  return { run };
};

export default DinoView();
