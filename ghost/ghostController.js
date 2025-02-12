import Ghost from "./ghost.js";

class GhostController {
  constructor(board, ghostPositionList, pacman, speed) {
    this.board = board;
    this.pacman = pacman;
    this.speed = speed;
    // chase, scatter, frightened, eaten
    this.mode = "chase";
    this.ghosts = this.setGhosts(ghostPositionList);
  }

  setGhosts(ghostPositionList) {
    const ghosts = {};
    ghostPositionList.forEach(
      (position, index) =>
        (ghosts[index] = new Ghost(
          this.board,
          this.mode,
          this.pacman,
          position,
          this.speed,
          this.stopAllGhosts
        ))
    );
    return ghosts;
  }

  startAllGhosts(removeEventListener) {
    Object.keys(this.ghosts).forEach((key) =>
      setTimeout(this.ghosts[key].beginMoving(removeEventListener), key * 1000)
    );
  }

  stopAllGhosts() {
    Object.keys(this.ghosts).forEach((key) => this.ghosts[key].stopMoving());
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
