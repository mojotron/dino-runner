function WinGameView() {
  const parentElement = document.querySelector('.sand-box');

  const addMessage = () => {
    const msg = document.createElement('div');
    msg.className = 'win-msg';
    msg.textContent = 'Congratulation you WON the game!';
    parentElement.append(msg);
  };

  const removeMessage = () => {
    const msg = document.querySelector('.win-msg');
    if (!msg) return;
    parentElement.removeChild(msg);
  };

  return { addMessage, removeMessage };
}
export default WinGameView();
