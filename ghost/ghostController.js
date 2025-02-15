import Ghost from "./ghost.js";

class GhostController {
  constructor(params) {
    this.ghosts = this.setGhosts(params);
  }

  setGhosts(params) {
    const { ghostPositionList, speed } = params;
    const ghosts = {};
    ghostPositionList.forEach(
      (position, index) => (ghosts[index] = new Ghost(index, position, speed))
    );
    return ghosts;
  }

  startAllGhosts(params) {
    Object.keys(this.ghosts).forEach((key) =>
      setTimeout(() => this.ghosts[key].beginMoving(params), key * 1000)
    );
  }

  stopAllGhosts() {
    Object.keys(this.ghosts).forEach((key) => this.ghosts[key].stopMoving());
  }

  stopSingleGhost(key) {
    this.ghosts[key].stopMoving();
  }

  resetGhosts(ghostPositionList, speed) {
    const ghosts = {};
    ghostPositionList.forEach(
      (position, index) =>
        (ghosts[index] = new Ghost(
          this.board,
          this.mode,
          this.pacman,
          position,
          speed,
          this.stopAllGhosts
        ))
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
