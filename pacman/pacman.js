class Pacman {
  constructor(x, y) {
    this.position = { x, y };
  }

  move(direction, board) {
    let { x, y } = this.position;
    let newX = x;
    let newY = y;

    if (direction === "ArrowUp") newY -= 1;
    if (direction === "ArrowDown") newY += 1;
    if (direction === "ArrowLeft") newX -= 1;
    if (direction === "ArrowRight") newX += 1;

    // Check if the new position is not a wall
    if (board.layout[newY][newX] !== 1) {
      board.layout[y][x] = 0; // clear old position
      board.layout[newY][newX] = "P"; // Set new position
      this.position = { x: newX, y: newY };
    }
    board.renderBoard();
  }
}

export default Pacman;
