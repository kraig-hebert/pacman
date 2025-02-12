class Pacman {
  constructor(board, points, position, scoreBoard) {
    this.board = board;
    this.ghostController = null;
    this.mode = "normal"; // normal, power
    this.points = points;
    this.position = position;
    this.powerModeTimeout = null; // Timeout for power mode duration
    this.scoreBoard = scoreBoard;
  }

  setGhostController(ghostController) {
    this.ghostController = ghostController;
  }

  setPosition(position) {
    this.position = position;
  }

  activatePowerMode() {
    this.scoreBoard.addPowerFoodPoint();
    this.ghostController.changeMode("frightened");
    this.mode = "power";
    console.log(this.mode);
    this.powerModeTimeout = setTimeout(() => this.cancelPowerMode(), 10000);
  }

  cancelPowerMode() {
    console.log("cancelpower");
    this.mode = "normal";
    this.ghostController.changeMode("chase");
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
      // check if the new position is a food pellet
      if (this.board.layout[newY][newX] === 2) this.scoreBoard.addFoodPoint();
      // check if the new position is a power food pellet and set mode to power
      else if (this.board.layout[newY][newX] === 3) this.activatePowerMode();
      // check if warp square and warp pacman to opposite side of board
      else if (this.board.layout[newY][newX] === "<")
        newX = this.board.eastWarpPosition.x - 1;
      else if (this.board.layout[newY][newX] === ">")
        newX = this.board.westWarpPosition.x + 1;

      // check if all food has been eaten and claim victory
      if (this.scoreBoard.totalFood === 0) {
        this.ghostController.stopAllGhosts();

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

    // check if pacman has run into any ghost
    Object.keys(this.ghostController.ghosts).forEach((key) => {
      if (
        newX === this.ghostController.ghosts[key].position.x &&
        newY === this.ghostController.ghosts[key].position.y
      ) {
        if (this.mode === "normal") {
          alert("You lose Batty Boy");
          this.ghostController.stopAllGhosts();
          removeEventListener();
          this.board.renderBoard();
        } else if (this.mode === "power") {
          this.ghostController.changeMode("eaten");
          this.scoreBoard.addGhostPoint();
        }
      }
    });
  }
}

export default Pacman;
