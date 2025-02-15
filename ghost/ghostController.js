import Ghost from "./ghost.js";

class GhostController {
  constructor(params) {
    this.ghosts = this.setGhosts(params);
  }

  setGhosts(params) {
    const { ghostPositionList, speed, targetPosition } = params;
    const ghosts = {};
    ghostPositionList.forEach(
      (position, index) =>
        (ghosts[index] = new Ghost(index, position, speed, targetPosition))
    );
    return ghosts;
  }

  stopAllGhosts() {
    Object.keys(this.ghosts).forEach((key) => this.ghosts[key].stopMoving());
  }

  stopSingleGhost(key) {
    this.ghosts[key].stopMoving();
  }

  setGhostsTargetPosition(targetPosition) {
    Object.keys(this.ghosts).forEach((key) =>
      this.ghosts[key].setTargetPosition(targetPosition)
    );
  }

  resetGhosts(ghostPositionList, speed, targetPosition) {
    const ghosts = {};
    ghostPositionList.forEach(
      (position, index) =>
        (ghosts[index] = new Ghost(index, position, speed, targetPosition))
    );
    this.ghosts = ghosts;
  }

  changeMode(newMode) {
    this.mode = newMode;
    Object.keys(this.ghosts).forEach((key) =>
      this.ghosts[key].changeMode(newMode)
    );
  }
}

export default GhostController;
