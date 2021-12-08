import '../styles/reset.css';
import '../styles/main.css';

const dino = document.querySelector('.dino');

window.addEventListener('keydown', () => {
  const x = setInterval(() => {
    if (dino.style.bottom) {
      dino.style.bottom = `${parseInt(dino.style.bottom, 10) + 1}rem`;
    } else {
      dino.style.bottom = `1rem`;
    }
  }, 50);
  setTimeout(() => {
    clearInterval(x);
    dino.style.bottom = '0rem';
  }, 500);
});
