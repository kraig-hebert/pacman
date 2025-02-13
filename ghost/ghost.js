class Ghost {
  constructor(board, mode, pacman, position, speed, stopAllGhosts) {
    this.board = board;
    this.currentCellPreviousValue = 0;
    // up, down, left, right
    this.directions = [
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
    ];
    this.interval = null;
    this.mode = mode;
    this.queue = [{ x: position.x, y: position.y, path: [] }];
    this.pacman = pacman;
    this.position = position;
    this.startingPosition = { ...position };
    this.removePacmanKeyDownEventListener = null;
    this.startingPosition = { ...position };
    this.speed = speed;
    this.startingSpeed = speed;
    this.stopAllGhosts = stopAllGhosts;
    this.target = pacman;
    this.visited = Array.from({ length: board.layout.length }, () =>
      Array(board.layout[0].length).fill(false)
    );
    this.visited[position.y][position.x] = true;
  }

  move() {
    // Reinitialize the queue and visited array each move to allow new search
    this.queue = [{ x: this.position.x, y: this.position.y, path: [] }];
    this.visited = Array.from({ length: this.board.layout.length }, () =>
      Array(this.board.layout[0].length).fill(false)
    );
    this.visited[this.position.y][this.position.x] = true;

    // Breadth First Search - quickest shortest path
    while (this.queue.length > 0) {
      const { x, y, path } = this.queue.shift();

      // If target is found while exploring move ghost one square closer to target
      if (x === this.target.position.x && y === this.target.position.y) {
        const nextMove = path[0]; // Get the first move in the path
        if (!nextMove) return;
        const newX = this.position.x + nextMove.dx;
        const newY = this.position.y + nextMove.dy;

        // restore cell value to previous value of current cell
        this.board.layout[this.position.y][this.position.x] =
          this.currentCellPreviousValue;
        // store next move cell value
        this.currentCellPreviousValue = this.board.layout[newY][newX];
        // Set new position
        this.board.layout[newY][newX] = "G";
        this.position = { x: newX, y: newY };

        this.board.renderBoard();
      }
      // check if ghost has caught target....end game if target is pacman
      if ((this.mode !== "frightened") | (this.mode !== "eaten")) {
        if (
          this.position.x === this.target.position.x &&
          this.position.y === this.target.position.y
        ) {
          this.stopAllGhosts(); // Stop ghost movement
          this.board.layout[this.position.y][this.position.x] = "G";
          this.board.renderBoard();
          alert("You lose Batty Boy");
          this.removePacmanKeyDownEventListener();
          return;
        }
      }

      // Explore neighbors
      for (const { dx, dy } of this.directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (
          this.board.layout[newY][newX] !== 1 && // Not a wall
          this.board.layout[newY][newX] !== ">" && // Not a warp
          this.board.layout[newY][newX] !== "<" && // Not a warp
          !this.visited[newY][newX] && // Not already visited
          this.board.layout[newY][newX] !== "G" // Avoid other ghosts
        ) {
          this.visited[newY][newX] = true;
          this.queue.push({ x: newX, y: newY, path: [...path, { dx, dy }] });
        }
      }
    }
  }

  beginMoving(removeEventListener) {
    this.removePacmanKeyDownEventListener = removeEventListener;
    if (this.interval) clearInterval(this.interval); // prevents multiple intervals
    this.interval = setInterval(
      () => this.move(this.pacman),
      this.startingSpeed
    );
  }

  resetMovement() {
    switch (this.mode) {
      case "chase":
        this.speed = this.startingSpeed;
        this.setTarget(this.pacman);
        break;
      case "scatter":
        this.speed = this.startingSpeed;
        break;
      case "frightened":
        this.speed = this.startingSpeed * 2;
        break;
      case "eaten":
        this.speed = 100;
        this.setTarget(this.startingPosition);
        break;
      default:
        this.speed = this.startingSpeed;
    }
    if (this.interval) clearInterval(this.interval); // prevents multiple intervals
    this.interval = setInterval(() => this.move(), this.speed);
  }

  stopMoving() {
    clearInterval(this.interval);
    this.interval = null;
  }

  setPosition(position) {
    this.position = position;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  setTarget(target) {
    this.target = { position: target };
  }

  changeMode(newMode) {
    this.mode = newMode;
    this.resetMovement();
  }
}

export default Ghost;
