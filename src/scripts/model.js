export const state = {
  gameOver: false,
  gameRunning: false,
  isJumping: false,

  gameStop() {
    this.gameOver = true;
    this.isJumping = false;
    this.gameRunning = false;
  },
};
