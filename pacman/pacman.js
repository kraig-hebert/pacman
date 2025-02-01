class Pacman {
  constructor(board, points, position, scoreBoard) {
    this.board = board;
    this.ghost = null;
    this.points = points;
    this.position = position;
    this.scoreBoard = scoreBoard;
  }

  setGhost(ghost) {
    this.ghost = ghost;
  }

  setPosition(position) {
    this.position = position;
  }

  move(direction, removeEventListener) {
    let { x, y } = this.position;
    let newX = x;
    let newY = y;

    if (direction === "ArrowUp") newY -= 1;
    if (direction === "ArrowDown") newY += 1;
    if (direction === "ArrowLeft") newX -= 1;
    if (direction === "ArrowRight") newX += 1;

    // check is new position is a fruit

    // Check if the new position is not a wall
    if (this.board.layout[newY][newX] !== 1) {
      // check if the new position is a food pellet
      if (this.board.layout[newY][newX] === 2) {
        this.scoreBoard.score += this.scoreBoard.foodPoint;
        this.scoreBoard.totalFood -= 1;
      }
      // warp pacman to the east side of board
      else if (this.board.layout[newY][newX] === "<") {
        newX = this.board.eastWarpPosition.x - 1;
      } else if (this.board.layout[newY][newX] === ">") {
        newX = this.board.westWarpPosition.x + 1;
      }
      if (this.scoreBoard.totalFood === 0) {
        // check if all food has been eaten and claim victory
        this.ghost.stopMoving();

        alert("You win Batty Boy");
        removeEventListener();
      }
      this.points.innerText = this.scoreBoard.score;
      this.board.layout[y][x] = 0; // clear old position
      this.board.layout[newY][newX] = "P"; // Set new position
      this.position = { x: newX, y: newY };
    }
    // add 1 piont for each food eaten
    this.board.renderBoard();

    // check if pacman has been caught by ghost
    if (newX === this.ghost.position.x && newY === this.ghost.position.y) {
      alert("You lose Batty Boy");
      this.ghost.stopMoving();
      removeEventListener();
      this.board.renderBoard();
    }
  }
}

export default Pacman;
