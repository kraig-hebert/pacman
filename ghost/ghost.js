class Ghost {
  constructor(board, pacman, position) {
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
    this.queue = [{ x: position.x, y: position.y, path: [] }];
    this.pacman = pacman;
    this.position = position;
    this.visited = Array.from({ length: board.layout.length }, () =>
      Array(board.layout[0].length).fill(false)
    );
    this.visited[position.y][position.x] = true;
  }

  move(removeEventListener) {
    // Reinitialize the queue and visited array each move to allow new search
    this.queue = [{ x: this.position.x, y: this.position.y, path: [] }];
    this.visited = Array.from({ length: this.board.layout.length }, () =>
      Array(this.board.layout[0].length).fill(false)
    );
    this.visited[this.position.y][this.position.x] = true;

    // Breadth First Search - quickest shortest path
    while (this.queue.length > 0) {
      const { x, y, path } = this.queue.shift();

      // If Pac-Man is found
      if (x === this.pacman.position.x && y === this.pacman.position.y) {
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
      // check if ghost has caught pacman....end game
      if (
        this.position.x === this.pacman.position.x &&
        this.position.y === this.pacman.position.y
      ) {
        alert("You lose Batty Boy");
        this.stopMoving(); // Stop ghost movement
        removeEventListener();
        return;
      }

      // Explore neighbors
      for (const { dx, dy } of this.directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (
          this.board.layout[newY][newX] !== 1 && // Not a wall
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
    if (this.interval) clearInterval(this.interval); // prevents multiple intervals
    this.interval = setInterval(() => this.move(removeEventListener), 200);
  }

  stopMoving() {
    this.board.layout[this.position.y][this.position.x] = "G";
    this.board.renderBoard();
    clearInterval(this.interval);
    this.interval = null;
  }
}

export default Ghost;
