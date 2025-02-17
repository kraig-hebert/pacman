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

  startAllGhosts(params) {
    Object.keys(this.ghosts).forEach((key) => {
      setTimeout(() => this.ghosts[key].beginMoving(params), key * 1000);
    });
  }

  stopAllGhosts() {
    Object.keys(this.ghosts).forEach((key) => this.ghosts[key].stopMoving());
  }

  stopSingleGhost(key) {
    this.ghosts[key].stopMoving();
  }

  setAllGhostsTargetPosition(targetPosition) {
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

  updateAllGhostsMode(params) {
    Object.keys(this.ghosts).forEach((key) =>
      this.ghosts[key].changeMode({
        ...params,
        targetPosition: params.targetPosition
          ? { ...params.targetPosition }
          : params.targetPositions[key],
      })
    );
  }
}

export default GhostController;
