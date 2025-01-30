class Pacman {
  constructor(x, y, board, ghost) {
    this.board = board;
    this.ghost = null;
    this.position = { x, y };
  }

  setGhost(ghost) {
    this.ghost = ghost;
  }

  move(direction, removeEventListener) {
    let { x, y } = this.position;
    let newX = x;
    let newY = y;

    if (direction === "ArrowUp") newY -= 1;
    if (direction === "ArrowDown") newY += 1;
    if (direction === "ArrowLeft") newX -= 1;
    if (direction === "ArrowRight") newX += 1;

    // Check if the new position is not a wall
    if (this.board.layout[newY][newX] !== 1) {
      this.board.layout[y][x] = 0; // clear old position
      this.board.layout[newY][newX] = "P"; // Set new position
      this.position = { x: newX, y: newY };
    }
    this.board.renderBoard();

    if (newX === this.ghost.position.x && newY === this.ghost.position.y) {
      this.board.layout[newY][newX] = "G";
      this.ghost.stopMoving();
      removeEventListener();
      this.board.renderBoard();
    }
  }
}

export default Pacman;
