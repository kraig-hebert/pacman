class Pacman {
  constructor(position, speed) {
    this.direction = null;
    this.directions = {
      ArrowUp: { dx: 0, dy: -1 },
      ArrowDown: { dx: 0, dy: 1 },
      ArrowLeft: { dx: -1, dy: 0 },
      ArrowRight: { dx: 1, dy: 0 },
    };
    this.interval = null;
    this.mode = "normal"; // normal, power
    this.position = position; // {x: 0, y: 0}
    this.speed = speed;
  }

  move(handlePacmanMove) {
    const newX = this.position.x + this.directions[this.direction].dx;
    const newY = this.position.y + this.directions[this.direction].dy;
    handlePacmanMove({ newX, newY });
  }

  beginMoving(params) {
    if (this.interval) clearInterval(this.interval); // prevents multiple intervals
    this.interval = setInterval(() => this.move(params), this.speed);
  }

  stopMoving() {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  }

  setDirection(newDirection) {
    this.direction = newDirection;
  }

  setMode(newMode) {
    this.mode = newMode;
  }

  setPosition(position) {
    this.position = position;
  }
}

export default Pacman;
