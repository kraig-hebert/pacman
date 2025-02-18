class Ghost {
  constructor(key, position, speed, targetPosition) {
    this.currentCellPreviousValue = 0;
    // up, down, left, right
    this.directions = [
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
    ];
    this.key = key;
    this.interval = null;
    this.mode = "chase"; // chase, scatter, frightened, eaten
    this.queue = [{ x: position.x, y: position.y, path: [] }];
    this.position = position;
    this.startingPosition = { ...position };
    this.speed = speed;
    this.startingSpeed = speed;
    this.targetPosition = targetPosition;
    this.visited = null;
  }

  move(params) {
    const { boardLayout, handleGhostMove } = params;

    // Reinitialize the queue and visited array each move to allow new search
    this.queue = [{ x: this.position.x, y: this.position.y, path: [] }];
    this.visited = Array.from({ length: boardLayout.length }, () =>
      Array(boardLayout[0].length).fill(false)
    );
    this.visited[this.position.y][this.position.x] = true;

    // Breadth First Search - quickest shortest path
    while (this.queue.length > 0) {
      const { x, y, path } = this.queue.shift();

      // If target is found while exploring move ghost one square closer to target
      if (x === this.targetPosition.x && y === this.targetPosition.y) {
        const nextMove = path[0]; // Get the first move in the path
        if (!nextMove) return;
        const newX = this.position.x + nextMove.dx;
        const newY = this.position.y + nextMove.dy;
        handleGhostMove({
          key: this.key,
          newGhostPosition: { x: newX, y: newY },
        });
        break;
      }

      // Explore neighbors
      for (const { dx, dy } of this.directions) {
        const newX = x + dx;
        const newY = y + dy;

        if (this.mode !== "eaten" || this.mode !== "frightened") {
          if (
            boardLayout[newY][newX] !== 1 && // Not a wall
            boardLayout[newY][newX] !== ">" && // Not a warp
            boardLayout[newY][newX] !== "<" && // Not a warp
            !this.visited[newY][newX] && // Not already visited
            boardLayout[newY][newX] !== "G" // Avoid other ghosts
          ) {
            this.visited[newY][newX] = true;
            this.queue.push({ x: newX, y: newY, path: [...path, { dx, dy }] });
          }
        } else if (this.mode === "eaten" || this.mode === "frightened") {
          if (
            boardLayout[newY][newX] !== 1 && // Not a wall
            boardLayout[newY][newX] !== ">" && // Not a warp
            boardLayout[newY][newX] !== "<" && // Not a warp
            !this.visited[newY][newX] // Not already visited
            // no need to avoid ghosts in
          ) {
            this.visited[newY][newX] = true;
            this.queue.push({ x: newX, y: newY, path: [...path, { dx, dy }] });
          }
        }
      }
    }
  }

  beginMoving(params) {
    if (this.interval) clearInterval(this.interval); // prevents multiple intervals
    this.interval = setInterval(() => this.move(params), this.speed);
  }

  resetMovement(params) {
    if (this.mode === "chase" || this.mode === "scatter")
      this.speed = this.startingSpeed;
    else if (this.mode === "frightened") this.speed = this.startingSpeed * 2;
    else if (this.mode === "eaten") this.speed = 100;
    this.beginMoving(params);
  }

  stopMoving() {
    clearInterval(this.interval);
    this.interval = null;
  }

  setCurrentCellPreviousValue(value) {
    this.currentCellPreviousValue = value;
  }

  setPosition(position) {
    this.position = { ...position };
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  setTargetPosition(targetPosition) {
    this.targetPosition = { ...targetPosition };
  }

  changeMode(params) {
    this.mode = params.newMode;
    this.targetPosition = { ...params.targetPosition };
    this.resetMovement(params);
  }
}

export default Ghost;
