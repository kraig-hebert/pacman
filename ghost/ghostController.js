import Ghost from "./ghost.js";

class GhostController {
  constructor(board, ghostPositionList, pacman, speed) {
    this.board = board;
    this.pacman = pacman;
    this.speed = speed;
    this.mode = "chase"; // chase, scatter, frightened, eaten
    this.ghostList = this.setGhostList(ghostPositionList);
  }

  setGhostList(ghostPositionList) {
    return ghostPositionList.map(
      (position) =>
        new Ghost(this.board, this.mode, this.pacman, position, this.speed)
    );
  }

  startGhosts(removeEventListener) {
    this.ghostList.forEach((ghost, index) =>
      setTimeout(ghost.beginMoving(removeEventListener), index * 1000)
    );
  }

  stopGhosts() {
    this.ghostList.forEach((ghost) => ghost.stopMoving());
  }

  resetGhosts(ghostPositionList, speed) {
    this.ghostList = ghostPositionList.map(
      (position) =>
        new Ghost(this.board, this.mode, this.pacman, position, speed)
    );
  }

  changeMode(newMode) {
    this.mode = newMode;
    this.ghostList.forEach((ghost) => {
      ghost.changeMode(newMode);
    });
  }
}

export default GhostController;
