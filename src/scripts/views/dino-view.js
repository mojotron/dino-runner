const DinoView = () => {
  const dino = document.querySelector('.dino');

  const stand = () => {
    dino.className = 'dino dino-stationary';
  };

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

  const loose = () => {
    dino.className = 'dino dino-lose';
  };

  const jump = state => {
    if (state.isJumping) return;
    state.isJumping = true;
    let count = 0;
    // going up
    const goingUp = setInterval(() => {
      if (count === 10) {
        clearInterval(goingUp);
        // going down
        const goingDown = setInterval(() => {
          if (count === 2) {
            clearInterval(goingDown);
            state.isJumping = false;
          }
          count -= 1;
          dino.style.bottom = `${count}rem`;
          if (state.gameOver) clearInterval(goingDown);
        }, 30);
      }
      count += 1;
      dino.style.bottom = `${count}rem`;
      if (state.gameOver) clearInterval(goingUp);
    }, 30);
  };

  return { dino, run, jump, stand, loose };
};

export default DinoView();
