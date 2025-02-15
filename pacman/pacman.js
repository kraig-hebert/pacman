class Pacman {
  constructor(position) {
    this.mode = "normal"; // normal, power
    this.position = position; // {x: 0, y: 0}
    this.powerModeTimeout = null; // Timeout for power mode duration
  }

  setPosition(position) {
    this.position = position;
  }

  activatePowerMode() {
    this.scoreBoard.addPowerFoodPoint();
    this.ghostController.changeMode("frightened");
    this.mode = "power";
    this.powerModeTimeout = setTimeout(() => this.cancelPowerMode(), 10000);
  }

  cancelPowerMode() {
    this.mode = "normal";
    this.ghostController.changeMode("chase");
  }

  updateMode(mode) {
    this.mode = mode;
  }
}

export default Pacman;
