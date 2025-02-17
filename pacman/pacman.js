class Pacman {
  constructor(position) {
    this.mode = "normal"; // normal, power
    this.position = position; // {x: 0, y: 0}
  }

  setPosition(position) {
    this.position = position;
  }

  updateMode(newMode) {
    this.mode = newMode;
  }
}

export default Pacman;
